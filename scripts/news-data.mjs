export const EDITION_META = {
  masthead: 'THE WORLD TODAY',
  dateBanner: 'WEDNESDAY, 25 NOV 2026',
  editionLine: 'GLOBAL VISUAL EDITION  ·  14 LEAD DISPATCHES + 24 WORLD BRIEFS  ·  SIX CONTINENTS',
  volLine: 'VOL. MMXXVI · NO. 329 · 25 NOV 2026',
};

export const MARKET_TICKERS = [
  { label: 'KOSPI', value: '4,697', delta: '-6.2% (off 5,006)', dir: 'down' },
  { label: 'NASDAQ', value: '23,734', delta: '-1.5%', dir: 'down' },
  { label: 'NVDA', value: 'CEO', delta: 'POST +31% SWING', dir: 'warn' },
  { label: 'BTC', value: '$59.2K', delta: '-3.2%', dir: 'down' },
  { label: 'BRENT', value: '$88.2', delta: '-1.2%', dir: 'down' },
  { label: 'GOLD', value: '$3,552', delta: '-2.2%', dir: 'down' },
  { label: 'UK CAP', value: '£2,166', delta: '+26%', dir: 'warn' },
];

// Clean sequential pins 1..14 matching the 14 Lead Dispatches across all 6 inhabited continents
export const MAP_PINS = [
  { id: 1, label: 'Jiuquan', lon: 100.3, lat: 40.9, color: '#9b1c1c' },
  { id: 2, label: 'Beijing', lon: 116.4, lat: 39.9, color: '#9b1c1c' },
  { id: 3, label: 'Seoul', lon: 127.0, lat: 37.6, color: '#16324f' },
  { id: 4, label: 'Santa Clara', lon: -122.0, lat: 37.4, color: '#16324f' },
  { id: 5, label: 'Washington (Dome)', lon: -77.0, lat: 38.9, color: '#16324f' },
  { id: 6, label: 'Washington (OSINT)', lon: -77.0, lat: 38.9, color: '#9b1c1c' },
  { id: 7, label: 'New York', lon: -74.0, lat: 40.7, color: '#16324f' },
  { id: 8, label: 'Kyiv', lon: 30.5, lat: 50.4, color: '#9b1c1c' },
  { id: 9, label: 'Brussels', lon: 4.3, lat: 50.8, color: '#9b1c1c' },
  { id: 10, label: 'Hormuz / Ras Tanura', lon: 55.5, lat: 26.2, color: '#9b1c1c' },
  { id: 11, label: 'Ituri, DRC', lon: 29.9, lat: 1.8, color: '#9b1c1c' },
  { id: 12, label: 'Dakar', lon: -17.4, lat: 14.7, color: '#1e5b3f' },
  { id: 13, label: 'Pasadena', lon: -118.1, lat: 34.1, color: '#1e5b3f' },
  { id: 14, label: 'Canberra', lon: 149.1, lat: -35.3, color: '#1e5b3f' },
];

export const HERO_STORY = {
  pin: '14',
  dateline: 'CANBERRA / WELLINGTON, 25 NOV',
  headline: 'Solomons Security Pact & 300+ Wild Kiwi Return',
  body: 'Australia–Solomons treaty bars foreign military bases in Pacific; New Zealand wild kiwi pass 300 in Wellington hills after 150 years.',
};

export const TOP_RIGHT_COLS = {
  asiaSpace: [
    {
      pin: '1',
      dateline: 'JIUQUAN, 25 NOV',
      headline: 'Shenzhou-24 Orbits First Foreign Astronaut',
      body: 'Long March-2F launched 3 crew to Tiangong, including Pakistan’s Muhammad Zeeshan Ali.',
    },
    {
      pin: '2',
      dateline: 'BEIJING / SHANGHAI, 25 NOV',
      headline: 'Shanghai Party Chief Chen Jining Probed',
      body: 'CCDI placed Politburo member Chen under inquiry — fourth top purge since 2025.',
    },
  ],
  marketsTech: [
    {
      pin: '3',
      dateline: 'SEOUL / NEW YORK, 25 NOV',
      headline: 'KOSPI Drops 6.2% Off 5,006; BTC <$60K',
      body: 'Index slid to 4,697.51 on chip sell-off; Nasdaq -1.5%, BTC ~$59.2K, Gold $3,552.',
    },
    {
      pin: '4',
      dateline: 'SANTA CLARA, 25 NOV',
      headline: 'Nvidia CEO Apologizes; $270M Loans Probed',
      body: 'Huang apologized after +31% stock swing; China AI server collateral probed.',
    },
  ],
};

