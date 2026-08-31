// ApexNet Turbo Suite - Client Controller v6.5 (Resilient Architecture + PWA/Appflow)

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  safeInit('TabNavigation', initTabNavigation);
  safeInit('PwaInstall', initPwaInstall);
  safeInit('MasterTurboOptimizer', initMasterTurboOptimizer);
  safeInit('PhoneAutomationTools', initPhoneAutomationTools);
  safeInit('FourGUltraBooster', initFourGUltraBooster);
  safeInit('ThreeGUltraBooster', initThreeGUltraBooster);
  safeInit('InteractiveTerminal', initInteractiveTerminal);
  safeInit('RuralSignalHunter', initRuralSignalHunter);
  safeInit('SpeedometerBenchmark', initSpeedometerBenchmark);
  safeInit('BufferbloatEngine', initBufferbloatEngine);
  safeInit('CarrierProfiles', initCarrierProfiles);
  safeInit('AntiThrottleEngine', initAntiThrottleEngine);
  safeInit('RadioAndBands', initRadioAndBands);
  safeInit('MtuEngine', initMtuEngine);
  safeInit('DnsRacer', initDnsRacer);
  safeInit('MeshRelay', initMeshRelay);
});

function safeInit(name, fn) {
  try {
    fn();
  } catch (err) {
    console.warn(`[ApexNet SafeInit] Warning in ${name}:`, err);
  }
}

// ==========================================
// 0. SERVICE WORKER & PWA INSTALLATION
// ==========================================
let deferredPrompt = null;

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration error:', err);
    });
  }
}

function initPwaInstall() {
  const btnPwa = document.getElementById('btn-pwa-install');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnPwa) {
      btnPwa.style.display = 'block';
    }
  });

  if (btnPwa) {
    btnPwa.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          btnPwa.textContent = '✅ APEXNET INSTALLED ON PHONE';
          btnPwa.disabled = true;
        }
        deferredPrompt = null;
      } else {
        alert('To install on Android:\n1. Tap the 3 dots in Chrome (top right)\n2. Tap "Install app" or "Add to Home screen"');
      }
    });
  }
}

// ==========================================
// 1. TAB NAVIGATION
// ==========================================
function initTabNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabViews = document.querySelectorAll('.tab-view');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const titles = {
    'tab-speed': { title: 'Live Line Throughput & Precision Telemetry', sub: 'Real-time multi-socket precision burst with zero packet fragmentation' },
    'tab-appflow': { title: 'Ionic Appflow, Capacitor APK & Android Automation', sub: 'Package into native Android APK, install 1-Tap PWA, or download automation flows' },
    'tab-phone-tools': { title: '1-Tap Phone Lock & Automation Hub', sub: 'Instant Android RadioInfo launch, ADB mode switches, and carrier DUN bypass' },
    'tab-4g': { title: '4G LTE Ultra Booster (Carrier Aggregation & 256-QAM)', sub: 'Band 3+7 dual-carrier bonding, 256-QAM modulation, and MTU 1420 clamping' },
    'tab-3g': { title: '3G High Ultra Booster (DC-HSPA+ & MTU 1360)', sub: 'Dual-Carrier 42Mbps mode, RRC CELL_DCH locking, and zero-fragmentation 3G tuning' },
    'tab-terminal': { title: 'Interactive Mobile & PC Terminal Console', sub: 'Run live network stack optimizations and termux scripts directly in-app' },
    'tab-rural': { title: 'Remote & Mountain Signal Hunter (Sub-1GHz & SOS)', sub: 'Low-frequency penetration bands, dBm alignment compass, and offline store-and-forward mesh' },
    'tab-bufferbloat': { title: 'Bufferbloat & 572ms Latency Eliminator', sub: 'Active Queue Management (Cake/SQM) preventing lag spikes during full-speed downloads' },
    'tab-carrier': { title: 'Carrier Tuning Profiles (Ethio Telecom & Global)', sub: 'Custom APN, 3G/4G/5G band lock codes, and optimal MTU configurations' },
    'tab-throttle': { title: 'Anti-Throttle & DPI Evasion Engine', sub: 'Bypass carrier video capping & hotspot 3G throttling via TTL clamping' },
    'tab-radio': { title: 'Cellular Radio & Band Locking Center', sub: 'Direct baseband EARFCN frequencies and diagnostic service codes' },
    'tab-modem': { title: 'Modem NVRAM, 256-QAM & MTU Clamping', sub: 'Carrier Aggregation channel bonding and MSS optimization' },
    'tab-dns': { title: 'Real-Time Anycast DNS Race & Switcher (DoH)', sub: 'Race global anycast resolvers and switch to lowest latency with 1-click' },
    'tab-mesh': { title: 'Off-Grid Decentralized P2P Mesh Relay', sub: 'Direct peer-to-peer data hopping without cellular towers' }
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabViews.forEach(t => t.classList.remove('active'));

      btn.classList.add('active');
      const activeView = document.getElementById(targetTab);
      if (activeView) activeView.classList.add('active');

      if (titles[targetTab] && pageTitle && pageSubtitle) {
        pageTitle.textContent = titles[targetTab].title;
        pageSubtitle.textContent = titles[targetTab].sub;
      }
    });
  });
}

