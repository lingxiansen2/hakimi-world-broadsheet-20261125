import { MAP_PINS } from './news-data.mjs';

function project([lon, lat]) {
  const x = ((lon + 170) / 350) * 480;
  const y = ((76 - lat) / 134) * 168;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function polyPath(coords) {
  return 'M ' + coords.map(project).join(' L ') + ' Z';
}

function pointXY(lon, lat) {
  const x = ((lon + 170) / 350) * 480;
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
    const x = ((lon + 170) / 350) * 480;
    graticule.push(`<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="168" stroke="#d9cfb8" stroke-width="0.6" stroke-dasharray="2,2"/>`);
  }
  for (let lat = -30; lat <= 60; lat += 30) {
    const y = ((76 - lat) / 134) * 168;
    const isEq = lat === 0;
    graticule.push(`<line x1="0" y1="${y.toFixed(1)}" x2="480" y2="${y.toFixed(1)}" stroke="${isEq ? '#c7ba9d' : '#d9cfb8'}" stroke-width="${isEq ? '0.8' : '0.6'}" stroke-dasharray="${isEq ? 'none' : '2,2'}"/>`);
  }

  const landPaths = CONTINENTS.map(
    (c) => `<path d="${polyPath(c)}" fill="#e3d8be" stroke="#7d715c" stroke-width="0.9" stroke-linejoin="round"/>`
  ).join('');

  const flashCoords = [
    { lon: 56.3, lat: 26.6, r: 9.5 },
    { lon: 30.5, lat: 50.4, r: 8.5 },
    { lon: 100.3, lat: 40.9, r: 8.5 },
  ];
  const rings = flashCoords
    .map((f) => {
      const p = pointXY(f.lon, f.lat);
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${f.r}" fill="none" stroke="#9b1c1c" stroke-width="1.1" stroke-dasharray="2,1.5" opacity="0.85"/>`;
    })
    .join('');

  const offsets = {
    1: [0, -2],
    2: [2, 1],
    3: [2, 4],
    4: [5, -1],
    6: [-6, -2],
    8: [-4, 3],
    11: [5, -1],
    12: [-2, -6],
    16: [4, -1],
    17: [-7, -2],
    19: [2, 4],
    20: [3, -6],
    23: [-4, 2],
    24: [5, -1],
    25: [3, -4],
    26: [-4, 2],
    34: [1, 3],
  };

  const pins = MAP_PINS.map((pin) => {
    const p = pointXY(pin.lon, pin.lat);
    const [dx, dy] = offsets[pin.id] || [0, 0];
    const cx = Math.min(473, Math.max(7, p.x + dx));
    const cy = Math.min(161, Math.max(7, p.y + dy));
    return `
      <g>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5.2" fill="${pin.color}" stroke="#faf5e8" stroke-width="0.9"/>
        <text x="${cx.toFixed(1)}" y="${(cy + 2.2).toFixed(1)}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="6.3" font-weight="800" fill="#ffffff">${pin.id}</text>
      </g>`;
  }).join('');

  return `
  <svg viewBox="0 0 480 168" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;background:#eef3f5;border:1px solid #b8ae97;">
    ${graticule.join('')}
    ${landPaths}
    ${rings}
    <text x="172" y="64" font-family="Georgia, serif" font-size="7" font-style="italic" fill="#6f8796" letter-spacing="1.5">ATLANTIC</text>
    <text x="34" y="108" font-family="Georgia, serif" font-size="7" font-style="italic" fill="#6f8796" letter-spacing="1.5">PACIFIC</text>
    <text x="325" y="124" font-family="Georgia, serif" font-size="7" font-style="italic" fill="#6f8796" letter-spacing="1.5">INDIAN</text>
    ${pins}
    <rect x="4" y="147" width="174" height="17" rx="2" fill="#faf5e8" fill-opacity="0.94" stroke="#9d9078" stroke-width="0.7"/>
    <circle cx="12" cy="155.5" r="3.5" fill="#9b1c1c"/><text x="18" y="158" font-family="Segoe UI, Arial" font-size="6.8" font-weight="700" fill="#141210">FLASHPOINT</text>
    <circle cx="72" cy="155.5" r="3.5" fill="#16324f"/><text x="78" y="158" font-family="Segoe UI, Arial" font-size="6.8" font-weight="700" fill="#141210">MARKETS/POL</text>
    <circle cx="136" cy="155.5" r="3.5" fill="#1e5b3f"/><text x="142" y="158" font-family="Segoe UI, Arial" font-size="6.8" font-weight="700" fill="#141210">ENV/SPORT</text>
  </svg>`;
}

