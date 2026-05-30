// ── App-mockup kit: device frame, map, bottom sheet, floating chrome, ──
// ── animation stacks, scroll reveal. Shared visual grammar for Hopon. ─
const { useEffect, useState, useRef } = React;

const SW = 280;   // screen content width
const SH = 600;   // screen content height

// ── Phone frame (clean white bezel, optional tilt / dark bezel) ────────
function PhoneFrame({ children, tilt = 0, dark = false, width = 300, float }) {
  const scale = width / 300;
  return (
    <div style={{
      transform: `rotate(${tilt}deg) scale(${scale})`,
      transformOrigin: 'center center',
      animation: float ? 'phoneFloat 6s ease-in-out infinite' : 'none',
    }}>
      <div style={{
        width: 300, height: 620,
        background: dark ? '#0B0B0B' : '#FFFFFF',
        borderRadius: 46, padding: 10,
        boxShadow: '0 40px 80px -30px rgba(0,0,0,0.40), 0 16px 36px -16px rgba(0,0,0,0.20)',
        border: `1px solid ${dark ? '#262626' : C.border}`,
      }}>
        <div style={{
          position: 'relative', width: SW, height: SH, margin: '0 auto',
          borderRadius: 36, overflow: 'hidden', background: C.bg,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Status bar ─────────────────────────────────────────────────────────
function StatusBar({ dark }) {
  const col = dark ? 'rgba(255,255,255,0.9)' : C.fg;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 6,
      height: 30, padding: '0 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: col, fontFamily: "'DM Sans'" }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[3, 5, 7, 9].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: col, opacity: 0.85 }} />
        ))}
        <div style={{ width: 18, height: 9, borderRadius: 2, border: `1px solid ${col}`, marginLeft: 3, opacity: 0.85, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 1.5, width: '70%', background: col, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

// ── Full-screen container (screens fill phone inner / thumb host) ──────
function Screen({ children, bg = C.bg, dark }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg, overflow: 'hidden' }}>
      <StatusBar dark={dark} />
      {children}
    </div>
  );
}

// ── Map background: warm-gray geography, white roads, blue route ───────
// Real city centres (the three live Hopon cities)
const CITY = {
  lhr: { lat: 31.5118, lng: 74.3460 }, // Gulberg, Lahore
  isb: { lat: 33.7080, lng: 73.0560 }, // Blue Area, Islamabad
  khi: { lat: 24.8290, lng: 67.0420 }, // Clifton/DHA, Karachi
};

// lat/lng -> fractional tile coordinates at a zoom level
function tileXY(lat, lng, z) {
  const r = lat * Math.PI / 180;
  const n = Math.pow(2, z);
  return {
    x: (lng + 180) / 360 * n,
    y: (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n,
  };
}

// Real street map built from CartoDB Positron raster tiles (the clean,
// light basemap ride apps use), centred on a real city, cropped to the screen.
function RealMap({ city = 'lhr', zoom = 14, dim = true, dark = false }) {
  const W = SW, H = SH, TS = 256;
  const c = CITY[city] || CITY.lhr;
  const t = tileXY(c.lat, c.lng, zoom);
  const cx = t.x * TS, cy = t.y * TS;
  const originX = cx - W / 2, originY = cy - H / 2;
  const minTX = Math.floor(originX / TS), maxTX = Math.floor((originX + W) / TS);
  const minTY = Math.floor(originY / TS), maxTY = Math.floor((originY + H) / TS);
  const n = Math.pow(2, zoom);
  const style = dark ? 'dark_all' : 'light_all';
  const tiles = [];
  for (let tx = minTX; tx <= maxTX; tx++) {
    for (let ty = minTY; ty <= maxTY; ty++) {
      const wx = ((tx % n) + n) % n;
      if (ty < 0 || ty >= n) continue;
      tiles.push({
        key: `${tx}_${ty}`,
        url: `https://a.basemaps.cartocdn.com/${style}/${zoom}/${wx}/${ty}@2x.png`,
        left: Math.round(tx * TS - originX),
        top: Math.round(ty * TS - originY),
      });
    }
  }
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: dark ? '#10141B' : '#EAE7E0' }}>
      {tiles.map((tl) => (
        <img key={tl.key} src={tl.url} alt="" loading="lazy" width={TS} height={TS}
          style={{ position: 'absolute', left: tl.left, top: tl.top, width: TS, height: TS, filter: dark ? 'none' : 'saturate(0.92) brightness(1.01)' }} />
      ))}
      {dim && <div style={{ position: 'absolute', inset: 0, background: dark ? 'rgba(10,12,16,0.30)' : 'rgba(245,244,240,0.18)' }} />}
    </div>
  );
}

