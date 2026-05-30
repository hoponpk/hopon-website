// ── Navbar + Hero (yellow bg + grid + CTA styling retained) ────────────
const { useEffect: useEffectNH, useState: useStateNH } = React;

function Navbar() {
  const [scrolled, setScrolled] = useStateNH(false);
  const [open, setOpen] = useStateNH(false);
  useEffectNH(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
  { label: 'How it works', href: '#how' },
  { label: 'For riders', href: '#riders' },
  { label: 'For drivers', href: '#drivers' },
  { label: 'Safety', href: '#safety' },
  { label: 'Cities', href: '#cities' }];

  const linkCol = scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(26,26,26,0.72)';
  const linkHover = scrolled ? '#fff' : C.fg;
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 66, padding: '0 1.6rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,13,13,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 250ms, border 250ms'
      }}>
        <Logo light={scrolled} />
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map((l) =>
          <a key={l.href} href={l.href} style={{ color: linkCol, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 150ms' }}
          onMouseEnter={(e) => e.currentTarget.style.color = linkHover}
          onMouseLeave={(e) => e.currentTarget.style.color = linkCol}>{l.label}</a>
          )}
        </div>
        <div className="desktop-nav"><Pill href={APP_URL} variant={scrolled ? 'primary' : 'dark'} small>COMMUTE NOW →</Pill></div>
        <button type="button" className="mobile-menu-btn" onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', color: scrolled ? '#fff' : C.fg, cursor: 'pointer', padding: 4 }}>
          <Icon name="Menu" size={24} />
        </button>
      </nav>
      {open &&
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0D0D0D', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <Logo light />
            <button type="button" onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="X" size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map((l) =>
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '1.6rem', fontFamily: "'Barlow Condensed'", fontWeight: 700, padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase' }}>{l.label}</a>
          )}
          </div>
          <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}><Pill href={APP_URL} full>Get started</Pill></div>
        </div>
      }
    </>);

}

// hero phone animation: 3 frames, ~2s each, crossfade
function HeroAnim() {
  const i = useCycle(3, 4200, 0);
  return (
    <PhoneFrame width={300} float>
      <Stack active={i} mode="fade">
        <HeroF1 /><HeroF2 /><HeroF3 />
      </Stack>
    </PhoneFrame>);

}

function Hero() {
  return (
    <section id="top" style={{ background: C.yellow, minHeight: '100dvh', display: 'flex', alignItems: 'center', padding: '7rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(26,26,26,0.05) 19px, rgba(26,26,26,0.05) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(26,26,26,0.05) 19px, rgba(26,26,26,0.05) 20px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(26,26,26,0.08)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 9999, padding: '0.35rem 0.9rem', marginBottom: '1.6rem' }}>
              <Icon name="Route" size={13} color={C.fg} />
              <span style={{ fontSize: '0.78rem', color: C.fg, fontWeight: 600, letterSpacing: '0.02em' }}>Carpooling for Pakistan</span>
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 'clamp(2.6rem, 6.2vw, 4.6rem)', lineHeight: 0.98, color: C.fg, textTransform: 'uppercase', letterSpacing: '-0.005em', marginBottom: '1.4rem', textWrap: 'balance' }}>
              Match with commuters heading the same way as you.
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#3A3A3A', lineHeight: 1.6, maxWidth: 470, marginBottom: '2.2rem' }}>Hopon connects drivers and riders who share a route. Powered by world's most sophisticated ride-matching algorithm built for carpooling.

            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Pill href={APP_URL} variant="dark">Find a ride <Icon name="ArrowRight" size={16} /></Pill>
              <Pill href={APP_URL} variant="outline-dark">Post a ride</Pill>
            </div>
          </div>
          <div className="hero-visual" style={{ display: 'flex', justifyContent: 'center' }}>
            <HeroAnim />
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Navbar, Hero });