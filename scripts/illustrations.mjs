import { MAP_PINS } from './news-data.mjs';

function project([lon, lat]) {
  const x = ((lon + 170) / 350) * 488;
  const y = ((76 - lat) / 134) * 204;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function polyPath(coords) {
  return 'M ' + coords.map(project).join(' L ') + ' Z';
}

function pointXY(lon, lat) {
  const x = ((lon + 170) / 350) * 488;
  const y = ((76 - lat) / 134) * 204;
  return { x, y };
}

const CONTINENTS = [
  [[-166,65],[-162,71],[-135,70],[-112,73],[-90,71],[-78,63],[-64,60],[-53,48],[-66,44],[-75,35],[-81,25],[-83,30],[-90,29],[-97,26],[-96,19],[-88,21],[-84,11],[-78,8],[-82,9],[-92,14],[-105,20],[-112,28],[-117,32],[-124,42],[-125,49],[-136,58],[-152,60],[-166,65]],
  [[-55,61],[-44,60],[-20,70],[-18,81],[-52,82],[-68,76],[-55,61]],
  [[-84,22],[-75,20],[-74,21],[-84,23],[-84,22]],
  [[-78,9],[-72,12],[-62,10],[-50,1],[-35,-6],[-38,-14],[-41,-22],[-52,-33],[-64,-41],[-68,-54],[-74,-52],[-73,-40],[-71,-28],[-70,-18],[-78,-12],[-81,-5],[-78,4],[-78,9]],
  [[-6,50],[1,51],[1,54],[-2,58],[-6,58],[-6,50]],
  [[-10,52],[-6,52],[-6,55],[-10,54],[-10,52]],
  [[-9,37],[-9,43],[-2,43],[-4,48],[2,51],[8,54],[8,58],[5,61],[14,68],[28,71],[32,69],[28,60],[22,60],[18,59],[13,55],[20,55],[24,57],[28,60],[34,60],[44,58],[48,46],[39,47],[34,45],[29,41],[26,40],[23,37],[19,40],[15,38],[12,42],[9,44],[4,43],[0,39],[-5,36],[-9,37]],
  [[-6,35],[10,37],[12,33],[24,32],[33,31],[39,21],[43,12],[51,12],[49,4],[41,-2],[40,-11],[35,-24],[28,-33],[18,-35],[14,-23],[12,-12],[9,4],[2,6],[-8,5],[-17,15],[-16,23],[-10,30],[-6,35]],
  [[44,-25],[47,-25],[50,-15],[49,-12],[44,-18],[44,-25]],
  [[28,41],[36,37],[35,31],[43,13],[54,17],[60,22],[56,26],[50,30],[45,38],[53,40],[55,46],[62,55],[72,72],[104,76],[140,72],[172,66],[162,55],[142,54],[135,44],[129,35],[126,38],[122,40],[118,39],[122,31],[114,22],[108,20],[109,12],[103,2],[100,6],[98,16],[91,22],[85,19],[80,10],[77,8],[72,20],[67,25],[60,25],[56,26],[49,29],[48,30],[40,42],[28,41]],
  [[130,32],[134,34],[140,36],[141,41],[145,44],[141,45],[139,38],[135,35],[130,32]],
  [[96,5],[105,-6],[114,-8],[105,-7],[96,5]],
  [[109,1],[118,5],[118,-3],[110,-3],[109,1]],
  [[132,-2],[141,-3],[149,-9],[143,-9],[132,-2]],
  [[114,-22],[122,-17],[131,-12],[136,-12],[136,-15],[141,-17],[143,-11],[149,-20],[153,-28],[150,-37],[141,-38],[136,-35],[129,-32],[122,-34],[115,-34],[113,-26],[114,-22]],
  [[173,-35],[178,-38],[175,-41],[167,-46],[172,-43],[175,-40],[173,-35]],
];

export function renderWorldMapSvg() {
  const graticule = [];
  for (let lon = -150; lon <= 150; lon += 30) {
    const x = ((lon + 170) / 350) * 488;
    graticule.push(`<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="204" stroke="#d5ccb4" stroke-width="0.7" stroke-dasharray="2,2"/>`);
  }
  for (let lat = -30; lat <= 60; lat += 30) {
    const y = ((76 - lat) / 134) * 204;
    const isEq = lat === 0;
    graticule.push(`<line x1="0" y1="${y.toFixed(1)}" x2="488" y2="${y.toFixed(1)}" stroke="${isEq ? '#c1b497' : '#d5ccb4'}" stroke-width="${isEq ? '1' : '0.7'}" stroke-dasharray="${isEq ? 'none' : '2,2'}"/>`);
  }

  const landPaths = CONTINENTS.map(
    (c) => `<path d="${polyPath(c)}" fill="#e4d9be" stroke="#706451" stroke-width="1.1" stroke-linejoin="round"/>`
  ).join('');

  const flashCoords = [
    { lon: 55.5, lat: 26.2, r: 14 },
    { lon: 30.5, lat: 50.4, r: 12 },
    { lon: 100.3, lat: 40.9, r: 12 },
  ];
  const rings = flashCoords
    .map((f) => {
      const p = pointXY(f.lon, f.lat);
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${f.r}" fill="none" stroke="#9b1c1c" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.85"/>`;
    })
    .join('');

  const offsets = {
    1: [0, -2],
    2: [3, 2],
    4: [2, 5],
    6: [-6, 4],
    8: [8, 0],
    9: [-2, -8],
    11: [8, -2],
    12: [-9, -3],
    13: [4, -10],
    14: [7, 0],
    15: [-6, 3],
    18: [8, -2],
    20: [-3, 9],
  };

  const pins = MAP_PINS.map((pin) => {
    const p = pointXY(pin.lon, pin.lat);
    const [dx, dy] = offsets[pin.id] || [0, 0];
    const cx = Math.min(477, Math.max(11, p.x + dx));
    const cy = Math.min(193, Math.max(11, p.y + dy));
    return `
      <g>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="7.8" fill="${pin.color}" stroke="#faf5e8" stroke-width="1.2"/>
        <text x="${cx.toFixed(1)}" y="${(cy + 3.1).toFixed(1)}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="9.2" font-weight="900" fill="#ffffff">${pin.id}</text>
      </g>`;
  }).join('');

  return `
  <svg viewBox="0 0 488 204" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;background:#edf3f6;border:1.5px solid #8f846f;">
    ${graticule.join('')}
    ${landPaths}
    ${rings}
    <text x="172" y="76" font-family="Georgia, serif" font-size="9" font-style="italic" fill="#6b8391" letter-spacing="1.8">ATLANTIC</text>
    <text x="30" y="130" font-family="Georgia, serif" font-size="9" font-style="italic" fill="#6b8391" letter-spacing="1.8">PACIFIC</text>
    <text x="330" y="150" font-family="Georgia, serif" font-size="9" font-style="italic" fill="#6b8391" letter-spacing="1.8">INDIAN</text>
    ${pins}
    <rect x="6" y="179" width="230" height="20" rx="2.5" fill="#faf5e8" fill-opacity="0.95" stroke="#8f846f" stroke-width="0.9"/>
    <circle cx="17" cy="189" r="4.5" fill="#9b1c1c"/><text x="25" y="192.5" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#141210">CRISIS</text>
    <circle cx="77" cy="189" r="4.5" fill="#16324f"/><text x="85" y="192.5" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#141210">MARKETS/POL</text>
    <circle cx="164" cy="189" r="4.5" fill="#1e5b3f"/><text x="172" y="192.5" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#141210">SCI/SPORT</text>
  </svg>`;
}

// BIG Scene 1: Shenzhou-24 Rocket + Tiangong Station (246 x 110)
export function sceneShenzhouLarge() {
  return `
  <svg viewBox="0 0 246 106" width="100%" height="106" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:linear-gradient(135deg,#0c1c30,#16324f);">
    <defs>
      <linearGradient id="plumeBig" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#facc15"/><stop offset="50%" stop-color="#f97316"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="16" r="1.4" fill="#fff"/><circle cx="62" cy="28" r="1.1" fill="#fde68a"/><circle cx="110" cy="12" r="1.3" fill="#fff"/>
    <circle cx="160" cy="22" r="1" fill="#fff"/><circle cx="222" cy="14" r="1.4" fill="#fde68a"/><circle cx="204" cy="68" r="1.1" fill="#fff"/>
    <!-- Earth horizon -->
    <path d="M 0 96 Q 123 70 246 92 L 246 106 L 0 106 Z" fill="#1d4ed8" fill-opacity="0.35" stroke="#60a5fa" stroke-width="1.2"/>
    <!-- Orbital arc -->
    <path d="M 16 74 Q 120 18 228 32" fill="none" stroke="#93c5fd" stroke-width="1.3" stroke-dasharray="4,3"/>
    <!-- Tiangong -->
    <g transform="translate(194,28) rotate(-8)">
      <rect x="-18" y="-5" width="36" height="10" rx="2" fill="#f1f5f9" stroke="#0f172a" stroke-width="1"/>
      <rect x="-30" y="-14" width="18" height="6" fill="#3b82f6" stroke="#bfdbfe" stroke-width="0.8"/>
      <rect x="-30" y="8" width="18" height="6" fill="#3b82f6" stroke="#bfdbfe" stroke-width="0.8"/>
      <rect x="12" y="-14" width="18" height="6" fill="#3b82f6" stroke="#bfdbfe" stroke-width="0.8"/>
      <rect x="12" y="8" width="18" height="6" fill="#3b82f6" stroke="#bfdbfe" stroke-width="0.8"/>
    </g>
    <!-- Rocket & Plume -->
    <polygon points="22,60 88,42 88,54" fill="url(#plumeBig)"/>
    <g transform="translate(114,44) rotate(14)">
      <rect x="-34" y="-5.5" width="54" height="11" fill="#f8fafc" stroke="#1e293b" stroke-width="1.2"/>
      <polygon points="20,-5.5 34,0 20,5.5" fill="#dc2626"/>
      <rect x="-30" y="-9.5" width="20" height="4" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.8"/>
      <rect x="-30" y="5.5" width="20" height="4" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.8"/>
      <rect x="4" y="-5.5" width="5" height="11" fill="#dc2626"/>
    </g>
    <rect x="6" y="81" width="206" height="19" rx="2" fill="#0b1726" fill-opacity="0.92" stroke="#f59e0b" stroke-width="1"/>
    <text x="14" y="94" font-family="Segoe UI, Arial, sans-serif" font-size="10.2" font-weight="900" fill="#fde68a">SHENZHOU-24 · CN + PK CREW</text>
  </svg>`;
}

// BIG Scene 2: KOSPI 5,006 -> 4,697 + Nvidia +31% Chip (246 x 106)
export function sceneMarketsLarge() {
  return `
  <svg viewBox="0 0 246 106" width="100%" height="106" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f4efe0;">
    <line x1="10" y1="24" x2="162" y2="24" stroke="#d5ccb4" stroke-width="0.9"/>
    <line x1="10" y1="48" x2="162" y2="48" stroke="#d5ccb4" stroke-width="0.9"/>
    <line x1="10" y1="72" x2="162" y2="72" stroke="#d5ccb4" stroke-width="0.9"/>
    <!-- Peak 5,006 then drop 4,697 -->
    <polygon points="12,56 38,44 64,28 84,22 104,44 128,58 156,76 156,82 12,82" fill="#9b1c1c" fill-opacity="0.16"/>
    <polyline points="12,56 38,44 64,28 84,22" fill="none" stroke="#1e5b3f" stroke-width="2.8" stroke-linejoin="round"/>
    <polyline points="84,22 104,44 128,58 156,76" fill="none" stroke="#9b1c1c" stroke-width="2.8" stroke-linejoin="round"/>
    <circle cx="84" cy="22" r="4" fill="#1e5b3f"/><circle cx="156" cy="76" r="4" fill="#9b1c1c"/>
    <text x="84" y="15" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.5" font-weight="900" fill="#1e5b3f">5,006 PEAK</text>
    <text x="128" y="88" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.5" font-weight="900" fill="#9b1c1c">4,697 (-6.2%)</text>
    <text x="10" y="99" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#16324f">BTC $59.2K · NASDAQ -1.5%</text>
    <!-- AI GPU Die -->
    <g transform="translate(204,50)">
      <rect x="-32" y="-30" width="64" height="60" rx="5" fill="#16324f" stroke="#141210" stroke-width="1.4"/>
      <rect x="-24" y="-19" width="48" height="38" rx="3" fill="#b4690e" stroke="#faf5e8" stroke-width="1.1"/>
      <text x="0" y="-3" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.5" font-weight="900" fill="#fff">NVDA</text>
      <text x="0" y="9" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.8" font-weight="900" fill="#fde68a">+31% SWING</text>
      <line x1="-38" y1="-15" x2="-32" y2="-15" stroke="#141210" stroke-width="2.2"/><line x1="-38" y1="0" x2="-32" y2="0" stroke="#141210" stroke-width="2.2"/><line x1="-38" y1="15" x2="-32" y2="15" stroke="#141210" stroke-width="2.2"/>
      <line x1="32" y1="-15" x2="38" y2="-15" stroke="#141210" stroke-width="2.2"/><line x1="32" y1="0" x2="38" y2="0" stroke="#141210" stroke-width="2.2"/><line x1="32" y1="15" x2="38" y2="15" stroke="#141210" stroke-width="2.2"/>
    </g>
  </svg>`;
}

// BIG Scene 3: Americas North (Capitol $5B Shield + CIA/ODNI OSINT Breach) (324 x 82)
export function sceneAmericasLarge() {
  return `
  <svg viewBox="0 0 324 82" width="100%" height="82" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f3ede0;">
    <!-- Capitol -->
    <rect x="28" y="38" width="84" height="16" fill="#16324f"/>
    <path d="M 46 38 A 24 24 0 0 1 94 38 Z" fill="#334155"/>
    <line x1="70" y1="8" x2="70" y2="15" stroke="#141210" stroke-width="2"/>
    <text x="70" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.6" font-weight="900" fill="#16324f">$5B GOLDEN DOME</text>
    <line x1="152" y1="8" x2="152" y2="74" stroke="#b5aa93" stroke-width="1.4"/>
    <!-- Cyber Shield (CIA/ODNI OSINT) -->
    <path d="M 186 12 L 240 12 L 240 36 C 240 50 213 58 213 58 C 213 58 186 50 186 36 Z" fill="#9b1c1c" stroke="#141210" stroke-width="1.3"/>
    <text x="213" y="31" text-anchor="middle" font-family="Segoe UI, Arial" font-size="10" font-weight="900" fill="#fff">OSINT</text>
    <text x="213" y="43" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="800" fill="#fde68a">BREACH</text>
    <text x="242" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.6" font-weight="900" fill="#9b1c1c">CIA · ODNI · NGA</text>
    <!-- Terminal monitor lines -->
    <rect x="256" y="14" width="52" height="36" rx="3" fill="#0f172a" stroke="#141210" stroke-width="1.2"/>
    <line x1="263" y1="24" x2="298" y2="24" stroke="#fca5a5" stroke-width="2"/>
    <line x1="263" y1="32" x2="290" y2="32" stroke="#fde68a" stroke-width="2"/>
    <line x1="263" y1="40" x2="300" y2="40" stroke="#93c5fd" stroke-width="2"/>
  </svg>`;
}

// BIG Scene 8: Americas Court & Rescue (Huawei Jury + Cartagena Dawn Raid) (324 x 82)
export function sceneAmericasSouthLarge() {
  return `
  <svg viewBox="0 0 324 82" width="100%" height="82" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f3ede0;">
    <!-- Justice Scales -->
    <line x1="76" y1="10" x2="76" y2="54" stroke="#141210" stroke-width="2.2"/>
    <line x1="44" y1="18" x2="108" y2="18" stroke="#b4690e" stroke-width="2.2"/>
    <polygon points="44,18 35,38 53,38" fill="none" stroke="#141210" stroke-width="1.4"/>
    <polygon points="108,18 99,38 117,38" fill="none" stroke="#141210" stroke-width="1.4"/>
    <rect x="54" y="52" width="44" height="5" fill="#141210"/>
    <text x="76" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.4" font-weight="900" fill="#9b1c1c">HUAWEI FRAUD VERDICT</text>
    <line x1="158" y1="8" x2="158" y2="74" stroke="#b5aa93" stroke-width="1.4"/>
    <!-- Cartagena Rescue Chopper -->
    <g transform="translate(240,26)">
      <ellipse cx="0" cy="0" rx="24" ry="9.5" fill="#1e5b3f"/>
      <line x1="-32" y1="-13" x2="32" y2="-13" stroke="#141210" stroke-width="2"/>
      <line x1="24" y1="0" x2="44" y2="-5" stroke="#1e5b3f" stroke-width="3"/>
      <polygon points="-8,9 -28,34 12,34" fill="#f59e0b" fill-opacity="0.36"/>
    </g>
    <text x="242" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.4" font-weight="900" fill="#1e5b3f">CARTAGENA · 30 RESCUED</text>
  </svg>`;
}

// BIG Scene 4: Europe Grid Blackout + UK +26% Cap (324 x 86)
export function sceneEuropeLarge() {
  return `
  <svg viewBox="0 0 324 86" width="100%" height="86" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f1ece0;">
    <g stroke="#1e293b" stroke-width="2" fill="none">
      <line x1="48" y1="10" x2="33" y2="64"/>
      <line x1="48" y1="10" x2="63" y2="64"/>
      <line x1="28" y1="24" x2="68" y2="24"/>
      <line x1="25" y1="40" x2="71" y2="40"/>
    </g>
    <polygon points="94,14 80,38 92,38 84,60 108,32 95,32" fill="#9b1c1c" stroke="#141210" stroke-width="1"/>
    <text x="66" y="77" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.8" font-weight="900" fill="#9b1c1c">5 REGIONS BLACKOUT</text>
    <line x1="158" y1="8" x2="158" y2="78" stroke="#b5aa93" stroke-width="1.4"/>
    <path d="M 192 58 A 48 48 0 0 1 288 58" fill="none" stroke="#1e5b3f" stroke-width="9"/>
    <path d="M 226 12 A 48 48 0 0 1 288 58" fill="none" stroke="#9b1c1c" stroke-width="9"/>
    <line x1="240" y1="58" x2="279" y2="28" stroke="#141210" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="240" cy="58" r="5" fill="#141210"/>
    <text x="240" y="77" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.8" font-weight="900" fill="#9b1c1c">UK CAP +26% · £2,166</text>
  </svg>`;
}

// BIG Scene 5: Middle East Refinery & Hormuz Tanker (324 x 84)
export function sceneHormuzLarge() {
  return `
  <svg viewBox="0 0 324 84" width="100%" height="84" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f7efe1;">
    <rect x="18" y="24" width="14" height="36" fill="#334155"/>
    <rect x="38" y="16" width="9" height="44" fill="#475569"/>
    <polygon points="38,16 42.5,4 47,16" fill="#dc2626"/>
    <circle cx="42.5" cy="8" r="6.5" fill="#f59e0b" fill-opacity="0.9"/>
    <path d="M 48 8 Q 64 2 76 12" fill="none" stroke="#64748b" stroke-width="2"/>
    <path d="M 0 60 Q 24 55 48 60 T 96 60 T 144 60 T 192 60 T 240 60 T 324 60 L 324 84 L 0 84 Z" fill="#16324f"/>
    <polygon points="104,57 216,57 228,46 98,46" fill="#1e293b"/>
    <rect x="114" y="34" width="24" height="12" fill="#e2e8f0" stroke="#1e293b" stroke-width="1"/>
    <rect x="148" y="42" width="54" height="4" fill="#9b1c1c"/>
    <polygon points="212,51 222,34 228,46 239,36 233,51 245,55 227,57" fill="#ef4444" stroke="#facc15" stroke-width="1"/>
    <circle cx="280" cy="26" r="18" fill="none" stroke="#9b1c1c" stroke-width="1.2" stroke-dasharray="3,2"/>
    <circle cx="280" cy="26" r="10" fill="none" stroke="#9b1c1c" stroke-width="1.2"/>
    <line x1="272" y1="26" x2="288" y2="26" stroke="#141210" stroke-width="1.8"/>
    <line x1="280" y1="18" x2="280" y2="34" stroke="#141210" stroke-width="1.8"/>
    <text x="162" y="77" text-anchor="middle" font-family="Segoe UI, Arial" font-size="10" font-weight="900" fill="#fde68a">RAS TANURA STRIKES · HORMUZ TANKER MINES</text>
  </svg>`;
}

// BIG Scene 6: Africa Ebola Alert + AFCON Senegal Trophy (324 x 86)
export function sceneAfricaLarge() {
  return `
  <svg viewBox="0 0 324 86" width="100%" height="86" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f3ede0;">
    <path d="M 20 12 L 60 12 L 60 38 C 60 54 40 64 40 64 C 40 64 20 54 20 38 Z" fill="#9b1c1c" stroke="#141210" stroke-width="1.3"/>
    <rect x="36" y="21" width="8" height="28" fill="#fff"/>
    <rect x="26" y="31" width="28" height="8" fill="#fff"/>
    <text x="72" y="28" font-family="Segoe UI, Arial" font-size="10.8" font-weight="900" fill="#9b1c1c">ITURI EBOLA: 11,613</text>
    <text x="72" y="45" font-family="Segoe UI, Arial" font-size="9.6" font-weight="800" fill="#141210">WHO TEAM TRAPPED · 5,678 DEAD</text>
    <text x="72" y="62" font-family="Segoe UI, Arial" font-size="9.6" font-weight="800" fill="#1e5b3f">AFCON RESTORED TO SENEGAL</text>
    <g transform="translate(284,42)">
      <path d="M -16,-22 L 16,-22 L 11,4 C 7,12 -7,12 -11,4 Z" fill="#d97706" stroke="#141210" stroke-width="1.3"/>
      <rect x="-4" y="10" width="8" height="10" fill="#b4690e"/>
      <rect x="-12" y="20" width="24" height="6" fill="#141210"/>
      <text x="0" y="-5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9" font-weight="900" fill="#fff">CAF</text>
    </g>
  </svg>`;
}

// BIG Scene 7: Voyager 1 + Global Sports (UCL / Qatar F1 / NBA) (324 x 84)
export function sceneSpaceSportsLarge() {
  return `
  <svg viewBox="0 0 324 84" width="100%" height="84" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#0e1f33;">
    <!-- Left Half: Voyager 1 -->
    <circle cx="26" cy="36" r="8" fill="#2563eb" stroke="#93c5fd" stroke-width="1.2"/>
    <line x1="36" y1="36" x2="112" y2="36" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="4,2.5"/>
    <g transform="translate(132,36)">
      <ellipse cx="-6" cy="0" rx="6" ry="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
      <line x1="0" y1="0" x2="26" y2="-13" stroke="#cbd5e1" stroke-width="1.6"/>
      <line x1="0" y1="4" x2="20" y2="17" stroke="#f59e0b" stroke-width="1.8"/>
    </g>
    <text x="84" y="16" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.5" font-weight="900" fill="#fde68a">VOYAGER 1 · 1 LIGHT-DAY</text>
    <text x="84" y="74" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#cbd5e1">25.9B KM · AI EXOPLANETS</text>
    <line x1="168" y1="8" x2="168" y2="76" stroke="#475569" stroke-width="1.2"/>
    <!-- Right Half: Sports -->
    <rect x="180" y="12" width="60" height="32" rx="2" fill="#1e5b3f" stroke="#faf5e8" stroke-width="1"/>
    <line x1="210" y1="12" x2="210" y2="44" stroke="#faf5e8" stroke-width="0.9"/>
    <circle cx="210" cy="28" r="7" fill="none" stroke="#faf5e8" stroke-width="0.9"/>
    <g transform="translate(282,28)">
      <polygon points="-24,6 20,6 28,0 16,-6 -12,-7 -22,-2" fill="#dc2626" stroke="#fff" stroke-width="0.8"/>
      <circle cx="-15" cy="7" r="5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2"/>
      <circle cx="12" cy="7" r="5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.2"/>
    </g>
    <text x="246" y="61" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9.2" font-weight="900" fill="#fde68a">UCL MD5 · QATAR F1</text>
    <text x="246" y="75" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="800" fill="#ffffff">NBA CUP · TATUM 41 PTS</text>
  </svg>`;
}
