use once_cell::sync::Lazy;
use std::collections::HashSet;
use std::env;
use std::path::PathBuf;
use std::time::Duration;
use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};
use tokio::sync::Mutex;

static UFS_CRAWLER_LOCK: Lazy<Mutex<()>> = Lazy::new(|| Mutex::new(()));

const STEAMDB_SCRAPER_JS: &str = r#"
    let checkCount = 0;
    let checkInterval = setInterval(() => {
        checkCount++;
        const isCloudflare = document.title.includes("Just a moment") || document.title.includes("Cloudflare") || document.title.includes("Attention Required");
        
        if (isCloudflare) return;

        if (!window.location.href.includes("/ufs/")) {
            clearInterval(checkInterval);
            window.location.hash = "TAURI_UFS_ERROR|NOT_FOUND_REDIRECT";
            return;
        }

        let headers = document.querySelectorAll('h2');
        let saveTable = null;
        for (let h of headers) {
            if (h.innerText.includes('Save File Locations')) {
                let sibling = h.nextElementSibling;
                while (sibling && sibling.tagName !== 'TABLE') {
                    sibling = sibling.nextElementSibling;
                }
                if (sibling) saveTable = sibling;
                break;
            }
        }
        
        if (saveTable) {
            clearInterval(checkInterval);
            let results = [];
            let rows = saveTable.querySelectorAll('tbody tr');
            if (rows.length === 0) rows = saveTable.querySelectorAll('tr');
            rows.forEach(tr => {
                let tds = tr.querySelectorAll('td');
                if (tds.length >= 3) {
                    let platform = tds[0].innerText.trim();
                    if (platform.includes('Windows') || platform.includes('All OSes')) {
                        let path = tds[1].innerText.trim();
                        let pattern = tds[2].innerText.trim();
                        results.push(platform + '|' + path + '|' + pattern);
                    }
                }
            });
            if (results.length > 0) {
                window.location.hash = "TAURI_UFS_DATA|" + encodeURIComponent(results.join('\n'));
            } else {
                window.location.hash = "TAURI_UFS_ERROR|NO_ROWS";
            }
        } else {
            if (document.readyState === 'complete' && checkCount > 2) {
                clearInterval(checkInterval);
                window.location.hash = "TAURI_UFS_ERROR|NO_UFS_TABLE_IN_HTML";
            } else if (checkCount > 25) {
                clearInterval(checkInterval);
                window.location.hash = "TAURI_UFS_ERROR|TIMEOUT";
            }
        }
    }, 1500);
"#;

