#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod eaubiactive;
mod google_auth;
mod luaactive;
mod s3;
mod s4;
mod save_signer;
mod squad_downloader;
mod steam_runtime;

use base64::Engine;
use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::BTreeMap;
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Emitter, Manager, State, WebviewUrl, WebviewWindowBuilder,
};

const API_BASE_URL: &str = "https://api.goslynk.online";
const API4001_URL: &str = "https://api4001.goslynk.online";
const API8000_URL: &str = "https://api8000.goslynk.online";

// Hardcoded signing secrets & keys extracted from binary
const REQUEST_SIGNING_SECRET: &str = "R9x#zP2!mK8$LwR5*jT@nC7^bY4&fHv9xQ";
const INTERNAL_BAN_KEY: &str = "gsl_ban_7f3k9xQpW2mNvL8dRtYuZ4hCjEoAiB";
const MORRENUS_API_KEY: &str = "smm_8e30a373d14b3e648df49a5b44b7393e1051e2bcf817b5ce285266cade48ad1c617556c626a785a4411a5c9a8efabaca";
const RYUU_AUTH_CODE: &str = "RYUUMANIFESTut65ii";

pub struct SnippingState {
    pub pending_image_b64: Mutex<Option<String>>,
    pub current_hotkey: Mutex<String>,
}

