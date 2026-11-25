export const EDITION_META = {
  masthead: 'THE WORLD TODAY',
  dateBanner: 'WEDNESDAY, 25 NOV 2026',
  editionLine: 'GLOBAL VISUAL EDITION  ·  20 FLAGSHIP DISPATCHES  ·  ALL SIX INHABITED CONTINENTS',
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
  { id: 9, label: 'Ottawa', lon: -75.7, lat: 45.4, color: '#16324f' },
  { id: 10, label: 'Cartagena', lon: -75.5, lat: 10.4, color: '#9b1c1c' },
  { id: 11, label: 'Kyiv', lon: 30.5, lat: 50.4, color: '#9b1c1c' },
  { id: 12, label: 'London', lon: -0.1, lat: 51.5, color: '#9b1c1c' },
  { id: 13, label: 'Warsaw', lon: 21.0, lat: 52.2, color: '#9b1c1c' },
  { id: 14, label: 'Hormuz', lon: 55.5, lat: 26.2, color: '#9b1c1c' },
  { id: 15, label: 'Cairo', lon: 31.2, lat: 30.0, color: '#b4690e' },
  { id: 16, label: 'Ituri', lon: 29.9, lat: 1.8, color: '#9b1c1c' },
  { id: 17, label: 'Dakar', lon: -17.4, lat: 14.7, color: '#1e5b3f' },
  { id: 18, label: 'Tokyo', lon: 139.7, lat: 35.7, color: '#1e5b3f' },
  { id: 20, label: 'Paris', lon: 2.3, lat: 48.8, color: '#1e5b3f' },
];

export const HERO_STORY = {
  pin: '1',
  dateline: 'JIUQUAN, 25 NOV',
  headline: 'Shenzhou-24 Orbits First Foreign Astronaut to Tiangong',
  body: 'Long March-2F launched three astronauts including Pakistan’s Muhammad Zeeshan Ali — first international crewmate on China’s space station.',
};

export const TOP_RIGHT_COLS = {
  asiaSpace: [
    {
      pin: '2',
      dateline: 'BEIJING / SHANGHAI, 25 NOV',
      headline: 'Shanghai Party Chief Chen Jining Probed',
      body: 'CCDI placed Politburo member Chen under discipline inquiry; US–China farm group met.',
    },
    {
      pin: '3',
      dateline: 'CANBERRA / WELLINGTON, 25 NOV',
      headline: 'Solomons Security Pact & 300+ Wild Kiwi',
      body: 'Australia–Solomons treaty bars foreign bases; NZ wild kiwi pass 300 in Wellington.',
    },
  ],
  marketsTech: [
    {
      pin: '4',
      dateline: 'SEOUL / NEW YORK, 25 NOV',
      headline: 'KOSPI Drops 6.2% Below 5,006; BTC <$60K',
      body: 'Index slid to 4,697.51 on Samsung/Hynix sell-off; Nasdaq fell 1.5%, BTC ~$59.2K.',
    },
    {
      pin: '5',
      dateline: 'SANTA CLARA, 25 NOV',
      headline: 'Nvidia CEO Apologizes; $270M AI Loans Probed',
      body: 'Reinstated Huang apologized after +31% stock swing; China AI server collateral probed.',
    },
  ],
};

