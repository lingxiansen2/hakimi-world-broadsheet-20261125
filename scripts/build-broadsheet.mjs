import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { COLUMNS, EDITION_META, HERO_STORY, MARKET_TICKERS, TOP_RIGHT_COLS } from './news-data.mjs';
import {
  renderWorldMapSvg,
  sceneAfricaLarge,
  sceneAmericasLarge,
  sceneAmericasSouthLarge,
  sceneEuropeLarge,
  sceneHormuzLarge,
  sceneMarketsLarge,
  sceneShenzhouLarge,
  sceneSpaceSportsLarge,
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
    padding: 10px 12px 8px 12px;
    display: flex;
    flex-direction: column;
    background: #faf5e8;
    border: 2.5px solid #201c18;
  }
  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.9px;
    color: #4b4337;
    border-bottom: 1.5px solid #8c806a;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .masthead-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #141210;
    padding-bottom: 4px;
    margin-bottom: 5px;
  }
  .masthead-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 42px;
    font-weight: 900;
    letter-spacing: 1.5px;
    line-height: 0.95;
    color: #141210;
  }
  .date-pill {
    background: #9b1c1c;
    color: #faf5e8;
    padding: 6px 12px;
    text-align: right;
    border: 1.5px solid #141210;
  }
  .date-main {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 16.5px;
    font-weight: 900;
    letter-spacing: 0.6px;
    line-height: 1.05;
  }
  .date-sub {
    font-size: 8.5px;
    font-weight: 800;
    letter-spacing: 0.9px;
    color: #fde68a;
    margin-top: 2px;
  }
  .ticker {
    background: #16324f;
    color: #f8f4ea;
    font-size: 9.6px;
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;
    border: 1.5px solid #141210;
  }
  .tick-item b { color: #fde68a; font-weight: 900; }
  .tick-down { font-style: normal; color: #fca5a5; font-weight: 800; }
  .tick-warn { font-style: normal; color: #fcd34d; font-weight: 800; }
  .tick-sep { color: #64748b; font-size: 8.5px; }

  /* Upper Band: 488px Map+Hero | 246px Asia | 246px Markets */
  .upper-grid {
    display: grid;
    grid-template-columns: 488px 246px 246px;
    gap: 10px;
    height: 300px;
    border-bottom: 2.5px solid #141210;
    padding-bottom: 6px;
    margin-bottom: 6px;
  }
  .map-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1.5px solid #b5aa93;
    padding-right: 8px;
  }
  .sec-bar {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    padding: 3px 7px;
    color: #faf5e8;
    margin-bottom: 5px;
  }
  .map-box {
    height: 204px;
    width: 100%;
  }
  .hero-banner {
    background: #f2ead7;
    border-left: 4px solid #9b1c1c;
    padding: 4px 8px;
    margin-top: 4px;
  }
  .hero-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 13.5px;
    font-weight: 900;
    line-height: 1.12;
    margin: 1px 0 2px 0;
    color: #141210;
  }
  .hero-body {
    font-size: 10.2px;
    line-height: 1.18;
    color: #201c18;
  }

  .col-box {
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #b5aa93;
    padding-right: 8px;
    overflow: hidden;
  }
  .col-box:last-child {
    border-right: none;
    padding-right: 0;
  }

  /* Lower 3-Column Visual Grid */
  .lower-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 11px;
    flex: 1;
    overflow: hidden;
  }

  .story {
    border-bottom: 1px solid #d0c6af;
    padding: 3px 0 4px 0;
  }
  .story:last-child {
    border-bottom: none;
  }
  .story-meta {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 1.5px;
  }
  .pin {
    display: inline-block;
    min-width: 16px;
    height: 13.5px;
    line-height: 13.5px;
    text-align: center;
    font-size: 8.8px;
    font-weight: 900;
    color: #fff;
    border-radius: 2px;
    padding: 0 3px;
  }
  .dateline {
    font-size: 8.6px;
    font-weight: 900;
    letter-spacing: 0.5px;
    color: #9b1c1c;
  }
  .story-head {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12.6px;
    font-weight: 900;
    line-height: 1.1;
    color: #141210;
    margin-bottom: 2px;
  }
  .story-body {
    font-size: 10px;
    line-height: 1.18;
    color: #231f1a;
  }
  .illu-wrap {
    margin-bottom: 4px;
  }
  .footer-bar {
    border-top: 2px solid #141210;
    padding-top: 3px;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    font-size: 8.8px;
    font-weight: 800;
    letter-spacing: 0.7px;
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
          <div class="sec-bar" style="background:#141210">GLOBAL LOCATOR · SIX CONTINENTS · 25 NOV 2026</div>
          <div class="map-box">${renderWorldMapSvg()}</div>
        </div>
        <div class="hero-banner">
          <div class="story-meta">
            <span class="pin" style="background:#9b1c1c">${esc(HERO_STORY.pin)}</span>
            <span class="dateline">${esc(HERO_STORY.dateline)}</span>
          </div>
          <h2 class="hero-head">${esc(HERO_STORY.headline)}</h2>
          <p class="hero-body">${esc(HERO_STORY.body)}</p>
        </div>
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">ASIA-PACIFIC</div>
        <div class="illu-wrap">${sceneShenzhouLarge()}</div>
        ${TOP_RIGHT_COLS.asiaSpace.map((s) => renderStory(s, '#9b1c1c')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">MARKETS &amp; AI</div>
        <div class="illu-wrap">${sceneMarketsLarge()}</div>
        ${TOP_RIGHT_COLS.marketsTech.map((s) => renderStory(s, '#16324f')).join('')}
      </div>
    </section>

    <section class="lower-grid">
      <div class="col-box">
        <div class="sec-bar" style="background:#16324f">AMERICAS</div>
        <div class="illu-wrap">${sceneAmericasLarge()}</div>
        ${COLUMNS.americas.slice(0, 2).map((s) => renderStory(s, '#16324f')).join('')}
        <div class="illu-wrap" style="margin-top:4px">${sceneAmericasSouthLarge()}</div>
        ${COLUMNS.americas.slice(2).map((s) => renderStory(s, '#16324f')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#9b1c1c">EUROPE &amp; MIDDLE EAST</div>
        <div class="illu-wrap">${sceneEuropeLarge()}</div>
        ${COLUMNS.europeMena.slice(0, 3).map((s) => renderStory(s, '#9b1c1c')).join('')}
        <div class="illu-wrap" style="margin-top:4px">${sceneHormuzLarge()}</div>
        ${COLUMNS.europeMena.slice(3).map((s) => renderStory(s, '#b4690e')).join('')}
      </div>

      <div class="col-box">
        <div class="sec-bar" style="background:#1e5b3f">AFRICA, SCIENCE &amp; SPORT</div>
        <div class="illu-wrap">${sceneAfricaLarge()}</div>
        ${COLUMNS.africaScienceSport.slice(0, 3).map((s) => renderStory(s, '#1e5b3f')).join('')}
        <div class="illu-wrap" style="margin-top:4px">${sceneSpaceSportsLarge()}</div>
        ${COLUMNS.africaScienceSport.slice(3).map((s) => renderStory(s, '#16324f')).join('')}
      </div>
    </section>

    <footer class="footer-bar">
      <span>THE WORLD TODAY · WEDNESDAY, 25 NOVEMBER 2026</span>
      <span>8 LARGE ILLUSTRATED SCENES · WORLD MAP · 20 FLAGSHIP DISPATCHES</span>
      <span>VERIFIED 25 NOV 2026</span>
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
