use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Emitter};

const API4001_BASE: &str = "https://api4001.goslynk.online";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EaActivationProgress {
    pub step: String,
    pub percent: u32,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UbiPlayQuota {
    pub can_gen: bool,
    pub hours_until_reset: f64,
    pub paid_skip_cost: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UbiActivationProgress {
    pub step: String,
    pub percent: u32,
    pub message: String,
}

fn sha256_file_hex(path: &Path) -> Result<String, String> {
    let bytes = fs::read(path).map_err(|e| format!("Lỗi đọc file {:?}: {}", path, e))?;
    let hash = Sha256::digest(&bytes);
    Ok(hash.iter().map(|b| format!("{:02x}", b)).collect())
}

#[tauri::command]
pub async fn check_game_in_ea_database(app_id: String) -> Result<bool, String> {
    let url = format!("{}/list", API4001_BASE);
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    let json: serde_json::Value = resp.json().await.map_err(|e| e.to_string())?;
    let key = format!("ea:{}", app_id);
    if let Some(obj) = json.as_object() {
        return Ok(obj.contains_key(&key) || obj.values().any(|v| v.to_string().contains(&key)));
    }
    Ok(false)
}

#[tauri::command]
pub async fn check_ea_game_activated(app_id: String, game_dir: String) -> Result<bool, String> {
    let _ = app_id;
    let dir = PathBuf::from(&game_dir);
    if dir.join("ea_activated.flag").exists() {
        return Ok(true);
    }
    let cfg_path = dir.join("anadius.cfg");
    if let Ok(content) = fs::read_to_string(cfg_path) {
        if let Some(pos) = content.find("\"DenuvoToken\"") {
            let rest = &content[pos + "\"DenuvoToken\"".len()..];
            if rest.contains('"') {
                return Ok(true);
            }
        }
    }
    Ok(false)
}

#[tauri::command]
pub async fn apply_ea_steam_launch_options(
    app_id: String,
    game_dir: String,
    exe_name: Option<String>,
) -> Result<String, String> {
    println!(
        "[EA_VDF] apply_ea_steam_launch_options: app_id={} game_dir={} exe_name={:?}",
        app_id, game_dir, exe_name
    );
    let resolved_exe = exe_name.unwrap_or_else(|| "Launcher.exe".to_string());
    let full_exe = PathBuf::from(&game_dir).join(&resolved_exe);
    let launch_opt = format!("\\\"{}\\\" %command%", full_exe.to_string_lossy());
    Ok(launch_opt)
}

#[tauri::command]
pub async fn start_ea_activation(
    app: AppHandle,
    app_id: String,
    game_dir: String,
    username: Option<String>,
) -> Result<String, String> {
    let dir = PathBuf::from(&game_dir);
    let cfg_path = dir.join("anadius.cfg");
    let launcher_path = dir.join("Launcher.exe");
    let dbdata_path = dir.join("dbdata.dll");

    if !cfg_path.exists() || !launcher_path.exists() {
        return Err(
            "Vui lòng tải bypass patch từ mục 'Secondary Download' (chuột phải vào game) trước khi Play!"
                .to_string(),
        );
    }

    let _ = app.emit(
        "ea-activation-progress",
        EaActivationProgress {
            step: "ticket".to_string(),
            percent: 25,
            message: "Đang cập nhật mã kiểm tra (Hash)...".to_string(),
        },
    );

    // Update DenuvoDllHash in anadius.cfg if dbdata.dll exists
    if dbdata_path.exists() {
        if let (Ok(mut cfg), Ok(dll_hash)) = (fs::read_to_string(&cfg_path), sha256_file_hex(&dbdata_path)) {
            if let Ok(re) = regex::Regex::new(r#""DenuvoDllHash"\s+"[^"]*""#) {
                cfg = re
                    .replace(&cfg, format!("\"DenuvoDllHash\"         \"{}\"", dll_hash))
                    .to_string();
                let _ = fs::write(&cfg_path, cfg);
            }
        }
    }

    let _ = app.emit(
        "ea-activation-progress",
        EaActivationProgress {
            step: "submit".to_string(),
            percent: 60,
            message: "Đang gửi Ticket lên Server...".to_string(),
        },
    );

    let user = username
        .or_else(|| env::var("USERNAME").ok())
        .unwrap_or_else(|| "DefaultUser".to_string());

    let client = reqwest::Client::new();
    let gen_url = format!("{}/ea/gen", API4001_BASE);
    let resp = client
        .post(&gen_url)
        .json(&serde_json::json!({
            "app_id": app_id,
            "user": user,
        }))
        .send()
        .await
        .map_err(|e| format!("Lỗi kết nối Server: {}", e))?;

    if !resp.status().is_success() {
        let err_text = resp.text().await.unwrap_or_default();
        return Err(format!("Server trả về lỗi: {}", err_text));
    }

    let token_text = resp
        .text()
        .await
        .map_err(|_| "Lỗi đọc Token từ Server".to_string())?;

    if token_text.trim().is_empty() {
        return Err("Token tải về bị rỗng".to_string());
    }

    let _ = app.emit(
        "ea-activation-progress",
        EaActivationProgress {
            step: "inject".to_string(),
            percent: 85,
            message: "Đang active...".to_string(),
        },
    );

    let _ = fs::write(dir.join("ea_token.txt"), &token_text);
    let _ = fs::write(dir.join("ea_activated.flag"), "1");

    let _ = app.emit(
        "ea-activation-progress",
        EaActivationProgress {
            step: "done".to_string(),
            percent: 100,
            message: "Activation done! Launching game...".to_string(),
        },
    );

    Ok("launched".to_string())
}

#[tauri::command]
pub async fn check_game_in_ubi_database(app_id: String) -> Result<bool, String> {
    let url = format!("{}/list", API4001_BASE);
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    let json: serde_json::Value = resp.json().await.map_err(|e| e.to_string())?;
    let key = format!("ubi:{}", app_id);
    if let Some(obj) = json.as_object() {
        return Ok(obj.contains_key(&key) || obj.values().any(|v| v.to_string().contains(&key)));
    }
    Ok(false)
}

#[tauri::command]
pub async fn check_ubi_game_activated(app_id: String, game_dir: String) -> Result<bool, String> {
    let _ = app_id;
    let dir = PathBuf::from(&game_dir);
    Ok(dir.join("token.ini").exists() && dir.join("dbdata.ini").exists())
}

#[tauri::command]
pub async fn check_ubi_play_quota(
    app_id: String,
    username: Option<String>,
) -> Result<UbiPlayQuota, String> {
    let user = username.unwrap_or_else(|| "DefaultUser".to_string());
    let url = format!(
        "{}/ubi/play/quota?user={}&steam_appid={}",
        API4001_BASE,
        urlencoding::encode(&user),
        urlencoding::encode(&app_id)
    );
    let resp = reqwest::get(&url)
        .await
        .map_err(|_| "Lỗi kết nối Server quota".to_string())?;
    let quota: UbiPlayQuota = resp.json().await.map_err(|_| "Lỗi đọc quota".to_string())?;
    Ok(quota)
}

#[tauri::command]
pub async fn start_ubi_activation(
    app: AppHandle,
    app_id: String,
    game_dir: String,
    game_name: Option<String>,
    username: Option<String>,
) -> Result<String, String> {
    run_ubi_activation(app, app_id, game_dir, game_name, username, false, false).await
}

#[tauri::command]
pub async fn start_ubi_reactivation(
    app: AppHandle,
    app_id: String,
    game_dir: String,
    game_name: Option<String>,
    paid_skip: Option<bool>,
    username: Option<String>,
) -> Result<String, String> {
    run_ubi_activation(
        app,
        app_id,
        game_dir,
        game_name,
        username,
        true,
        paid_skip.unwrap_or(false),
    )
    .await
}

async fn run_ubi_activation(
    app: AppHandle,
    app_id: String,
    game_dir: String,
    _game_name: Option<String>,
    username: Option<String>,
    is_reactivate: bool,
    paid_skip: bool,
) -> Result<String, String> {
    let dir = PathBuf::from(&game_dir);
    if !dir.join("dbdata.dll").exists() {
        return Err("Không tìm thấy dbdata.dll — vui lòng tải Secondary Download trước.".to_string());
    }

    let _ = app.emit(
        "ubi-activation-progress",
        UbiActivationProgress {
            step: "prepare".to_string(),
            percent: 20,
            message: if is_reactivate {
                "Đang dọn file cũ (Re-activate)...".to_string()
            } else {
                "Đang dọn ticket cũ...".to_string()
            },
        },
    );

    if is_reactivate {
        let _ = fs::remove_file(dir.join("token.ini"));
        let _ = fs::remove_file(dir.join("dbdata.ini"));
    }
    let _ = fs::remove_file(dir.join("token_req.txt"));
    let _ = fs::remove_file(dir.join("token_reg_idapp.txt"));

    let user = username.unwrap_or_else(|| "DefaultUser".to_string());
    let url = format!("{}/ubi/gen/play", API4001_BASE);
    let client = reqwest::Client::new();
    let resp = client
        .post(&url)
        .json(&serde_json::json!({
            "user": user,
            "steam_appid": app_id,
            "is_reactivate": is_reactivate,
            "paid_skip": paid_skip,
        }))
        .send()
        .await
        .map_err(|_| "Lỗi kết nối Server".to_string())?;

    if !resp.status().is_success() {
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("Server trả về lỗi: {}", text));
    }

    let body: serde_json::Value = resp
        .json()
        .await
        .map_err(|_| "Lỗi đọc response từ Server".to_string())?;

    let _ = app.emit(
        "ubi-activation-progress",
        UbiActivationProgress {
            step: "inject".to_string(),
            percent: 80,
            message: "Đang ghi token.ini + dbdata.ini...".to_string(),
        },
    );

    if let Some(tok_ini) = body.get("token_ini").and_then(|v| v.as_str()) {
        fs::write(dir.join("token.ini"), tok_ini).map_err(|_| "Lỗi ghi token.ini".to_string())?;
    }
    if let Some(db_ini) = body.get("dbdata_ini").and_then(|v| v.as_str()) {
        fs::write(dir.join("dbdata.ini"), db_ini).map_err(|_| "Lỗi ghi dbdata.ini".to_string())?;
    }

    Ok("launched".to_string())
}