export const MIDDLE_COLS = {
  americas: {
    top: [
      {
        pin: '5',
        dateline: 'WASHINGTON, 25 NOV',
        headline: 'White House Seeks $5B Golden Dome',
        body: 'Requests March funding freeze + missile defense funds ahead of Dec. 11; Iran ops hit $48B.',
      },
      {
        pin: '6',
        dateline: 'WASHINGTON, 25 NOV',
        headline: 'CIA & ODNI Hit by Unclassified OSINT Breach',
        body: 'Cyber intrusion probed open-source intel systems at CIA, ODNI & NGA; secret nets safe.',
      },
    ],
    bottom: [
      {
        pin: '7',
        dateline: 'NEW YORK / CARTAGENA, 25 NOV',
        headline: 'Huawei Fraud Verdict; 30 Hostages Freed',
        body: 'Brooklyn jury convicted Huawei on fraud/secrets, cleared RICO; dawn raid ended 15h Colombia siege.',
      },
    ],
  },
  europeMena: {
    top: [
      {
        pin: '8',
        dateline: 'KYIV / LONDON, 25 NOV',
        headline: 'Strikes Black Out 5 Regions; UK Cap +26%',
        body: 'Overnight raids hit Ukraine’s winter grid; Ofgem confirms +26% UK energy cap (£2,166) Jan. 1.',
      },
      {
        pin: '9',
        dateline: 'BRUSSELS / WARSAW, 25 NOV',
        headline: '90 Leaders Urge €70B Ukraine Pledge; E5 Drills',
        body: 'Manifesto precedes Thursday summit; 2,800 allied troops wrap Poland deployment drills.',
      },
    ],
    bottom: [
      {
        pin: '10',
        dateline: 'RIYADH / HORMUZ, 25 NOV',
        headline: 'Houthis Strike Ras Tanura; Mines Hit Tankers',
        body: 'Drone attacks spark fires at Ras Tanura & Riyadh hub as blasts rock two Hormuz tankers.',
      },
    ],
  },
  africaScienceSport: {
    top: [
      {
        pin: '11',
        dateline: 'ITURI, DR CONGO, 25 NOV',
        headline: 'Fighting Forces WHO Ebola Pullout in Ituri',
        body: 'Armed clashes trap responders at maternity ward and force WHO Bundibugyo Ebola team evacuation.',
      },
      {
        pin: '12',
        dateline: 'DAKAR / JOBURG, 25 NOV',
        headline: 'CAS Restores AFCON Crown to Senegal',
        body: 'Tribunal reverses Morocco ruling; South African rand retreats against US dollar.',
      },
    ],
    bottom: [
      {
        pin: '13',
        dateline: 'PASADENA / PARIS, 25 NOV',
        headline: 'Voyager 1 Hits 1 Light-Day; UCL & Qatar F1',
        body: '49-yr probe hits 25.9B km; PSG–Roma & Sporting–Man Utd lead UCL; Tatum 41 pts.',
      },
    ],
  },
};

export const WORLD_IN_BRIEF = {
  americas: [
    { city: 'OTTAWA', text: 'Alto high-speed rail land-seizure bill sparks MP clash; 750 Parks Canada jobs cut.' },
    { city: 'OTTAWA / TORONTO', text: 'Pentagon rebukes Canada F-35 review; PWHL Sceptres blank Charge 4-0.' },
    { city: 'WASHINGTON', text: 'Trump order tells federal contractors to consult White House before Hill replies.' },
    { city: 'MEXICO CITY', text: 'Paseo de la Reforma march to Zocalo triggers U.S. Embassy transit alert.' },
    { city: 'BRASILIA / HAVANA', text: 'Deadly Southern Brazil storms displace 20,000; WHO pledges $2M for Cuba.' },
    { city: 'CHICAGO / IOWA', text: 'Thanksgiving flyers pack O’Hare; PAHO issues H5N1 alert; Iowa ordnance blast set.' },
  ],
  europe: [
    { city: 'LONDON', text: 'MI5 & MoD warn defense suppliers of escalating Russian proxy sabotage threats.' },
    { city: 'FRANKFURT', text: 'ECB leadership talks line up Spain’s de Cos, France’s Boone & Germany’s Brunnermeier.' },
    { city: 'WARSAW / RENNES', text: 'E5 nations (FR, DE, IT, PL, SE) launch ICAID military AI defense center.' },
    { city: 'BRUSSELS', text: 'EU envoys weigh Russian tourist visa curbs ahead of Thursday Ukraine summit.' },
    { city: 'BRUSSELS', text: 'Commission cites Germany, Spain, Italy & Poland over foreign pension taxes.' },
    { city: 'BERLIN / LONDON', text: 'IW report shows Poland +€6.7B net EU recipient; UK-EU trade rules assessed.' },
  ],
  menaAfrica: [
    { city: 'GAZA', text: 'Medics warn of rising meningitis cases and acute water shortages across enclave.' },
    { city: 'JERUSALEM / BEIRUT', text: 'Israel alleges Iran chemical arms effort; IDF maintains south Lebanon zones.' },
    { city: 'WASHINGTON / DUBAI', text: 'U.S. issues Mideast citizen alerts; Trump says Iran operations funded through Jan.' },
    { city: 'CAIRO / PORT SUDAN', text: 'Egypt & Sudan bar non-coastal Red Sea forces; AfDB/UNICEF set $55M water aid.' },
    { city: 'ABUJA / NAIROBI', text: 'African ministers urge media alliance; Kenya and Zimbabwe sign 8 pacts.' },
    { city: 'JOHANNESBURG', text: 'Naspers core profit rises 12% on Tencent; court convicts Russia-bound recruit.' },
  ],
  asiaPacific: [
    { city: 'TOKYO', text: 'Defense Ministry schedules Jan. 22 Kairos rocket test to track killer satellites.' },
    { city: 'TAIPEI / LONDON', text: 'BBC Verify exposes China-linked AI deepfake network targeting Taiwan polls.' },
    { city: 'BEIJING / D.C.', text: 'U.S.–China Board of Trade holds inaugural bilateral farm working group.' },
    { city: 'TOKYO / SINGAPORE', text: 'Nikkei slides ~3% on AI sell-off; Asian data centers offload Nvidia GPUs West.' },
    { city: 'BANGKOK / MANILA', text: 'Bank of Thailand targets 48% informal GDP; Philippine demand tightens rice.' },
    { city: 'MALE / JAKARTA', text: 'India’s Doval backs Indian Ocean security; Indonesia passes Asset Forfeiture law.' },
  ],
};
