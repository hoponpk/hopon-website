// ── Signup incentive + Final CTA + Footer + App composition ───────────
const APP_URL = 'https://app.hopon.pk';
window.APP_URL = APP_URL;

function IncentivePhone() {
  const i = useCycle(2, 2600, 0);
  return (
    <PhoneFrame width={252}>
      <Stack active={i} mode="fade">
        <HomeScreen cta="Find a carpool" color={C.yellow} textColor={C.fg} mode="Rider" />
        <HomeScreen cta="Post a ride" color={C.blue} textColor="#fff" mode="Driver" />
      </Stack>
    </PhoneFrame>);

}

function Incentive() {
  return (
    <section style={{ background: C.yellow, padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(26,26,26,0.05) 19px, rgba(26,26,26,0.05) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(26,26,26,0.05) 19px, rgba(26,26,26,0.05) 20px)', pointerEvents: 'none' }} />
      <div className="split" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '3.5rem', alignItems: 'center', position: 'relative' }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 'clamp(2.6rem,6vw,3.6rem)', textTransform: 'uppercase', color: C.fg, lineHeight: 0.98, letterSpacing: '-0.005em', marginBottom: '1rem', textWrap: 'balance' }}>
            Your first ten rides are on us.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#3A3A3A', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 420 }}>
            Sign up today and get ten free rides credited to your account. No promo code needed.
          </p>
          <Pill href={APP_URL} variant="dark">Get started <Icon name="ArrowRight" size={16} /></Pill>
        </Reveal>
        <Reveal delay={120} className="incentive-phone" style={{ display: 'flex', justifyContent: 'center' }}>
          <IncentivePhone />
        </Reveal>
      </div>
    </section>);

}

function FinalCTA() {
  return (
    <section style={{ background: C.bg, padding: '7rem 1.5rem', textAlign: 'center' }}>
      <Reveal style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 'clamp(2.8rem,7vw,3.8rem)', textTransform: 'uppercase', color: C.fg, lineHeight: 0.98, letterSpacing: '-0.01em', marginBottom: '2rem' }}>YOUR DAILY COMMUTE
NOW CHEAPER AND SMARTER.
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Pill href={APP_URL}>Find a ride <Icon name="ArrowRight" size={16} /></Pill>
          <Pill href={APP_URL} variant="outline-dark">Post a ride</Pill>
        </div>
        <p style={{ fontSize: '0.78rem', color: C.muted, marginTop: '1.75rem' }}>HopOn carpooling works on all modern browsers. Mobile apps coming soon.</p>
      </Reveal>
    </section>);

}

function Footer() {
  const links = [
  { label: 'Find a ride', href: APP_URL },
  { label: 'Post a ride', href: APP_URL },
  { label: 'How it works', href: '#how' },
  { label: 'Safety', href: '#safety' }];

  return (
    <footer style={{ background: '#0D0D0D', padding: '3.5rem 1.5rem 2.5rem' }}>
      <div className="footer-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <Logo light />
          <p style={{ marginTop: '0.9rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 260 }}>
            Match with commuters heading the same way as you.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map((l) =>
          <a key={l.label} href={l.href} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 150ms' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>{l.label}</a>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <a href="mailto:admin@hopon.pk" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>admin@hopon.pk</a>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>© 2026 Hopon</p>
        </div>
      </div>
    </footer>);

}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ForRiders />
        <ForDrivers />
        <HowItWorks />
        <Features />
        <Safety />
        <Incentive />
        <Coverage />
        <FinalCTA />
      </main>
      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);