const CLOUDFLARE_OVERLAY_JS: &str = r#"
    if (!document.getElementById('goslynk-overlay')) {
        let style = document.createElement('style');
        style.innerHTML = `
            html, body { background-color: #1e1b2e !important; color: transparent !important; }
            body > * { visibility: hidden !important; }
            #goslynk-overlay, #goslynk-overlay * { visibility: visible !important; color: white !important; }
            iframe, #challenge-stage, #cf-challenge-stage, #challenge-form, .cf-turnstile {
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);

        let overlay = document.createElement('div');
        overlay.id = 'goslynk-overlay';
        overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; padding-top: 60px; z-index: 999999; pointer-events: none;';
        overlay.innerHTML = `
            <div style="margin-bottom: 16px; pointer-events: none;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #d946ef, #8b5cf6); border: 2px solid #fff; box-shadow: 0 0 20px rgba(217, 70, 239, 0.6); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 24px;">G</div>
            </div>
            <h2 style="margin:0 0 8px 0; font-size:22px; color:#d946ef; font-family:sans-serif; pointer-events:none;">Đang đồng bộ Cloud Save...</h2>
            <p style="color:#94a3b8; font-size:15px; font-family:sans-serif; text-align:center; pointer-events:none;">Vui lòng click vào ô xác nhận bên dưới để tiếp tục.</p>
        `;
        document.body.prepend(overlay);

        setInterval(() => {
            document.querySelectorAll('#challenge-stage, #cf-challenge-stage, #challenge-form, #turnstile-wrapper, .cf-turnstile, iframe').forEach(el => {
                el.style.setProperty('position', 'fixed', 'important');
                el.style.setProperty('top', '230px', 'important');
                el.style.setProperty('left', '50%', 'important');
                el.style.setProperty('transform', 'translateX(-50%)', 'important');
                el.style.setProperty('visibility', 'visible', 'important');
                el.style.setProperty('z-index', '9999999', 'important');
                el.style.setProperty('pointer-events', 'auto', 'important');
                el.style.setProperty('opacity', '1', 'important');
                el.style.setProperty('display', 'block', 'important');
            });
        }, 100);
    }
"#;

pub fn resolve_ufs_path_template(raw_path: &str) -> Vec<PathBuf> {
    let userprofile = env::var("USERPROFILE").unwrap_or_default();
    let localappdata = env::var("LOCALAPPDATA").unwrap_or_default();
    let appdata = env::var("APPDATA").unwrap_or_default();
    let programdata = env::var("PROGRAMDATA").unwrap_or_else(|_| "C:\\ProgramData".to_string());
    let public = env::var("PUBLIC").unwrap_or_else(|_| "C:\\Users\\Public".to_string());
    let windir = env::var("WINDIR").unwrap_or_else(|_| "C:\\Windows".to_string());

    let s = raw_path
        .replace("<winLocalAppData>", &localappdata)
        .replace("%LOCALAPPDATA%", &localappdata)
        .replace("<winAppData>", &appdata)
        .replace("%APPDATA%", &appdata)
        .replace("<winDocuments>", &format!("{}\\Documents", userprofile))
        .replace("%USERPROFILE%/Documents", &format!("{}\\Documents", userprofile))
        .replace("<winPublic>", &public)
        .replace("%PUBLIC%", &public)
        .replace("<winProgramData>", &programdata)
        .replace("%PROGRAMDATA%", &programdata)
        .replace("<winDir>", &windir)
        .replace("%WINDIR%", &windir)
        .replace("<home>", &userprofile)
        .replace("%USERPROFILE%", &userprofile)
        .replace('/', "\\");

    vec![PathBuf::from(s)]
}

pub fn scan_ufs_entries(entries: &[String]) -> Vec<String> {
    let mut found = Vec::new();
    let mut seen = HashSet::new();

    for entry in entries {
        let parts: Vec<&str> = entry.split('|').collect();
        if parts.len() < 2 {
            continue;
        }
        let platform = parts[0];
        let raw_path = parts[1];
        if !platform.contains("Windows") && !platform.contains("All OSes") {
            continue;
        }
        for p in resolve_ufs_path_template(raw_path) {
            let s = p.to_string_lossy().to_string();
            if seen.insert(s.clone()) {
                found.push(s);
            }
        }
    }
    found
}

#[tauri::command]
pub async fn fetch_ufs_save_paths(
    app: AppHandle,
    app_id: String,
    session_token: Option<String>,
    api_base: Option<String>,
) -> Result<Vec<String>, String> {
    let base = api_base.unwrap_or_else(|| "https://api.goslynk.online".to_string());
    let client = reqwest::Client::new();

    // 1. Check server cache
    println!("[S4] Checking server cache for app_id={}", app_id);
    let cache_url = format!("{}/cloudsave/ufs/{}", base, app_id);
    if let Ok(resp) = client.get(&cache_url).send().await {
        if resp.status().is_success() {
            if let Ok(json) = resp.json::<serde_json::Value>().await {
                if let Some(arr) = json.get("entries").and_then(|v| v.as_array()) {
                    let entries: Vec<String> = arr
                        .iter()
                        .filter_map(|x| x.as_str().map(|s| s.to_string()))
                        .collect();
                    if !entries.is_empty() {
                        println!(
                            "[S4] ✅ Server cache HIT for app_id={} ({} entries) — skipping WebView",
                            app_id,
                            entries.len()
                        );
                        return Ok(scan_ufs_entries(&entries));
                    }
                }
            }
        }
    }

    // 2. Check Ludusavi API
    println!("[S4] Checking Ludusavi API for app_id={}", app_id);
    let ludu_url = format!("https://api4001.goslynk.online/api/ludusavi/db?app_id={}", app_id);
    if let Ok(resp) = client.get(&ludu_url).send().await {
        if resp.status().is_success() {
            if let Ok(json) = resp.json::<serde_json::Value>().await {
                if let Some(arr) = json.get("entries").and_then(|v| v.as_array()) {
                    let entries: Vec<String> = arr
                        .iter()
                        .filter_map(|x| x.as_str().map(|s| s.to_string()))
                        .collect();
                    if !entries.is_empty() {
                        println!(
                            "[S4] ✅ Ludusavi HIT for app_id={} ({} paths) — skipping WebView",
                            app_id,
                            entries.len()
                        );
                        return Ok(scan_ufs_entries(&entries));
                    }
                }
            }
        }
    }

    // 3. Fallback to stealth SteamDB UFS WebView crawler
    println!("[S4] ===== fetch_ufs_save_paths QUEUED app_id={} (waiting for lock) =====", app_id);
    let _guard = UFS_CRAWLER_LOCK.lock().await;
    println!("[S4] ===== fetch_ufs_save_paths START app_id={} (lock acquired) =====", app_id);

    let target_url = format!("https://steamdb.info/app/{}/ufs/", app_id);
    let win = if let Some(existing) = app.get_webview_window("steamdb_ufs_crawler") {
        let _ = existing.eval(&format!(
            "window.location.hash = ''; window.location.href = '{}';",
            target_url
        ));
        let _ = existing.eval(STEAMDB_SCRAPER_JS);
        existing
    } else {
        WebviewWindowBuilder::new(
            &app,
            "steamdb_ufs_crawler",
            WebviewUrl::External(target_url.parse().map_err(|e: url::ParseError| e.to_string())?),
        )
        .title("GoslynkDB")
        .inner_size(480.0, 520.0)
        .visible(false)
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")
        .initialization_script(STEAMDB_SCRAPER_JS)
        .build()
        .map_err(|e| e.to_string())?
    };

    for t in 1..=38 {
        tokio::time::sleep(Duration::from_secs(1)).await;
        if let Ok(url) = win.url() {
            let url_str = url.as_str();
            if let Some(idx) = url_str.find("#TAURI_UFS_DATA|") {
                let encoded = &url_str[idx + "#TAURI_UFS_DATA|".len()..];
                let decoded = urlencoding::decode(encoded)
                    .map(|s| s.into_owned())
                    .unwrap_or_default();
                let raw_entries: Vec<String> = decoded.lines().map(|l| l.to_string()).collect();
                let _ = win.hide();
                let _ = win.eval("window.location.hash = ''; window.location.href = 'about:blank';");

                // Upload to server cache if token present
                if let Some(tok) = session_token {
                    let mut req = client.post(&cache_url).json(&serde_json::json!({ "entries": raw_entries }));
                    if !tok.is_empty() {
                        req = req.header("Authorization", format!("Bearer {}", tok));
                    }
                    let _ = req.send().await;
                }

                return Ok(scan_ufs_entries(&raw_entries));
            } else if let Some(idx) = url_str.find("#TAURI_UFS_ERROR|") {
                let err_code = &url_str[idx + "#TAURI_UFS_ERROR|".len()..];
                let _ = win.hide();
                let _ = win.eval("window.location.hash = ''; window.location.href = 'about:blank';");
                return Err(format!("[S4] UFS scrape returned ERROR: {} (app_id={})", err_code, app_id));
            }
        }
        if t == 5 {
            if let Ok(title) = win.title() {
                if title.contains("Just a moment") || title.contains("Cloudflare") {
                    println!("[S4] [t=5s] Cloudflare detected... Showing masked window for manual CAPTCHA solving");
                    let _ = win.eval(CLOUDFLARE_OVERLAY_JS);
                    let _ = win.center();
                    let _ = win.show();
                }
            }
        }
    }

    let _ = win.hide();
    Err(format!("[S4] UFS fetch timeout after 38s for app_id={}", app_id))
}

