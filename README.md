# BÁO CÁO GIÁM ĐỊNH MÃ NGUỒN VÀ BẰNG CHỨNG HÀNH VI BẤT HỢP PHÁP
## Phần mềm: Goslynk Launcher (Phiên bản: 0.13.7 — `goslynk-launcher.exe`)

---

> [!WARNING]
> **TÀI LIỆU GIÁM ĐỊNH PHÁP Y MÃ NGUỒN (FORENSIC AUDIT REPORT)**  
> Báo cáo này tổng hợp toàn bộ các bằng chứng kỹ thuật thu thập trực tiếp từ việc giải mã và phân tích mã nguồn nhị phân của tệp thực thi `goslynk-launcher.exe` (SHA256, PE x64, kiến trúc **Tauri v2.11.2 + Rust + WebView2**).  

---

## MỤC LỤC BẰNG CHỨNG

1. [Theo dõi ngầm, thu thập thông tin phần cứng (HWID) và Tự động Khóa máy/Cấm người dùng trái phép (Spyware / Anti-Compete)](#1-theo-dõi-ngầm-thu-thập-hwid-và-tự-động-khóa-máy)
2. [Tấn công DLL Hijacking / DLL Proxying vào tiến trình Steam của người dùng](#2-tấn-công-dll-hijacking-vào-tiến-trình-steam)
3. [Xâm nhập, bẻ khóa và chiếm đoạt bản quyền game Steam thông qua hệ thống Manifest lậu](#3-bẻ-khóa-và-chiếm-đoạt-bản-quyền-game-steam)
4. [Vận hành máy chủ phân phối Token Denuvo / Steam Ticket trái phép (Gen3 Server)](#4-máy-chủ-phân-phối-token-denuvo--steam-ticket-trái-phép)
5. [Bẻ khóa và phân phối công cụ Crack EA Origin và Ubisoft Connect](#5-bẻ-khóa-drm-ea-origin-và-ubisoft-connect)
6. [Thương mại hóa phần mềm lậu và thu lợi bất chính từ dịch vụ Crack/Bypass](#6-thương-mại-hóa-phần-mềm-lậu-và-thu-lợi-bất-chính)
7. [Chiếm đoạt và giải mã trái phép dữ liệu bản quyền RE Engine của Capcom](#7-giải-mã-trái-phép-dữ-liệu-bản-quyền-re-engine-capcom)
8. [Tự động tải và cài đặt tệp MSI vào máy nạn nhân qua tham số chạy ngầm (`/passive`)](#8-cài-đặt-ngầm-phần-mềm-bên-ngoài-qua-msi)
9. [Lộ lọt thông tin bảo mật nghiêm trọng: Master Key S3 Storage và Internal Ban Key](#9-lộ-lọt-master-key-s3-và-internal-ban-key)

---

### 1. Theo dõi ngầm, thu thập HWID và Tự động Khóa máy/Cấm người dùng trái phép

#### A. Mô tả hành vi:
Launcher tự ý quét toàn bộ ổ đĩa của người dùng để kiểm tra xem nạn nhân có đang cài đặt phần mềm đối thủ cạnh tranh (ở đây là `NestG Launcher`) hay không. Nếu phát hiện thấy thư mục của bên thứ ba, chương trình sẽ âm thầm trích xuất Hardware ID của máy (UUID bo mạch chủ, số seri Mainboard) và gửi ngay một HTTP POST bí mật lên máy chủ điều hành để đưa máy người dùng vào danh sách **Auto-Ban vĩnh viễn** mà không hề thông báo hay có sự đồng ý của nạn nhân.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/main.rs` (Dòng 197–235 & Dòng 33)

```rust
// src-tauri/src/main.rs: Dòng 33
const INTERNAL_BAN_KEY: &str = "gsl_ban_7f3k9xQpW2mNvL8dRtYuZ4hCjEoAiB";

// src-tauri/src/main.rs: Dòng 197-208: Thu thập thông tin định danh phần cứng máy tính
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

// src-tauri/src/main.rs: Dòng 210-235: Tự động phát hiện phần mềm cạnh tranh và kích hoạt Auto-Ban
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
```

#### C. Nhận định pháp lý & an ninh:
- Vi phạm nghiêm trọng quyền riêng tư (quét cây thư mục cá nhân ngoài phạm vi ứng dụng).
- Tấn công từ chối dịch vụ có chủ đích dựa trên phần cứng (Hardware Denial of Service / Remote Hardware Lock).
- Lạm dụng API bí mật (`X-Internal-Key`) gửi dữ liệu nhạy cảm ra ngoài máy chủ Internet.

---

### 2. Tấn công DLL Hijacking vào tiến trình Steam của người dùng

#### A. Mô tả hành vi:
Để can thiệp vào tiến trình Steam hợp pháp của người dùng mà không bị Steam Guard hay cơ chế kiểm tra tính toàn vẹn phát hiện, launcher tải về các file thư viện liên kết động (`.dll`) độc hại từ máy chủ `https://api8000.goslynk.online` và thả trực tiếp vào thư mục gốc của Steam (`C:\Program Files (x86)\Steam`).
Các file này mang tên trùng với các DLL hệ thống mà Windows hoặc Steam sẽ nạp khi khởi động: `dwmapi.dll`, `xinput1_4.dll`, `goslynkfix.dll`, `goslynk.dll`, và một DLL được chỉ định động từ API (`get_dynamic_dll_name`). Đây là kỹ thuật kinh điển của mã độc: **DLL Search Order Hijacking**.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/steam_runtime.rs` (Dòng 88–131)

```rust
// src-tauri/src/steam_runtime.rs: Dòng 88-131
pub async fn ensure_steam_runtime(steam_path: &Path) -> Result<String, String> {
    if !steam_path.exists() {
        return Err("Steam installation path not found (invalid or not detected)".to_string());
    }

    let stplugin = steam_path.join("config").join("stplug-in");
    let depotcache = steam_path.join("config").join("depotcache");
    fs::create_dir_all(&stplugin).map_err(|_| "Failed to create stplug-in directory".to_string())?;
    fs::create_dir_all(&depotcache).map_err(|_| "Failed to create depotcache directory".to_string())?;

    // Tải và cài đặt các DLL mạo danh vào thư mục Steam
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

    // Tải thêm DLL động từ server điều khiển từ xa
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
```

#### C. Nhận định pháp lý & an ninh:
- Can thiệp trái phép vào phần mềm của bên thứ ba (Valve Corporation / Steam) đã được cài đặt trên máy người dùng.
- Thực thi mã từ xa không qua xác minh nguồn gốc (Remote Code Injection).

---

### 3. Bẻ khóa và chiếm đoạt bản quyền game Steam thông qua hệ thống Manifest lậu

#### A. Mô tả hành vi:
Launcher kết nối trực tiếp đến hai dịch vụ chuyên cung cấp tệp manifest bản quyền lậu là `hubcapmanifest.com` (sử dụng API key cứng mua sẵn) và `generator.ryuu.lol` (sử dụng auth code). 
Sau khi tải được file nén chứa tệp `.lua` và `.manifest`, launcher tự động giải nén và ghi đè vào thư mục `Steam\config\stplug-in` và `Steam\config\depotcache`. Điều này cho phép người dùng mở khóa và tải về bất kỳ tựa game trả phí nào trên Steam mà không phải trả tiền cho nhà phát triển game (sử dụng plugin SteamTools / GreenLuma).

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/main.rs` (Dòng 34–35 & Dòng 477–545)

```rust
// src-tauri/src/main.rs: Dòng 34-35: Các API Key bí mật kết nối mạng lưới chia sẻ manifest lậu
const MORRENUS_API_KEY: &str = "smm_8e30a373d14b3e648df49a5b44b7393e1051e2bcf817b5ce285266cade48ad1c617556c626a785a4411a5c9a8efabaca";
const RYUU_AUTH_CODE: &str = "RYUUMANIFESTut65ii";

// src-tauri/src/main.rs: Dòng 477-520: Tải manifest lậu
// 1. Kết nối HubcapManifest / Morrenus
let dl_url = format!(
    "https://hubcapmanifest.com/api/v1/manifest/{}?api_key={}",
    app_id, MORRENUS_API_KEY
);
// 2. Kế hoạch dự phòng: Fallback sang Ryuu Manifest Generator
let ryu_url = format!(
    "https://generator.ryuu.lol/secure_download?appid={}&auth_code={}",
    app_id, RYUU_AUTH_CODE
);

// src-tauri/src/main.rs: Dòng 522-545: Bơm file .lua và .manifest vào Steam để mở khóa game bản quyền
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
```

---

### 4. Vận hành máy chủ phân phối Token Denuvo / Steam Ticket trái phép (Gen3 Server)

#### A. Mô tả hành vi:
Hệ thống vận hành máy chủ chuyên biệt `https://api4001.goslynk.online` (và IP dự phòng `http://161.248.239.223:4001`) để giả mạo vé xác thực Steam (`setappticket`, `seteticket`) nhằm vượt qua lớp bảo vệ chống vi phạm bản quyền Denuvo Anti-Tamper. Khi người dùng chạy game, launcher gửi yêu cầu lên máy chủ để xin token vé giả mạo rồi tiêm trực tiếp vào file Lua của Steam.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/luaactive.rs` (Dòng 8–9, Dòng 25–59 & Dòng 134–228)

```rust
// src-tauri/src/luaactive.rs: Dòng 8-9: Máy chủ tạo vé xác thực giả mạo
const PRIMARY_GEN_SERVER: &str = "https://api4001.goslynk.online";
const FALLBACK_GEN_SERVER: &str = "http://161.248.239.223:4001";

// src-tauri/src/luaactive.rs: Dòng 25-41: Phân tích cú pháp vé bản quyền Denuvo / Steam
pub fn parse_gen3_ini(content: &str) -> Result<(String, String), String> {
    let app_re = regex::Regex::new(r#"setappticket\(\s*(\d+)\s*,\s*"([a-f0-9]+)"\s*\)"#)
        .map_err(|e| e.to_string())?;
    let e_re = regex::Regex::new(r#"seteticket\(\s*(\d+)\s*,\s*"([a-f0-9]+)"\s*\)"#)
        .map_err(|e| e.to_string())?;
    ...
}

// src-tauri/src/luaactive.rs: Dòng 43-59: Bơm vé xác thực vào tệp cấu hình của Steam
pub fn inject_tickets_into_lua(lua_path: &Path, app_ticket_line: &str, e_ticket_line: &str) -> Result<(), String> {
    let raw = fs::read_to_string(lua_path).map_err(|_| "Không đọc được file Lua".to_string())?;
    ...
    new_content.push_str(&format!("{}\n\n{}\n", app_ticket_line, e_ticket_line));
    fs::write(lua_path, new_content).map_err(|_| "Không ghi được file Lua".to_string())?;
    Ok(())
}

// src-tauri/src/luaactive.rs: Dòng 134-228: Luồng xin vé và thông báo cạn kiệt token Denuvo
let start_url = format!("{}/gen/start", PRIMARY_GEN_SERVER);
let resp = client.post(&start_url).json(&serde_json::json!({
    "user": username,
    "appid": app_id,
    "gen": 3,
    "game": game_name,
}))...
// Dòng 227:
Err("Có vẻ token cho game này đã hết. Vui lòng liên hệ admin.".to_string())
```

---

### 5. Bẻ khóa DRM EA Origin và Ubisoft Connect

#### A. Mô tả hành vi:
Launcher tích hợp và trực tiếp quản lý các công cụ bẻ khóa nổi tiếng trong giới phần mềm lậu:
1. Đối với **EA Sports / Electronic Arts Games**: Sử dụng và tự động tính toán mã băm SHA256 để vá công cụ crack **Anadius** (`anadius.cfg`, `Launcher.exe`, `dbdata.dll`, `DenuvoDllHash`, `DenuvoToken`, `ea_token.txt`).
2. Đối với **Ubisoft Games**: Bơm các tệp giả mạo `token.ini` và `dbdata.ini` để vượt qua kiểm tra bản quyền của nền tảng Ubisoft Connect.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/eaubiactive.rs` (Dòng 56–66, Dòng 92–122 & Dòng 284–330)

```rust
// src-tauri/src/eaubiactive.rs: Dòng 92-122: Nhận diện và cập nhật công cụ crack Anadius cho game EA
let cfg_path = dir.join("anadius.cfg");
let launcher_path = dir.join("Launcher.exe");
let dbdata_path = dir.join("dbdata.dll");

if !cfg_path.exists() || !launcher_path.exists() {
    return Err("Vui lòng tải bypass patch từ mục 'Secondary Download' (chuột phải vào game) trước khi Play!".to_string());
}

if dbdata_path.exists() {
    if let (Ok(mut cfg), Ok(dll_hash)) = (fs::read_to_string(&cfg_path), sha256_file_hex(&dbdata_path)) {
        if let Ok(re) = regex::Regex::new(r#""DenuvoDllHash"\s+"[^"]*""#) {
            cfg = re.replace(&cfg, format!("\"DenuvoDllHash\"         \"{}\"", dll_hash)).to_string();
            let _ = fs::write(&cfg_path, cfg);
        }
    }
}

// src-tauri/src/eaubiactive.rs: Dòng 325-330: Bơm token lậu để vượt mặt DRM Ubisoft
if let Some(tok_ini) = body.get("token_ini").and_then(|v| v.as_str()) {
    fs::write(dir.join("token.ini"), tok_ini).map_err(|_| "Lỗi ghi token.ini".to_string())?;
}
if let Some(db_ini) = body.get("dbdata_ini").and_then(|v| v.as_str()) {
    fs::write(dir.join("dbdata.ini"), db_ini).map_err(|_| "Lỗi ghi dbdata.ini".to_string())?;
}
```

---

### 6. Thương mại hóa phần mềm lậu và thu lợi bất chính

#### A. Mô tả hành vi:
Hành vi này đặc biệt nghiêm trọng: Launcher không chỉ là một công cụ bẻ khóa thông thường mà đã trở thành **một đường dây kinh doanh phần mềm lậu có thu phí thương mại**:
1. Đặt ra các gói đăng ký VIP (`VIP`, `VIP Plus`, `VIP Voice Vĩnh Viễn` giá 150.000 VNĐ).
2. Xây dựng hệ thống ví tiền tệ ảo (**G-Points / G-Coin**) yêu cầu nạp tiền thật để mở khóa tải game lậu.
3. Thu phí vượt giới hạn kích hoạt token Denuvo / Ubisoft (`paid_skip_cost` = 50.000 G-Coin, gọi endpoint `/user/feature/unlock` với `feature_id: "ubi_reactivate"`).
4. Bán quyền truy cập vào link tải patch crack ("Secondary Download") qua endpoint `/api/bypass/secondary-link/purchase/${app_id}`.
5. Cung cấp và chia sẻ trái phép cả tài khoản **Netflix** cho các tài khoản nạp gói VIP+.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-frontend/02-auth-i18n-vip-matrix.jsx` (Dòng 2998–3030 & Dòng 3819–3821)
- **Tệp**: `src-frontend/03-library-gamedetail-activation-cloudsave.jsx` (Dòng 908–935)

```javascript
// src-frontend/02-auth-i18n-vip-matrix.jsx: Dòng 2998-3000: Bảng giá các gói thu phí VIP
M = d.filter(K => K.type === "vip"),
j = d.filter(K => K.type === "vip_plus"),
B = [{
    id: "vip-voice-permanent",
    name: "VIP Voice Vĩnh Viễn",
    code: "VIPVOICE_PERM",
    type: "vip_voice",
    duration: 0,
    price: 15e4, // 150.000 VNĐ
    description: "Gói VIP Voice Vĩnh Viễn..."
}];

// src-frontend/02-auth-i18n-vip-matrix.jsx: Dòng 3819-3821: Phân phối tài khoản Netflix trái phép
if (!i || i.role !== "admin" && i.role !== "super_admin" && i.role !== "vip_plus" && i.role !== "netflix") {
    isOpen: true,
    title: "VIP+ Required",
    message: "You need to upgrade to VIP+ or Netflix to access Netflix. Please upgrade your account."
}

// src-frontend/03-library-gamedetail-activation-cloudsave.jsx: Dòng 908-917: Bán link tải bypass crack
const dn = await (await fetch(`${Se}/api/bypass/secondary-link/purchase/${encodeURIComponent(n)}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("sessionId") || ""}`,
        "X-Hardware-Id": Ut
    },
    body: JSON.stringify({ type: Ue })
})).json();

// src-frontend/03-library-gamedetail-activation-cloudsave.jsx: Dòng 926-935: Thu phí G-Coin cho mỗi lần Re-activate token lậu
if ((s.p_balance ?? 0) < Wo) {
    d(`Không đủ G-Coin! (Cần ${Wo.toLocaleString("vi-VN")} G)`);
    return;
}
const Te = await fetch(`${Se}/user/feature/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${r}` },
    body: JSON.stringify({
        feature_id: "ubi_reactivate",
        steam_appid: n,
        game_name: e
    })
});
```

---

### 7. Giải mã trái phép dữ liệu bản quyền RE Engine của Capcom

#### A. Mô tả hành vi:
Hệ thống giải mã ngược (reverse-engineer) thuật toán mã hóa bảo vệ file lưu (save game) độc quyền của hãng game **Capcom (RE Engine)**, nhúng trực tiếp **3 khóa mã hóa độc quyền (Citrus Encryption Keys)** vào launcher để can thiệp, chỉnh sửa SteamID64 trong file save nhằm chuyển đổi qua lại giữa bản quyền chính hãng và bản crack giả lập (**Goldberg Steam Emulator - `GSE Saves`**).
Các game chịu ảnh hưởng bao gồm: *Monster Hunter Wilds* (`2246340`), *Dragon's Dogma 2* (`2054970`), *Resident Evil 9 Requiem* (`3764200`), *Monster Hunter Stories 3* (`2852190`), *PRAGMATA* (`3357650`).

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/save_signer.rs` (Dòng 14–56 & Dòng 85–90)

```rust
// src-tauri/src/save_signer.rs: Dòng 14-56: Hồ sơ giải mã game RE Engine và Master Keys của Capcom
pub const RE_ENGINE_PROFILES: &[ReEngineGameProfile] = &[
    ReEngineGameProfile { app_id: "3764200", name: "Resident Evil 9 Requiem", seed: 0x61f6868699c14dfa, variant: 2, flavor: 0x10 },
    ReEngineGameProfile { app_id: "2246340", name: "Monster Hunter Wilds", seed: 0x7a36955255266ced, variant: 2, flavor: 0x18 },
    ReEngineGameProfile { app_id: "2852190", name: "Monster Hunter Stories 3", seed: 0xa40139f12ba19edb, variant: 2, flavor: 0x10 },
    ReEngineGameProfile { app_id: "2054970", name: "Dragon's Dogma 2", seed: 0x5ec646997d69ae1b, variant: 1, flavor: 0x10 },
    ReEngineGameProfile { app_id: "3357650", name: "PRAGMATA", seed: 0x7da24a9e1479f3d7, variant: 2, flavor: 0x10 },
];

pub const CITRUS_KEYS_B64: &[&str] = &[
    "8ztvuXKgtyUV5Fw5GCnhgq2Km9wKZNNETXnIEKuGNxc=",
    "+Z23XDnQ25IKcq4cjJRwwVbFTW4FsmmipjxkiFXDmws=",
    "5m9USvzOaMXvB7mgeyd1hTRKHbYTdugx9zufvV9E9xU=",
];

// src-tauri/src/save_signer.rs: Dòng 85-90: Trích xuất và hoán đổi save từ Goldberg Steam Emulator
fn migrate_gse_to_gsl_saves(app_id: &str) -> Result<PathBuf, String> {
    let appdata = env::var("APPDATA").map_err(|_| "Không tìm thấy %APPDATA%/Roaming".to_string())?;
    let roaming = PathBuf::from(appdata);
    let gse_dir = roaming.join("GSE Saves").join(app_id).join("remote").join("win64_save");
    ...
}
```

---

### 8. Cài đặt ngầm phần mềm bên ngoài qua MSI với tham số `/passive`

#### A. Mô tả hành vi:
Launcher tự động tải một gói cài đặt Windows Installer (`.msi`) từ kho lưu trữ GitHub của tác giả (`github.com/0to95/Goslynk_data`) và thực thi lệnh hệ thống `msiexec /i ... /passive` để ép buộc cài đặt ứng dụng vào hệ thống mà không hiển thị trình thuật sĩ xác nhận đầy đủ cho người dùng.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/main.rs` (Dòng 575–592)

```rust
// src-tauri/src/main.rs: Dòng 575-592
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
```

---

### 9. Lộ lọt thông tin bảo mật nghiêm trọng: Master Key S3 và Internal Ban Key

#### A. Mô tả hành vi:
Hệ thống hardcode toàn bộ khóa truy cập đám mây S3 của nhà cung cấp dịch vụ hạ tầng đám mây `Cloudfly.vn`. Bất kỳ ai sở hữu binary này đều có thể sử dụng cặp Access Key & Secret Key để truy cập, đọc, sửa đổi hoặc xóa toàn bộ kho dữ liệu lưu trữ đám mây của người dùng khác trên bucket `goslynk_cloudsave`.

#### B. Trích dẫn mã nguồn bằng chứng:
- **Tệp**: `src-tauri/src/s3.rs` (Dòng 14–20)
- **Tệp**: `src-tauri/src/main.rs` (Dòng 33)

```rust
// src-tauri/src/s3.rs: Dòng 14-20: Khóa quản trị dịch vụ S3 Cloudfly
const S3_ENDPOINT: &str = "https://s3.cloudfly.vn";
const S3_HOST: &str = "s3.cloudfly.vn";
const S3_BUCKET: &str = "goslynk_cloudsave";
const S3_REGION: &str = "us-east-1";
const S3_ACCESS_KEY: &str = "9H4UHAW84M78QAF6RLZY";
const S3_SECRET_KEY: &str = "2sgF1MW95UyKMYAVc1Pr2oNeC336GKoNDS2glHgu";

// src-tauri/src/main.rs: Dòng 33: Khóa nội bộ gọi API cấm phần cứng
const INTERNAL_BAN_KEY: &str = "gsl_ban_7f3k9xQpW2mNvL8dRtYuZ4hCjEoAiB";
```

---

## TỔNG KẾT VÀ KẾT LUẬN GIÁM ĐỊNH

| TT | Nhóm hành vi | Cơ sở vi phạm kỹ thuật / pháp lý | Mức độ nguy hại |
|---|---|---|---|
| **1** | **Theo dõi & Tự động cấm máy (Anti-Compete Ban)** | Tự ý quét ổ đĩa tìm phần mềm bên thứ 3, lấy HWID gửi lên server để cấm người dùng bằng master key bí mật. | **Rất cao (Spyware / Abuse)** |
| **2** | **DLL Hijacking vào Steam** | Thả các DLL (`dwmapi.dll`, `xinput1_4.dll`, `goslynk.dll`) vào thư mục Steam để can thiệp bộ nhớ tiến trình. | **Rất cao (Code Injection)** |
| **3** | **Chiếm đoạt bản quyền game Steam** | Sử dụng key lậu từ `hubcapmanifest.com` và `ryuu.lol`, bơm `.lua` và `.manifest` vào Steam để chơi lậu. | **Nghiêm trọng (Piracy)** |
| **4** | **Vận hành hệ thống Gen3 Server** | Máy chủ giả lập vé xác thực Steam Ticket / Denuvo Token tại IP `161.248.239.223:4001`. | **Nghiêm trọng (Bypass DRM)** |
| **5** | **Bẻ khóa EA & Ubisoft** | Tích hợp và tự động vá mã Anadius crack, bơm token lậu vào `token.ini` / `dbdata.ini`. | **Nghiêm trọng (Piracy)** |
| **6** | **Thương mại hóa phần mềm lậu** | Thu tiền người dùng (G-Points, VIP 150k, bán link bypass, bán vé re-activate, bán Netflix lậu). | **Đặc biệt nghiêm trọng (Tổ chức trục lợi)** |
| **7** | **Chiếm đoạt bí mật công nghệ Capcom** | Đảo ngược và hardcode các khóa mã hóa độc quyền RE Engine Citrus Keys. | **Nghiêm trọng (IP Theft)** |
| **8** | **Cài đặt ngầm phần mềm bên ngoài** | Gọi lệnh `msiexec /passive` từ GitHub repository của tác giả `0to95`. | **Cao (Silent Execution)** |
| **9** | **Lộ lọt thông tin hạ tầng S3 Cloudfly** | Lộ cặp Access Key & Secret Key toàn quyền trên bucket dữ liệu người dùng. | **Cao (Data Breach Risk)** |

Tất cả các trích dẫn trên đều có thể đối chứng trực tiếp tại các tệp mã nguồn tương ứng trong thư mục `C:\Users\baoba\Desktop\Goslynk-Launcher-Reversed`.

