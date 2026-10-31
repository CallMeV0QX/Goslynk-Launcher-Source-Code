use chrono::Utc;
use hmac::{Hmac, Mac};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::fs::{self, File};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Emitter};
use walkdir::WalkDir;
use zip::write::FileOptions;

type HmacSha256 = Hmac<Sha256>;

const S3_ENDPOINT: &str = "https://s3.cloudfly.vn";
const S3_HOST: &str = "s3.cloudfly.vn";
const S3_BUCKET: &str = "goslynk_cloudsave";
const S3_REGION: &str = "us-east-1";
const S3_ACCESS_KEY: &str = "9H4UHAW84M78QAF6RLZY";
const S3_SECRET_KEY: &str = "2sgF1MW95UyKMYAVc1Pr2oNeC336GKoNDS2glHgu";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileEntry {
    pub path: String,
    pub is_dir: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Progress {
    pub uploaded: u64,
    pub total: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CloudSaveError {
    pub error_type: String,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CloudListItem {
    pub key: String,
    pub app_id: String,
    pub game_name: String,
    pub size_bytes: u64,
    pub modified: String,
    pub is_hosting: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SaveInfo {
    pub exists: bool,
    pub size_bytes: u64,
    pub last_modified: Option<String>,
    pub steam_id: Option<String>,
}

fn hmac_sha256(key: &[u8], data: &[u8]) -> Vec<u8> {
    let mut mac = HmacSha256::new_from_slice(key).expect("HMAC can take key of any size");
    mac.update(data);
    mac.finalize().into_bytes().to_vec()
}

fn hex_encode(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{:02x}", b)).collect()
}

fn sign_s3_request(
    method: &str,
    canonical_uri: &str,
    canonical_query: &str,
    headers: &[(&str, &str)],
    payload_hash: &str,
) -> (String, String) {
    let now = Utc::now();
    let amz_date = now.format("%Y%m%dT%H%M%SZ").to_string();
    let date_stamp = now.format("%Y%m%d").to_string();

    let mut all_headers: Vec<(String, String)> = headers
        .iter()
        .map(|(k, v)| (k.to_lowercase(), v.trim().to_string()))
        .collect();
    all_headers.push(("host".to_string(), S3_HOST.to_string()));
    all_headers.push(("x-amz-content-sha256".to_string(), payload_hash.to_string()));
    all_headers.push(("x-amz-date".to_string(), amz_date.clone()));
    all_headers.sort_by(|a, b| a.0.cmp(&b.0));

    let canonical_headers = all_headers
        .iter()
        .map(|(k, v)| format!("{}:{}\n", k, v))
        .collect::<String>();
    let signed_headers = all_headers
        .iter()
        .map(|(k, _)| k.as_str())
        .collect::<Vec<_>>()
        .join(";");

    let canonical_request = format!(
        "{}\n{}\n{}\n{}\n{}\n{}",
        method, canonical_uri, canonical_query, canonical_headers, signed_headers, payload_hash
    );

    let credential_scope = format!("{}/{}/s3/aws4_request", date_stamp, S3_REGION);
    let string_to_sign = format!(
        "AWS4-HMAC-SHA256\n{}\n{}\n{}",
        amz_date,
        credential_scope,
        hex_encode(&Sha256::digest(canonical_request.as_bytes()))
    );

    let k_date = hmac_sha256(format!("AWS4{}", S3_SECRET_KEY).as_bytes(), date_stamp.as_bytes());
    let k_region = hmac_sha256(&k_date, S3_REGION.as_bytes());
    let k_service = hmac_sha256(&k_region, b"s3");
    let k_signing = hmac_sha256(&k_service, b"aws4_request");
    let signature = hex_encode(&hmac_sha256(&k_signing, string_to_sign.as_bytes()));

    let auth_header = format!(
        "AWS4-HMAC-SHA256 Credential={}/{}, SignedHeaders={}, Signature={}",
        S3_ACCESS_KEY, credential_scope, signed_headers, signature
    );

    (amz_date, auth_header)
}

pub fn get_most_recent_steam_id() -> Option<String> {
    let pf86 = std::env::var("ProgramFiles(x86)").unwrap_or_else(|_| "C:\\Program Files (x86)".to_string());
    let vdf_path = PathBuf::from(pf86).join("Steam\\config\\loginusers.vdf");
    let content = fs::read_to_string(vdf_path).ok()?;
    let re = regex::Regex::new(r#""(\d+)"\s*\{[^\}]*"MostRecent"\s+"1""#).ok()?;
    re.captures(&content)
        .and_then(|c| c.get(1))
        .map(|m| m.as_str().to_string())
}

fn zip_directory(src_dir: &Path, dst_file: &Path) -> Result<(), String> {
    if !src_dir.exists() {
        return Err("Chưa có file save nào trên máy cả (Thư mục Save không tồn tại).".to_string());
    }
    let file = File::create(dst_file).map_err(|e| e.to_string())?;
    let mut zip = zip::ZipWriter::new(file);
    let options = FileOptions::default()
        .compression_method(zip::CompressionMethod::Deflated)
        .unix_permissions(0o755);

    let mut count = 0usize;
    for entry in WalkDir::new(src_dir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        let name = path.strip_prefix(src_dir).map_err(|e| e.to_string())?;
        if path.is_file() {
            zip.start_file(name.to_string_lossy(), options)
                .map_err(|e| e.to_string())?;
            let mut f = File::open(path).map_err(|e| e.to_string())?;
            let mut buffer = Vec::new();
            f.read_to_end(&mut buffer).map_err(|e| e.to_string())?;
            zip.write_all(&buffer).map_err(|e| e.to_string())?;
            count += 1;
        }
    }
    if count == 0 {
        return Err("Thư mục save trên máy đang trống.".to_string());
    }
    zip.finish().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn cloudsave_list(username: String) -> Result<Vec<CloudListItem>, String> {
    let prefix = format!("{}/", username);
    let query = format!("list-type=2&prefix={}", urlencoding::encode(&prefix));
    let uri = format!("/{}", S3_BUCKET);
    let payload_hash = "UNSIGNED-PAYLOAD";
    let (amz_date, auth) = sign_s3_request("GET", &uri, &query, &[], payload_hash);

    let url = format!("{}{}?{}", S3_ENDPOINT, uri, query);
    let client = reqwest::Client::new();
    let resp = client
        .get(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("Authorization", auth)
        .send()
        .await
        .map_err(|e| format!("S3 request failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("List S3 that bai: HTTP {}", resp.status()));
    }

    let xml = resp.text().await.map_err(|e| e.to_string())?;
    let mut items = Vec::new();
    let content_re = regex::Regex::new(r"<Contents>([\s\S]*?)</Contents>").unwrap();
    let key_re = regex::Regex::new(r"<Key>(.*?)</Key>").unwrap();
    let size_re = regex::Regex::new(r"<Size>(\d+)</Size>").unwrap();
    let mod_re = regex::Regex::new(r"<LastModified>(.*?)</LastModified>").unwrap();

    for cap in content_re.captures_iter(&xml) {
        let block = &cap[1];
        let key = key_re.captures(block).map(|c| c[1].to_string()).unwrap_or_default();
        let size_bytes = size_re
            .captures(block)
            .and_then(|c| c[1].parse::<u64>().ok())
            .unwrap_or(0);
        let modified = mod_re.captures(block).map(|c| c[1].to_string()).unwrap_or_default();
        let is_hosting = key.contains("/hosting/");
        let app_id = key
            .rsplit('/')
            .next()
            .unwrap_or("")
            .trim_end_matches(".zip")
            .to_string();
        items.push(CloudListItem {
            key,
            app_id: app_id.clone(),
            game_name: format!("AppID: {}", app_id),
            size_bytes,
            modified,
            is_hosting,
        });
    }

    Ok(items)
}

#[tauri::command]
pub async fn cloudsave_check(app_id: String, username: String) -> Result<SaveInfo, String> {
    let uri = format!("/{}/{}/{}.zip", S3_BUCKET, username, app_id);
    let payload_hash = "UNSIGNED-PAYLOAD";
    let (amz_date, auth) = sign_s3_request("HEAD", &uri, "", &[], payload_hash);

    let url = format!("{}{}", S3_ENDPOINT, uri);
    let client = reqwest::Client::new();
    let resp = client
        .head(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("Authorization", auth)
        .send()
        .await
        .map_err(|e| format!("S3 request failed: {}", e))?;

    if resp.status().as_u16() == 404 {
        return Ok(SaveInfo {
            exists: false,
            size_bytes: 0,
            last_modified: None,
            steam_id: None,
        });
    }
    if !resp.status().is_success() {
        return Err(format!("Kiem tra S3 that bai: HTTP {}", resp.status()));
    }

    let size_bytes = resp
        .headers()
        .get("content-length")
        .and_then(|v| v.to_str().ok())
        .and_then(|s| s.parse::<u64>().ok())
        .unwrap_or(0);
    let last_modified = resp
        .headers()
        .get("last-modified")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string());
    let steam_id = resp
        .headers()
        .get("x-amz-meta-steamid")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string());

    Ok(SaveInfo {
        exists: true,
        size_bytes,
        last_modified,
        steam_id,
    })
}

#[tauri::command]
pub async fn cloudsave_delete(app_id: String, username: String) -> Result<String, String> {
    let key = format!("{}/{}.zip", username, app_id);
    cloudsave_delete_key(key).await
}

#[tauri::command]
pub async fn cloudsave_delete_key(key: String) -> Result<String, String> {
    let uri = format!("/{}/{}", S3_BUCKET, key.trim_start_matches('/'));
    let payload_hash = "UNSIGNED-PAYLOAD";
    let (amz_date, auth) = sign_s3_request("DELETE", &uri, "", &[], payload_hash);

    let url = format!("{}{}", S3_ENDPOINT, uri);
    let client = reqwest::Client::new();
    let resp = client
        .delete(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("Authorization", auth)
        .send()
        .await
        .map_err(|e| format!("S3 request failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Xoa S3 that bai: HTTP {}", resp.status()));
    }
    Ok("Deleted".to_string())
}

#[tauri::command]
pub async fn cloudsave_upload(
    app: AppHandle,
    app_id: String,
    username: String,
    game_name: Option<String>,
    save_path: String,
    force: Option<bool>,
) -> Result<String, String> {
    let _ = (game_name, force);
    let src_dir = PathBuf::from(&save_path);
    let temp_zip = std::env::temp_dir().join(format!("goslynk_save_{}_{}.zip", username, app_id));
    zip_directory(&src_dir, &temp_zip)?;

    let data = fs::read(&temp_zip).map_err(|e| e.to_string())?;
    let _ = fs::remove_file(&temp_zip);

    let total = data.len() as u64;
    let _ = app.emit("upload_progress", Progress { uploaded: 0, total });

    let uri = format!("/{}/{}/{}.zip", S3_BUCKET, username, app_id);
    let payload_hash = "UNSIGNED-PAYLOAD";
    let steam_id = get_most_recent_steam_id().unwrap_or_default();
    let extra_headers = if !steam_id.is_empty() {
        vec![("x-amz-meta-steamid", steam_id.as_str())]
    } else {
        vec![]
    };

    let (amz_date, auth) = sign_s3_request("PUT", &uri, "", &extra_headers, payload_hash);
    let url = format!("{}{}", S3_ENDPOINT, uri);
    let client = reqwest::Client::new();
    let mut req = client
        .put(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("Authorization", auth)
        .header("Content-Length", total);

    if !steam_id.is_empty() {
        req = req.header("x-amz-meta-steamid", steam_id);
    }

    let resp = req
        .body(data)
        .send()
        .await
        .map_err(|e| format!("Upload stream failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Upload S3 that bai: HTTP {}", resp.status()));
    }

    let _ = app.emit("upload_progress", Progress { uploaded: total, total });
    Ok("Uploaded".to_string())
}

#[tauri::command]
pub async fn cloudsave_download(
    app_id: String,
    username: String,
    save_path: String,
    force: Option<bool>,
) -> Result<String, String> {
    let _ = force;
    let uri = format!("/{}/{}/{}.zip", S3_BUCKET, username, app_id);
    let payload_hash = "UNSIGNED-PAYLOAD";
    let (amz_date, auth) = sign_s3_request("GET", &uri, "", &[], payload_hash);

    let url = format!("{}{}", S3_ENDPOINT, uri);
    let client = reqwest::Client::new();
    let resp = client
        .get(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("Authorization", auth)
        .send()
        .await
        .map_err(|e| format!("S3 request failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Download S3 thất bại: HTTP {}", resp.status()));
    }

    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
    let temp_zip = std::env::temp_dir().join(format!("goslynk_dl_{}_{}.zip", username, app_id));
    fs::write(&temp_zip, &bytes).map_err(|e| e.to_string())?;

    let target_dir = PathBuf::from(&save_path);
    fs::create_dir_all(&target_dir).map_err(|e| e.to_string())?;

    let file = File::open(&temp_zip).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;
    for i in 0..archive.len() {
        let mut entry = archive.by_index(i).map_err(|e| e.to_string())?;
        if let Some(rel) = entry.enclosed_name().map(|p| p.to_owned()) {
            let outpath = target_dir.join(rel);
            if entry.name().ends_with('/') {
                fs::create_dir_all(&outpath).map_err(|e| e.to_string())?;
            } else {
                if let Some(p) = outpath.parent() {
                    fs::create_dir_all(p).map_err(|e| e.to_string())?;
                }
                let mut outfile = File::create(&outpath).map_err(|e| e.to_string())?;
                std::io::copy(&mut entry, &mut outfile).map_err(|e| e.to_string())?;
            }
        }
    }
    let _ = fs::remove_file(&temp_zip);
    Ok("Downloaded".to_string())
}

#[tauri::command]
pub async fn filehosting_upload(
    app: AppHandle,
    file_path: String,
    username: String,
) -> Result<String, String> {
    let path = PathBuf::from(&file_path);
    if !path.exists() || !path.is_file() {
        return Err("Đường dẫn file không hợp lệ hoặc không tồn tại.".to_string());
    }
    let file_name = path
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("upload.file");
    let data = fs::read(&path).map_err(|e| format!("Không mở được file: {}", e))?;
    let total = data.len() as u64;
    let _ = app.emit("upload_progress", Progress { uploaded: 0, total });

    let uri = format!("/{}/{}/hosting/{}", S3_BUCKET, username, file_name);
    let payload_hash = "UNSIGNED-PAYLOAD";
    let headers = [("x-amz-acl", "public-read")];
    let (amz_date, auth) = sign_s3_request("PUT", &uri, "", &headers, payload_hash);

    let url = format!("{}{}", S3_ENDPOINT, uri);
    let client = reqwest::Client::new();
    let resp = client
        .put(&url)
        .header("x-amz-date", amz_date)
        .header("x-amz-content-sha256", payload_hash)
        .header("x-amz-acl", "public-read")
        .header("Authorization", auth)
        .header("Content-Length", total)
        .body(data)
        .send()
        .await
        .map_err(|e| format!("Upload stream failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Upload S3 thất bại: HTTP {}", resp.status()));
    }

    let _ = app.emit("upload_progress", Progress { uploaded: total, total });
    Ok(url)
}

