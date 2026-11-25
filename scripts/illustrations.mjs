import { MAP_PINS } from './news-data.mjs';

function project([lon, lat]) {
  const x = ((lon + 170) / 350) * 474;
  const y = ((76 - lat) / 134) * 168;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function polyPath(coords) {
  return 'M ' + coords.map(project).join(' L ') + ' Z';
}

function pointXY(lon, lat) {
  const x = ((lon + 170) / 350) * 474;
  const y = ((76 - lat) / 134) * 168;
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
    const x = ((lon + 170) / 350) * 474;
    graticule.push(`<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="168" stroke="#d5ccb4" stroke-width="0.6" stroke-dasharray="2,2"/>`);
  }
  for (let lat = -30; lat <= 60; lat += 30) {
    const y = ((76 - lat) / 134) * 168;
    const isEq = lat === 0;
    graticule.push(`<line x1="0" y1="${y.toFixed(1)}" x2="474" y2="${y.toFixed(1)}" stroke="${isEq ? '#c1b497' : '#d5ccb4'}" stroke-width="${isEq ? '0.9' : '0.6'}" stroke-dasharray="${isEq ? 'none' : '2,2'}"/>`);
  }

  const landPaths = CONTINENTS.map(
    (c) => `<path d="${polyPath(c)}" fill="#e3d7bc" stroke="#6f634f" stroke-width="1" stroke-linejoin="round"/>`
  ).join('');

  const flashCoords = [
    { lon: 55.5, lat: 26.2, r: 12 },
    { lon: 30.5, lat: 50.4, r: 11 },
    { lon: 100.3, lat: 40.9, r: 11 },
  ];
  const rings = flashCoords
    .map((f) => {
      const p = pointXY(f.lon, f.lat);
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${f.r}" fill="none" stroke="#9b1c1c" stroke-width="1.3" stroke-dasharray="2.5,2" opacity="0.85"/>`;
    })
    .join('');

  const offsets = {
    1: [0, -2],
    2: [2, 2],
    4: [2, 4],
    6: [-6, 3],
    8: [8, -1],
    9: [4, -4],
    10: [-2, -6],
    11: [6, 0],
    14: [-4, 6],
    C: [8, -2],
    D: [-5, 3],
  };

  const pins = MAP_PINS.map((pin) => {
    const p = pointXY(pin.lon, pin.lat);
    const [dx, dy] = offsets[pin.id] || [0, 0];
    const cx = Math.min(464, Math.max(10, p.x + dx));
    const cy = Math.min(158, Math.max(10, p.y + dy));
    return `
      <g>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="6.8" fill="${pin.color}" stroke="#faf5e8" stroke-width="1.1"/>
        <text x="${cx.toFixed(1)}" y="${(cy + 2.6).toFixed(1)}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="8.1" font-weight="900" fill="#ffffff">${pin.id}</text>
      </g>`;
  }).join('');

  return `
  <svg viewBox="0 0 474 168" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;background:#ecf3f6;border:1.5px solid #8f846f;">
    ${graticule.join('')}
    ${landPaths}
    ${rings}
    <text x="166" y="64" font-family="Georgia, serif" font-size="8" font-style="italic" fill="#6b8391" letter-spacing="1.6">ATLANTIC</text>
    <text x="26" y="108" font-family="Georgia, serif" font-size="8" font-style="italic" fill="#6b8391" letter-spacing="1.6">PACIFIC</text>
    <text x="320" y="126" font-family="Georgia, serif" font-size="8" font-style="italic" fill="#6b8391" letter-spacing="1.6">INDIAN</text>
    ${pins}
    <rect x="5" y="146" width="212" height="17" rx="2" fill="#faf5e8" fill-opacity="0.95" stroke="#8f846f" stroke-width="0.8"/>
    <circle cx="15" cy="154.5" r="3.8" fill="#9b1c1c"/><text x="22" y="157.5" font-family="Segoe UI, Arial" font-size="7.6" font-weight="800" fill="#141210">CRISIS</text>
    <circle cx="68" cy="154.5" r="3.8" fill="#16324f"/><text x="75" y="157.5" font-family="Segoe UI, Arial" font-size="7.6" font-weight="800" fill="#141210">MARKETS/POL</text>
    <circle cx="148" cy="154.5" r="3.8" fill="#1e5b3f"/><text x="155" y="157.5" font-family="Segoe UI, Arial" font-size="7.6" font-weight="800" fill="#141210">SCI/SPORT</text>
  </svg>`;
}

