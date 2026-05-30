// ── Shared section helpers + For Riders / For Drivers / How it works ──

// auto-advancing phone mockup
function Mockup({ children, interval = 3400, mode = 'slide', dark, width = 300, float }) {
  const n = React.Children.count(children);
  const i = useCycle(n, interval, 1000);
  return <PhoneFrame dark={dark} width={width} float={float}><Stack active={i} mode={mode}>{children}</Stack></PhoneFrame>;
}

function Eyebrow({ color = C.muted, children }) {
  return <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: '0.75rem' }}>{children}</p>;
}
function H2({ children, style }) {
  return <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 'clamp(2.1rem,4.6vw,2.9rem)', textTransform: 'uppercase', color: C.fg, lineHeight: 1.04, letterSpacing: '-0.005em', textWrap: 'balance', ...style }}>{children}</h2>;
}
function FeatureChip({ children }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid ${C.border}`, borderRadius: 9999, padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 600, color: C.fg, background: '#fff' }}>{children}</span>;
}

Object.assign(window, { Mockup, Eyebrow, H2, FeatureChip });

// ═══════════ FOR RIDERS ═══════════
function ForRiders() {
  return (
    <section id="riders" style={{ background: '#fff', padding: '6rem 1.5rem' }}>
      <div className="split" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '4.5rem', alignItems: 'center' }}>
        <Reveal>
          <Eyebrow color={C.yellowD}>For riders</Eyebrow>
          <H2>Hop on a seat on a route that already exists.</H2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.7, margin: '1.1rem 0 1.6rem', maxWidth: 440 }}>
            Browse verified drivers heading your way. Set your pickup window and departure time. Get matched in seconds and split the fuel cost fairly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '2rem' }}>
            <FeatureChip><Icon name="ShieldCheck" size={14} color={C.green} />Verified drivers</FeatureChip>
            <FeatureChip><Icon name="Wallet" size={14} color={C.yellowD} />50% cheaper than ride-hailing, guaranteed.</FeatureChip>
            <FeatureChip><Icon name="Users" size={14} color={C.blue} />Gender-matching preference</FeatureChip>
            <FeatureChip><Icon name="Navigation" size={14} color={C.green} />Track your driver live, all the way to pickup</FeatureChip>
          </div>
          <Pill href={APP_URL}>Find a ride <Icon name="ArrowRight" size={16} /></Pill>
        </Reveal>
        <Reveal delay={120} style={{ display: 'flex', justifyContent: 'center' }}>
          <Mockup interval={3600}>
            <RiderS1 /><RiderS2 /><RiderS3 /><RiderS4 />
          </Mockup>
        </Reveal>
      </div>
    </section>);

}

// ═══════════ FOR DRIVERS ═══════════
function ForDrivers() {
  const stats = [
  { v: 'Verified', l: 'students, professionals, and commuters' },
  { v: '0', l: 'extra stops beyond your radius' },
  { v: 'PKR 0', l: 'your fuel cost once your seats are filled' }];

  return (
    <section id="drivers" style={{ background: C.bg, padding: '6rem 1.5rem' }}>
      <div className="split-rev" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '4.5rem', alignItems: 'center' }}>
        <Reveal className="driver-mock" style={{ display: 'flex', justifyContent: 'center' }}>
          <Mockup interval={4000}>
            <DriverS1 /><DriverS2 /><DriverS3 />
          </Mockup>
        </Reveal>
        <Reveal delay={120} className="driver-copy">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid rgba(34,160,107,0.4)`, color: C.green, borderRadius: 9999, padding: '0.3rem 0.85rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '1rem' }}>For drivers</span>
          <H2>Fill your empty seats. Cut your fuel cost to exactly zero.</H2>
          <p style={{ fontSize: '1rem', color: C.muted, lineHeight: 1.7, margin: '1.1rem 0 1.8rem', maxWidth: 460 }}>You are already making the trip. Let riders hop on whose route overlaps yours. Fill your seats and your fuel cost drops to exactly zero, without adding time to your commute.

          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {stats.map((s) =>
            <div key={s.l} style={{ maxWidth: 150 }}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.9rem', color: C.blue, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.8rem', color: C.muted, marginTop: 4, lineHeight: 1.4 }}>{s.l}</div>
              </div>
            )}
          </div>
          <Pill href={APP_URL}>Post a ride <Icon name="ArrowRight" size={16} /></Pill>
        </Reveal>
      </div>
    </section>);

}

// ═══════════ HOW HOPON WORKS ═══════════
function HowItWorks() {
  const steps = [
  { n: '01', title: 'Post your route', body: 'Set your pickup point, destination, and preferred departure time. Riders add flexibility windows. Drivers post their daily commute.', screen: <RiderS1 /> },
  { n: '02', title: 'Get matched instantly', body: 'Our matching engine scans active rides in real time. When a driver and rider overlap on route and time, both get notified immediately.', screen: <HeroF2 /> },
  { n: '03', title: 'Carpool and split', body: 'Confirm the match, chat with your co-commuter, and hop on. The fare is calculated fairly upfront. No negotiations. No surprises.', screen: <HeroF4 /> }];

  return (
    <section id="how" style={{ background: '#fff', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Eyebrow>Simple process</Eyebrow>
          <H2 style={{ fontSize: 'clamp(2.4rem,5vw,3.2rem)' }}>How Hopon works</H2>
          <p style={{ marginTop: '0.75rem', fontSize: '1.1rem', color: C.muted }}>Three steps. Two people. One shared journey.</p>
        </Reveal>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2.5rem' }}>
          {steps.map((s, idx) =>
          <Reveal key={s.n} delay={idx * 90} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
                <PhoneFrame width={230}>{s.screen}</PhoneFrame>
                <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-118px)', width: 42, height: 42, borderRadius: '50%', background: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.15rem', color: C.fg, border: '3px solid #fff', boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}>{s.n}</div>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', color: C.fg, marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.92rem', color: C.muted, lineHeight: 1.6, maxWidth: 320 }}>{s.body}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { ForRiders, ForDrivers, HowItWorks });