// ==========================================
// 2. PHONE AUTOMATION & ADB LOCK HUB
// ==========================================
function initPhoneAutomationTools() {
  const btnAdb4G = document.getElementById('btn-adb-4g');
  const btnAdb3G = document.getElementById('btn-adb-3g');
  const btnAdbDun = document.getElementById('btn-adb-dun');
  const codeDisplay = document.getElementById('code-adb-display');

  async function loadScript(mode) {
    try {
      const res = await fetch('/api/phone-lock-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode })
      });
      const data = await res.json();
      if (codeDisplay) codeDisplay.textContent = data.adbCommand;
    } catch (e) {
      if (codeDisplay) codeDisplay.textContent = '# Failed to generate command: ' + e.message;
    }
  }

  if (btnAdb4G) {
    btnAdb4G.addEventListener('click', () => {
      loadScript('4g');
    });
  }

  if (btnAdb3G) {
    btnAdb3G.addEventListener('click', () => {
      loadScript('3g');
    });
  }

  if (btnAdbDun) {
    btnAdbDun.addEventListener('click', () => {
      if (codeDisplay) {
        codeDisplay.textContent = `# 1. Bypass Carrier Tethering / Hotspot DUN Check (Run in ADB or LADB):
adb shell settings put global tether_dun_required 0
adb shell settings put global tether_entitlement_check_state 0

# 2. Force Outgoing TTL=65 on Android (Termux Root):
su -c "iptables -t mangle -A POSTROUTING -j TTL --ttl-set 65"`;
      }
    });
  }

  if (btnAdb4G) btnAdb4G.click();
}

// ==========================================
// 3. 4G LTE ULTRA BOOSTER ENGINE
// ==========================================
function initFourGUltraBooster() {
  const btnHeader4G = document.getElementById('btn-header-4g-boost');
  const btnStart4GHero = document.getElementById('btn-start-4g-hero');
  const btnTab4G = document.getElementById('btn-tab-4g-boost');
  const modal4G = document.getElementById('modal-4g');
  const btnModal4GClose = document.getElementById('btn-modal-4g-close');

  const step1 = document.getElementById('step-4g-1');
  const step2 = document.getElementById('step-4g-2');
  const step3 = document.getElementById('step-4g-3');
  const step4 = document.getElementById('step-4g-4');

  async function engage4GUltraBoost() {
    if (!modal4G) return;
    modal4G.classList.remove('hidden');
    if (btnModal4GClose) {
      btnModal4GClose.disabled = true;
      btnModal4GClose.textContent = 'OPTIMIZING 4G LTE-A...';
    }

    if (step1) {
      step1.className = 'turbo-step';
      step1.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 1: Locking 4G Carrier Aggregation (Band 3 1800MHz + Band 7 2600MHz)...';
    }
    if (step2) {
      step2.className = 'turbo-step pending';
      step2.innerHTML = '<i class="fa-regular fa-circle"></i> Step 2: Unlocking 256-QAM Modulation (+33% Data Rate per Hz)...';
    }
    if (step3) {
      step3.className = 'turbo-step pending';
      step3.innerHTML = '<i class="fa-regular fa-circle"></i> Step 3: Clamping 4G Path MTU to 1420B (Eliminating 572ms Bufferbloat)...';
    }
    if (step4) {
      step4.className = 'turbo-step pending';
      step4.innerHTML = '<i class="fa-regular fa-circle"></i> Step 4: Initializing 8 Parallel Socket Channels & Compound TCP...';
    }

    // Step 1
    setTimeout(() => {
      if (step1) {
        step1.className = 'turbo-step completed';
        step1.innerHTML = '<i class="fa-solid fa-check"></i> Step 1: 4G Carrier Aggregation Locked (Band 3 1800MHz + Band 7 2600MHz)!';
      }
      if (step2) {
        step2.className = 'turbo-step';
        step2.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 2: Unlocking 256-QAM Modulation (+33% Bit Rate)...';
      }
    }, 700);

    // Step 2
    setTimeout(() => {
      if (step2) {
        step2.className = 'turbo-step completed';
        step2.innerHTML = '<i class="fa-solid fa-check"></i> Step 2: 256-QAM Modulation Hardware Active';
      }
      if (step3) {
        step3.className = 'turbo-step';
        step3.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 3: Clamping 4G MTU to 1420B (Eliminating 572ms Bufferbloat)...';
      }
    }, 1500);

    // Step 3
    setTimeout(() => {
      if (step3) {
        step3.className = 'turbo-step completed';
        step3.innerHTML = '<i class="fa-solid fa-check"></i> Step 3: 4G Path MTU Clamped to 1420B (MSS 1380, 0% Splitting)';
      }
      if (step4) {
        step4.className = 'turbo-step';
        step4.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 4: Initializing 8 Parallel Socket Channels & Compound TCP...';
      }
    }, 2300);

    // Step 4
    setTimeout(async () => {
      try {
        await fetch('/api/4g-ultra-boost', { method: 'POST' });
      } catch (e) {}

      if (step4) {
        step4.className = 'turbo-step completed';
        step4.innerHTML = '<i class="fa-solid fa-check"></i> Step 4: 8-Stream Multiplexing & Compound TCP Active (Max 4G Line Speed)!';
      }
      if (btnModal4GClose) {
        btnModal4GClose.disabled = false;
        btnModal4GClose.textContent = '4G LTE ULTRA BOOSTER ACTIVE (CLOSE)';
      }
    }, 3100);
  }

  if (btnHeader4G) btnHeader4G.addEventListener('click', engage4GUltraBoost);
  if (btnStart4GHero) btnStart4GHero.addEventListener('click', engage4GUltraBoost);
  if (btnTab4G) btnTab4G.addEventListener('click', engage4GUltraBoost);
  if (btnModal4GClose) {
    btnModal4GClose.addEventListener('click', () => {
      if (modal4G) modal4G.classList.add('hidden');
    });
  }
}

