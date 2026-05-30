// ── Features grid + Trust & Safety + City Coverage ────────────────────

// crop band wrapper for feature cards
function Crop({ children, h = 76, dark }) {
  return (
    <div style={{ height: h, borderRadius: 12, background: dark ? 'rgba(255,255,255,0.04)' : '#F7F6F2', border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : C.border}`, padding: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </div>
  );
}
function DetourMini({ h = 90 }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', height: h, position: 'relative', border: `1px solid ${C.border}`, background: '#fff' }}>
      <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block' }}>
        <g stroke="#EEECE5" strokeWidth="1">
          <line x1="0" y1="20" x2="200" y2="20" />
          <line x1="0" y1="40" x2="200" y2="40" />
          <line x1="55" y1="0" x2="55" y2="60" />
          <line x1="110" y1="0" x2="110" y2="60" />
          <line x1="160" y1="0" x2="160" y2="60" />
        </g>
        {/* match corridor */}
        <path d="M16 46 L70 30 L120 28 L186 13" fill="none" stroke={C.blue} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
        {/* driver route */}
        <path d="M16 46 L70 30 L120 28 L186 13" fill="none" stroke={C.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* origin */}
        <circle cx="16" cy="46" r="4.5" fill="#fff" stroke={C.green} strokeWidth="2.5" />
        {/* destination */}
        <circle cx="186" cy="13" r="4.5" fill={C.red} stroke="#fff" strokeWidth="2" />
        {/* off-route rider (excluded) */}
        <line x1="95" y1="50" x2="95" y2="29" stroke="#C2BEB4" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="95" cy="50" r="4.5" fill="#fff" stroke="#C2BEB4" strokeWidth="2" />
        {/* matched on-route pickups */}
        <circle cx="50" cy="36" r="6" fill={C.green} stroke="#fff" strokeWidth="2" />
        <path d="M47.6 36 l1.7 1.7 l3.1 -3.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="120" cy="28" r="6" fill={C.green} stroke="#fff" strokeWidth="2" />
        <path d="M117.6 28 l1.7 1.7 l3.1 -3.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>);

}
function EarnChip() {
  return <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,160,107,0.10)', color: C.green, borderRadius: 9999, padding: '7px 12px', fontWeight: 700, fontSize: 12 }}><Icon name="TrendingUp" size={13} color={C.green} />Earn up to PKR 800 this week</div>;
}

function FeatureCard({ icon, title, body, crop, accent, delay }) {
  return (
    <Reveal delay={delay} className="feat-card" style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Crop>{crop}</Crop>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: accent.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={icon} size={16} color={accent.fg} />
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: C.fg }}>{title}</div>
      </div>
      <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.5 }}>{body}</p>
    </Reveal>
  );
}

function Features() {
  const yellowA = { bg: 'rgba(245,197,24,0.14)', fg: C.yellowD };
  const blueA = { bg: 'rgba(37,99,235,0.10)', fg: C.blue };
  const rider = [
    { icon: 'Clock', title: 'Flexible timing', body: 'Set a departure window of up to 60 minutes around your time.', crop: <FlexChips value="15 min" /> },
    { icon: 'Users', title: 'Gender preference', body: 'Choose same-gender matching for added comfort and peace of mind.', crop: <GenderToggle value="Same gender" /> },
    { icon: 'MessageSquare', title: 'In-app chat', body: 'Coordinate pickup details with your match without sharing a number.', crop: <ChatBubbles /> },
  ];
  const driver = [
    { icon: 'Navigation', title: 'Route-first matching', body: 'Only riders who already sit along your route are ever shown.', crop: <DetourMini h={56} /> },
    { icon: 'CircleDot', title: 'Pickup radius control', body: 'Decide exactly how far off-route you are willing to go.', crop: <RadiusSlider value="1.5 km" pct={50} /> },
    { icon: 'CalendarDays', title: 'Recurring commutes', body: 'Post once and cover your entire weekly schedule.', crop: <WeekPicker on={[0, 1, 2, 3]} /> },
    { icon: 'Waypoints', title: 'Along-route mode', body: 'Accept pickups at any point on your path, not just the endpoints.', crop: <AlongRouteToggle on /> },
  ];
  const ColHeader = ({ children }) => <div style={{ display: 'inline-flex', background: C.fg, color: '#fff', borderRadius: 9999, padding: '0.4rem 1rem', fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{children}</div>;
  return (
    <section style={{ background: C.bg, padding: '6rem 1.5rem', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          <Eyebrow>Built for both sides</Eyebrow>
          <H2 style={{ fontSize: 'clamp(2.4rem,5vw,3.2rem)' }}>Engineered for the seamless commute.</H2>
          <p style={{ marginTop: '0.85rem', fontSize: '1.05rem', color: C.muted, lineHeight: 1.6 }}>
            The world's most seamless carpooling experience, built around a ride-matching algorithm designed specifically for shared routes.
          </p>
        </Reveal>
        <div className="feat-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <ColHeader>For riders</ColHeader>
            <div className="feat-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {rider.map((f, i) => <FeatureCard key={f.title} {...f} accent={yellowA} delay={i * 60} />)}
            </div>
          </div>
          <div>
            <ColHeader>For drivers</ColHeader>
            <div className="feat-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {driver.map((f, i) => <FeatureCard key={f.title} {...f} accent={blueA} delay={i * 60} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════ TRUST & SAFETY ═══════════
function SOSCrop() {
  return (
    <div style={{ background: '#fff', border: `1px solid rgba(255,255,255,0.10)`, borderRadius: 12, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, color: '#fff', fontSize: 9, letterSpacing: '0.04em' }}>SOS</span>
      </div>
      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>Live location shared</span>
      <span className="pulseDot" style={{ width: 7, height: 7, borderRadius: '50%', background: C.red }} />
    </div>
  );
}

function Safety() {
  const pillars = [
    { icon: 'ScanFace', title: 'Face verification', body: 'A selfie is matched against the driver licence photo before the first trip is approved.', crop: <VerifyRow icon="ScanFace" label="Face" status="Verified" /> },
    { icon: 'ShieldCheck', title: 'Licence verification', body: 'Every driver licence is verified before they can offer a ride. No unverified drivers.', crop: <VerifyRow icon="BadgeCheck" label="Licence" status="Verified" /> },
    { icon: 'AlertTriangle', title: 'SOS button', body: 'One tap sends your live location to emergency contacts from inside the app.', crop: <SOSCrop /> },
    { icon: 'Star', title: 'Mutual ratings', body: 'Both driver and rider rate each other after every trip. Poor ratings remove access.', crop: <VerifyRow icon="Star" label="Trip rating" status="4.9" /> },
  ];
  return (
    <section id="safety" style={{ background: '#0D0D0D', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <H2 style={{ color: '#fff', fontSize: 'clamp(2.4rem,5vw,3.2rem)' }}>Every commute is a verified one.</H2>
          <p style={{ marginTop: '0.85rem', fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 540, margin: '0.85rem auto 0', lineHeight: 1.6 }}>
            We verify identity before the first trip. You always know who you are riding with.
          </p>
        </Reveal>
        <div className="safety-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,197,24,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={p.icon} size={20} color={C.yellow} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{p.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{p.body}</p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6 }}>{p.crop}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════ CITY COVERAGE ═══════════
function Coverage() {
  const cities = [
    { name: 'Lahore', note: 'Most active city' },
    { name: 'Islamabad', note: '' },
    { name: 'Karachi', note: '' },
  ];
  const stats = [
    { v: '30+', l: <>Intercity trips<br />daily</> },
    { v: '50%', l: 'cheaper than ride-hailing' },
    { v: '600 km+', l: 'routes supported' },
  ];
  return (
    <section id="cities" style={{ background: '#0D0D0D', padding: '6rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="split" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem', alignItems: 'center' }}>
        <Reveal>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,197,24,0.15)', color: C.yellow, borderRadius: 9999, padding: '0.35rem 0.9rem', fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>Now in 3 cities</span>
          <H2 style={{ color: '#fff' }}>Lahore. Islamabad. Karachi. Your commute, matched.</H2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '1.1rem 0 1.6rem', maxWidth: 480 }}>
            Hopon is live in Lahore, Islamabad, and Karachi. Use it for your daily commute across the city or for longer trips between cities. If someone is heading your way, you can share the ride.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {cities.map((c) => (
              <div key={c.name} style={{ flex: '1 1 150px', background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(34,160,107,0.15)', color: C.green, borderRadius: 9999, padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    <span className="pulseDot" style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />LIVE
                  </span>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.3rem', textTransform: 'uppercase', color: '#fff' }}>{c.name}</div>
                <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Daily commutes, intercity routes</div>
                {c.note && <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{c.note}</div>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', margin: '0.5rem 0 2rem' }}>
            {stats.map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.8rem', color: '#fff', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <Pill href={APP_URL}>Find a ride in your city <Icon name="ArrowRight" size={16} /></Pill>
        </Reveal>
        <Reveal delay={120} className="cov-mock" style={{ display: 'flex', justifyContent: 'center' }}>
          <Mockup interval={2000} mode="fade" dark>
            <CovIsb /><CovIntercity /><CovKarachi />
          </Mockup>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Features, Safety, Coverage });