export function sceneShenzhou() {
  return `
  <svg viewBox="0 0 232 50" width="100%" height="50" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#102238;">
    <defs>
      <linearGradient id="plume" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f59e0b"/><stop offset="60%" stop-color="#ef4444"/><stop offset="100%" stop-color="#fde68a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="10" r="1" fill="#fff"/><circle cx="58" cy="18" r="0.8" fill="#fff"/><circle cx="152" cy="9" r="0.9" fill="#fff"/><circle cx="218" cy="7" r="0.8" fill="#fde68a"/>
    <path d="M 10 40 Q 116 6 224 19" fill="none" stroke="#60a5fa" stroke-width="0.9" stroke-dasharray="3,2"/>
    <g transform="translate(184,15) rotate(-8)">
      <rect x="-12" y="-3" width="24" height="6" rx="1.5" fill="#e2e8f0" stroke="#0f172a" stroke-width="0.8"/>
      <rect x="-20" y="-8" width="12" height="3.5" fill="#3b82f6" stroke="#93c5fd" stroke-width="0.6"/>
      <rect x="-20" y="4.5" width="12" height="3.5" fill="#3b82f6" stroke="#93c5fd" stroke-width="0.6"/>
      <rect x="8" y="-8" width="12" height="3.5" fill="#3b82f6" stroke="#93c5fd" stroke-width="0.6"/>
      <rect x="8" y="4.5" width="12" height="3.5" fill="#3b82f6" stroke="#93c5fd" stroke-width="0.6"/>
    </g>
    <polygon points="30,30 78,24 78,30" fill="url(#plume)"/>
    <g transform="translate(96,25) rotate(12)">
      <rect x="-24" y="-3" width="38" height="6" fill="#f8fafc" stroke="#1e293b" stroke-width="0.9"/>
      <polygon points="14,-3 24,0 14,3" fill="#dc2626"/>
      <rect x="4" y="-3" width="3" height="6" fill="#dc2626"/>
    </g>
    <rect x="4" y="35" width="144" height="12" rx="1.5" fill="#0f172a" fill-opacity="0.9" stroke="#d97706" stroke-width="0.7"/>
    <text x="9" y="43.5" font-family="Segoe UI, Arial, sans-serif" font-size="7.2" font-weight="800" fill="#fde68a">SHENZHOU-24 · CN + PK CREW</text>
  </svg>`;
}

export function sceneMarkets() {
  return `
  <svg viewBox="0 0 232 54" width="100%" height="54" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f4efe0;">
    <line x1="8" y1="14" x2="156" y2="14" stroke="#d5cbb4" stroke-width="0.7"/>
    <line x1="8" y1="27" x2="156" y2="27" stroke="#d5cbb4" stroke-width="0.7"/>
    <line x1="8" y1="40" x2="156" y2="40" stroke="#d5cbb4" stroke-width="0.7"/>
    <polygon points="10,13 32,16 54,14 74,21 96,24 114,34 132,31 152,43 152,45 10,45" fill="#9b1c1c" fill-opacity="0.16"/>
    <polyline points="10,13 32,16 54,14 74,21 96,24 114,34 132,31 152,43" fill="none" stroke="#9b1c1c" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="152" cy="43" r="3" fill="#9b1c1c"/>
    <text x="10" y="10" font-family="Segoe UI, Arial, sans-serif" font-size="7.4" font-weight="800" fill="#141210">KOSPI 4,697.51</text>
    <text x="96" y="10" font-family="Segoe UI, Arial, sans-serif" font-size="7.6" font-weight="900" fill="#9b1c1c">-6.16% HALT</text>
    <text x="10" y="51" font-family="Segoe UI, Arial, sans-serif" font-size="6.8" font-weight="700" fill="#16324f">NASDAQ -1.48%  ·  BTC $59.4K</text>
    <g transform="translate(194,27)">
      <rect x="-22" y="-19" width="44" height="38" rx="3" fill="#16324f" stroke="#141210" stroke-width="1"/>
      <rect x="-14" y="-11" width="28" height="22" rx="1.5" fill="#b4690e" stroke="#faf5e8" stroke-width="0.8"/>
      <text x="0" y="2.5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7" font-weight="900" fill="#ffffff">AI GPU</text>
      <line x1="-26" y1="-9" x2="-22" y2="-9" stroke="#141210" stroke-width="1.5"/>
      <line x1="-26" y1="0" x2="-22" y2="0" stroke="#141210" stroke-width="1.5"/>
      <line x1="-26" y1="9" x2="-22" y2="9" stroke="#141210" stroke-width="1.5"/>
      <line x1="22" y1="-9" x2="26" y2="-9" stroke="#141210" stroke-width="1.5"/>
      <line x1="22" y1="0" x2="26" y2="0" stroke="#141210" stroke-width="1.5"/>
      <line x1="22" y1="9" x2="26" y2="9" stroke="#141210" stroke-width="1.5"/>
    </g>
  </svg>`;
}

