@echo off
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *http.server*" 2>nul
taskkill /F /IM python.exe 2>nul
echo 服务器已停止
timeout /t 2 >nul
