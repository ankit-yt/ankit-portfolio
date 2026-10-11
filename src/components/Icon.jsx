const paths = {
  'arrow-up-right': 'M7 17 17 7M7 7h10v10',
  'arrow-down': 'M12 4v16m-6-6 6 6 6-6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  play: 'm8 5 11 7-11 7Z',
  pause: 'M8 5v14M16 5v14',
  star: 'm12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.6l6.2-.9Z',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4',
  film: 'M4 3h16v18H4ZM4 8h16M4 16h16M8 3v5M16 3v5M8 16v5M16 16v5',
  cut: 'm9 8 11 12M9 16 20 4M4.5 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4.5 13a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
  layers: 'm12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5',
  phone: 'M7 2h10v20H7ZM10 18h4',
  brush: 'm14 6 4-4 4 4-11 11-4-4Zm-7 7c-5 0-2 6-5 7 5 2 9-1 9-4',
  presentation: 'M3 3h18v13H3Zm9 13v5m-5 0 5-5 5 5M7 11l3-3 3 2 4-4',
  square: 'M4 4h16v16H4Z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  reset: 'M3 11a9 9 0 1 1 2 7M3 4v7h7',
};
export default function Icon({ name = 'arrow-up-right', size = 20, className = '', ...props }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[name] || paths['arrow-up-right']} /></svg>;
}