export function sceneHormuz() {
  return `
  <svg viewBox="0 0 232 48" width="100%" height="48" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f7efe1;">
    <rect x="14" y="15" width="9" height="21" fill="#334155"/>
    <rect x="27" y="10" width="6" height="26" fill="#475569"/>
    <polygon points="27,10 30,2 33,10" fill="#dc2626"/>
    <circle cx="30" cy="5" r="4" fill="#f59e0b" fill-opacity="0.85"/>
    <path d="M 0 36 Q 18 33 36 36 T 72 36 T 108 36 T 144 36 T 180 36 T 232 36 L 232 48 L 0 48 Z" fill="#16324f"/>
    <polygon points="78,34 156,34 164,28 74,28" fill="#1e293b"/>
    <rect x="84" y="21" width="16" height="7" fill="#e2e8f0" stroke="#1e293b" stroke-width="0.7"/>
    <rect x="108" y="26" width="38" height="2.5" fill="#9b1c1c"/>
    <polygon points="154,31 160,21 164,28 171,22 167,31 175,34 163,35" fill="#ef4444" stroke="#facc15" stroke-width="0.7"/>
    <circle cx="198" cy="17" r="11" fill="none" stroke="#9b1c1c" stroke-width="0.8" stroke-dasharray="2,2"/>
    <circle cx="198" cy="17" r="6" fill="none" stroke="#9b1c1c" stroke-width="0.8"/>
    <line x1="193" y1="17" x2="203" y2="17" stroke="#141210" stroke-width="1.2"/>
    <line x1="198" y1="12" x2="198" y2="22" stroke="#141210" stroke-width="1.2"/>
    <text x="6" y="45" font-family="Segoe UI, Arial" font-size="6.9" font-weight="800" fill="#fde68a">RAS TANURA STRIKES · HORMUZ TANKER MINES</text>
  </svg>`;
}

export function sceneEuropeEnergy() {
  return `
  <svg viewBox="0 0 232 52" width="100%" height="52" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f1ece0;">
    <g stroke="#1e293b" stroke-width="1.4" fill="none">
      <line x1="36" y1="6" x2="26" y2="42"/>
      <line x1="36" y1="6" x2="46" y2="42"/>
      <line x1="22" y1="16" x2="50" y2="16"/>
      <line x1="20" y1="26" x2="52" y2="26"/>
    </g>
    <polygon points="64,10 55,25 62,25 57,39 72,21 64,21" fill="#9b1c1c" stroke="#141210" stroke-width="0.7"/>
    <text x="12" y="49" font-family="Segoe UI, Arial" font-size="6.7" font-weight="800" fill="#9b1c1c">5 REGIONS BLACKOUT</text>
    <line x1="114" y1="5" x2="114" y2="47" stroke="#b9af99" stroke-width="1"/>
    <path d="M 134 38 A 32 32 0 0 1 202 38" fill="none" stroke="#1e5b3f" stroke-width="5.5"/>
    <path d="M 158 8 A 32 32 0 0 1 202 38" fill="none" stroke="#9b1c1c" stroke-width="5.5"/>
    <line x1="168" y1="38" x2="195" y2="18" stroke="#141210" stroke-width="2" stroke-linecap="round"/>
    <circle cx="168" cy="38" r="3" fill="#141210"/>
    <text x="168" y="49" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7" font-weight="900" fill="#9b1c1c">UK CAP +26% · £2,166</text>
  </svg>`;
}