// Scene 1: Shenzhou-24 Rocket + Tiangong Docking + CN/PK Flags (254 x 88)
export function sceneShenzhouRich() {
  return `
  <svg viewBox="0 0 254 88" width="100%" height="88" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:linear-gradient(140deg,#091628,#16324f);">
    <defs>
      <linearGradient id="plumeR" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fef08a"/><stop offset="45%" stop-color="#f97316"/><stop offset="100%" stop-color="#dc2626" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="earthGlow" cx="50%" cy="100%" r="80%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/><stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="18" cy="14" r="1.2" fill="#fff"/><circle cx="54" cy="22" r="0.9" fill="#fde68a"/><circle cx="96" cy="11" r="1.1" fill="#fff"/><circle cx="152" cy="16" r="0.9" fill="#fff"/><circle cx="236" cy="14" r="1.2" fill="#fde68a"/>
    <path d="M 0 78 Q 127 52 254 74 L 254 88 L 0 88 Z" fill="url(#earthGlow)"/>
    <path d="M 0 80 Q 127 56 254 76" fill="none" stroke="#60a5fa" stroke-width="1.3"/>
    <path d="M 14 62 Q 124 16 232 28" fill="none" stroke="#93c5fd" stroke-width="1" stroke-dasharray="3,2.5"/>
    <!-- Tiangong orbital station -->
    <g transform="translate(202,25) rotate(-8)">
      <rect x="-18" y="-4.5" width="36" height="9" rx="2" fill="#f1f5f9" stroke="#0f172a" stroke-width="0.9"/>
      <rect x="-6" y="-8" width="12" height="3.5" fill="#cbd5e1"/>
      <rect x="-29" y="-12" width="17" height="5" fill="#2563eb" stroke="#bfdbfe" stroke-width="0.7"/>
      <rect x="-29" y="7" width="17" height="5" fill="#2563eb" stroke="#bfdbfe" stroke-width="0.7"/>
      <rect x="12" y="-12" width="17" height="5" fill="#2563eb" stroke="#bfdbfe" stroke-width="0.7"/>
      <rect x="12" y="7" width="17" height="5" fill="#2563eb" stroke="#bfdbfe" stroke-width="0.7"/>
    </g>
    <!-- Exhaust plume & Long March-2F -->
    <polygon points="18,51 82,35 82,45" fill="url(#plumeR)"/>
    <g transform="translate(108,38) rotate(13)">
      <rect x="-30" y="-5" width="48" height="10" fill="#f8fafc" stroke="#1e293b" stroke-width="1.1"/>
      <polygon points="18,-5 31,0 18,5" fill="#dc2626"/>
      <rect x="-26" y="-8.5" width="18" height="3.5" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.7"/>
      <rect x="-26" y="5" width="18" height="3.5" fill="#cbd5e1" stroke="#1e293b" stroke-width="0.7"/>
      <rect x="3" y="-5" width="4.5" height="10" fill="#dc2626"/>
    </g>
    <!-- CN + PK Badges -->
    <rect x="6" y="66" width="18" height="12" fill="#dc2626" stroke="#fff" stroke-width="0.6"/>
    <circle cx="11" cy="70" r="1.8" fill="#fde047"/>
    <rect x="27" y="66" width="18" height="12" fill="#15803d" stroke="#fff" stroke-width="0.6"/>
    <rect x="27" y="66" width="4.5" height="12" fill="#fff"/>
    <circle cx="38" cy="72" r="2.5" fill="#fff"/>
    <rect x="50" y="65" width="196" height="16" rx="2" fill="#0b1726" fill-opacity="0.92" stroke="#f59e0b" stroke-width="0.9"/>
    <text x="148" y="76" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#fde68a">SHENZHOU-24 · CN + PK CREW</text>
  </svg>`;
}