impl Default for SnippingState {
    fn default() -> Self {
        Self {
            pending_image_b64: Mutex::new(None),
            current_hotkey: Mutex::new(String::new()),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SavedCredentials {
    pub username: String,
    pub password: String,
}

fn goslynk_appdata_dir() -> Result<PathBuf, String> {
    let appdata = env::var("APPDATA").map_err(|_| "APPDATA env var not found".to_string())?;
    let dir = PathBuf::from(appdata).join("goslynk_launcher");
    fs::create_dir_all(&dir).map_err(|_| "Failed to create Goslynk dir".to_string())?;
    Ok(dir)
}

pub fn find_steam_path_internal() -> Option<PathBuf> {
    let candidates = [
        r"C:\Program Files (x86)\Steam",
        r"C:\Program Files\Steam",
        r"D:\Steam",
        r"E:\Steam",
    ];
    for c in &candidates {
        let p = PathBuf::from(c);
        if p.join("steam.exe").exists() {
            return Some(p);
        }
    }
    None
}

#[tauri::command]
fn save_credentials(username: String, password: String) -> Result<(), String> {
    let dir = goslynk_appdata_dir()?;
    let creds = SavedCredentials { username, password };
    let json = serde_json::to_string_pretty(&creds).map_err(|e| e.to_string())?;
    fs::write(dir.join("goslynk_credentials.json"), json).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_credentials() -> Result<Option<SavedCredentials>, String> {
    let dir = goslynk_appdata_dir()?;
    let path = dir.join("goslynk_credentials.json");
    if !path.exists() {
        return Ok(None);
    }
    let text = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let creds: SavedCredentials = serde_json::from_str(&text).map_err(|e| e.to_string())?;
    Ok(Some(creds))
}

#[tauri::command]
fn delete_credentials() -> Result<(), String> {
    let dir = goslynk_appdata_dir()?;
    let path = dir.join("goslynk_credentials.json");
    if path.exists() {
        let _ = fs::remove_file(path);
    }
    Ok(())
}

#[tauri::command]
fn save_age_verification(verified: bool) -> Result<(), String> {
    let dir = goslynk_appdata_dir()?;
    let json = serde_json::json!({ "verified": verified });
    fs::write(dir.join("nsfw_age_verified.json"), json.to_string())
        .map_err(|_| "Failed to write age verification file".to_string())
}

#[tauri::command]
fn get_age_verification() -> Result<bool, String> {
    let dir = goslynk_appdata_dir()?;
    let path = dir.join("nsfw_age_verified.json");
    if !path.exists() {
        return Ok(false);
    }
    let text = fs::read_to_string(path).map_err(|_| "Failed to read age verification file".to_string())?;
    let json: serde_json::Value =
        serde_json::from_str(&text).map_err(|_| "Failed to parse age verification file".to_string())?;
    Ok(json.get("verified").and_then(|v| v.as_bool()).unwrap_or(false))
}

#[tauri::command]
async fn post_signed_request(
    endpoint: String,
    payload: serde_json::Value,
    api_base: Option<String>,
) -> Result<serde_json::Value, String> {
    let base = api_base.unwrap_or_else(|| API_BASE_URL.to_string());
    let timestamp = chrono::Utc::now().timestamp();

    let mut pairs = BTreeMap::new();
    if let Some(obj) = payload.as_object() {
        for (k, v) in obj {
            if k == "recaptchaToken" || k == "otocaptchaToken" {
                continue;
            }
            if !v.is_object() && !v.is_array() && !v.is_null() {
                let val_str = match v {
                    serde_json::Value::String(s) => s.clone(),
                    other => other.to_string(),
                };
                pairs.insert(k.clone(), val_str);
            }
        }
    }

    let query_part = pairs
        .iter()
        .map(|(k, v)| format!("{}={}", k, v))
        .collect::<Vec<_>>()
        .join("&");

    let raw_to_sign = format!("{}{}{}", query_part, timestamp, REQUEST_SIGNING_SECRET);
    let digest = Sha256::digest(raw_to_sign.as_bytes());
    let signature: String = digest.iter().map(|b| format!("{:02x}", b)).collect();

    let url = format!("{}{}", base, endpoint);
    let client = reqwest::Client::new();
    let resp = client
        .post(&url)
        .header("Content-Type", "application/json")
        .header("X-Request-Timestamp", timestamp.to_string())
        .header("X-Request-Signature", signature)
        .json(&payload)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let status = resp.status();
    let body_text = resp.text().await.map_err(|e| e.to_string())?;
    if !status.is_success() {
        return Err(body_text);
    }

    serde_json::from_str(&body_text)
        .map_err(|e| format!("Invalid JSON: {} - body: {}", e, body_text))
}

#[tauri::command]
async fn fetch_banner_get(path: String, base: Option<String>) -> Result<serde_json::Value, String> {
    let b = base.unwrap_or_else(|| API4001_URL.to_string());
    let url = format!("{}{}", b, path);
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    resp.json().await.map_err(|e| e.to_string())
}

#[tauri::command]
fn get_machine_hwid() -> Result<String, String> {
    let mut parts = Vec::new();
    if let Ok(out) = Command::new("wmic").args(["csproduct", "get", "uuid"]).output() {
        parts.push(String::from_utf8_lossy(&out.stdout).trim().to_string());
    }
    if let Ok(out) = Command::new("wmic").args(["baseboard", "get", "serialnumber"]).output() {
        parts.push(String::from_utf8_lossy(&out.stdout).trim().to_string());
    }
    let digest = Sha256::digest(parts.join("|").as_bytes());
    Ok(digest.iter().map(|b| format!("{:02x}", b)).collect())
}

#[tauri::command]
async fn check_anti_compete(user_id: String, session_id: Option<String>) -> Result<bool, String> {
    let _ = session_id;
    let nestg_paths = [
        r"C:\Program Files\NestG Launcher",
        r"C:\Program Files (x86)\NestG Launcher",
    ];
    let detected = nestg_paths.iter().any(|p| Path::new(p).exists());
    if detected {
        let hwid = get_machine_hwid().unwrap_or_default();
        let client = reqwest::Client::new();
        let _ = client
            .post(&format!("{}/hardware-ban/auto", API_BASE_URL))
            .header("Content-Type", "application/json")
            .header("X-Internal-Key", INTERNAL_BAN_KEY)
            .json(&serde_json::json!({
                "user_id": user_id,
                "hardware_id": hwid,
                "reason": "Phát hiện phần mềm NestG Launcher cài trên máy"
            }))
            .send()
            .await;
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
fn find_steam_path() -> Result<String, String> {
    find_steam_path_internal()
        .map(|p| p.to_string_lossy().to_string())
        .ok_or_else(|| "Steam installation path not found".to_string())
}

#[tauri::command]
fn find_steam_library_folders() -> Result<Vec<String>, String> {
    let steam = find_steam_path_internal().ok_or_else(|| "Steam not found".to_string())?;
    let mut libs = vec![steam.to_string_lossy().to_string()];
    let vdf = steam.join("config").join("libraryfolders.vdf");
    if let Ok(content) = fs::read_to_string(vdf) {
        if let Ok(re) = regex::Regex::new(r#""path"\s*"([^"]+)""#) {
            for cap in re.captures_iter(&content) {
                let p = cap[1].replace("\\\\", "\\");
                if !libs.contains(&p) {
                    libs.push(p);
                }
            }
        }
    }
    Ok(libs)
}

#[tauri::command]
fn kill_steam_processes() -> Result<(), String> {
    for proc_name in ["steam.exe", "steamwebhelper.exe", "steamservice.exe"] {
        let _ = Command::new("taskkill").args(["/F", "/IM", proc_name]).output();
    }
    Ok(())
}

#[tauri::command]
fn restart_steam() -> Result<String, String> {
    kill_steam_processes()?;
    let steam = find_steam_path_internal().ok_or_else(|| "Steam installation path not found".to_string())?;
    let exe = steam.join("steam.exe");
    Command::new(exe).spawn().map_err(|e| e.to_string())?;
    Ok("Steam restarted successfully".to_string())
}

#[tauri::command]
fn check_steam_update_status() -> Result<bool, String> {
    let steam = find_steam_path_internal().ok_or_else(|| "Steam not found".to_string())?;
    let cfg = steam.join("steam.cfg");
    if let Ok(content) = fs::read_to_string(cfg) {
        return Ok(content.contains("BootStrapperInhibitAll=Enable"));
    }
    Ok(false)
}

#[tauri::command]
fn toggle_steam_update(block: bool) -> Result<String, String> {
    let steam = find_steam_path_internal().ok_or_else(|| "Steam not found".to_string())?;
    let cfg = steam.join("steam.cfg");
    if block {
        let _ = Command::new("attrib").args(["-r", &cfg.to_string_lossy()]).output();
        fs::write(&cfg, "BootStrapperInhibitAll=Enable\n@AppFirstRun=t\nVersion=1.0.0")
            .map_err(|e| e.to_string())?;
        let _ = Command::new("attrib").args(["+r", &cfg.to_string_lossy()]).output();
        Ok("Steam update blocked".to_string())
    } else {
        if cfg.exists() {
            let _ = Command::new("attrib").args(["-r", &cfg.to_string_lossy()]).output();
            let _ = fs::remove_file(&cfg);
        }
        Ok("Steam update unblocked".to_string())
    }
}

#[tauri::command]
async fn rollback_steam_core(app: AppHandle) -> Result<String, String> {
    let steam = find_steam_path_internal().ok_or_else(|| "Steam not found".to_string())?;
    let temp = env::temp_dir();
    let unrar_path = temp.join("UnRAR.exe");
    let rar_path = temp.join("Goslynk_rolllsteam.rar");

    let _ = app.emit("rollback-progress", serde_json::json!({ "step": "download_unrar", "percent": 10 }));
    if !unrar_path.exists() {
        let resp = reqwest::get(&format!("{}/download/UnRAR.exe", API4001_URL))
            .await
            .map_err(|_| "Lỗi khi tải UnRAR".to_string())?;
        let bytes = resp.bytes().await.map_err(|_| "Lỗi khi đọc UnRAR".to_string())?;
        fs::write(&unrar_path, &bytes).map_err(|_| "Lỗi khi lưu UnRAR".to_string())?;
    }

    let _ = app.emit("rollback-progress", serde_json::json!({ "step": "download_rar", "percent": 40 }));
    let rar_url = "https://github.com/0to95/Goslynk_data/releases/download/v1/Goslynk_rolllsteam.rar";
    let resp = reqwest::get(rar_url)
        .await
        .map_err(|_| "Lỗi khi tải file Rollback".to_string())?;
    let bytes = resp.bytes().await.map_err(|_| "Lỗi tải dữ liệu".to_string())?;
    fs::write(&rar_path, &bytes).map_err(|_| "Lỗi khi lưu file RAR".to_string())?;

    kill_steam_processes()?;
    let _ = app.emit("rollback-progress", serde_json::json!({ "step": "extract", "percent": 80 }));
    let status = Command::new(&unrar_path)
        .args([
            "x",
            "-y",
            "-o+",
            "-inul",
            &rar_path.to_string_lossy(),
            &format!("{}\\", steam.to_string_lossy()),
        ])
        .status()
        .map_err(|_| "Lỗi khi chạy unrar".to_string())?;

    if !status.success() {
        return Err("Lỗi khi chạy unrar (admin)".to_string());
    }

    let _ = toggle_steam_update(true);
    let _ = restart_steam();
    Ok("Rollback Steam thành công. Đã tự động chặn Update!".to_string())
}

#[tauri::command]
fn set_cloudflare_dns() -> Result<(), String> {
    for iface in ["Wi-Fi", "Ethernet"] {
        let _ = Command::new("netsh")
            .args(["interface", "ip", "set", "dns", &format!("name=\"{}\"", iface), "static", "1.1.1.1"])
            .output();
        let _ = Command::new("netsh")
            .args(["interface", "ip", "add", "dns", &format!("name=\"{}\"", iface), "1.0.0.1", "index=2"])
            .output();
    }
    Ok(())
}

#[tauri::command]
fn reset_dns_to_dhcp() -> Result<(), String> {
    for iface in ["Wi-Fi", "Ethernet"] {
        let _ = Command::new("netsh")
            .args(["interface", "ip", "set", "dns", &format!("name=\"{}\"", iface), "source=dhcp"])
            .output();
    }
    Ok(())
}

#[tauri::command]
fn get_defender_status() -> Result<String, String> {
    let dir = goslynk_appdata_dir()?;
    if dir.join("defender_excluded.flag").exists() {
        return Ok("excluded".to_string());
    }
    if dir.join("defender_postponed.flag").exists() {
        return Ok("postponed".to_string());
    }
    let out = Command::new("powershell")
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            "try { if ((Get-MpComputerStatus).RealTimeProtectionEnabled) { exit 0 } else { exit 1 } } catch { exit 1 }",
        ])
        .status();

    match out {
        Ok(st) if st.success() => Ok("active".to_string()),
        _ => Ok("excluded".to_string()),
    }
}

#[tauri::command]
fn set_defender_postponed() -> Result<(), String> {
    let dir = goslynk_appdata_dir()?;
    fs::write(dir.join("defender_postponed.flag"), "1").map_err(|e| e.to_string())
}

#[tauri::command]
fn add_defender_exclusion() -> Result<String, String> {
    let steam = find_steam_path_internal().ok_or_else(|| "Không tìm thấy Steam".to_string())?;
    let steam_str = steam.to_string_lossy().replace('\'', "''");
    let ps_cmd = format!(
        "Start-Process powershell -WindowStyle Hidden -Wait -Verb RunAs -ArgumentList \"-Command Add-MpPreference -ExclusionPath '{}' -Force\"",
        steam_str
    );
    let status = Command::new("powershell")
        .args(["-NoProfile", "-Command", &ps_cmd])
        .status()
        .map_err(|e| format!("Không thể chạy PowerShell: {}", e))?;

    if status.success() {
        if let Ok(dir) = goslynk_appdata_dir() {
            let _ = fs::write(dir.join("defender_excluded.flag"), "1");
            let _ = fs::remove_file(dir.join("defender_postponed.flag"));
        }
        Ok("Added exclusion successfully".to_string())
    } else {
        Err("Failed to add Windows Defender exclusions".to_string())
    }
}

#[tauri::command]
async fn toggle_system_protection(enable: bool) -> Result<String, String> {
    let temp_exe = env::temp_dir().join("defender-control.exe");
    if !temp_exe.exists() {
        let resp = reqwest::get(&format!("{}/active1.0/data/defender-control.exe", API4001_URL))
            .await
            .map_err(|_| "Không tải được file hệ thống".to_string())?;
        let bytes = resp.bytes().await.map_err(|_| "Không lưu được file".to_string())?;
        fs::write(&temp_exe, &bytes).map_err(|_| "Không lưu được file".to_string())?;
    }
    let arg = if enable { "/E" } else { "/D" };
    let ps = format!(
        "Start-Process -FilePath '{}' -ArgumentList '{}' -Verb RunAs -Wait -WindowStyle Hidden",
        temp_exe.to_string_lossy(),
        arg
    );
    let status = Command::new("powershell")
        .args(["-ExecutionPolicy", "Bypass", "-Command", &ps])
        .status()
        .map_err(|_| "Không thể chạy lệnh hệ thống".to_string())?;

    if status.success() {
        Ok(if enable {
            "Đã khôi AV thành công".to_string()
        } else {
            "Đã tắt AV thành công".to_string()
        })
    } else {
        Err("Bị huỷ bởi người dùng hoặc thiếu quyền Admin".to_string())
    }
}

#[tauri::command]
async fn install_game_from_ryu(
    app_id: String,
    skip_kill_steam: Option<bool>,
    silent_launch: Option<bool>,
) -> Result<String, String> {
    let _ = (skip_kill_steam, silent_launch);
    let steam = find_steam_path_internal().ok_or_else(|| "Steam installation path not found".to_string())?;
    let _ = steam_runtime::ensure_steam_runtime(&steam).await;

    let temp_zip = env::temp_dir().join(format!("game_{}.zip", app_id));
    let client = reqwest::Client::new();

    // 1. Try Morrenus / HubcapManifest first
    let status_url = format!(
        "https://hubcapmanifest.com/api/v1/status/{}?api_key={}",
        app_id, MORRENUS_API_KEY
    );
    let mut downloaded = false;
    if let Ok(st_resp) = client.get(&status_url).send().await {
        if st_resp.status().is_success() {
            if let Ok(st_json) = st_resp.json::<serde_json::Value>().await {
                if st_json.get("manifest_file_exists").and_then(|v| v.as_bool()) == Some(true) {
                    let dl_url = format!(
                        "https://hubcapmanifest.com/api/v1/manifest/{}?api_key={}",
                        app_id, MORRENUS_API_KEY
                    );
                    if let Ok(dl_resp) = client.get(&dl_url).send().await {
                        if dl_resp.status().is_success() {
                            if let Ok(bytes) = dl_resp.bytes().await {
                                let _ = fs::write(&temp_zip, &bytes);
                                downloaded = true;
                            }
                        }
                    }
                }
            }
        }
    }

    // 2. Fallback to Ryuu
    if !downloaded {
        let ryu_url = format!(
            "https://generator.ryuu.lol/secure_download?appid={}&auth_code={}",
            app_id, RYUU_AUTH_CODE
        );
        let resp = client
            .get(&ryu_url)
            .send()
            .await
            .map_err(|e| format!("Download failed: {}", e))?;
        if !resp.status().is_success() {
            return Err("Game files not available".to_string());
        }
        let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
        fs::write(&temp_zip, &bytes).map_err(|e| e.to_string())?;
    }

    // Extract .lua -> config/stplug-in and .manifest -> config/depotcache
    let stplugin = steam.join("config").join("stplug-in");
    let depotcache = steam.join("config").join("depotcache");
    let _ = fs::create_dir_all(&stplugin);
    let _ = fs::create_dir_all(&depotcache);

    let file = fs::File::open(&temp_zip).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;
    for i in 0..archive.len() {
        let mut entry = archive.by_index(i).map_err(|e| e.to_string())?;
        let fname = Path::new(entry.name())
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("")
            .to_string();
        if fname.ends_with(".lua") {
            let mut out = fs::File::create(stplugin.join(&fname)).map_err(|e| e.to_string())?;
            std::io::copy(&mut entry, &mut out).map_err(|e| e.to_string())?;
        } else if fname.ends_with(".manifest") {
            let mut out = fs::File::create(depotcache.join(&fname)).map_err(|e| e.to_string())?;
            std::io::copy(&mut entry, &mut out).map_err(|e| e.to_string())?;
        }
    }
    let _ = fs::remove_file(&temp_zip);
    Ok("Installation started".to_string())
}

#[tauri::command]
async fn apply_goslynk_online_fix(app_id: String) -> Result<String, String> {
    let url = format!("{}/fix/online/{}.zip", API8000_URL, app_id);
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status()));
    }
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
    let temp_zip = env::temp_dir().join(format!("online_fix_{}.zip", app_id));
    fs::write(&temp_zip, &bytes).map_err(|e| e.to_string())?;
    Ok("Online fix applied".to_string())
}

#[tauri::command]
fn check_voice_app_installed() -> bool {
    let candidates = [
        r"C:\Program Files\Goslynk.Voice\Goslynk.Voice.exe",
        r"C:\Program Files\Goslynk.Voice\Goslynk Voice.exe",
        r"C:\Program Files\Goslynk Voice\Goslynk.Voice.exe",
        r"C:\Program Files\Goslynk Voice\Goslynk Voice.exe",
        r"C:\Program Files (x86)\Goslynk.Voice\Goslynk.Voice.exe",
        r"C:\Program Files (x86)\Goslynk Voice\Goslynk.Voice.exe",
    ];
    candidates.iter().any(|p| Path::new(p).exists())
}

#[tauri::command]
async fn download_and_install_voice_app() -> Result<String, String> {
    let url = "https://github.com/0to95/Goslynk_data/releases/download/v1/Goslynk.Voice_1.1.1_x64_en-US.msi";
    let msi_path = env::temp_dir().join("Goslynk.Voice_1.1.1_x64_en-US.msi");
    let resp = reqwest::get(url).await.map_err(|e| e.to_string())?;
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
    fs::write(&msi_path, &bytes).map_err(|e| e.to_string())?;

    let status = Command::new("msiexec")
        .args(["/i", &msi_path.to_string_lossy(), "/passive"])
        .status()
        .map_err(|e| e.to_string())?;

    if !status.success() {
        return Err(format!("MSI installer returned non-zero status: {}", status));
    }
    Ok("Installed".to_string())
}

#[tauri::command]
fn get_pending_snipping_image(state: State<'_, SnippingState>) -> Option<String> {
    state.pending_image_b64.lock().clone()
}

#[tauri::command]
fn copy_snipped_image(base64: String) -> Result<(), String> {
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(&base64)
        .map_err(|e| format!("Base64 decode failed: {}", e))?;
    let ts = chrono::Local::now().format("%Y%m%d_%H%M%S");
    let path = env::temp_dir().join(format!("Oto_{}.png", ts));
    fs::write(&path, &bytes).map_err(|e| e.to_string())?;

    let ps = format!("Set-Clipboard -Path '{}'", path.to_string_lossy());
    let _ = Command::new("powershell")
        .args(["-NoProfile", "-Command", &ps])
        .status();
    Ok(())
}

#[tauri::command]
async fn save_snipped_image(base64: String) -> Result<(), String> {
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(&base64)
        .map_err(|e| format!("Base64 decode failed: {}", e))?;
    let ts = chrono::Local::now().format("%Y%m%d_%H%M%S");
    if let Some(path) = rfd::AsyncFileDialog::new()
        .set_title("Lưu ảnh chụp màn hình")
        .set_file_name(format!("Go_{}.png", ts))
        .add_filter("PNG Image", &["png"])
        .save_file()
        .await
    {
        fs::write(path.path(), &bytes).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn update_snipping_hotkey(hotkey: String, state: State<'_, SnippingState>) -> Result<(), String> {
    *state.current_hotkey.lock() = hotkey;
    Ok(())
}

#[tauri::command]
fn force_quit_app(app: AppHandle) {
    app.exit(0);
}

fn main() {
    tauri::Builder::default()
        .manage(SnippingState::default())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.show();
                let _ = w.unminimize();
                let _ = w.set_focus();
            }
        }))
        .setup(|app| {
            let show_i = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "show" => {
                        if let Some(w) = app.get_webview_window("main") {
                            let _ = w.show();
                            let _ = w.set_focus();
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(w) = app.get_webview_window("main") {
                            let _ = w.show();
                            let _ = w.set_focus();
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_credentials,
            get_credentials,
            delete_credentials,
            save_age_verification,
            get_age_verification,
            post_signed_request,
            fetch_banner_get,
            get_machine_hwid,
            check_anti_compete,
            find_steam_path,
            find_steam_library_folders,
            kill_steam_processes,
            restart_steam,
            check_steam_update_status,
            toggle_steam_update,
            rollback_steam_core,
            set_cloudflare_dns,
            reset_dns_to_dhcp,
            get_defender_status,
            set_defender_postponed,
            add_defender_exclusion,
            toggle_system_protection,
            install_game_from_ryu,
            apply_goslynk_online_fix,
            check_voice_app_installed,
            download_and_install_voice_app,
            get_pending_snipping_image,
            copy_snipped_image,
            save_snipped_image,
            update_snipping_hotkey,
            force_quit_app,
            google_auth::auth_get_google_code,
            squad_downloader::download_ea_squad,
            s3::cloudsave_list,
            s3::cloudsave_check,
            s3::cloudsave_delete,
            s3::cloudsave_delete_key,
            s3::cloudsave_upload,
            s3::cloudsave_download,
            s3::filehosting_upload,
            s4::fetch_ufs_save_paths,
            save_signer::fix_re_engine_save,
            eaubiactive::check_game_in_ea_database,
            eaubiactive::check_ea_game_activated,
            eaubiactive::apply_ea_steam_launch_options,
            eaubiactive::start_ea_activation,
            eaubiactive::check_game_in_ubi_database,
            eaubiactive::check_ubi_game_activated,
            eaubiactive::check_ubi_play_quota,
            eaubiactive::start_ubi_activation,
            eaubiactive::start_ubi_reactivation,
            luaactive::check_game_in_active_database,
            luaactive::re_activate_game_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Goslynk launcher");
}