export function sceneEuBudgetChart() {
  return `
  <svg viewBox="0 0 232 52" width="100%" height="52" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f4efe0;">
    <text x="6" y="11" font-family="Segoe UI, Arial" font-size="7.2" font-weight="900" fill="#16324f">EU NET BUDGET BALANCES (IW REPORT · €B)</text>
    <line x1="96" y1="16" x2="96" y2="47" stroke="#141210" stroke-width="1"/>
    <rect x="44" y="17" width="52" height="6.5" fill="#9b1c1c"/><text x="41" y="22.5" text-anchor="end" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#141210">DE -14.9</text>
    <rect x="76" y="25" width="20" height="6.5" fill="#9b1c1c"/><text x="41" y="30.5" text-anchor="end" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#141210">FR -5.4</text>
    <rect x="83" y="33" width="13" height="6.5" fill="#9b1c1c"/><text x="41" y="38.5" text-anchor="end" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#141210">IT -3.3</text>
    <rect x="96" y="40.5" width="24" height="6.5" fill="#1e5b3f"/><text x="123" y="46" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#1e5b3f">PL +6.7B NET</text>
    <rect x="135" y="17" width="91" height="20" rx="2" fill="#16324f"/>
    <text x="180.5" y="26" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.7" font-weight="800" fill="#fde68a">UKRAINE 2027 GAP</text>
    <text x="180.5" y="34" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.4" font-weight="900" fill="#ffffff">€70B SUMMIT CALL</text>
  </svg>`;
}

export function sceneVoyager() {
  return `
  <svg viewBox="0 0 232 48" width="100%" height="48" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#0d1b2a;">
    <circle cx="18" cy="9" r="1" fill="#fff"/><circle cx="62" cy="13" r="0.8" fill="#fde68a"/><circle cx="115" cy="8" r="1" fill="#fff"/>
    <circle cx="164" cy="34" r="0.9" fill="#fff"/><circle cx="204" cy="12" r="1.1" fill="#93c5fd"/>
    <circle cx="24" cy="24" r="5.5" fill="#2563eb" stroke="#93c5fd" stroke-width="0.9"/>
    <path d="M 32 24 L 154 24" stroke="#60a5fa" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="92" y="20" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.1" font-weight="800" fill="#fde68a">1 LIGHT-DAY · 25.9B KM</text>
    <g transform="translate(184,23)">
      <ellipse cx="-8" cy="0" rx="4.5" ry="11" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
      <line x1="-3" y1="0" x2="26" y2="-9" stroke="#cbd5e1" stroke-width="1.2"/>
      <line x1="-2" y1="3" x2="18" y2="12" stroke="#f59e0b" stroke-width="1.3"/>
      <circle cx="-16" cy="0" r="7.5" fill="none" stroke="#60a5fa" stroke-width="0.7" stroke-dasharray="2,1.5"/>
    </g>
    <text x="8" y="43" font-family="Segoe UI, Arial" font-size="6.7" font-weight="700" fill="#cbd5e1">VOYAGER 1 (49 YRS) · AI TESS EXOPLANETS</text>
  </svg>`;
}