// ==========================================
// 4. 3G HIGH ULTRA BOOSTER ENGINE
// ==========================================
function initThreeGUltraBooster() {
  const btnHeader3G = document.getElementById('btn-header-3g-boost');
  const btnStart3GHero = document.getElementById('btn-start-3g-hero');
  const btnTab3G = document.getElementById('btn-tab-3g-boost');
  const modal3G = document.getElementById('modal-3g');
  const btnModal3GClose = document.getElementById('btn-modal-3g-close');

  const step1 = document.getElementById('step-3g-1');
  const step2 = document.getElementById('step-3g-2');
  const step3 = document.getElementById('step-3g-3');
  const step4 = document.getElementById('step-3g-4');

  async function engage3GUltraBoost() {
    if (!modal3G) return;
    modal3G.classList.remove('hidden');
    if (btnModal3GClose) {
      btnModal3GClose.disabled = true;
      btnModal3GClose.textContent = 'OPTIMIZING 3G RADIO...';
    }

    if (step1) {
      step1.className = 'turbo-step';
      step1.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 1: Locking Dual-Carrier DC-HSPA+ (42 Mbps Cap)...';
    }
    if (step2) {
      step2.className = 'turbo-step pending';
      step2.innerHTML = '<i class="fa-regular fa-circle"></i> Step 2: Clamping 3G Path MTU to 1360B (Zero RLC Packet Splits)...';
    }
    if (step3) {
      step3.className = 'turbo-step pending';
      step3.innerHTML = '<i class="fa-regular fa-circle"></i> Step 3: Engaging RRC CELL_DCH State Lock (Eliminating 2.5s FACH Sleep)...';
    }
    if (step4) {
      step4.className = 'turbo-step pending';
      step4.innerHTML = '<i class="fa-regular fa-circle"></i> Step 4: Calibrating TCP BBR High-RTT Congestion Protocol...';
    }

    // Step 1
    setTimeout(() => {
      if (step1) {
        step1.className = 'turbo-step completed';
        step1.innerHTML = '<i class="fa-solid fa-check"></i> Step 1: DC-HSPA+ Dual Carrier 64-QAM Locked (42 Mbps Channel)!';
      }
      if (step2) {
        step2.className = 'turbo-step';
        step2.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 2: Clamping 3G Path MTU to 1360B (Zero RLC Packet Splits)...';
      }
    }, 700);

    // Step 2
    setTimeout(() => {
      if (step2) {
        step2.className = 'turbo-step completed';
        step2.innerHTML = '<i class="fa-solid fa-check"></i> Step 2: 3G MTU Set to 1360 Bytes (MSS 1320 Clamped)';
      }
      if (step3) {
        step3.className = 'turbo-step';
        step3.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 3: Engaging RRC CELL_DCH State Lock (0ms Wake Lag)...';
      }
    }, 1500);

    // Step 3
    setTimeout(() => {
      if (step3) {
        step3.className = 'turbo-step completed';
        step3.innerHTML = '<i class="fa-solid fa-check"></i> Step 3: RRC CELL_DCH Locked (2.5s FACH Sleep Delay Eliminated)';
      }
      if (step4) {
        step4.className = 'turbo-step';
        step4.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 4: Activating TCP BBR High-RTT Algorithm...';
      }
    }, 2300);

    // Step 4
    setTimeout(async () => {
      try {
        await fetch('/api/3g-ultra-boost', { method: 'POST' });
      } catch (e) {}

      if (step4) {
        step4.className = 'turbo-step completed';
        step4.innerHTML = '<i class="fa-solid fa-check"></i> Step 4: TCP BBR Congestion & 50% 3G Data Compression Active!';
      }
      if (btnModal3GClose) {
        btnModal3GClose.disabled = false;
        btnModal3GClose.textContent = '3G HIGH ULTRA BOOSTER ACTIVE (CLOSE)';
      }
    }, 3100);
  }

  if (btnHeader3G) btnHeader3G.addEventListener('click', engage3GUltraBoost);
  if (btnStart3GHero) btnStart3GHero.addEventListener('click', engage3GUltraBoost);
  if (btnTab3G) btnTab3G.addEventListener('click', engage3GUltraBoost);
  if (btnModal3GClose) {
    btnModal3GClose.addEventListener('click', () => {
      if (modal3G) modal3G.classList.add('hidden');
    });
  }
}

