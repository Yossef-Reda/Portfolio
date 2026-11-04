@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo.
  echo Python was not found on this computer.
  echo Install Python from https://www.python.org/downloads/ and tick "Add Python to PATH",
  echo or run "npx serve ." from this folder if you have Node.js installed.
  echo.
  pause
  exit /b 1
)

echo Starting the portfolio at http://localhost:8080 ...
start "Portfolio local server" /min cmd /c "python -m http.server 8080"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8080"

echo.
echo Portfolio is running at http://localhost:8080
echo Close the minimized "Portfolio local server" window to stop it.
echo.
pause
