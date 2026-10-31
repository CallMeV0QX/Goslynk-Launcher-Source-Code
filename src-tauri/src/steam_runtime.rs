use std::fs;
use std::path::{Path, PathBuf};

const RUNTIME_API_BASE: &str = "https://api8000.goslynk.online";
const DLL_CONFIG_API: &str = "https://api.goslynk.online/api/config/dll";

pub async fn get_dynamic_dll_name() -> String {
    let client = reqwest::Client::new();
    match client.get(DLL_CONFIG_API).send().await {
        Ok(resp) if resp.status().is_success() => {
            if let Ok(json) = resp.json::<serde_json::Value>().await {
                if let Some(name) = json.get("dll_name").and_then(|v| v.as_str()) {
                    println!("[DOWNLOAD] Got DLL name from API: {}", name);
                    return name.to_string();
                }
            }
            "steam.dll".to_string()
        }
        Ok(resp) => {
            println!(
                "[DOWNLOAD] Failed to get DLL config from API: HTTP {}, using default",
                resp.status()
            );
            "steam.dll".to_string()
        }
        Err(e) => {
            println!("[DOWNLOAD] Failed to get DLL config from API: {}, using default", e);
            "steam.dll".to_string()
        }
    }
}

pub async fn download_dll_if_missing(url: &str, dest: &Path) -> Result<(), String> {
    if dest.exists() {
        println!("[DOWNLOAD] {:?} already exists at {:?}", dest.file_name(), dest);
        return Ok(());
    }
    if let Some(parent) = dest.parent() {
        fs::create_dir_all(parent).map_err(|_| "Failed to create DLL parent directory".to_string())?;
    }
    println!("[DOWNLOAD] Downloading {}...", url);
    let resp = reqwest::get(url)
        .await
        .map_err(|_| "Setup lỗi, xem lại đường truyền mạng và vpn".to_string())?;
    if !resp.status().is_success() {
        return Err(format!("Download failed with status: {}", resp.status()));
    }
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
    fs::write(dest, &bytes).map_err(|e| format!("Failed to write file: {}", e))?;
    println!("[DOWNLOAD] Downloaded {:?} successfully", dest.file_name());
    Ok(())
}

pub async fn refresh_goslynk_dll(steam_path: &Path) -> Result<(), String> {
    let target = steam_path.join("goslynk.dll");
    let staging = steam_path.join("goslynk.dll.new");
    let url = format!("{}/goslynk.dll", RUNTIME_API_BASE);

    println!("[DOWNLOAD] Refreshing goslynk.dll from server -> {:?}", target);
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status()));
    }
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;

    if target.exists() {
        if let Ok(meta) = fs::metadata(&target) {
            if meta.len() == bytes.len() as u64 {
                println!("[DOWNLOAD] goslynk.dll already up-to-date ({} bytes)", bytes.len());
                return Ok(());
            }
        }
    }

    match fs::write(&target, &bytes) {
        Ok(_) => {
            println!("[DOWNLOAD] goslynk.dll updated from staging ({} bytes)", bytes.len());
            let _ = fs::remove_file(&staging);
        }
        Err(e) => {
            let _ = fs::write(&staging, &bytes);
            println!("[DOWNLOAD] goslynk.dll locked, keep staging for next start: {}", e);
        }
    }
    Ok(())
}

pub async fn ensure_steam_runtime(steam_path: &Path) -> Result<String, String> {
    if !steam_path.exists() {
        return Err("Steam installation path not found (invalid or not detected)".to_string());
    }

    let stplugin = steam_path.join("config").join("stplug-in");
    let depotcache = steam_path.join("config").join("depotcache");
    fs::create_dir_all(&stplugin).map_err(|_| "Failed to create stplug-in directory".to_string())?;
    fs::create_dir_all(&depotcache).map_err(|_| "Failed to create depotcache directory".to_string())?;

    download_dll_if_missing(
        &format!("{}/xinput1_4.dll", RUNTIME_API_BASE),
        &steam_path.join("xinput1_4.dll"),
    )
    .await?;

    download_dll_if_missing(
        &format!("{}/dwmapi.dll", RUNTIME_API_BASE),
        &steam_path.join("dwmapi.dll"),
    )
    .await?;

    download_dll_if_missing(
        &format!("{}/goslynkfix.dll", RUNTIME_API_BASE),
        &steam_path.join("goslynkfix.dll"),
    )
    .await?;

    let _ = refresh_goslynk_dll(steam_path).await;

    let dll_name = get_dynamic_dll_name().await;
    let dyn_target = steam_path.join(&dll_name);
    if !dyn_target.exists() {
        let temp_dll = steam_path.join("steam_temp.dll");
        println!("[DOWNLOAD] Downloading steam.dll to rename as {}...", dll_name);
        download_dll_if_missing(&format!("{}/steam.dll", RUNTIME_API_BASE), &temp_dll).await?;
        fs::rename(&temp_dll, &dyn_target).map_err(|_| "Failed to rename steam.dll".to_string())?;
    }

    Ok(format!(
        "Steam: {:?} | xinput1_4.dll OK | goslynk.dll OK | goslynkfix.dll OK | dynamic steam DLL OK",
        PathBuf::from(steam_path)
    ))
}