export function sceneAmericas() {
  return `
  <svg viewBox="0 0 232 48" width="100%" height="48" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f3ede0;">
    <rect x="14" y="30" width="54" height="9" fill="#16324f"/>
    <path d="M 27 30 A 14 14 0 0 1 55 30 Z" fill="#334155"/>
    <line x1="41" y1="10" x2="41" y2="17" stroke="#141210" stroke-width="1.3"/>
    <text x="41" y="45.5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#16324f">$5B SHIELD / DEC 11</text>
    <line x1="116" y1="8" x2="116" y2="37" stroke="#141210" stroke-width="1.4"/>
    <line x1="96" y1="14" x2="136" y2="14" stroke="#b4690e" stroke-width="1.4"/>
    <polygon points="96,14 90,25 102,25" fill="none" stroke="#141210" stroke-width="1"/>
    <polygon points="136,14 130,25 142,25" fill="none" stroke="#141210" stroke-width="1"/>
    <text x="116" y="45.5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#9b1c1c">HUAWEI VERDICT</text>
    <g transform="translate(188,18)">
      <ellipse cx="0" cy="0" rx="13" ry="5.5" fill="#1e5b3f"/>
      <line x1="-18" y1="-7" x2="18" y2="-7" stroke="#141210" stroke-width="1.2"/>
      <line x1="13" y1="0" x2="24" y2="-3" stroke="#1e5b3f" stroke-width="1.8"/>
      <polygon points="-4,5 -15,19 7,19" fill="#f59e0b" fill-opacity="0.32"/>
    </g>
    <text x="190" y="45.5" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#1e5b3f">CARTAGENA RESCUE</text>
  </svg>`;
}

export function sceneHealthNature() {
  return `
  <svg viewBox="0 0 232 45" width="100%" height="45" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#f3ede0;">
    <path d="M 16 8 L 40 8 L 40 23 C 40 31 28 37 28 37 C 28 37 16 31 16 23 Z" fill="#9b1c1c" stroke="#141210" stroke-width="0.9"/>
    <rect x="25.5" y="13" width="5" height="15" fill="#fff"/>
    <rect x="20.5" y="18" width="15" height="5" fill="#fff"/>
    <text x="48" y="18" font-family="Segoe UI, Arial" font-size="7" font-weight="800" fill="#9b1c1c">ITURI EBOLA: 11,613</text>
    <text x="48" y="28" font-family="Segoe UI, Arial" font-size="6.6" font-weight="700" fill="#141210">PORT SUDAN $55M WATER</text>
    <text x="48" y="38" font-family="Segoe UI, Arial" font-size="6.6" font-weight="700" fill="#1e5b3f">SENEGAL WINS AFCON CAS</text>
    <g transform="translate(204,22)">
      <path d="M -9,-11 L 9,-11 L 6,2 C 4,6 -4,6 -6,2 Z" fill="#d97706" stroke="#141210" stroke-width="0.9"/>
      <rect x="-2" y="5" width="4" height="5" fill="#b4690e"/>
      <rect x="-6" y="10" width="12" height="3" fill="#141210"/>
      <text x="0" y="-2" text-anchor="middle" font-family="Segoe UI, Arial" font-size="5.8" font-weight="900" fill="#fff">CAF</text>
    </g>
  </svg>`;
}

export function sceneSports() {
  return `
  <svg viewBox="0 0 232 45" width="100%" height="45" xmlns="http://www.w3.org/2000/svg" style="display:block;border:1px solid #b9af99;background:#16324f;">
    <rect x="6" y="6" width="68" height="30" rx="2" fill="#1e5b3f" stroke="#faf5e8" stroke-width="0.9"/>
    <line x1="40" y1="6" x2="40" y2="36" stroke="#faf5e8" stroke-width="0.8"/>
    <circle cx="40" cy="21" r="6" fill="none" stroke="#faf5e8" stroke-width="0.8"/>
    <text x="40" y="43" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#fde68a">UCL MD5</text>
    <g transform="translate(122,23)">
      <polygon points="-28,3 22,3 30,-1 18,-4 -12,-5 -24,-2" fill="#dc2626" stroke="#fff" stroke-width="0.6"/>
      <circle cx="-18" cy="4" r="4" fill="#0f172a" stroke="#cbd5e1" stroke-width="1"/>
      <circle cx="14" cy="4" r="4" fill="#0f172a" stroke="#cbd5e1" stroke-width="1"/>
      <text x="0" y="-8" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.8" font-weight="800" fill="#fff">QATAR F1</text>
    </g>
    <g transform="translate(198,19)">
      <circle cx="0" cy="0" r="10.5" fill="#d97706" stroke="#141210" stroke-width="0.9"/>
      <path d="M -10.5 0 L 10.5 0 M 0 -10.5 L 0 10.5" stroke="#141210" stroke-width="0.8"/>
      <text x="0" y="19" text-anchor="middle" font-family="Segoe UI, Arial" font-size="6.4" font-weight="800" fill="#fde68a">NBA CUP</text>
    </g>
  </svg>`;
}
