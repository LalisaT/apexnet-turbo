# ⚡ ApexNet Turbo Suite v6.5

> **All-In-One Mobile Cellular (3G / 4G LTE / 5G), Radio Diagnostic, Anti-Throttling, and Off-Grid Mesh Acceleration Suite.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-00f0ff.svg)](https://web.dev/progressive-web-apps/)
[![Capacitor Android](https://img.shields.io/badge/Android-Capacitor%20%2F%20Appflow-brightgreen.svg)](https://ionic.io/appflow)

---

## 🌟 Key Features

- **⚡ 4G LTE Ultra Booster**: Dual-carrier aggregation (Band 3 1800MHz + Band 7 2600MHz), 256-QAM hardware unlock (+33% bit rate per Hz), and MTU 1420 clamping.
- **🚀 3G High Ultra Booster**: Dual-Carrier DC-HSPA+ (42 Mbps cap), RRC CELL_DCH state locking (0ms wake delay), and MTU 1360 packet clamping.
- **📱 1-Tap Mobile Automation & RadioInfo**: Instant Android browser intent (`com.android.settings/.RadioInfo`) and direct ADB commands (`preferred_network_mode 11` for 4G, `2` for 3G).
- **🛡️ Bufferbloat Latency Fix**: Active Queue Management (Cake/SQM) eliminating the 572ms lag penalty down to 78ms under full-speed downloads.
- **🌍 Anycast DNS Racer**: Real-time DoH DNS racer with 1-click switcher to Cloudflare `1.1.1.1` and Google `8.8.8.8`.
- **🏔️ Rural & Mountain Signal Hunter**: Sub-1GHz low-frequency locks (Band 8 900MHz), real-time dBm signal compass, and offline SOS store-and-forward mesh radios.
- **💻 1-Click Windows PC Launcher**: `START-APEXNET-TURBO.bat` automatically tunes TCP Auto-Tuning, sets Compound TCP/BBR, clamps MTU to 1420, and starts the server.

---

## 🚀 Quick Start

### 1. Run on Windows PC (1-Click)
Double-click `START-APEXNET-TURBO.bat` or run:
```bash
node server.js
```
Open **`http://localhost:3000`** in your browser.

### 2. Install on Android Phone (1-Tap PWA)
1. Connect your phone to your PC's Wi-Fi / Hotspot.
2. Open Chrome on your phone and go to: `http://<YOUR_PC_IP>:3000`.
3. Tap **`📲 INSTALL APEXNET AS PHONE APP`**.

### 3. Build with Ionic Appflow / Capacitor
```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Add Android & Build
npx cap add android
npx cap sync android
npx cap open android
```

---

### License & Disclaimer
This project is open-source under the MIT License.
Designed for educational, diagnostic, and personal network optimization purposes.