// Scene 2: KOSPI Candlesticks + NVDA Silicon Die (254 x 88)
export function sceneMarketsRich() {
  return `
  <svg viewBox="0 0 254 88" width="100%" height="88" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f4efe0;">
    <line x1="8" y1="20" x2="168" y2="20" stroke="#d5ccb4" stroke-width="0.8"/>
    <line x1="8" y1="40" x2="168" y2="40" stroke="#d5ccb4" stroke-width="0.8"/>
    <line x1="8" y1="60" x2="168" y2="60" stroke="#d5ccb4" stroke-width="0.8"/>
    <!-- Candlesticks -->
    <line x1="22" y1="42" x2="22" y2="58" stroke="#1e5b3f" stroke-width="1.2"/><rect x="18" y="45" width="8" height="9" fill="#1e5b3f"/>
    <line x1="42" y1="31" x2="42" y2="49" stroke="#1e5b3f" stroke-width="1.2"/><rect x="38" y="34" width="8" height="11" fill="#1e5b3f"/>
    <line x1="64" y1="18" x2="64" y2="38" stroke="#1e5b3f" stroke-width="1.2"/><rect x="60" y="21" width="8" height="13" fill="#1e5b3f"/>
    <line x1="88" y1="14" x2="88" y2="30" stroke="#1e5b3f" stroke-width="1.2"/><rect x="84" y="17" width="8" height="8" fill="#1e5b3f"/>
    <line x1="112" y1="24" x2="112" y2="48" stroke="#9b1c1c" stroke-width="1.2"/><rect x="108" y="27" width="8" height="16" fill="#9b1c1c"/>
    <line x1="136" y1="38" x2="136" y2="62" stroke="#9b1c1c" stroke-width="1.2"/><rect x="132" y="42" width="8" height="15" fill="#9b1c1c"/>
    <line x1="158" y1="48" x2="158" y2="68" stroke="#9b1c1c" stroke-width="1.2"/><rect x="154" y="52" width="8" height="12" fill="#9b1c1c"/>
    <polyline points="22,49 42,39 64,27 88,20 112,35 136,49 158,58" fill="none" stroke="#141210" stroke-width="1.6"/>
    <text x="88" y="12" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#1e5b3f">5,006 PEAK</text>
    <text x="135" y="74" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#9b1c1c">4,697 (-6.2%)</text>
    <text x="8" y="84" font-family="Segoe UI, Arial" font-size="7.8" font-weight="800" fill="#16324f">BTC $59.2K · NASDAQ -1.5%</text>
    <!-- Glowing Nvidia GPU Die -->
    <g transform="translate(212,42)">
      <rect x="-31" y="-28" width="62" height="56" rx="4" fill="#16324f" stroke="#141210" stroke-width="1.3"/>
      <rect x="-24" y="-18" width="48" height="36" rx="2.5" fill="#b4690e" stroke="#fde68a" stroke-width="1"/>
      <text x="0" y="-3" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9" font-weight="900" fill="#fff">NVDA</text>
      <text x="0" y="9" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.6" font-weight="900" fill="#fde68a">+31% SWING</text>
      <line x1="-36" y1="-14" x2="-31" y2="-14" stroke="#141210" stroke-width="2"/><line x1="-36" y1="0" x2="-31" y2="0" stroke="#141210" stroke-width="2"/><line x1="-36" y1="14" x2="-31" y2="14" stroke="#141210" stroke-width="2"/>
      <line x1="31" y1="-14" x2="36" y2="-14" stroke="#141210" stroke-width="2"/><line x1="31" y1="0" x2="36" y2="0" stroke="#141210" stroke-width="2"/><line x1="31" y1="14" x2="36" y2="14" stroke="#141210" stroke-width="2"/>
    </g>
  </svg>`;
}

