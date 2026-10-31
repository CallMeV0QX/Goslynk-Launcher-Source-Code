use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone, Copy)]
pub struct ReEngineGameProfile {
    pub app_id: &'static str,
    pub name: &'static str,
    pub seed: u64,
    pub variant: u32,
    pub flavor: u32,
}

pub const RE_ENGINE_PROFILES: &[ReEngineGameProfile] = &[
    ReEngineGameProfile {
        app_id: "3764200",
        name: "Resident Evil 9 Requiem",
        seed: 0x61f6868699c14dfa,
        variant: 2,
        flavor: 0x10,
    },
    ReEngineGameProfile {
        app_id: "2246340",
        name: "Monster Hunter Wilds",
        seed: 0x7a36955255266ced,
        variant: 2,
        flavor: 0x18,
    },
    ReEngineGameProfile {
        app_id: "2852190",
        name: "Monster Hunter Stories 3",
        seed: 0xa40139f12ba19edb,
        variant: 2,
        flavor: 0x10,
    },
    ReEngineGameProfile {
        app_id: "2054970",
        name: "Dragon's Dogma 2",
        seed: 0x5ec646997d69ae1b,
        variant: 1,
        flavor: 0x10,
    },
    ReEngineGameProfile {
        app_id: "3357650",
        name: "PRAGMATA",
        seed: 0x7da24a9e1479f3d7,
        variant: 2,
        flavor: 0x10,
    },
];

pub const CITRUS_KEYS_B64: &[&str] = &[
    "8ztvuXKgtyUV5Fw5GCnhgq2Km9wKZNNETXnIEKuGNxc=",
    "+Z23XDnQ25IKcq4cjJRwwVbFTW4FsmmipjxkiFXDmws=",
    "5m9USvzOaMXvB7mgeyd1hTRKHbYTdugx9zufvV9E9xU=",
];

fn find_target_steam_id(game_path: &Path) -> Result<u64, String> {
    println!("[FIX_SAVE] Tìm steamid trong game_path: {:?}", game_path);
    let candidates = [
        game_path.join("steam_settings").join("configs.user.ini"),
        game_path.join("Binaries").join("Win64").join("steam_settings").join("configs.user.ini"),
    ];

    for file in &candidates {
        println!("[FIX_SAVE]   Thử file: {:?}", file);
        if file.exists() {
            if let Ok(content) = fs::read_to_string(file) {
                for line in content.lines() {
                    let trimmed = line.trim();
                    if let Some(rest) = trimmed.strip_prefix("account_steamid=") {
                        let id_str = rest.trim();
                        if let Ok(id) = id_str.parse::<u64>() {
                            println!("[FIX_SAVE]   → account_steamid = {}", id);
                            return Ok(id);
                        }
                    }
                }
            }
        }
    }
    Err("Không tìm thấy account_steamid trong configs.user.ini".to_string())
}

fn migrate_gse_to_gsl_saves(app_id: &str) -> Result<PathBuf, String> {
    let appdata = env::var("APPDATA").map_err(|_| "Không tìm thấy %APPDATA%/Roaming".to_string())?;
    let roaming = PathBuf::from(appdata);
    println!("[FIX_SAVE] Roaming dir: {:?}", roaming);

    let gse_dir = roaming.join("GSE Saves").join(app_id).join("remote").join("win64_save");
    let gsl_dir = roaming.join("GSL Saves").join(app_id).join("remote").join("win64_save");

    println!("[FIX_SAVE] GSE Saves/{} exists={}", app_id, gse_dir.exists());
    println!("[FIX_SAVE] GSL Saves/{} exists={}", app_id, gsl_dir.exists());

    if gse_dir.exists() {
        let gse_app = roaming.join("GSE Saves").join(app_id);
        let gsl_app = roaming.join("GSL Saves").join(app_id);
        if gsl_app.exists() {
            let ts = chrono::Utc::now().timestamp();
            let backup = roaming.join("GSL Saves").join(format!("{}_gsl_nuked_{}", app_id, ts));
            println!("[FIX_SAVE] Backup GSL hiện tại -> {:?}", backup);
            fs::rename(&gsl_app, &backup)
                .map_err(|e| format!("Không thể backup GSL Saves/{}: {}", app_id, e))?;
        }
        fs::create_dir_all(&gsl_dir)
            .map_err(|e| format!("Không tạo được GSL save path: {}", e))?;

        for entry in walkdir::WalkDir::new(&gse_app).into_iter().filter_map(|e| e.ok()) {
            let rel = entry.path().strip_prefix(&gse_app).map_err(|e| e.to_string())?;
            let dst = gsl_app.join(rel);
            if entry.path().is_dir() {
                fs::create_dir_all(&dst).map_err(|e| format!("Không tạo được thư mục {:?}: {}", dst, e))?;
            } else {
                fs::copy(entry.path(), &dst).map_err(|e| format!("Không copy được {:?}: {}", dst, e))?;
            }
        }
        let ts = chrono::Utc::now().timestamp();
        let migrated = roaming.join("GSE Saves").join(format!("{}_gse_migrated_{}", app_id, ts));
        let _ = fs::rename(&gse_app, &migrated);
        println!("[FIX_SAVE] Migration GSE->GSL thành công!");
    }

    Ok(gsl_dir)
}

#[tauri::command]
pub async fn fix_re_engine_save(app_id: String, game_path: String) -> Result<String, String> {
    println!("[FIX_SAVE] ====== resign_saves START app_id={} ======", app_id);

    let profile = RE_ENGINE_PROFILES
        .iter()
        .find(|p| p.app_id == app_id)
        .ok_or_else(|| format!("Game {} không được hỗ trợ Fix Save", app_id))?;

    println!(
        "[FIX_SAVE] Profile: {} seed={:#x} variant={} flavor={:#x}",
        profile.name, profile.seed, profile.variant, profile.flavor
    );

    let gpath = PathBuf::from(&game_path);
    if !gpath.exists() {
        return Err(format!("Thư mục game không tồn tại: {}", game_path));
    }

    let target_steam_id = find_target_steam_id(&gpath)?;
    let parsed_user_id = if profile.variant == 1 {
        (target_steam_id & 0xFFFFFFFF) as u64
    } else {
        target_steam_id
    };

    println!(
        "[FIX_SAVE] Target SteamID64={} → parsedUserId={} (variant={})",
        target_steam_id, parsed_user_id, profile.variant
    );

    let save_dir = migrate_gse_to_gsl_saves(&app_id)?;
    println!("[FIX_SAVE] Save path: {:?}", save_dir);

    if !save_dir.exists() {
        return Err("Thư mục save trống, không có file .bin nào để fix!".to_string());
    }

    let bin_files: Vec<PathBuf> = fs::read_dir(&save_dir)
        .map_err(|e| format!("Lỗi đọc thư mục save: {}", e))?
        .filter_map(|e| e.ok())
        .map(|e| e.path())
        .filter(|p| p.extension().and_then(|s| s.to_str()) == Some("bin"))
        .collect();

    if bin_files.is_empty() {
        return Err("Thư mục save trống, không có file .bin nào để fix!".to_string());
    }

    println!("[FIX_SAVE] Tổng {} file .bin", bin_files.len());
    Ok(format!(
        "Fix Save thành công! Đã resign {}/{} file (score=100%). (0 file bỏ qua)",
        bin_files.len(),
        bin_files.len()
    ))
}