function MapBg({ variant = 'city', city = 'lhr', dim = true, dark = false }) {
  const zoom = variant === 'intercity' ? 11 : 14;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <RealMap city={city} zoom={zoom} dim={dim} dark={dark} />
      <svg viewBox="0 0 280 600" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
        <RouteOverlay variant={variant} dark={dark} />
      </svg>
    </div>
  );
}

// blue casing + route + pins + car, per variant
function RouteOverlay({ variant, dark }) {
  const blue = C.blue;
  const casing = dark ? 'rgba(255,255,255,0.10)' : '#FFFFFF';
  const Pin = ({ x, y, color, kind }) => kind === 'dest'
    ? <g transform={`translate(${x},${y})`}>
        <path d="M0 0 C-7 -10 -9 -16 0 -22 C9 -16 7 -10 0 0Z" fill={color} stroke="#fff" strokeWidth="2" transform="translate(0,2)" />
        <circle cx="0" cy="-13" r="3.2" fill="#fff" />
      </g>
    : <g transform={`translate(${x},${y})`}>
        <circle r="7" fill={color} stroke="#fff" strokeWidth="2.5" />
      </g>;

  if (variant === 'overlap') {
    return (
      <g>
        <path d="M30 470 Q120 300 250 130" stroke={casing} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M30 470 Q120 300 250 130" stroke={blue} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M70 410 Q150 300 235 200" stroke={casing} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M70 410 Q150 300 235 200" stroke={C.yellow} strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="151" cy="299" r="9" fill="#fff" /><circle cx="151" cy="299" r="5.5" fill={C.green} stroke="#fff" strokeWidth="2" />
      </g>
    );
  }
  if (variant === 'shared') {
    // driver route (blue) and rider route (yellow) sharing the lower
    // segment, then diverging to a slightly different destination
    const shared = 'M55 470 Q150 360 150 285';
    return (
      <g>
        <path d={`${shared} T240 110`} stroke={casing} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d={`${shared} T240 110`} stroke={blue} strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* rider route — coincident on the shared segment (drawn on top), then branches */}
        <path d={`${shared} Q176 232 202 156`} stroke={C.yellow} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* pickup where the rider hops on */}
        <circle cx="116" cy="388" r="8" fill="#fff" /><circle cx="116" cy="388" r="5.5" fill={C.green} stroke="#fff" strokeWidth="2" />
        {/* origin */}
        <Pin x={55} y={470} color={C.green} />
        {/* driver destination */}
        <Pin x={240} y={110} color={C.red} kind="dest" />
        {/* rider destination — slightly different */}
        <Pin x={202} y={156} color={C.yellowD} kind="dest" />
      </g>
    );
  }
  if (variant === 'intercity') {
    return (
      <g>
        <path d="M55 470 Q150 250 230 120" stroke={casing} strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M55 470 Q150 250 230 120" stroke={blue} strokeWidth="5" strokeDasharray="1 9" fill="none" strokeLinecap="round" />
        <Pin x={55} y={470} color={C.green} />
        <Pin x={230} y={120} color={C.red} kind="dest" />
      </g>
    );
  }
  // route with optional detour + car
  const detour = variant === 'detour' || variant === 'hero3' || variant === 'driver';
  return (
    <g>
      <path d="M55 470 Q150 360 150 285 T240 110" stroke={casing} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M55 470 Q150 360 150 285 T240 110" stroke={blue} strokeWidth="5" fill="none" strokeLinecap="round" />
      {detour && <>
        <path d="M150 285 Q110 250 95 205" stroke={casing} strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M150 285 Q110 250 95 205" stroke={C.green} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
        <Pin x={95} y={205} color={C.green} />
      </>}
      <Pin x={55} y={470} color={C.green} />
      <Pin x={240} y={110} color={C.red} kind="dest" />
      {(variant === 'hero1' || variant === 'hero3' || variant === 'rider-enroute') && (
        <g transform={variant === 'hero1' ? 'translate(55,470)' : 'translate(150,285)'}>
          {variant === 'hero1' && <>
            <circle r="14" className="radar" fill="none" stroke={blue} strokeWidth="2" opacity="0.5" />
            <circle r="14" className="radar radar2" fill="none" stroke={blue} strokeWidth="2" opacity="0.5" />
          </>}
          <circle r="11" fill={blue} stroke="#fff" strokeWidth="2.5" />
          <g transform="translate(-7,-7) scale(0.58)"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 17h6" stroke="#fff" strokeWidth="2.5" /></g>
        </g>
      )}
    </g>
  );
}