export const COLUMNS = {
  americas: [
    {
      pin: '6',
      dateline: 'WASHINGTON, 25 NOV',
      headline: 'White House Seeks $5B Missile Shield Stopgap',
      body: 'Asks Congress for March freeze + Golden Dome funds before Dec. 11; Iran war hits $48B.',
    },
    {
      pin: '7',
      dateline: 'WASHINGTON, 25 NOV',
      headline: 'CIA & ODNI Hit by Unclassified OSINT Breach',
      body: 'Cyber intrusion hit open-source intel systems at CIA, ODNI & NGA; classified nets safe.',
    },
    {
      pin: '8',
      dateline: 'NEW YORK, 25 NOV',
      headline: 'Jury Convicts Huawei of Fraud, Acquits RICO',
      body: 'Brooklyn jury found Huawei guilty of bank fraud & trade-secret conspiracy, cleared RICO.',
    },
    {
      pin: '9',
      dateline: 'OTTAWA, 25 NOV',
      headline: 'Alto Rail Land Clash; Pentagon Rebukes F-35s',
      body: 'MPs fight fast-track expropriation for Toronto–Quebec rail; US warns Canada on defense.',
    },
    {
      pin: '10',
      dateline: 'CARTAGENA / BRASILIA, 25 NOV',
      headline: '30 Hostages Freed; Brazil Storms Displace 20K',
      body: 'Colombian raid ended 15h siege; floods hit S. Brazil as WHO pledges $2M for Cuba.',
    },
  ],
  europeMena: [
    {
      pin: '11',
      dateline: 'KYIV / BRUSSELS, 25 NOV',
      headline: 'Strikes Black Out 5 Regions; €70B EU Call',
      body: 'Overnight raids hit Ukraine’s grid; 90 European figures urge €70B 2027 pledge.',
    },
    {
      pin: '12',
      dateline: 'LONDON, 25 NOV',
      headline: 'Ofgem Lifts UK Energy Cap 26% to £2,166',
      body: 'Jan. 1 bill spike follows gas surge; MI5 warns UK defense firms of sabotage plots.',
    },
    {
      pin: '13',
      dateline: 'WARSAW / FRANKFURT, 25 NOV',
      headline: 'E5 Force Drills Wrap; ECB Slate Takes Shape',
      body: '2,800 troops drilled in Poland & launched AI hub; Spain’s de Cos leads ECB talks.',
    },
    {
      pin: '14',
      dateline: 'RIYADH / HORMUZ, 25 NOV',
      headline: 'Houthis Strike Refinery; Mines Hit Tankers',
      body: 'Fires hit Ras Tanura & Riyadh hub; blasts struck two tankers in Strait of Hormuz.',
    },
    {
      pin: '15',
      dateline: 'GAZA / CAIRO, 25 NOV',
      headline: 'Gaza Meningitis Alert; Red Sea Pact & $55M Aid',
      body: 'Medics warn of Gaza water crisis; Egypt & Sudan guard Red Sea with Port Sudan water aid.',
    },
  ],
  africaScienceSport: [
    {
      pin: '16',
      dateline: 'ITURI, DR CONGO, 25 NOV',
      headline: 'Fighting Traps WHO Ebola Team; 11,613 Cases',
      body: 'Clashes pinned responders in maternity ward as Bundibugyo toll hits 5,678 deaths.',
    },
    {
      pin: '17',
      dateline: 'DAKAR / JOBURG, 25 NOV',
      headline: 'CAS Restores AFCON Title to Senegal',
      body: 'Tribunal reversed Morocco ruling; Naspers profit +12% while South African rand slipped.',
    },
    {
      pin: '18',
      dateline: 'TOKYO / TAIPEI, 25 NOV',
      headline: 'Japan Killer-Sat Launch; Taiwan Deepfakes',
      body: 'Jan. 22 Kairos orbit tracker set; BBC exposed Taiwan election deepfake ring.',
    },
    {
      pin: '19',
      dateline: 'PASADENA, 25 NOV',
      headline: 'Voyager 1 Crosses One Light-Day From Earth',
      body: '49-yr probe hit 25.9B km (24h signal lag) as AI tools spotted TESS exoplanets.',
    },
    {
      pin: '20',
      dateline: 'PARIS / LUSAIL, 25 NOV',
      headline: 'Champions League Night; Qatar F1 & NBA Cup',
      body: 'PSG–Roma & Sporting–Man Utd lead Matchday 5; Tatum scored 41 for Boston.',
    },
  ],
};
