#!/data/data/com.termux/files/usr/bin/bash
# ApexNet Turbo - Termux Automated 4G/3G Mode Switcher
echo "===================================================="
echo "   APEXNET TURBO - TERMUX 1-CLICK PHONE ACCELERATOR "
echo "===================================================="
echo ""
echo "Select network locking mode:"
echo "  [1] Force 4G LTE Only (Max 300 Mbps Line Speed)"
echo "  [2] Force 3G WCDMA Only (Rural / Mountain 45km)"
echo "  [3] Bypass Carrier Tethering / Hotspot Throttling"
echo "  [4] Launch Hidden RadioInfo Menu"
echo ""
read -p "Enter choice [1-4]: " choice

if [ "$choice" = "1" ]; then
    echo "[+] Forcing 4G LTE Only mode..."
    su -c "settings put global preferred_network_mode 11; cmd phone set-preferred-network-type 11" 2>/dev/null || settings put global preferred_network_mode 11
    echo "[SUCCESS] Phone Locked to 4G LTE!"
elif [ "$choice" = "2" ]; then
    echo "[+] Forcing 3G WCDMA Only mode..."
    su -c "settings put global preferred_network_mode 2; cmd phone set-preferred-network-type 2" 2>/dev/null || settings put global preferred_network_mode 2
    echo "[SUCCESS] Phone Locked to 3G WCDMA!"
elif [ "$choice" = "3" ]; then
    echo "[+] Bypassing Carrier Hotspot/Tethering check..."
    su -c "settings put global tether_dun_required 0; settings put global tether_entitlement_check_state 0" 2>/dev/null || settings put global tether_dun_required 0
    echo "[SUCCESS] Carrier Tethering Restriction Overridden!"
elif [ "$choice" = "4" ]; then
    am start -n com.android.settings/.RadioInfo
fi
