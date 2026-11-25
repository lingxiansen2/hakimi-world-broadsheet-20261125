import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EDITION_META, HERO_BRIEFS, MARKET_TICKERS, SECTIONS } from './news-data.mjs';
import {
  renderWorldMapSvg,
  sceneAmericas,
  sceneEuBudgetChart,
  sceneEuropeEnergy,
  sceneHealthNature,
  sceneHormuz,
  sceneMarkets,
  sceneShenzhou,
  sceneSports,
  sceneVoyager,
} from './illustrations.mjs';

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(SCRIPTS_DIR, '..');
const HTML_PATH = join(SCRIPTS_DIR, 'broadsheet.html');
const RAW_PNG_PATH = join(SCRIPTS_DIR, 'broadsheet-raw.png');
const ENTRY_PNG_PATH = join(ROOT_DIR, 'entry.png');

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

function renderTickerStrip() {
  return MARKET_TICKERS.map((t) => {
    const cls = t.dir === 'warn' ? 'tick-warn' : 'tick-down';
    return `<span class="tick-item"><b>${esc(t.label)}</b> ${esc(t.value)} <em class="${cls}">${esc(t.delta)}</em></span>`;
  }).join('<span class="tick-sep">│</span>');
}

function buildHtml() {
  const heroHtml = HERO_BRIEFS.map(
    (b) => `
    <div class="hero-card">
      <div class="story-meta">
        <span class="pin" style="background:#9b1c1c">${esc(b.pin)}</span>
        <span class="dateline">${esc(b.dateline)}</span>
      </div>
      <h2 class="hero-head">${esc(b.headline)}</h2>
      <p class="hero-body">${esc(b.body)}</p>
    </div>`
  ).join('');

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
    color: #141210;
    font-family: "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 9px 12px 7px 12px;
    display: flex;
    flex-direction: column;
    background: #faf5e8;
    border: 2px solid #26221d;
  }
  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.8px;
    font-weight: 700;
    letter-spacing: 0.9px;
    color: #4b4337;
    border-bottom: 1px solid #8c806a;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  .masthead-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2.5px solid #141210;
    padding-bottom: 4px;
    margin-bottom: 4px;
  }
  .masthead-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 1.6px;
    line-height: 0.95;
    color: #141210;
  }
  .date-pill {
    background: #9b1c1c;
    color: #faf5e8;
    padding: 5px 10px;
    text-align: right;
    border: 1px solid #141210;
  }
  .date-main {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.6px;
    line-height: 1.05;
  }
  .date-sub {
    font-size: 7.4px;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #fde68a;
    margin-top: 1px;
  }
  .ticker {
    background: #16324f;
    color: #f8f4ea;
    font-size: 8px;
    padding: 3px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border: 1px solid #141210;
  }
  .tick-item b { color: #fde68a; font-weight: 800; }
  .tick-down { font-style: normal; color: #fca5a5; font-weight: 800; }
  .tick-warn { font-style: normal; color: #fcd34d; font-weight: 800; }
  .tick-sep { color: #64748b; font-size: 7px; }

  .upper-grid {
    display: grid;
    grid-template-columns: 492px 241px 241px;
    gap: 11px;
    height: 274px;
    border-bottom: 2px solid #141210;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .map-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #b5aa93;
    padding-right: 8px;
  }
  .sec-bar {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 9.4px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 2px 5px;
    color: #faf5e8;
    margin-bottom: 4px;
  }
  .map-box {
    height: 174px;
    width: 100%;
  }
  .hero-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 4px;
  }
  .hero-card {
    background: #f2ead7;
    border-left: 3px solid #9b1c1c;
    padding: 4px 6px;
  }
  .hero-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.1;
    margin: 1px 0 2px 0;
  }
  .hero-body {
    font-size: 7.9px;
    line-height: 1.18;
    color: #292520;
  }

  .col-box {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #b5aa93;
    padding-right: 8px;
    overflow: hidden;
  }
  .col-box:last-child {
    border-right: none;
    padding-right: 0;
  }

  .lower-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 11px;
    flex: 1;
    overflow: hidden;
  }

  .story {
    border-bottom: 1px solid #d5ccb7;
    padding: 2px 0 2.5px 0;
  }
  .story:last-child {
    border-bottom: none;
  }
  .story-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 1px;
  }
  .pin {
    display: inline-block;
    min-width: 13px;
    height: 10.5px;
    line-height: 10.5px;
    text-align: center;
    font-size: 6.9px;
    font-weight: 800;
    color: #fff;
    border-radius: 2px;
    padding: 0 2px;
  }
  .dateline {
    font-size: 7px;
    font-weight: 800;
    letter-spacing: 0.4px;
    color: #9b1c1c;
  }
  .story-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 9px;
    font-weight: 800;
    line-height: 1.08;
    color: #141210;
    margin-bottom: 1px;
  }
  .story-body {
    font-size: 7.55px;
    line-height: 1.14;
    color: #2a2621;
  }
  .illu-wrap {
    margin-bottom: 3px;
  }
  .footer-bar {
    border-top: 1.5px solid #141210;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-size: 7.3px;
    font-weight: 700;
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
        <div class="date-sub">WORLD NEWS IN ONE ARCHIVAL BROADSHEET</div>
      </div>
    </header>
    <div class="ticker">${renderTickerStrip()}</div>

    <section class="upper-grid">
      <div class="map-panel">
        <div>
          <div class="sec-bar" style="background:#141210">GLOBAL DISPATCH LOCATOR · 6 CONTINENTS · KEY FLASHPOINTS</div>
          <div class="map-box">${renderWorldMapSvg()}</div>
        </div>
        <div class="hero-strip">${heroHtml}</div>
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">MARKETS, TECH &amp; AI</div>
        <div class="illu-wrap">${sceneMarkets()}</div>
        ${SECTIONS.markets.map((s) => renderStory(s, '#16324f')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#1e5b3f">SPACE, SCIENCE &amp; SPORT</div>
        <div class="illu-wrap">${sceneVoyager()}</div>
        ${renderStory(SECTIONS.scienceSport[0], '#1e5b3f')}
        <div class="illu-wrap" style="margin-top:3px">${sceneSports()}</div>
        ${SECTIONS.scienceSport.slice(1).map((s) => renderStory(s, '#1e5b3f')).join('')}
      </div>
    </section>

    <section class="lower-grid">
      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">AMERICAS</div>
        <div class="illu-wrap">${sceneAmericas()}</div>
        ${SECTIONS.americas.map((s) => renderStory(s, '#16324f')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">EUROPE &amp; UKRAINE</div>
        <div class="illu-wrap">${sceneEuropeEnergy()}</div>
        ${SECTIONS.europe.slice(0, 4).map((s) => renderStory(s, '#9b1c1c')).join('')}
        <div class="illu-wrap" style="margin-top:3px">${sceneEuBudgetChart()}</div>
        ${SECTIONS.europe.slice(4).map((s) => renderStory(s, '#9b1c1c')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#b4690e">MIDDLE EAST &amp; AFRICA</div>
        <div class="illu-wrap">${sceneHormuz()}</div>
        ${SECTIONS.menaAfrica.slice(0, 3).map((s) => renderStory(s, '#9b1c1c')).join('')}
        <div class="illu-wrap" style="margin-top:3px">${sceneHealthNature()}</div>
        ${SECTIONS.menaAfrica.slice(3).map((s) => renderStory(s, '#1e5b3f')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">ASIA-PACIFIC &amp; OCEANIA</div>
        <div class="illu-wrap">${sceneShenzhou()}</div>
        ${SECTIONS.asiaPacific.map((s) => renderStory(s, '#9b1c1c')).join('')}
      </div>
    </section>

    <footer class="footer-bar">
      <span>THE WORLD TODAY · WEDNESDAY, 25 NOVEMBER 2026</span>
      <span>9 EDITORIAL SCENES &amp; CHARTS · WORLD MAP · 39 UNIQUE DISPATCHES</span>
      <span>ALL FACTS VERIFIED 25 NOV 2026 UTC</span>
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
