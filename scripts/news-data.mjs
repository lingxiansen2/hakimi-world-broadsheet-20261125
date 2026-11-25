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

export const MAP_PINS = [
  { id: 1, label: 'Jiuquan', lon: 100.3, lat: 40.9, color: '#9b1c1c' },
  { id: 2, label: 'Beijing', lon: 116.4, lat: 39.9, color: '#9b1c1c' },
  { id: 3, label: 'Canberra', lon: 149.1, lat: -35.3, color: '#1e5b3f' },
  { id: 4, label: 'Seoul', lon: 127.0, lat: 37.6, color: '#16324f' },
  { id: 5, label: 'S. Clara', lon: -122.0, lat: 37.4, color: '#16324f' },
  { id: 6, label: 'Washington', lon: -77.0, lat: 38.9, color: '#16324f' },
  { id: 8, label: 'New York', lon: -74.0, lat: 40.7, color: '#16324f' },
  { id: 9, label: 'Kyiv', lon: 30.5, lat: 50.4, color: '#9b1c1c' },
  { id: 10, label: 'Brussels', lon: 4.3, lat: 50.8, color: '#9b1c1c' },
  { id: 11, label: 'Hormuz', lon: 55.5, lat: 26.2, color: '#9b1c1c' },
  { id: 12, label: 'Ituri', lon: 29.9, lat: 1.8, color: '#9b1c1c' },
  { id: 13, label: 'Dakar', lon: -17.4, lat: 14.7, color: '#1e5b3f' },
  { id: 14, label: 'Paris', lon: 2.3, lat: 48.8, color: '#1e5b3f' },
  { id: 'A', label: 'Cartagena', lon: -75.5, lat: 10.4, color: '#b4690e' },
  { id: 'B', label: 'Brasilia', lon: -47.9, lat: -15.8, color: '#b4690e' },
  { id: 'C', label: 'Tokyo', lon: 139.7, lat: 35.7, color: '#16324f' },
  { id: 'D', label: 'Cairo', lon: 31.2, lat: 30.0, color: '#b4690e' },
];

export const HERO_STORY = {
  pin: '1',
  dateline: 'JIUQUAN, 25 NOV',
  headline: 'Shenzhou-24 Orbits First Foreign Astronaut to Tiangong',
  body: 'Long March-2F launched three astronauts including Pakistan’s Muhammad Zeeshan Ali — first international crewmate aboard China’s station.',
};

export const TOP_RIGHT_COLS = {
  asiaSpace: [
    {
      pin: '2',
      dateline: 'BEIJING / SHANGHAI, 25 NOV',
      headline: 'Shanghai Party Chief Chen Jining Probed',
      body: 'CCDI placed Politburo member Chen under inquiry — fourth top purge since 2025.',
    },
    {
      pin: '3',
      dateline: 'CANBERRA / WELLINGTON, 25 NOV',
      headline: 'Solomons Security Pact & 300+ Wild Kiwi',
      body: 'Australia–Solomons treaty bars foreign bases; NZ wild kiwi top 300 in capital.',
    },
  ],
  marketsTech: [
    {
      pin: '4',
      dateline: 'SEOUL / NEW YORK, 25 NOV',
      headline: 'KOSPI Drops 6.2% Off 5,006; BTC <$60K',
      body: 'Index fell to 4,697.51 on chip sell-off; Nasdaq -1.5%, BTC ~$59.2K, Gold $3,552.',
    },
    {
      pin: '5',
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
        pin: '6',
        dateline: 'WASHINGTON, 25 NOV',
        headline: 'White House Seeks $5B Missile Shield Stopgap',
        body: 'Requests March funding freeze + Golden Dome funds ahead of Dec. 11; Iran ops hit $48B.',
      },
      {
        pin: '7',
        dateline: 'WASHINGTON, 25 NOV',
        headline: 'CIA & ODNI Hit by Unclassified OSINT Breach',
        body: 'Cyber intrusion probed open-source intel systems at CIA, ODNI & NGA; secret nets safe.',
      },
    ],
    bottom: [
      {
        pin: '8',
        dateline: 'NEW YORK, 25 NOV',
        headline: 'Jury Convicts Huawei of Fraud, Acquits RICO',
        body: 'Brooklyn jury found Huawei guilty of bank fraud & trade-secret conspiracy; cleared RICO.',
      },
    ],
  },
  europeMena: {
    top: [
      {
        pin: '9',
        dateline: 'KYIV / LONDON, 25 NOV',
        headline: 'Strikes Black Out 5 Regions; UK Cap +26%',
        body: 'Overnight raids hit Ukraine’s winter grid; Ofgem hikes typical UK bills to £2,166 Jan. 1.',
      },
      {
        pin: '10',
        dateline: 'BRUSSELS / WARSAW, 25 NOV',
        headline: '90 Leaders Urge €70B Ukraine Pledge; E5 Drills',
        body: 'Manifesto precedes Thursday summit; 2,800 allied troops wrap Poland deployment drills.',
      },
    ],
    bottom: [
      {
        pin: '11',
        dateline: 'RIYADH / HORMUZ, 25 NOV',
        headline: 'Houthis Strike Refinery; Mines Hit Tankers',
        body: 'Drone attacks spark fires at Ras Tanura & Riyadh hub as blasts rock two Hormuz tankers.',
      },
    ],
  },
  africaScienceSport: {
    top: [
      {
        pin: '12',
        dateline: 'ITURI, DR CONGO, 25 NOV',
        headline: 'Fighting Traps WHO Ebola Team; 11,613 Cases',
        body: 'Clashes pin responders in maternity ward as Bundibugyo toll hits 5,678 deaths.',
      },
      {
        pin: '13',
        dateline: 'DAKAR / JOBURG, 25 NOV',
        headline: 'CAS Restores AFCON Crown to Senegal',
        body: 'Tribunal reverses Morocco ruling; South African rand retreats against US dollar.',
      },
    ],
    bottom: [
      {
        pin: '14',
        dateline: 'PASADENA / PARIS, 25 NOV',
        headline: 'Voyager 1 Hits 1 Light-Day; UCL & Qatar F1',
        body: '49-yr probe reaches 25.9B km; PSG–Roma & Sporting–Man Utd lead UCL; Tatum 41 pts.',
      },
    ],
  },
};

export const WORLD_IN_BRIEF = {
  americas: [
    { city: 'OTTAWA', text: 'Alto high-speed rail land-seizure bill sparks MP clash; 750 Parks Canada jobs cut.' },
    { city: 'OTTAWA / TORONTO', text: 'Pentagon rebukes Canada F-35 review; PWHL Sceptres blank Charge 4-0.' },
    { city: 'CARTAGENA', text: 'Colombian commandos raid Exito supermarket after 15h siege, rescuing 30 hostages.' },
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
