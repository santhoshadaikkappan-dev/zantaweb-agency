@echo off
title ZANTAWEB Agency - Push to GitHub
color 0B
echo =======================================================
echo   ZANTAWEB AGENCY PORTFOLIO - GITHUB DEPLOYER
echo =======================================================
echo.
echo Target Repository:
echo https://github.com/santhoshadaikkappan-dev/zantaweb-agency.git
echo.
echo Staging changes and pushing to GitHub...
echo.

cd /d "%~dp0"

"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" add -A
"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" commit -m "Deploy ZANTAWEB ultra-modern agency portfolio with interactive matrix, MOQ engine, and pricing tiers" >nul 2>&1

"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" remote remove origin >nul 2>&1
"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" remote add origin https://github.com/santhoshadaikkappan-dev/zantaweb-agency.git
"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" branch -M main

echo If a browser window opens, please click "Sign in with your browser" to approve GitHub.
echo.

"C:\Users\Admin\.gemini\antigravity\scratch\git\cmd\git.exe" push -u origin main --force

echo.
if %ERRORLEVEL% equ 0 (
    echo =======================================================
    echo SUCCESS! All updates are now in your GitHub repository!
    echo Vercel will automatically redeploy your live site in 15s.
    echo =======================================================
) else (
    echo =======================================================
    echo If GitHub asked for credentials, please enter your
    echo GitHub Username and Personal Access Token (PAT).
    echo =======================================================
)

echo.
pause
