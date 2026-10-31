use std::io::{Read, Write};
use std::net::TcpListener;
use std::time::{Duration, Instant};

const GOOGLE_CLIENT_ID: &str = "140299922240-s8prcm6ucgdavi6quh0691edsktcucg0.apps.googleusercontent.com";

const SUCCESS_HTML: &str = r#"<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Goslynk - Đăng nhập thành công</title>
    <style>
        body {
            margin: 0; padding: 0;
            background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex; align-items: center; justify-content: center;
            height: 100vh; color: #fff; overflow: hidden;
        }
        .container {
            position: relative; z-index: 10; text-align: center;
            background: rgba(20,20,25,0.7); padding: 40px 60px;
            border-radius: 24px; border: 1px solid rgba(168,85,247,0.3);
            box-shadow: 0 0 50px rgba(168,85,247,0.2); backdrop-filter: blur(12px);
            animation: fadeIn 0.8s ease-out forwards;
        }
        .icon {
            width: 70px; height: 70px;
            background: linear-gradient(135deg, #a855f7, #7c3aed);
            border-radius: 50%; display: flex; align-items: center;
            justify-content: center; margin: 0 auto 20px;
            box-shadow: 0 0 20px rgba(168,85,247,0.5); animation: pulse 2s infinite;
        }
        .icon svg { width: 35px; height: 35px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        h1 {
            margin: 0 0 10px; font-size: 26px; font-weight: 700;
            background: linear-gradient(to right, #e9d5ff, #c084fc);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        p { margin: 0 0 20px; font-size: 15px; color: #d1d5db; line-height: 1.6; }
        .hint {
            display: inline-block; font-size: 14px; color: #fca5a5;
            background: rgba(239,68,68,0.1); padding: 8px 16px;
            border-radius: 20px; border: 1px solid rgba(239,68,68,0.2); font-weight: 600;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(168,85,247,0.7); }
            70% { box-shadow: 0 0 0 15px rgba(168,85,247,0); }
            100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
        }
    </style>
</head>
<body>
    <canvas id="sf" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;opacity:.9;pointer-events:none;"></canvas>
    <div class="container">
        <div class="icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
        <h1>Đăng nhập thành công</h1>
        <p>Tài khoản Google đã được xác thực.<br>Bây giờ bạn có thể tắt trình duyệt này.</p>
        <div class="hint">Quay lại App để tiếp tục!</div>
    </div>
    <script>
      (function(){
        const c=document.getElementById("sf"),ctx=c.getContext("2d");let w,h,s=[];
        function r(){w=c.width=innerWidth;h=c.height=innerHeight;s=[];for(let i=0;i<150;i++)s.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.3,vx:(Math.random()-.5)*.3,vy:Math.random()*.4+.2,o:Math.random()*.7+.3});}
        function d(){ctx.clearRect(0,0,w,h);for(let i=0;i<s.length;i++){let p=s[i];ctx.fillStyle=`rgba(255,255,255,${p.o})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.y>h)p.y=0;if(p.x>w)p.x=0;if(p.x<0)p.x=w;}requestAnimationFrame(d);}
        window.addEventListener("resize",r);r();d();
      })();
    </script>
</body>
</html>"#;

#[tauri::command]
pub async fn auth_get_google_code() -> Result<(String, String), String> {
    let listener = TcpListener::bind("127.0.0.1:0").map_err(|e| e.to_string())?;
    let port = listener.local_addr().map_err(|e| e.to_string())?.port();
    let redirect_uri = format!("http://127.0.0.1:{}", port);

    let auth_url = format!(
        "https://accounts.google.com/o/oauth2/v2/auth?client_id={}&redirect_uri={}&response_type=code&scope=email%20profile",
        GOOGLE_CLIENT_ID,
        urlencoding::encode(&redirect_uri)
    );

    if let Err(_) = std::process::Command::new("cmd")
        .args(["/C", "start", "", &auth_url])
        .spawn()
    {
        return Err(format!("Không thể mở trình duyệt. Hãy copy link này: {}", auth_url));
    }

    listener.set_nonblocking(true).map_err(|e| e.to_string())?;
    let start = Instant::now();
    let timeout = Duration::from_secs(120);

    loop {
        if start.elapsed() > timeout {
            return Err("Quá thời gian chờ xác thực Google (2 phút).".to_string());
        }
        match listener.accept() {
            Ok((mut stream, _)) => {
                let mut buf = [0u8; 4096];
                if let Ok(n) = stream.read(&mut buf) {
                    let req = String::from_utf8_lossy(&buf[..n]);
                    if req.starts_with("GET ") {
                        if let Some(code_pos) = req.find("code=") {
                            let rest = &req[code_pos + 5..];
                            let end = rest.find(|c: char| c == '&' || c.is_whitespace()).unwrap_or(rest.len());
                            let code = urlencoding::decode(&rest[..end])
                                .map(|s| s.into_owned())
                                .unwrap_or_else(|_| rest[..end].to_string());

                            let resp = format!(
                                "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
                                SUCCESS_HTML.len(),
                                SUCCESS_HTML
                            );
                            let _ = stream.write_all(resp.as_bytes());
                            let _ = stream.flush();
                            return Ok((code, redirect_uri));
                        }
                    }
                }
            }
            Err(ref e) if e.kind() == std::io::ErrorKind::WouldBlock => {
                tokio::time::sleep(Duration::from_millis(100)).await;
            }
            Err(e) => return Err(e.to_string()),
        }
    }
}

