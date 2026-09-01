@echo off
:: ====================================================
::   APEXNET TURBO SUITE v6.5 - 1-CLICK ALL-IN-ONE
:: ====================================================
title ApexNet Turbo Suite - 1-Click All-in-One Engine
color 0b

echo ====================================================
echo   APEXNET TURBO SUITE - 1-CLICK ENGINE START
echo ====================================================
echo.
echo [+] 1. Tuning Windows Network Stack for High-Speed Cellular...
netsh int tcp set global autotuninglevel=normal >nul 2>&1
netsh int tcp set supplemental template=internet congestionprovider=ctcp >nul 2>&1
netsh int tcp set global ecncapability=enabled >nul 2>&1
netsh int tcp set global rss=enabled >nul 2>&1

echo [+] 2. Clamping Path MTU to 1420 (Bufferbloat Eliminator)...
powershell -Command "Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | ForEach-Object { netsh interface ipv4 set subinterface $_.Name mtu=1420 store=persistent }" >nul 2>&1

echo [+] 3. Flushing OS DNS Resolver Cache...
ipconfig /flushdns >nul 2>&1

echo [+] 4. Starting Local ApexNet Server on Port 3000...
start "" http://localhost:3000
node server.js

pause
