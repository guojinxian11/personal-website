@echo off
cd /d C:\Users\Administrator\personal-website
start /min python -m http.server 8000
echo 服务器已启动，访问 http://localhost:8000
timeout /t 2 >nul