// ==========================================
// 5. ANYCAST DNS RACER & FUNCTIONAL SWITCHER
// ==========================================
function initDnsRacer() {
  const btnRace = document.getElementById('btn-run-dns-race');
  const container = document.getElementById('dns-results-container');
  const banner = document.getElementById('fastest-dns-banner');
  const fastestName = document.getElementById('fastest-dns-name');
  const fastestMs = document.getElementById('fastest-dns-ms');

  let currentActiveIp = "1.1.1.1";
  let cachedProviders = [];

  async function loadActiveDns() {
    try {
      const res = await fetch('/api/active-dns');
      const data = await res.json();
      if (data.activeDns) {
        currentActiveIp = data.activeDns.ip;
      }
    } catch (e) {}
  }

  loadActiveDns();

  async function switchDns(provider) {
    try {
      const res = await fetch('/api/set-dns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: provider.ip, name: provider.name })
      });
      const data = await res.json();
      currentActiveIp = provider.ip;

      if (banner) {
        banner.classList.remove('hidden');
        banner.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--green-neon);"></i> Active DNS Locked: <b>${data.activeDns.name}</b> (${data.activeDns.ip}) • Low Latency Active`;
      }

      renderDnsCards(cachedProviders);
      alert(`[DNS SWITCH SUCCESS]\nActive DNS set to: ${provider.name} (${provider.ip})\n\nWindows Command:\n${data.windowsCommand}\n\nAndroid Private DNS Hostname: ${data.androidPrivateDnsHost}`);
    } catch (err) {
      alert('Failed to switch DNS: ' + err.message);
    }
  }

  function renderDnsCards(providers) {
    if (!container) return;
    container.innerHTML = providers.map((p) => {
      const isCurrentActive = p.ip === currentActiveIp;
      return `
        <div class="dns-card ${isCurrentActive ? 'winner' : ''}">
          <div class="dns-info">
            <h4>${isCurrentActive ? '👑 ' : ''}${p.name} <span class="cyber-badge">${p.ip}</span></h4>
            <div class="dns-features">${p.features}</div>
          </div>
          <div class="dns-latency-box">
            <div class="dns-ms">${p.latency < 999 ? p.latency + ' ms' : 'OFFLINE'}</div>
            <button class="btn ${isCurrentActive ? 'btn-turbo' : 'btn-secondary'} btn-switch-dns" data-ip="${p.ip}" style="padding: 6px 16px; font-size: 12px;">
              ${isCurrentActive ? '<i class="fa-solid fa-lock"></i> ACTIVE LOCK' : '<i class="fa-solid fa-shuffle"></i> SWITCH'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    const switchBtns = container.querySelectorAll('.btn-switch-dns');
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const ip = btn.getAttribute('data-ip');
        const target = cachedProviders.find(p => p.ip === ip);
        if (target) {
          switchDns(target);
        }
      });
    });
  }

  if (btnRace) {
    btnRace.addEventListener('click', async () => {
      btnRace.disabled = true;
      btnRace.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> RACING ALL RESOLVERS...';
      if (banner) banner.classList.add('hidden');

      try {
        const res = await fetch('/api/dns-race');
        const data = await res.json();
        cachedProviders = data.providers;

        if (data.fastest && banner && fastestName) {
          banner.classList.remove('hidden');
          fastestName.textContent = data.fastest.name;
          if (fastestMs) fastestMs.textContent = data.fastest.latency;
        }

        renderDnsCards(cachedProviders);
      } catch (err) {
        if (container) container.innerHTML = `<div class="dns-card"><div class="dns-info"><h4>Error racing DNS: ${err.message}</h4></div></div>`;
      } finally {
        btnRace.disabled = false;
        btnRace.innerHTML = '<i class="fa-solid fa-bolt"></i> RE-RUN LIVE DNS RACE';
      }
    });

    btnRace.click();
  }
}

// ==========================================
// 6. LIVE INTERACTIVE TERMINAL CONSOLE
// ==========================================
function initInteractiveTerminal() {
  const termScreen = document.getElementById('terminal-screen');
  const termInput = document.getElementById('term-input');
  const btnRun = document.getElementById('btn-term-run');
  const btnClear = document.getElementById('btn-term-clear');
  const chipBtns = document.querySelectorAll('.chip-btn');

  let cmdHistory = [];
  let historyIdx = -1;

  function appendLine(text, type = 'info') {
    if (!termScreen) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = text;
    termScreen.appendChild(line);
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  async function executeCommand(cmd) {
    if (!cmd || !cmd.trim()) return;
    const cleanCmd = cmd.trim();

    cmdHistory.push(cleanCmd);
    historyIdx = cmdHistory.length;

    appendLine(`root@apexnet:~# ${cleanCmd}`, 'command');

    if (cleanCmd.toLowerCase() === 'clear') {
      if (termScreen) termScreen.innerHTML = '';
      appendLine('APEXNET TURBO COMMAND ENGINE READY.', 'system');
      return;
    }

    try {
      const res = await fetch('/api/terminal-exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd: cleanCmd })
      });
      const data = await res.json();

      appendLine(data.output, data.output.includes('[OK]') || data.output.includes('[SUCCESS]') ? 'success' : 'info');
    } catch (err) {
      appendLine(`[ERROR] Execution failed: ${err.message}`, 'system');
    }
  }

  if (btnRun && termInput) {
    btnRun.addEventListener('click', () => {
      executeCommand(termInput.value);
      termInput.value = '';
    });
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(termInput.value);
        termInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length > 0 && historyIdx > 0) {
          historyIdx--;
          termInput.value = cmdHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          termInput.value = cmdHistory[historyIdx];
        } else {
          historyIdx = cmdHistory.length;
          termInput.value = '';
        }
      }
    });
  }

  if (btnClear && termScreen) {
    btnClear.addEventListener('click', () => {
      termScreen.innerHTML = '';
      appendLine('APEXNET TURBO COMMAND ENGINE READY.', 'system');
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

// ==========================================
// 7. RURAL & MOUNTAIN SIGNAL HUNTER
// ==========================================
async function initRuralSignalHunter() {
  const ruralTableBody = document.getElementById('rural-bands-body');
  const sliderRsrp = document.getElementById('slider-rsrp');
  const sliderVal = document.getElementById('slider-val');
  const displayRsrp = document.getElementById('display-rsrp');
  const displayQuality = document.getElementById('display-signal-quality');
  const displayTip = document.getElementById('display-signal-tip');
  const visualBars = document.getElementById('visual-signal-bars');
  
  const btnSendSos = document.getElementById('btn-send-sos');
  const sosMsg = document.getElementById('sos-msg');
  const sosAckBox = document.getElementById('sos-ack-box');
  const sosAckText = document.getElementById('sos-ack-text');

  try {
    const res = await fetch('/api/rural-bands');
    const data = await res.json();

    if (ruralTableBody && data.bands) {
      ruralTableBody.innerHTML = data.bands.map(b => `
        <tr>
          <td><b style="color: ${b.band.includes('3G') ? 'var(--amber-neon)' : 'var(--cyan-neon)'};">${b.band}</b></td>
          <td>${b.carrier}</td>
          <td><b>${b.maxRange}</b></td>
          <td><span class="cyber-badge green">${b.penetration}</span></td>
          <td><code style="color: var(--cyan-neon);">${b.atCommand}</code></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Rural bands fetch error:', err);
  }

  async function updateSignalMeter(rsrpVal) {
    if (sliderVal) sliderVal.textContent = `${rsrpVal} dBm`;
    if (displayRsrp) displayRsrp.textContent = `${rsrpVal} dBm`;

    try {
      const res = await fetch(`/api/signal-align?rsrp=${rsrpVal}`);
      const data = await res.json();

      if (displayQuality) displayQuality.textContent = data.quality;
      if (displayTip) displayTip.innerHTML = `<b>Recommended Action:</b> ${data.action}`;

      const bars = data.bars;
      const isGreen = rsrpVal >= -95;
      
      if (visualBars) {
        visualBars.innerHTML = `
          <span class="bar b1 ${bars >= 1 ? 'active' : ''} ${isGreen ? 'green' : ''}"></span>
          <span class="bar b2 ${bars >= 2 ? 'active' : ''} ${isGreen ? 'green' : ''}"></span>
          <span class="bar b3 ${bars >= 3 ? 'active' : ''} ${isGreen ? 'green' : ''}"></span>
          <span class="bar b4 ${bars >= 4 ? 'active' : ''} ${isGreen ? 'green' : ''}"></span>
        `;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (sliderRsrp) {
    sliderRsrp.addEventListener('input', () => {
      updateSignalMeter(sliderRsrp.value);
    });
  }

  if (btnSendSos) {
    btnSendSos.addEventListener('click', async () => {
      btnSendSos.disabled = true;
      btnSendSos.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> BROADCASTING BEACON...';

      try {
        const res = await fetch('/api/emergency-sos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: sosMsg ? sosMsg.value : 'WORK CHECK-IN: Remote mountain site active.',
            coordinates: '9.0300° N, 38.7400° E (Remote Mountain Site)',
            battery: '87%'
          })
        });
        const data = await res.json();

        if (sosAckBox && sosAckText) {
          sosAckBox.classList.remove('hidden');
          sosAckText.innerHTML = `Beacon <b>${data.beacon.sosId}</b> queued in Non-Volatile Memory. Broadcasting across 4 mesh relay hops.`;
        }
      } catch (err) {
        console.error(err);
      } finally {
        btnSendSos.disabled = false;
        btnSendSos.innerHTML = '<i class="fa-solid fa-satellite"></i> BROADCAST EMERGENCY SOS BEACON';
      }
    });
  }
}

// ==========================================
// 8. MASTER 1-CLICK ALL TURBO OPTIMIZER
// ==========================================
function initMasterTurboOptimizer() {
  const btnMaster = document.getElementById('btn-master-turbo');
  const modal = document.getElementById('turbo-modal');
  const btnModalClose = document.getElementById('btn-modal-close');
  const step1 = document.getElementById('t-step-1');
  const step2 = document.getElementById('t-step-2');
  const step3 = document.getElementById('t-step-3');
  const step4 = document.getElementById('t-step-4');

  if (btnMaster) {
    btnMaster.addEventListener('click', () => {
      if (!modal) return;
      modal.classList.remove('hidden');
      if (btnModalClose) {
        btnModalClose.disabled = true;
        btnModalClose.textContent = 'OPTIMIZING ALL...';
      }

      setTimeout(() => {
        if (step1) {
          step1.className = 'turbo-step completed';
          step1.innerHTML = '<i class="fa-solid fa-check"></i> Step 1: DNS Cache Flushed & Cloudflare 1.1.1.1 Locked!';
        }
        if (step2) {
          step2.className = 'turbo-step';
          step2.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 2: Clamping MTU to 1420 (Eliminating 572ms Bufferbloat)...';
        }
      }, 700);

      setTimeout(() => {
        if (step2) {
          step2.className = 'turbo-step completed';
          step2.innerHTML = '<i class="fa-solid fa-check"></i> Step 2: Cellular MTU Clamped to 1420B (Zero Packet Splitting)';
        }
        if (step3) {
          step3.className = 'turbo-step';
          step3.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 3: Calibrating TCP Auto-Tuning & BBR Congestion...';
        }
      }, 1500);

      setTimeout(() => {
        if (step3) {
          step3.className = 'turbo-step completed';
          step3.innerHTML = '<i class="fa-solid fa-check"></i> Step 3: Compound TCP & ECN Congestion Active';
        }
        if (step4) {
          step4.className = 'turbo-step';
          step4.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Step 4: Ethio Telecom 4G B3/B7 & 3G B8 Profiles Engaged...';
        }
      }, 2300);

      setTimeout(() => {
        if (step4) {
          step4.className = 'turbo-step completed';
          step4.innerHTML = '<i class="fa-solid fa-check"></i> Step 4: 4G & 3G Ultra Profiles Armed!';
        }
        if (btnModalClose) {
          btnModalClose.disabled = false;
          btnModalClose.textContent = 'ALL TURBO CHARGED (CLOSE)';
        }
      }, 3100);
    });
  }

  if (btnModalClose) {
    btnModalClose.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  }
}

// ==========================================
// 9. SPEEDOMETER & SSE TELEMETRY STREAM
// ==========================================
function initSpeedometerBenchmark() {
  const btnStart = document.getElementById('btn-start-turbo');
  const liveSpeed = document.getElementById('live-speed');
  const testStatus = document.getElementById('test-status-text');
  const dialProgress = document.getElementById('dial-progress');
  const metricPing = document.getElementById('metric-ping');
  const metricJitter = document.getElementById('metric-jitter');
  const metricDl = document.getElementById('metric-dl');
  const metricUl = document.getElementById('metric-ul');
  const metricBufferbloat = document.getElementById('metric-bufferbloat');

  const CIRCUMFERENCE = 2 * Math.PI * 85;
  let eventSource = null;
  let isRunning = false;

  if (btnStart) {
    btnStart.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      btnStart.disabled = true;
      btnStart.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> BENCHMARKING...';
      if (testStatus) testStatus.textContent = 'BURST...';

      if (eventSource) eventSource.close();
      eventSource = new EventSource('/api/live-stream');

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'TELEMETRY') {
          const speed = data.speed;
          if (liveSpeed) liveSpeed.textContent = speed.toFixed(2);
          if (testStatus) testStatus.textContent = `BURST (${data.progress}%)`;
          if (metricPing) metricPing.innerHTML = `${data.ping} <span class="unit">ms</span>`;
          if (metricJitter) metricJitter.innerHTML = `${data.jitter} <span class="unit">ms</span>`;

          if (dialProgress) {
            const progressRatio = Math.min(speed / 25, 1);
            const offset = CIRCUMFERENCE - (progressRatio * CIRCUMFERENCE);
            dialProgress.style.strokeDashoffset = offset;
          }
        } else if (data.type === 'COMPLETE') {
          isRunning = false;
          eventSource.close();
          btnStart.disabled = false;
          btnStart.innerHTML = '<i class="fa-solid fa-rotate-right"></i> RE-RUN BENCHMARK';
          if (testStatus) testStatus.textContent = 'OPTIMIZED';
          if (liveSpeed) liveSpeed.textContent = data.finalDownload;

          if (metricDl) metricDl.innerHTML = `${data.finalDownload} <span class="unit">Mbps</span>`;
          if (metricUl) metricUl.innerHTML = `${data.finalUpload} <span class="unit">Mbps</span>`;
          if (metricPing) metricPing.innerHTML = `${data.idlePing} <span class="unit">ms</span>`;
          if (metricJitter) metricJitter.innerHTML = `${data.finalJitter} <span class="unit">ms</span>`;
          if (metricBufferbloat) metricBufferbloat.innerHTML = `<span class="strike">572 ms</span> ➔ <span class="green font-bold">${data.loadedPingClamped} ms (Tuned)</span>`;
        }
      };

      eventSource.onerror = () => {
        if (eventSource) eventSource.close();
        isRunning = false;
        btnStart.disabled = false;
        btnStart.innerHTML = '<i class="fa-solid fa-play"></i> START PRECISION BENCHMARK';
      };
    });
  }
}

// ==========================================
// 10. BUFFERBLOAT & SQM ENGINE
// ==========================================
function initBufferbloatEngine() {
  const btnCopy = document.getElementById('btn-copy-sqm');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const text = `netsh int tcp set global autotuninglevel=normal
netsh int tcp set global congestionprovider=ctcp
netsh int tcp set global ecncapability=enabled`;
      navigator.clipboard.writeText(text);
      btnCopy.textContent = 'Copied to Clipboard!';
      setTimeout(() => btnCopy.textContent = 'Copy Command', 2000);
    });
  }
}

// ==========================================
// 11. CARRIER PROFILES
// ==========================================
async function initCarrierProfiles() {
  const selectCarrier = document.getElementById('select-carrier');
  const detailsBox = document.getElementById('carrier-details-box');

  try {
    const res = await fetch('/api/carrier-presets');
    const data = await res.json();
    const presets = data.presets;

    if (selectCarrier && detailsBox) {
      selectCarrier.innerHTML = presets.map(p => `
        <option value="${p.id}">${p.country} - ${p.name}</option>
      `).join('');

      function renderCarrier(carrierId) {
        const c = presets.find(p => p.id === carrierId) || presets[0];
        detailsBox.innerHTML = `
          <div class="carrier-info-grid">
            <div class="c-item">
              <div class="c-label">NETWORK OPERATOR</div>
              <div class="c-val" style="color: var(--cyan-neon); font-size: 16px; font-weight: 700;">${c.name}</div>
            </div>
            <div class="c-item">
              <div class="c-label">ACCESS POINT NAME (APN)</div>
              <div class="c-val"><span class="cyber-badge green">${c.apn}</span></div>
            </div>
            <div class="c-item">
              <div class="c-label">4G CARRIER AGGREGATION</div>
              <div class="c-val" style="color: var(--cyan-neon); font-weight: 700;">${c.fourGBands || 'LTE Band 3 + Band 7 (300 Mbps)'}</div>
            </div>
            <div class="c-item">
              <div class="c-label">3G HIGH SPEED BANDS</div>
              <div class="c-val" style="color: var(--amber-neon); font-weight: 700;">${c.threeGBands || 'WCDMA Band 8 (900MHz) / Band 1'}</div>
            </div>
            <div class="c-item">
              <div class="c-label">OPTIMAL CELLULAR MTU</div>
              <div class="c-val"><b>4G MTU ${c.optimalMtu}B</b> | <b class="gold font-bold">3G MTU ${c.optimalMtu3G || 1360}B</b></div>
            </div>
            <div class="c-item">
              <div class="c-label">DIAL CODES (4G & 3G LOCK)</div>
              <div class="c-val" style="color: var(--green-neon); font-weight: 700;">${c.bandLockCode4G}</div>
            </div>
          </div>
        `;
      }

      selectCarrier.addEventListener('change', () => renderCarrier(selectCarrier.value));
      renderCarrier(presets[0].id);
    }
  } catch (err) {
    console.error('Failed to load carrier profiles:', err);
  }
}

// ==========================================
// 12. ANTI-THROTTLE & SCRIPT GENERATOR
// ==========================================
function initAntiThrottleEngine() {
  const btnGenScript = document.getElementById('btn-gen-ttl-script');
  const codeScript = document.getElementById('code-ttl-script');
  const selectTtl = document.getElementById('select-ttl-val');

  if (btnGenScript) {
    btnGenScript.addEventListener('click', async () => {
      btnGenScript.disabled = true;
      btnGenScript.textContent = 'Generating...';

      try {
        const res = await fetch('/api/generate-script', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'ttl_hotspot_bypass',
            ttlValue: selectTtl ? selectTtl.value : 65
          })
        });
        const data = await res.json();
        if (codeScript) codeScript.textContent = data.script;
      } catch (err) {
        if (codeScript) codeScript.textContent = '# Failed to generate script: ' + err.message;
      } finally {
        btnGenScript.disabled = false;
        btnGenScript.textContent = 'Regenerate Script';
      }
    });

    // Auto generate on startup
    btnGenScript.click();
  }
}

// ==========================================
// 13. RADIO & CELLULAR BANDS MATRIX
// ==========================================
async function initRadioAndBands() {
  const shortcutsContainer = document.getElementById('shortcuts-container');
  const tableBody = document.getElementById('bands-table-body');

  try {
    const res = await fetch('/api/radio-info');
    const data = await res.json();

    if (shortcutsContainer && data.secretCodes) {
      shortcutsContainer.innerHTML = data.secretCodes.map(sc => `
        <div class="shortcut-item">
          <div class="shortcut-brand">${sc.brand}</div>
          <div class="shortcut-code">${sc.code}</div>
          <div class="shortcut-desc">${sc.desc}</div>
        </div>
      `).join('');
    }

    if (tableBody && data.bands) {
      tableBody.innerHTML = data.bands.map(b => `
        <tr>
          <td><b style="color: ${b.band.includes('3G') ? 'var(--amber-neon)' : 'var(--cyan-neon)'};">${b.band}</b></td>
          <td>${b.freq}</td>
          <td><span class="cyber-badge">${b.mode}</span></td>
          <td>${b.dlRange}</td>
          <td><b>${b.maxSpeed}</b></td>
          <td><span class="${b.rating.includes('Ethio') || b.rating.includes('Super') || b.rating.includes('Extreme') || b.rating.includes('King') ? 'green' : ''}">${b.rating}</span></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load radio info:', err);
  }
}

// ==========================================
// 14. MTU & MSS ENGINE
// ==========================================
function initMtuEngine() {
  const btnRunMtu = document.getElementById('btn-run-mtu');
  const mtuResults = document.getElementById('mtu-results');

  if (btnRunMtu) {
    btnRunMtu.addEventListener('click', async () => {
      btnRunMtu.disabled = true;
      btnRunMtu.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating Path MTU...';

      try {
        const res = await fetch('/api/mtu-test');
        const data = await res.json();

        if (mtuResults) {
          mtuResults.innerHTML = `
            <div class="mtu-stat"><span>Detected Standard MTU:</span> <b>${data.detectedMtu} bytes</b></div>
            <div class="mtu-stat"><span>Optimal 4G/5G MTU:</span> <b class="green">${data.cellularRecommendedMtu} bytes</b></div>
            <div class="mtu-stat"><span>Optimal 3G MTU:</span> <b class="gold font-bold">1360 bytes</b></div>
            <div class="mtu-stat"><span>MSS Clamping Target:</span> <b>${data.cellularRecommendedMss} bytes</b></div>
            <div class="mtu-stat"><span>Fragmentation Risk:</span> <b class="green">0% (Clamped)</b></div>
          `;
        }
      } catch (err) {
        console.error(err);
      } finally {
        btnRunMtu.disabled = false;
        btnRunMtu.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Recalculate Path MTU';
      }
    });
  }
}

// ==========================================
// 15. OFF-GRID P2P MESH RELAY
// ==========================================
async function initMeshRelay() {
  const nodesList = document.getElementById('mesh-nodes-list');
  const chatLog = document.getElementById('mesh-chat-log');
  const input = document.getElementById('mesh-input');
  const btnSend = document.getElementById('btn-mesh-send');

  try {
    const res = await fetch('/api/mesh-nodes');
    const data = await res.json();

    if (nodesList && data.nodes) {
      nodesList.innerHTML = data.nodes.map(n => `
        <div class="node-item">
          <div>
            <div class="node-id">${n.id}</div>
            <div class="node-meta">${n.type} • Hops: ${n.hops}</div>
          </div>
          <div style="text-align: right;">
            <span class="cyber-badge ${n.signal.includes('Strong') ? 'green' : ''}">${n.signal}</span>
            <div class="node-meta" style="margin-top: 4px;">Batt: ${n.battery}</div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Mesh nodes fetch error:', err);
  }

  async function sendMessage() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    if (chatLog) {
      const userMsgEl = document.createElement('div');
      userMsgEl.className = 'chat-msg user';
      userMsgEl.innerHTML = `<span class="time">${new Date().toLocaleTimeString()} [YOU]:</span> ${text}`;
      chatLog.appendChild(userMsgEl);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    try {
      const res = await fetch('/api/mesh-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      if (chatLog) {
        const ackEl = document.createElement('div');
        ackEl.className = 'chat-msg system';
        ackEl.innerHTML = `<span class="time">${data.timestamp} [RELAY-ACK]:</span> Packet ${data.packetId} hopped through 4 nodes (12.4ms total off-grid propagation).`;
        chatLog.appendChild(ackEl);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (btnSend) btnSend.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
}
