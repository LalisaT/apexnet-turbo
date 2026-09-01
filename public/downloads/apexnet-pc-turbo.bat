@echo off
:: ====================================================
::   APEXNET TURBO SUITE - WINDOWS PC SPEED BOOSTER
:: ====================================================
echo ====================================================
echo   APEXNET TURBO SUITE - WINDOWS PC ACCELERATOR
echo ====================================================
echo.
echo [+] 1. Enabling Windows TCP Auto-Tuning (Full Line Speed)...
netsh int tcp set global autotuninglevel=normal

echo [+] 2. Setting Compound TCP / CUBIC Congestion Provider...
netsh int tcp set supplemental template=internet congestionprovider=ctcp 2>nul || netsh int tcp set supplemental template=internet congestionprovider=cubic 2>nul || netsh int tcp set global congestionprovider=ctcp 2>nul

echo [+] 3. Enabling Explicit Congestion Notification (ECN)...
netsh int tcp set global ecncapability=enabled

echo [+] 4. Enabling Receive Side Scaling (RSS)...
netsh int tcp set global rss=enabled

echo [+] 5. Setting MTU to 1420 (Eliminates Bufferbloat)...
powershell -Command "Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | ForEach-Object { netsh interface ipv4 set subinterface $_.Name mtu=1420 store=persistent }"

echo [+] 6. Flushing OS DNS Resolver Cache...
ipconfig /flushdns

echo.
echo ====================================================
echo [SUCCESS] Windows PC Network Stack Fully Turbo-Charged!
echo ====================================================
pause
