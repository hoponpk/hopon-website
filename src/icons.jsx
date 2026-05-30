// ── Hopon icon set (lucide geometry) + brand tokens + base primitives ──

const C = {
  yellow: '#F5C518',
  yellowD: '#D4A800',
  blue: '#2563EB',
  green: '#22A06B',
  red: 'oklch(0.6 0.22 27)',
  bg: '#F5F4F0',
  surface: '#FFFFFF',
  fg: '#1A1A1A',
  muted: '#6B6B6B',
  border: 'oklch(0.9 0.005 95)',
};

const ICON_PATHS = {
  MapPin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  Users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  Users2: <><path d="M14 19a6 6 0 0 0-12 0" /><circle cx="8" cy="9" r="4" /><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" /></>,
  Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  Shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
  ShieldCheck: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  ScanFace: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></>,
  Star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  CheckCircle2: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>,
  Check: <path d="M20 6 9 17l-5-5" />,
  ChevronRight: <path d="m9 18 6-6-6-6" />,
  ArrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  ArrowLeft: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
  Menu: <><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></>,
  X: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  Leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.66c0 1.97-.7 6.15-3.62 8.84A7 7 0 0 1 11 20z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>,
  Clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  MessageSquare: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  BadgeCheck: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>,
  Car: <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></>,
  Route: <><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></>,
  Navigation: <polygon points="3 11 22 2 13 21 11 13 3 11" />,
  Waypoints: <><circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" /></>,
  Locate: <><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><circle cx="12" cy="12" r="7" /></>,
  Wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>,
  Coins: <><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></>,
  BarChart2: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
  TrendingUp: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
  CircleDot: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></>,
  CalendarDays: <><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /></>,
  AlertTriangle: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  Plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  Minus: <path d="M5 12h14" />,
  Search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  Phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
};

function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 2, style = {} }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

// ── Logo ──────────────────────────────────────────────────────────────
function Logo({ light }) {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img src={light ? 'logo-on-dark.png' : 'logo-on-yellow.png'} alt="Hopon" style={{ height: 30, width: 'auto', display: 'block' }} />
    </a>
  );
}

// ── Landing-page pill button (kept from original CTA styling) ──────────
function Pill({ children, variant = 'primary', href, small, full }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: small ? '0.6rem 1.25rem' : '0.9rem 1.9rem',
    width: full ? '100%' : 'auto',
    borderRadius: 9999,
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
    fontSize: small ? '0.9rem' : '1.05rem',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    textDecoration: 'none', cursor: 'pointer', border: 'none',
    transition: 'background 150ms, transform 100ms, box-shadow 150ms, border-color 150ms',
    whiteSpace: 'nowrap',
  };
  const v = {
    primary: { ...base, background: C.yellow, color: C.fg },
    dark: { ...base, background: C.fg, color: '#fff' },
    'outline-dark': { ...base, background: 'transparent', border: `1.5px solid ${C.fg}`, color: C.fg },
    'outline-light': { ...base, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' },
  };
  const cls = variant === 'primary' ? 'btn-yellow' : variant === 'dark' ? 'btn-dark' : '';
  if (href) return <a className={cls} href={href} style={v[variant]}>{children}</a>;
  return <button type="button" className={cls} style={v[variant]}>{children}</button>;
}

Object.assign(window, { Icon, Logo, Pill, C });