// Scene 3: Washington Capitol + Golden Dome Arc + CIA/ODNI Breach Terminal (326 x 78)
export function sceneWashingtonCyber() {
  return `
  <svg viewBox="0 0 326 78" width="100%" height="78" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:linear-gradient(180deg,#dce5ee,#f3ede0 70%);">
    <!-- Missile Defense Radar Arc -->
    <path d="M 14 56 Q 76 6 138 56" fill="none" stroke="#9b1c1c" stroke-width="1.3" stroke-dasharray="4,2.5"/>
    <path d="M 28 56 Q 76 18 124 56" fill="none" stroke="#16324f" stroke-width="1" stroke-dasharray="2.5,2"/>
    <polygon points="76,16 72,24 80,24" fill="#9b1c1c"/>
    <!-- Detailed Capitol Silhouette -->
    <rect x="26" y="48" width="100" height="12" fill="#16324f"/>
    <rect x="44" y="38" width="64" height="10" fill="#244261"/>
    <path d="M 54 38 A 22 22 0 0 1 98 38 Z" fill="#334155"/>
    <rect x="73" y="11" width="6" height="6" fill="#16324f"/>
    <line x1="76" y1="6" x2="76" y2="11" stroke="#141210" stroke-width="1.6"/>
    <text x="76" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#16324f">$5B GOLDEN DOME</text>
    <line x1="160" y1="6" x2="160" y2="72" stroke="#9e927c" stroke-width="1.2"/>
    <!-- Cyber Terminal + OSINT Breach Shield -->
    <rect x="174" y="10" width="84" height="48" rx="3" fill="#0f172a" stroke="#1e293b" stroke-width="1.2"/>
    <rect x="179" y="15" width="74" height="36" fill="#1e293b"/>
    <line x1="184" y1="23" x2="226" y2="23" stroke="#ef4444" stroke-width="2.2"/>
    <line x1="184" y1="31" x2="242" y2="31" stroke="#fde047" stroke-width="1.8"/>
    <line x1="184" y1="39" x2="234" y2="39" stroke="#60a5fa" stroke-width="1.8"/>
    <path d="M 270 12 L 314 12 L 314 34 C 314 47 292 54 292 54 C 292 54 270 47 270 34 Z" fill="#9b1c1c" stroke="#141210" stroke-width="1.2"/>
    <text x="292" y="30" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#fff">OSINT</text>
    <text x="292" y="41" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.5" font-weight="800" fill="#fde68a">BREACH</text>
    <text x="244" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#9b1c1c">CIA · ODNI · NGA BREACH</text>
  </svg>`;
}

// Scene 4: Huawei Courthouse & Cartagena Dawn Raid Chopper (326 x 76)
export function sceneCourtCartagena() {
  return `
  <svg viewBox="0 0 326 76" width="100%" height="76" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f3ede0;">
    <!-- Courthouse Columns + Brass Scales -->
    <polygon points="20,22 76,7 132,22" fill="#334155" stroke="#141210" stroke-width="1"/>
    <rect x="24" y="22" width="104" height="3.5" fill="#1e293b"/>
    <rect x="30" y="25.5" width="7" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="0.7"/>
    <rect x="115" y="25.5" width="7" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="0.7"/>
    <rect x="20" y="55.5" width="112" height="5" fill="#1e293b"/>
    <line x1="76" y1="26" x2="76" y2="54" stroke="#141210" stroke-width="1.8"/>
    <line x1="52" y1="32" x2="100" y2="32" stroke="#b4690e" stroke-width="1.8"/>
    <polygon points="52,32 45,46 59,46" fill="none" stroke="#141210" stroke-width="1.2"/>
    <polygon points="100,32 93,46 107,46" fill="none" stroke="#141210" stroke-width="1.2"/>
    <text x="76" y="70" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#9b1c1c">HUAWEI FRAUD VERDICT</text>
    <line x1="158" y1="6" x2="158" y2="70" stroke="#9e927c" stroke-width="1.2"/>
    <!-- Cartagena Dawn Sky, Palm, Storefront & Police Helicopter -->
    <rect x="164" y="6" width="156" height="53" fill="#16324f"/>
    <rect x="174" y="34" width="68" height="25" fill="#e2e8f0" stroke="#0f172a" stroke-width="0.9"/>
    <rect x="174" y="34" width="68" height="7" fill="#dc2626"/>
    <text x="208" y="39.5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="5.5" font-weight="900" fill="#fff">EXITO MARKET</text>
    <g transform="translate(268,20)">
      <ellipse cx="0" cy="0" rx="20" ry="8" fill="#22c55e" stroke="#0f172a" stroke-width="0.9"/>
      <line x1="-26" y1="-10" x2="26" y2="-10" stroke="#f8fafc" stroke-width="1.8"/>
      <line x1="20" y1="0" x2="36" y2="-4" stroke="#22c55e" stroke-width="2.5"/>
      <polygon points="-6,8 -38,39 10,39" fill="#fde047" fill-opacity="0.32"/>
    </g>
    <text x="242" y="70" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#1e5b3f">CARTAGENA · 30 RESCUED</text>
  </svg>`;
}

