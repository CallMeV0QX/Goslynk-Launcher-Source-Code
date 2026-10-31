use std::env;
use std::fs;
use std::path::PathBuf;

struct SquadGameConfig {
    app_id: &'static str,
    game_folder: &'static str,
    base_url: &'static str,
    roster_xml_url: &'static str,
}

const SQUAD_CONFIGS: &[SquadGameConfig] = &[
    SquadGameConfig {
        app_id: "1313860",
        game_folder: "FIFA 21",
        base_url: "https://fifa21.content.easports.com/fifa/fltOnlineAssets/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/",
        roster_xml_url: "https://fifa21.content.easports.com/fifa/fltOnlineAssets/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fifa/fifalive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "1506830",
        game_folder: "FIFA 22",
        base_url: "https://fifa22.content.easports.com/fifa/fltOnlineAssets/22747632-e3df-4904-b3f6-bb0035736505/2022/",
        roster_xml_url: "https://fifa22.content.easports.com/fifa/fltOnlineAssets/22747632-e3df-4904-b3f6-bb0035736505/2022/fifa/fifalive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "1811260",
        game_folder: "FIFA 23",
        base_url: "https://fifa23.content.easports.com/fifa/fltOnlineAssets/23DF3AC5-9539-438B-8414-146FAFDE3FF2/2023/",
        roster_xml_url: "https://fifa23.content.easports.com/fifa/fltOnlineAssets/23DF3AC5-9539-438B-8414-146FAFDE3FF2/2023/fifa/fifalive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "2195250",
        game_folder: "EA SPORTS FC 24",
        base_url: "https://eafc24.content.easports.com/fc/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/",
        roster_xml_url: "https://eafc24.content.easports.com/fc/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fc/fclive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "2669320",
        game_folder: "EA SPORTS FC 25",
        base_url: "https://eafc25.content.easports.com/fc/fltOnlineAssets/25E4CDAE-799B-45BE-B257-667FDCDE8044/2025/",
        roster_xml_url: "https://eafc25.content.easports.com/fc/fltOnlineAssets/25E4CDAE-799B-45BE-B257-667FDCDE8044/2025/fc/fclive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "3405690",
        game_folder: "EA SPORTS FC 26",
        base_url: "https://eafc26.content.easports.com/fc/fltOnlineAssets/26E4D4D6-8DBB-4A9A-BD99-9C47D3AA341D/2026/",
        roster_xml_url: "https://eafc26.content.easports.com/fc/fltOnlineAssets/26E4D4D6-8DBB-4A9A-BD99-9C47D3AA341D/2026/fc/fclive/genxtitle/rosterupdate.xml",
    },
    SquadGameConfig {
        app_id: "4080220",
        game_folder: "EA SPORTS FC 27",
        base_url: "https://eafc27.content.easports.com/fc/fltOnlineAssets/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/",
        roster_xml_url: "https://eafc27.content.easports.com/fc/fltOnlineAssets/27A3C9F1-6B2E-4D7A-8C1F-2E9B5A4D6C7E/2027/fc/fclive/genxtitle/rosterupdate.xml",
    },
];

fn extract_pc64_db_major_loc(xml: &str) -> Option<String> {
    let pc64_pos = xml.find("platform=\"pc64\"")?;
    let rest = &xml[pc64_pos..];
    let end_squad = rest.find("</squadInfo>")?;
    let block = &rest[..end_squad];
    let start_tag = block.find("<dbMajorLoc>")? + "<dbMajorLoc>".len();
    let end_tag = block[start_tag..].find("</dbMajorLoc>")?;
    let loc = block[start_tag..start_tag + end_tag].trim().trim_start_matches('/');
    Some(loc.to_string())
}

#[tauri::command]
pub async fn download_ea_squad(app_id: String) -> Result<String, String> {
    let cfg = SQUAD_CONFIGS
        .iter()
        .find(|c| c.app_id == app_id)
        .ok_or_else(|| format!("AppID ({}) hiện chưa có URL cấu hình để tải Squad.", app_id))?;

    let client = reqwest::Client::new();
    let xml_resp = client
        .get(cfg.roster_xml_url)
        .send()
        .await
        .map_err(|e| format!("EA Server Error: {}", e))?;

    let xml_text = xml_resp
        .text()
        .await
        .map_err(|e| format!("EA XML Read Error: {}", e))?;

    let rel_loc = extract_pc64_db_major_loc(&xml_text).ok_or_else(|| {
        "Không thể phân tích file XML để lấy link update pc64.squads.bin".to_string()
    })?;

    let bin_url = format!("{}{}", cfg.base_url, rel_loc);
    let bin_resp = client
        .get(&bin_url)
        .send()
        .await
        .map_err(|e| format!("Lỗi tải file bin: {}", e))?;

    let bin_bytes = bin_resp
        .bytes()
        .await
        .map_err(|e| format!("Lỗi đọc file bin: {}", e))?;

    if bin_bytes.len() < 64 {
        return Err("File Update quá ngắn (lỗi lúc tải)".to_string());
    }

    let local_appdata = env::var("LOCALAPPDATA").map_err(|e| format!("Lỗi OS env: {}", e))?;
    let settings_dir = PathBuf::from(local_appdata)
        .join(cfg.game_folder)
        .join("settings");

    fs::create_dir_all(&settings_dir)
        .map_err(|e| format!("Lỗi tạo mục Game save (FC26 có cài đúng chỗ chưa?): {}", e))?;

    let squad_filename = "Squads20261101000000";
    let dest_path = settings_dir.join(squad_filename);

    fs::write(&dest_path, &bin_bytes).map_err(|e| format!("Lỗi ghi File save: {}", e))?;

    Ok(dest_path.to_string_lossy().to_string())
}