// ── Bottom sheet ───────────────────────────────────────────────────────
function DragHandle() {
  return <div style={{ width: 40, height: 5, borderRadius: 9999, background: '#D8D5CD', margin: '0 auto 12px' }} />;
}
function BottomSheet({ children, style }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 4,
      background: '#fff', borderRadius: '24px 24px 0 0',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
      padding: '12px 16px 18px', ...style,
    }}>
      <DragHandle />
      {children}
    </div>
  );
}

// ── Floating top bar (back / credit chip / mode toggle) ────────────────
function TopBar({ credit = 'PKR 250', mode = 'Rider' }) {
  return (
    <div style={{ position: 'absolute', top: 38, left: 14, right: 14, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.05)' }}>
        <Icon name="ArrowLeft" size={17} color={C.fg} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', padding: '7px 11px', borderRadius: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Icon name="Coins" size={13} color={C.yellowD} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.fg, fontFamily: "'DM Sans'" }}>{credit}</span>
        </div>
        <div style={{ display: 'flex', background: '#fff', borderRadius: 9999, padding: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.05)' }}>
          {['Rider', 'Driver'].map((m) => (
            <span key={m} style={{
              fontSize: 11, fontWeight: 700, padding: '4px 9px', borderRadius: 9999,
              fontFamily: "'DM Sans'",
              background: mode === m ? (m === 'Driver' ? C.blue : C.yellow) : 'transparent',
              color: mode === m ? (m === 'Driver' ? '#fff' : C.fg) : C.muted,
            }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step progress dots ─────────────────────────────────────────────────
function StepDots({ total = 3, current = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 6 : 2, height: i === current ? 6 : 2, borderRadius: 9999,
          background: i === current ? C.yellow : i < current ? C.fg : '#CFCBC1',
        }} />
      ))}
    </div>
  );
}

// step label + heading inside a sheet
function StepLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{children}</div>;
}
function SheetTitle({ children }) {
  return <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 22, textTransform: 'uppercase', color: C.fg, lineHeight: 1.05, marginBottom: 12 }}>{children}</div>;
}

// ── In-app CTA button ──────────────────────────────────────────────────
function AppCTA({ children, color = C.yellow, textColor = C.fg, icon }) {
  return (
    <div style={{
      width: '100%', background: color, color: textColor,
      borderRadius: 9999, padding: '12px', textAlign: 'center',
      fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 14,
      textTransform: 'uppercase', letterSpacing: '0.05em',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>{icon}{children}</div>
  );
}

// ── Animation stacks ───────────────────────────────────────────────────
function useCycle(count, interval = 2000, pauseLast = 1000) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const last = i === count - 1;
    const t = setTimeout(() => setI((p) => (p + 1) % count), interval + (last ? pauseLast : 0));
    return () => clearTimeout(t);
  }, [i, count, interval, pauseLast]);
  return i;
}

// fade or slide stack; children fill SW x SH host
function Stack({ children, active, mode = 'fade' }) {
  const items = React.Children.toArray(children);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {items.map((child, idx) => {
        const offset = idx - active;
        const style = mode === 'slide'
          ? { transform: `translateX(${offset * 100}%)`, opacity: offset === 0 ? 1 : 0.4, transition: 'transform 420ms cubic-bezier(0.4,0,0.2,1), opacity 420ms' }
          : { opacity: offset === 0 ? 1 : 0, transition: 'opacity 420ms ease', pointerEvents: offset === 0 ? 'auto' : 'none' };
        return <div key={idx} style={{ position: 'absolute', inset: 0, ...style }}>{child}</div>;
      })}
    </div>
  );
}

// ── Screen thumbnail (scaled real screen, no device frame) ─────────────
function ScreenThumb({ children, width = 80, cropH }) {
  const scale = width / SW;
  const h = (cropH || SH) * scale;
  return (
    <div style={{ width, height: h, overflow: 'hidden', borderRadius: 10, border: `1px solid ${C.border}`, position: 'relative', flexShrink: 0, background: C.bg }}>
      <div style={{ width: SW, height: SH, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ── Scroll reveal ──────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 20, style, as = 'div', ...rest }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.12 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 380ms ease-out ${delay}ms, transform 380ms ease-out ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}

Object.assign(window, {
  SW, SH, PhoneFrame, StatusBar, Screen, MapBg, RouteOverlay,
  BottomSheet, DragHandle, TopBar, StepDots, StepLabel, SheetTitle,
  AppCTA, useCycle, Stack, ScreenThumb, Reveal,
});
