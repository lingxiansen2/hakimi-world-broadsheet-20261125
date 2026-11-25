import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EDITION_META, HERO_STORY, MARKET_TICKERS, MIDDLE_COLS, TOP_RIGHT_COLS, WORLD_IN_BRIEF } from './news-data.mjs';
import { renderWorldMapSvg } from './illustrations.mjs';

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(SCRIPTS_DIR, '..');
const ASSETS_DIR = join(SCRIPTS_DIR, 'assets');
const HTML_PATH = join(SCRIPTS_DIR, 'broadsheet.html');
const RAW_PNG_PATH = join(SCRIPTS_DIR, 'broadsheet-raw.png');
const ENTRY_PNG_PATH = join(ROOT_DIR, 'entry.png');

function loadAssetDataUri(filename) {
  const bytes = readFileSync(join(ASSETS_DIR, filename));
  return `data:image/jpeg;base64,${bytes.toString('base64')}`;
}

function renderPaintedPanel(filename, alt, heightPx, objPos = 'center center') {
  const src = loadAssetDataUri(filename);
  return `
  <div class="painted-panel" style="height:${heightPx}px">
    <img src="${src}" alt="${esc(alt)}" style="object-position:${objPos};" />
  </div>`;
}

function esc(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderStory(item, accent = '#16324f') {
  return `
    <article class="story">
      <div class="story-meta">
        <span class="pin" style="background:${accent}">${esc(item.pin)}</span>
        <span class="dateline">${esc(item.dateline)}</span>
      </div>
      <h3 class="story-head">${esc(item.headline)}</h3>
      <p class="story-body">${esc(item.body)}</p>
    </article>`;
}

function renderBriefList(items, accent) {
  return items
    .map(
      (b) => `
      <div class="brief-item">
        <span class="brief-city" style="color:${accent}">${esc(b.city)}:</span> ${esc(b.text)}
      </div>`
    )
    .join('');
}

function renderTickerStrip() {
  return MARKET_TICKERS.map((t) => {
    const cls = t.dir === 'warn' ? 'tick-warn' : 'tick-down';
    return `<span class="tick-item"><b>${esc(t.label)}</b> ${esc(t.value)} <em class="${cls}">${esc(t.delta)}</em></span>`;
  }).join('<span class="tick-sep">│</span>');
}

function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #faf5e8;
    color: #0e0c0a;
    font-family: "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 8px 11px 7px 11px;
    display: flex;
    flex-direction: column;
    background: #faf5e8;
    border: 2.5px solid #201c18;
  }
  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8.4px;
    font-weight: 800;
    letter-spacing: 0.8px;
    color: #4b4337;
    border-bottom: 1.2px solid #8c806a;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  .masthead-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2.5px solid #141210;
    padding-bottom: 3px;
    margin-bottom: 4px;
  }
  .masthead-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 1.5px;
    line-height: 0.94;
    color: #0e0c0a;
  }
  .date-pill {
    background: #9b1c1c;
    color: #faf5e8;
    padding: 4px 11px;
    text-align: right;
    border: 1.5px solid #141210;
  }
  .date-main {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 15.5px;
    font-weight: 900;
    letter-spacing: 0.6px;
    line-height: 1.05;
  }
  .date-sub {
    font-size: 7.8px;
    font-weight: 800;
    letter-spacing: 0.8px;
    color: #fde68a;
    margin-top: 1px;
  }
  .ticker {
    background: #16324f;
    color: #f8f4ea;
    font-size: 9px;
    padding: 3px 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border: 1.2px solid #141210;
  }
  .tick-item b { color: #fde68a; font-weight: 900; }
  .tick-down { font-style: normal; color: #fca5a5; font-weight: 800; }
  .tick-warn { font-style: normal; color: #fcd34d; font-weight: 800; }
  .tick-sep { color: #64748b; font-size: 8px; }

  .sec-bar {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 2px 6px;
    color: #faf5e8;
    margin-bottom: 4px;
  }

  /* Upper Row: 474 Map+Oceania | 254 Space & Asia | 254 Markets & AI */
  .upper-grid {
    display: grid;
    grid-template-columns: 474px 254px 254px;
    gap: 8px;
    height: 264px;
    border-bottom: 2px solid #141210;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .map-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1.2px solid #b5aa93;
    padding-right: 7px;
  }
  .map-box { height: 182px; width: 100%; }
  .hero-banner {
    background: #f2ead7;
    border-left: 4px solid #1e5b3f;
    padding: 3px 7px;
    margin-top: 3px;
  }
  .hero-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12.6px;
    font-weight: 900;
    line-height: 1.1;
    margin: 1px 0;
    color: #0e0c0a;
  }
  .hero-body {
    font-size: 9.2px;
    line-height: 1.14;
    color: #1a1714;
  }

  .col-box {
    display: flex;
    flex-direction: column;
    border-right: 1.2px solid #b5aa93;
    padding-right: 7px;
    overflow: hidden;
  }
  .col-box:last-child { border-right: none; padding-right: 0; }

  /* Middle Showcase Row: 3 Columns with 6 Unobscured Paintings + 9 Bold Leads */
  .middle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    height: 374px;
    border-bottom: 2px solid #141210;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }

  .story {
    border-bottom: 1px solid #d5ccb7;
    padding: 2px 0 2.5px 0;
  }
  .story:last-child { border-bottom: none; }
  .story-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 1px;
  }
  .pin {
    display: inline-block;
    min-width: 14px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    font-size: 8px;
    font-weight: 900;
    color: #fff;
    border-radius: 2px;
    padding: 0 2.5px;
  }
  .dateline {
    font-size: 7.9px;
    font-weight: 900;
    letter-spacing: 0.4px;
    color: #9b1c1c;
  }
  .story-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12px;
    font-weight: 900;
    line-height: 1.08;
    color: #0e0c0a;
    margin-bottom: 1.5px;
  }
  .story-body {
    font-size: 9.1px;
    line-height: 1.13;
    color: #1a1714;
  }
  .illu-wrap { margin-bottom: 3px; }
  .painted-panel {
    width: 100%;
    border: 1.5px solid #201c18;
    overflow: hidden;
    background: #141210;
  }
  .painted-panel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Bottom Band: 24-Story World in Brief */
  .brief-band {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .brief-banner {
    background: #201c18;
    color: #fde68a;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 9.6px;
    font-weight: 900;
    letter-spacing: 0.9px;
    padding: 2px 7px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
  }
  .brief-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 9px;
    flex: 1;
    overflow: hidden;
  }
  .brief-col {
    border-right: 1px solid #c2b8a3;
    padding-right: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .brief-col:last-child { border-right: none; padding-right: 0; }
  .brief-head {
    font-size: 8.5px;
    font-weight: 900;
    letter-spacing: 0.7px;
    padding: 1.5px 4px;
    color: #fff;
    margin-bottom: 1.5px;
  }
  .brief-item {
    font-size: 8.45px;
    line-height: 1.12;
    color: #1a1714;
    border-bottom: 1px dotted #d2c8b4;
    padding: 1px 0 1.5px 0;
  }
  .brief-item:last-child { border-bottom: none; }
  .brief-city { font-weight: 900; letter-spacing: 0.2px; }

  .footer-bar {
    border-top: 1.8px solid #141210;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.6px;
    color: #4b4337;
  }
</style>
</head>
<body>
  <div class="page">
    <div class="top-meta">
      <span>${esc(EDITION_META.editionLine)}</span>
      <span>${esc(EDITION_META.volLine)}</span>
    </div>
    <header class="masthead-row">
      <div class="masthead-title">${esc(EDITION_META.masthead)}</div>
      <div class="date-pill">
        <div class="date-main">${esc(EDITION_META.dateBanner)}</div>
        <div class="date-sub">WORLD NEWS IN ONE VISUAL BROADSHEET</div>
      </div>
    </header>
    <div class="ticker">${renderTickerStrip()}</div>

    <section class="upper-grid">
      <div class="map-panel">
        <div>
          <div class="sec-bar" style="background:#141210">GLOBAL LOCATOR · PINS 1–14 · SIX CONTINENTS · 25 NOV 2026</div>
          <div class="map-box">${renderWorldMapSvg()}</div>
        </div>
        <div class="hero-banner">
          <div class="story-meta">
            <span class="pin" style="background:#1e5b3f">${esc(HERO_STORY.pin)}</span>
            <span class="dateline">${esc(HERO_STORY.dateline)}</span>
          </div>
          <h2 class="hero-head">${esc(HERO_STORY.headline)}</h2>
          <p class="hero-body">${esc(HERO_STORY.body)}</p>
        </div>
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">SPACE &amp; ASIA-PACIFIC</div>
        <div class="illu-wrap">${renderPaintedPanel('art-space.jpg', 'Shenzhou-24 Launch & Tiangong', 98, 'center 42%')}</div>
        ${TOP_RIGHT_COLS.asiaSpace.map((s) => renderStory(s, '#9b1c1c')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">MARKETS &amp; AI</div>
        <div class="illu-wrap">${renderPaintedPanel('art-markets-chip.jpg', 'AI Chip & Global Market Volatility', 98, 'center 48%')}</div>
        ${TOP_RIGHT_COLS.marketsTech.map((s) => renderStory(s, '#16324f')).join('')}
      </div>
    </section>

    <section class="middle-grid">
      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">AMERICAS &amp; CYBER</div>
        <div class="illu-wrap">${renderPaintedPanel('art-cyber-defense.jpg', 'Golden Dome & CIA ODNI Breach', 88, 'center 52%')}</div>
        ${MIDDLE_COLS.americas.top.map((s) => renderStory(s, '#16324f')).join('')}
        <div class="illu-wrap" style="margin-top:3px">${renderPaintedPanel('art-justice-rescue.jpg', 'Huawei Verdict & Cartagena Rescue', 82, 'center 48%')}</div>
        ${MIDDLE_COLS.americas.bottom.map((s) => renderStory(s, '#16324f')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">EUROPE &amp; MIDDLE EAST</div>
        <div class="illu-wrap">${renderPaintedPanel('art-winter-grid.jpg', 'Ukraine Winter Grid Blackout & UK Cap', 88, 'center 45%')}</div>
        ${MIDDLE_COLS.europeMena.top.map((s) => renderStory(s, '#9b1c1c')).join('')}
        <div class="illu-wrap" style="margin-top:3px">${renderPaintedPanel('art-energy-crisis.jpg', 'Ras Tanura Refinery & Hormuz Tankers', 82, 'center 50%')}</div>
        ${MIDDLE_COLS.europeMena.bottom.map((s) => renderStory(s, '#9b1c1c')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#1e5b3f">AFRICA, SPACE &amp; SPORT</div>
        <div class="illu-wrap">${renderPaintedPanel('art-africa-ebola-cup.jpg', 'Ituri Ebola Pullout & Senegal AFCON Trophy', 88, 'center 44%')}</div>
        ${MIDDLE_COLS.africaScienceSport.top.map((s) => renderStory(s, '#1e5b3f')).join('')}
        <div class="illu-wrap" style="margin-top:3px">${renderPaintedPanel('art-voyager-sport.jpg', 'Voyager 1, Champions League & Qatar F1', 82, 'center 50%')}</div>
        ${MIDDLE_COLS.africaScienceSport.bottom.map((s) => renderStory(s, '#1e5b3f')).join('')}
      </div>
    </section>

    <section class="brief-band">
      <div class="brief-banner">
        <span>WORLD IN BRIEF · 24 ADDITIONAL DISPATCHES (WEDNESDAY, 25 NOVEMBER 2026)</span>
        <span>ALL 6 INHABITED CONTINENTS</span>
      </div>
      <div class="brief-grid">
        <div class="brief-col">
          <div class="brief-head" style="background:#16324f">AMERICAS · 6 BRIEFS</div>
          ${renderBriefList(WORLD_IN_BRIEF.americas, '#16324f')}
        </div>
        <div class="brief-col">
          <div class="brief-head" style="background:#9b1c1c">EUROPE · 6 BRIEFS</div>
          ${renderBriefList(WORLD_IN_BRIEF.europe, '#9b1c1c')}
        </div>
        <div class="brief-col">
          <div class="brief-head" style="background:#b4690e">MIDEAST &amp; AFRICA · 6 BRIEFS</div>
          ${renderBriefList(WORLD_IN_BRIEF.menaAfrica, '#9b1c1c')}
        </div>
        <div class="brief-col">
          <div class="brief-head" style="background:#1e5b3f">ASIA-PACIFIC · 6 BRIEFS</div>
          ${renderBriefList(WORLD_IN_BRIEF.asiaPacific, '#1e5b3f')}
        </div>
      </div>
    </section>

    <footer class="footer-bar">
      <span>THE WORLD TODAY · WEDNESDAY, 25 NOVEMBER 2026</span>
      <span>8 PAINTED SCENES · WORLD MAP · 14 LEAD STORIES + 24 BRIEFS (38 TOTAL)</span>
      <span>VERIFIED 25 NOV 2026 UTC</span>
    </footer>
  </div>
</body>
</html>`;
}

function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  throw new Error('No headless Chrome or Edge binary found');
}

function main() {
  mkdirSync(SCRIPTS_DIR, { recursive: true });
  writeFileSync(HTML_PATH, buildHtml(), 'utf8');
  const browser = findBrowser();
  const fileUrl = pathToFileURL(HTML_PATH).href;
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1024,1024',
      `--screenshot=${RAW_PNG_PATH}`,
      fileUrl,
    ],
    { stdio: 'inherit' }
  );
  execFileSync('python', [join(SCRIPTS_DIR, 'optimize-png.py'), RAW_PNG_PATH, ENTRY_PNG_PATH], {
    stdio: 'inherit',
  });
}

main();
