use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter};

const PRIMARY_GEN_SERVER: &str = "https://api4001.goslynk.online";
const FALLBACK_GEN_SERVER: &str = "http://161.248.239.223:4001";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActivationProgress {
    pub step: String,
    pub percent: u32,
    pub message: String,
}

fn active_flag_path(app_id: &str) -> Result<PathBuf, String> {
    let appdata = env::var("APPDATA").map_err(|_| "APPDATA not found".to_string())?;
    let dir = PathBuf::from(appdata).join("goslynk_launcher").join("active_flags");
    fs::create_dir_all(&dir).map_err(|_| "Failed to create active flag dir".to_string())?;
    Ok(dir.join(format!("{}.flag", app_id)))
}

pub fn parse_gen3_ini(content: &str) -> Result<(String, String), String> {
    let app_re = regex::Regex::new(r#"setappticket\(\s*(\d+)\s*,\s*"([a-f0-9]+)"\s*\)"#)
        .map_err(|e| e.to_string())?;
    let e_re = regex::Regex::new(r#"seteticket\(\s*(\d+)\s*,\s*"([a-f0-9]+)"\s*\)"#)
        .map_err(|e| e.to_string())?;

    let app_cap = app_re
        .captures(content)
        .ok_or_else(|| "Gen3 ini missing setappticket".to_string())?;
    let e_cap = e_re
        .captures(content)
        .ok_or_else(|| "Gen3 ini missing seteticket".to_string())?;

    let app_line = format!("setappticket({}, \"{}\")", &app_cap[1], &app_cap[2]);
    let e_line = format!("seteticket({}, \"{}\")", &e_cap[1], &e_cap[2]);
    Ok((app_line, e_line))
}

pub fn inject_tickets_into_lua(lua_path: &Path, app_ticket_line: &str, e_ticket_line: &str) -> Result<(), String> {
    let raw = fs::read_to_string(lua_path).map_err(|_| "Không đọc được file Lua".to_string())?;
    let filtered: Vec<&str> = raw
        .lines()
        .filter(|line| {
            let trimmed = line.trim();
            !trimmed.starts_with("setappticket(") && !trimmed.starts_with("seteticket(")
        })
        .collect();

    let mut new_content = filtered.join("\n");
    if !new_content.ends_with('\n') {
        new_content.push('\n');
    }
    new_content.push_str(&format!("{}\n\n{}\n", app_ticket_line, e_ticket_line));
    fs::write(lua_path, new_content).map_err(|_| "Không ghi được file Lua".to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn check_game_in_active_database(app_id: String) -> Result<bool, String> {
    println!("check_game_in_active_database appid={}", app_id);
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(8))
        .build()
        .map_err(|e| e.to_string())?;

    let url = format!("{}/list", PRIMARY_GEN_SERVER);
    let resp = match client.get(&url).send().await {
        Ok(r) => r,
        Err(_) => {
            println!("Primary server failed, trying fallback server...");
            client
                .get(&format!("{}/list", FALLBACK_GEN_SERVER))
                .send()
                .await
                .map_err(|_| "Failed to fetch active DB".to_string())?
        }
    };

    if !resp.status().is_success() {
        return Err(format!("Active DB server error: {}", resp.status()));
    }

    let json: serde_json::Value = resp
        .json()
        .await
        .map_err(|_| "Failed to parse active DB JSON".to_string())?;

    if let Some(v2) = json.get("2.0").and_then(|v| v.as_array()) {
        let hit = v2.iter().any(|x| {
            x.as_str() == Some(app_id.as_str()) || x.to_string().trim_matches('"') == app_id
        });
        return Ok(hit);
    }
    Ok(false)
}

pub async fn run_lua_active_flow(
    app: &AppHandle,
    steam_path: &Path,
    app_id: &str,
    game_name: &str,
    username: &str,
    force_refresh: bool,
) -> Result<String, String> {
    let t0 = Instant::now();
    let stplugin = steam_path.join("config").join("stplug-in");
    let lua_path = stplugin.join(format!("{}.lua", app_id));

    if !lua_path.exists() {
        return Err(format!(
            "Chưa có file Lua {} — vui lòng Install game trước",
            app_id
        ));
    }

    let flag_path = active_flag_path(app_id)?;
    if !force_refresh && flag_path.exists() {
        println!("active flag → skip gen appid={}", app_id);
        let _ = std::process::Command::new("cmd")
            .args(["/C", "start", "", &format!("steam://rungameid/{}", app_id)])
            .spawn();
        println!("done cached appid={} ms={}", app_id, t0.elapsed().as_millis());
        return Ok("LuaActive play (cached)".to_string());
    }

    if force_refresh && flag_path.exists() {
        let _ = fs::remove_file(&flag_path);
    }

    let client = reqwest::Client::new();
    let start_url = format!("{}/gen/start", PRIMARY_GEN_SERVER);
    let resp = client
        .post(&start_url)
        .json(&serde_json::json!({
            "user": username,
            "appid": app_id,
            "gen": 3,
            "game": game_name,
        }))
        .send()
        .await
        .map_err(|_| "Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền mạng.".to_string())?;

    if resp.status().as_u16() == 429 {
        return Err("Bạn thao tác quá nhiều, nghỉ tay làm ngụm trà 5 phút sau quay lại đi".to_string());
    }
    if !resp.status().is_success() {
        return Err("Máy chủ đang gặp sự cố hoặc bảo trì. Vui lòng quay lại sau.".to_string());
    }

    let body: serde_json::Value = resp
        .json()
        .await
        .map_err(|_| "Dữ liệu trả về bị lỗi (có thể do bị chặn bởi Antivirus/Mạng).".to_string())?;

    let job_id = body
        .get("jobId")
        .or_else(|| body.get("job_id"))
        .and_then(|v| v.as_str())
        .ok_or_else(|| "Máy chủ không phản hồi mã hợp lệ. Vui lòng thử lại.".to_string())?
        .to_string();

    for round in 1..=60 {
        tokio::time::sleep(Duration::from_secs(2)).await;
        let q_url = format!("{}/gen/queue-position/{}", PRIMARY_GEN_SERVER, job_id);
        if let Ok(q_resp) = client.get(&q_url).send().await {
            if let Ok(q_json) = q_resp.json::<serde_json::Value>().await {
                let ahead = q_json.get("ahead").and_then(|v| v.as_u64()).unwrap_or(0);
                let _ = app.emit(
                    "activation-progress",
                    ActivationProgress {
                        step: "queue".to_string(),
                        percent: std::cmp::min(90, round * 2),
                        message: format!("Đang chờ gen token (hàng đợi: {})", ahead),
                    },
                );
            }
        }

        // Check tokens2 list
        let list_url = format!("{}/tokens2/{}", PRIMARY_GEN_SERVER, urlencoding::encode(username));
        if let Ok(l_resp) = client.get(&list_url).send().await {
            if let Ok(l_json) = l_resp.json::<serde_json::Value>().await {
                if let Some(tokens) = l_json.get("tokens").and_then(|v| v.as_array()) {
                    if let Some(matching) = tokens.iter().find_map(|t| {
                        let s = t.as_str()?;
                        if s.contains(app_id) && s.ends_with(".ini") {
                            Some(s.to_string())
                        } else {
                            None
                        }
                    }) {
                        let dl_url = format!(
                            "{}/tokens2/{}/{}",
                            PRIMARY_GEN_SERVER,
                            urlencoding::encode(username),
                            urlencoding::encode(&matching)
                        );
                        let ini_resp = client
                            .get(&dl_url)
                            .send()
                            .await
                            .map_err(|_| "Không tải được dữ liệu xác thực, vui lòng thử lại".to_string())?;
                        let ini_text = ini_resp
                            .text()
                            .await
                            .map_err(|_| "Failed to read Gen3 ini body".to_string())?;

                        let (app_line, e_line) = parse_gen3_ini(&ini_text)?;
                        inject_tickets_into_lua(&lua_path, &app_line, &e_line)?;
                        let _ = fs::write(&flag_path, chrono::Utc::now().to_rfc3339());

                        let _ = std::process::Command::new("cmd")
                            .args(["/C", "start", "", &format!("steam://rungameid/{}", app_id)])
                            .spawn();
                        return Ok("LuaActive Gen3 successful".to_string());
                    }
                }
            }
        }
    }

    Err("Có vẻ token cho game này đã hết. Vui lòng liên hệ admin.".to_string())
}

#[tauri::command]
pub async fn re_activate_game_command(
    app: AppHandle,
    app_id: String,
    game_name: String,
    username: Option<String>,
) -> Result<String, String> {
    let steam_path = crate::find_steam_path_internal().ok_or_else(|| "Không tìm thấy Steam".to_string())?;
    let user = username.unwrap_or_else(|| "DefaultUser".to_string());
    run_lua_active_flow(&app, &steam_path, &app_id, &game_name, &user, true).await
}