// Scene 5: Snowy Kyiv Blackout Skyline & UK +26% Dial (326 x 78)
export function sceneUkraineUkRich() {
  return `
  <svg viewBox="0 0 326 78" width="100%" height="78" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f1ece0;">
    <!-- Darkened Kyiv winter skyline -->
    <rect x="8" y="8" width="144" height="52" fill="#0f172a"/>
    <rect x="14" y="28" width="22" height="32" fill="#1e293b"/><rect x="40" y="20" width="26" height="40" fill="#334155"/><rect x="70" y="32" width="20" height="28" fill="#1e293b"/>
    <rect x="46" y="26" width="4" height="4" fill="#fde047"/><rect x="54" y="34" width="4" height="4" fill="#fde047"/>
    <!-- Shattered high-voltage pylon & lightning -->
    <g stroke="#cbd5e1" stroke-width="1.7" fill="none">
      <line x1="112" y1="12" x2="99" y2="60"/><line x1="112" y1="12" x2="125" y2="60"/>
      <line x1="94" y1="24" x2="130" y2="24"/><line x1="92" y1="38" x2="132" y2="38"/>
    </g>
    <polygon points="136,12 124,33 134,33 128,54 148,28 137,28" fill="#ef4444" stroke="#fef08a" stroke-width="0.9"/>
    <text x="80" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#9b1c1c">5 REGIONS BLACKOUT</text>
    <line x1="160" y1="6" x2="160" y2="72" stroke="#9e927c" stroke-width="1.2"/>
    <!-- Ofgem Meter Dial -->
    <path d="M 192 54 A 46 46 0 0 1 284 54" fill="none" stroke="#1e5b3f" stroke-width="8"/>
    <path d="M 224 10 A 46 46 0 0 1 284 54" fill="none" stroke="#dc2626" stroke-width="8"/>
    <line x1="238" y1="54" x2="275" y2="25" stroke="#141210" stroke-width="3" stroke-linecap="round"/>
    <circle cx="238" cy="54" r="4.5" fill="#141210"/>
    <text x="238" y="42" text-anchor="middle" font-family="Segoe UI, Arial" font-size="9" font-weight="900" fill="#9b1c1c">+26%</text>
    <text x="240" y="72" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.6" font-weight="900" fill="#9b1c1c">UK CAP £2,166</text>
  </svg>`;
}

// Scene 6: Ras Tanura Oil Refinery Fire & Hormuz Tanker Mines (326 x 76)
export function sceneHormuzRich() {
  return `
  <svg viewBox="0 0 326 76" width="100%" height="76" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f7efe1;">
    <!-- Industrial Refinery Towers & Smoke/Fire -->
    <rect x="14" y="24" width="13" height="30" fill="#334155"/><rect x="31" y="18" width="11" height="36" fill="#475569"/>
    <rect x="46" y="13" width="8" height="41" fill="#334155"/>
    <polygon points="46,13 50,3 54,13" fill="#dc2626"/>
    <circle cx="50" cy="7" r="6" fill="#f59e0b" fill-opacity="0.9"/>
    <path d="M 54 7 Q 72 2 88 12 Q 98 8 106 16" fill="none" stroke="#64748b" stroke-width="2.6"/>
    <path d="M 0 54 Q 24 49 48 54 T 96 54 T 144 54 T 192 54 T 240 54 T 326 54 L 326 76 L 0 76 Z" fill="#16324f"/>
    <!-- Oil Tanker Hull & Blast -->
    <polygon points="104,51 218,51 230,40 98,40" fill="#1e293b"/>
    <rect x="114" y="29" width="24" height="11" fill="#e2e8f0" stroke="#1e293b" stroke-width="0.9"/>
    <rect x="148" y="36" width="54" height="4" fill="#9b1c1c"/>
    <polygon points="212,46 222,28 228,40 239,30 233,46 246,50 227,52" fill="#ef4444" stroke="#facc15" stroke-width="0.9"/>
    <!-- Naval Radar Sweep -->
    <circle cx="282" cy="24" r="17" fill="none" stroke="#9b1c1c" stroke-width="1.1" stroke-dasharray="3,2"/>
    <circle cx="282" cy="24" r="9.5" fill="none" stroke="#9b1c1c" stroke-width="1.1"/>
    <line x1="274" y1="24" x2="290" y2="24" stroke="#141210" stroke-width="1.6"/>
    <line x1="282" y1="16" x2="282" y2="32" stroke="#141210" stroke-width="1.6"/>
    <text x="163" y="69" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.8" font-weight="900" fill="#fde68a">RAS TANURA STRIKES · HORMUZ TANKER MINES</text>
  </svg>`;
}

// Scene 7: Ituri Medical Tent + Biohazard + CAF AFCON Stadium Trophy (326 x 78)
export function sceneAfricaRich() {
  return `
  <svg viewBox="0 0 326 78" width="100%" height="78" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#f3ede0;">
    <!-- Field Medical Tent -->
    <polygon points="14,54 34,20 94,20 114,54" fill="#e2e8f0" stroke="#334155" stroke-width="1.2"/>
    <polygon points="50,54 64,28 78,54" fill="#334155"/>
    <rect x="26" y="28" width="18" height="18" rx="2" fill="#9b1c1c"/>
    <rect x="33" y="31" width="4" height="12" fill="#fff"/>
    <rect x="29" y="35" width="12" height="4" fill="#fff"/>
    <text x="64" y="71" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#9b1c1c">ITURI EBOLA · 11,613</text>
    <line x1="126" y1="6" x2="126" y2="72" stroke="#9e927c" stroke-width="1.2"/>
    <!-- Stadium Floodlights + Golden AFCON Trophy -->
    <rect x="134" y="8" width="184" height="49" fill="#16324f" stroke="#141210" stroke-width="1"/>
    <polygon points="142,10 185,57 205,57" fill="#fde047" fill-opacity="0.16"/>
    <polygon points="310,10 267,57 247,57" fill="#fde047" fill-opacity="0.16"/>
    <g transform="translate(226,33)">
      <path d="M -14,-18 L 14,-18 L 9,3 C 6,10 -6,10 -9,3 Z" fill="#f59e0b" stroke="#fef08a" stroke-width="1"/>
      <rect x="-3.5" y="8" width="7" height="8" fill="#d97706"/>
      <rect x="-11" y="16" width="22" height="5" fill="#f8fafc"/>
      <text x="0" y="-4" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.5" font-weight="900" fill="#fff">CAF</text>
    </g>
    <text x="226" y="71" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#1e5b3f">AFCON CROWN → SENEGAL</text>
  </svg>`;
}

// Scene 8: Voyager 1 Deep Space + Champions League & Qatar F1 (326 x 76)
export function sceneSpaceSportsRich() {
  return `
  <svg viewBox="0 0 326 76" width="100%" height="76" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1.5px solid #8f846f;background:#0e1f33;">
    <circle cx="14" cy="14" r="1" fill="#fff"/><circle cx="72" cy="10" r="0.9" fill="#fde68a"/><circle cx="144" cy="14" r="1" fill="#fff"/>
    <circle cx="24" cy="34" r="7" fill="#2563eb" stroke="#93c5fd" stroke-width="1.1"/>
    <line x1="33" y1="34" x2="108" y2="34" stroke="#60a5fa" stroke-width="1.3" stroke-dasharray="3.5,2"/>
    <g transform="translate(128,34)">
      <ellipse cx="-6" cy="0" rx="5.5" ry="14" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
      <line x1="0" y1="0" x2="24" y2="-12" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="0" y1="4" x2="18" y2="15" stroke="#f59e0b" stroke-width="1.6"/>
    </g>
    <text x="82" y="15" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#fde68a">VOYAGER 1 · 1 LIGHT-DAY</text>
    <text x="82" y="68" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.8" font-weight="800" fill="#cbd5e1">25.9B KM · AI EXOPLANETS</text>
    <line x1="166" y1="6" x2="166" y2="70" stroke="#475569" stroke-width="1.2"/>
    <!-- UCL Pitch + Qatar F1 Car -->
    <rect x="178" y="10" width="60" height="30" rx="2" fill="#1e5b3f" stroke="#faf5e8" stroke-width="0.9"/>
    <line x1="208" y1="10" x2="208" y2="40" stroke="#faf5e8" stroke-width="0.8"/>
    <circle cx="208" cy="25" r="6" fill="none" stroke="#faf5e8" stroke-width="0.8"/>
    <g transform="translate(284,25)">
      <polygon points="-24,5 20,5 28,0 16,-5 -12,-6 -22,-2" fill="#dc2626" stroke="#fff" stroke-width="0.8"/>
      <circle cx="-15" cy="6" r="4.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.1"/>
      <circle cx="12" cy="6" r="4.5" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.1"/>
    </g>
    <text x="246" y="55" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.5" font-weight="900" fill="#fde68a">UCL MD5 · QATAR F1</text>
    <text x="246" y="68" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8" font-weight="800" fill="#ffffff">NBA CUP · TATUM 41 PTS</text>
  </svg>`;
}
