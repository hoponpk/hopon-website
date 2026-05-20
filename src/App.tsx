import { useEffect, useRef, useState } from 'react';
import {
  MapPin, Users, Zap, Shield, Star,
  CheckCircle2, ChevronRight, Menu, X,
  Leaf, Clock, MessageSquare, BadgeCheck, Car, ArrowRight,
} from 'lucide-react';

const APP_URL = 'https://app.hopon.pk';

// ── Reusable primitives ────────────────────────────────────────────────────

function Logo() {
  return (
    <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img
        src="/logo.jpg"
        alt="Hopon"
        style={{ height: 44, width: 44, borderRadius: 8, objectFit: 'cover', display: 'block' }}
      />
    </a>
  );
}

function Pill({
  children, variant = 'primary', href, small,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'dark' | 'outline-light';
  href?: string;
  small?: boolean;
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: small ? '0.6rem 1.2rem' : '0.85rem 1.75rem',
    borderRadius: 9999,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: small ? '0.9rem' : '1.05rem',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    transition: 'background 140ms, transform 100ms, box-shadow 140ms',
    whiteSpace: 'nowrap',
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, background: '#F5C518', color: '#111111' },
    ghost:   { ...base, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.35)', color: '#ffffff' },
    dark:    { ...base, background: '#111111', color: '#ffffff' },
    'outline-light': { ...base, background: 'transparent', border: '1.5px solid #E0DDD8', color: '#111111' },
  };
  if (href) return <a href={href} style={styles[variant]}>{children}</a>;
  return <button type="button" style={styles[variant]}>{children}</button>;
}

// ── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'How it works', href: '#how' },
    { label: 'For riders',   href: '#riders' },
    { label: 'For drivers',  href: '#drivers' },
    { label: 'Safety',       href: '#safety' },
  ];

  const linkColor      = scrolled ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)';
  const linkHoverColor = scrolled ? '#fff' : '#111';
  const iconColor      = scrolled ? '#fff' : '#111';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(17,17,17,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 250ms, border 250ms',
      }}>
        <Logo />

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              color: linkColor,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >{l.label}</a>
          ))}
        </div>

        <div className="desktop-nav">
          <Pill href={APP_URL} small>Get started →</Pill>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          style={{ background: 'none', border: 'none', color: iconColor, cursor: 'pointer', padding: 4 }}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#111', display: 'flex', flexDirection: 'column',
          padding: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <Logo />
            <button type="button" onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                fontSize: '1.6rem', fontFamily: "'Barlow Condensed'", fontWeight: 700,
                padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                textTransform: 'uppercase',
              }}>{l.label}</a>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
            <Pill href={APP_URL}>Get started</Pill>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: block; }
        }
      `}</style>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function RouteAnimation() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto' }}>
      {/* Map card */}
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 24,
        padding: '2rem',
        backdropFilter: 'blur(8px)',
      }}>
        {/* Route visual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Origin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: '#22A06B', flexShrink: 0,
              boxShadow: '0 0 0 4px rgba(34,160,107,0.2)',
            }} />
            <div style={{
              flex: 1, background: 'rgba(0,0,0,0.04)',
              borderRadius: 8, padding: '0.6rem 0.8rem',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.4)', marginBottom: 2 }}>FROM</div>
              <div style={{ fontSize: '0.9rem', color: '#111', fontWeight: 500 }}>Johar Town, Lahore</div>
            </div>
          </div>

          {/* Dashed line */}
          <div style={{ display: 'flex', paddingLeft: 6, marginLeft: 1, gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 0 }}>
              {[0,1,2,3].map((i) => (
                <div key={i} style={{ width: 2, height: 8, background: 'rgba(0,0,0,0.15)', borderRadius: 1 }} />
              ))}
            </div>
          </div>

          {/* Destination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: '#F5C518', flexShrink: 0,
              boxShadow: '0 0 0 4px rgba(245,197,24,0.2)',
            }} />
            <div style={{
              flex: 1, background: 'rgba(0,0,0,0.04)',
              borderRadius: 8, padding: '0.6rem 0.8rem',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.4)', marginBottom: 2 }}>TO</div>
              <div style={{ fontSize: '0.9rem', color: '#111', fontWeight: 500 }}>Gulberg III, Lahore</div>
            </div>
          </div>
        </div>

        {/* Match card */}
        <div style={{
          marginTop: '1.25rem',
          background: 'rgba(245,197,24,0.12)',
          border: '1px solid rgba(245,197,24,0.35)',
          borderRadius: 12,
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#F5C518',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Car size={18} color="#111" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111' }}>Driver found</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.55)', marginTop: 1 }}>Ahmed K. · 8 min away · PKR 180</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <CheckCircle2 size={18} color="#22A06B" />
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
        }}>
          {[
            { val: '12 km',  lbl: 'Distance' },
            { val: '~22 min', lbl: 'ETA' },
            { val: 'PKR 180', lbl: 'Fare' },
          ].map(({ val, lbl }) => (
            <div key={lbl} style={{
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 8,
              padding: '0.5rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>{val}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{
      background: '#F5C518',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '7rem 1.5rem 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 1,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '4rem',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 9999,
              padding: '0.35rem 0.9rem',
              marginBottom: '1.5rem',
            }}>
              <MapPin size={12} color="#111" />
              <span style={{ fontSize: '0.78rem', color: '#111', fontWeight: 600 }}>Lahore, Pakistan</span>
            </div>

            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 0.95,
              color: '#111111',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
            }}>
              COMMUTE<br />
              SMARTER.<br />
              <span style={{ color: '#fff' }}>TOGETHER.</span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'rgba(0,0,0,0.6)',
              lineHeight: 1.65,
              maxWidth: 440,
              marginBottom: '2.5rem',
            }}>
              Lahore's carpooling platform for verified professionals and students.
              Match with people heading your way, share the ride, and split the cost — every day.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Pill href={APP_URL} variant="dark">Find a ride <ArrowRight size={16} /></Pill>
              <Pill href={APP_URL} variant="outline-light">I'm a driver</Pill>
            </div>

            {/* Social proof */}
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
                {['#F5C518','#22A06B','#2563EB','#E8402A','#9B59B6'].map((c, i) => (
                  <div key={c} style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: c, border: '2px solid rgba(0,0,0,0.15)',
                    marginLeft: i === 0 ? 0 : -8,
                  }} />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.55)', lineHeight: 1.4 }}>
                Join <strong style={{ color: '#111' }}>verified Lahori</strong> professionals<br />carpooling daily
              </p>
            </div>
          </div>

          {/* Right — app preview */}
          <div className="hero-visual">
            <RouteAnimation />
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        .hero-visual { display: block; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none; }
        }
      `}</style>
    </section>
  );
}

// ── How it works ───────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '01',
      icon: <MapPin size={24} color="#F5C518" />,
      title: 'Post your route',
      body: 'Set your pickup point, destination, and preferred departure time. Riders add flexibility windows; drivers post their daily commute.',
    },
    {
      n: '02',
      icon: <Zap size={24} color="#F5C518" />,
      title: 'Get matched instantly',
      body: 'Our matching engine scans active rides in real time. When a driver and rider overlap on route and time, both get notified immediately.',
    },
    {
      n: '03',
      icon: <Users size={24} color="#F5C518" />,
      title: 'Carpool & split',
      body: 'Confirm the match, chat with your co-commuter, and hop on. The fare is calculated fairly upfront — no negotiations, no surprises.',
    },
  ];

  return (
    <section id="how" style={{
      background: '#F5F4F0',
      padding: '6rem 1.5rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', color: '#F5C518', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Simple process
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.5rem)', textTransform: 'uppercase', color: '#111', lineHeight: 1.05 }}>
            How Hopon works
          </h2>
          <p style={{ marginTop: '0.75rem', fontSize: '1rem', color: '#6B6B6B', maxWidth: 520, margin: '0.75rem auto 0' }}>
            Three steps. Two people. One shared journey.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }} className="steps-grid">
          {steps.map((s) => (
            <div key={s.n} style={{
              background: '#fff',
              borderRadius: 20,
              padding: '2rem',
              border: '1px solid #E0DDD8',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: "'Barlow Condensed'", fontWeight: 900,
                fontSize: '3.5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1,
              }}>{s.n}</div>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(245,197,24,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.3rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B6B6B', lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .steps-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── For Riders ─────────────────────────────────────────────────────────────

function ForRiders() {
  const perks = [
    { icon: <CheckCircle2 size={18} />, text: 'Save up to 60% on your daily commute cost' },
    { icon: <BadgeCheck size={18} />,   text: 'Only verified drivers — work or university email required' },
    { icon: <Clock size={18} />,        text: 'Flexible timing — set a departure window, not a fixed hour' },
    { icon: <MessageSquare size={18} />,text: 'Chat with your driver before the pickup, no calls needed' },
    { icon: <Star size={18} />,         text: 'Rate every ride — community trust built trip by trip' },
    { icon: <Leaf size={18} />,         text: "One less car on the road — better for Lahore's air" },
  ];

  return (
    <section id="riders" style={{ background: '#F5F4F0', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="split-grid">
        {/* Left */}
        <div>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#F5C518', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            For riders
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', textTransform: 'uppercase', color: '#111', lineHeight: 1.05, marginBottom: '1rem' }}>
            YOUR DAILY COMMUTE.<br />
            <span style={{ color: '#F5C518' }}>HALF THE COST.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6B6B6B', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 400 }}>
            Stop paying full rickshaw or ride-hailing prices every morning. Share the journey with a verified driver heading your way and split the fare honestly.
          </p>
          <Pill href={APP_URL}>Find a carpool <ArrowRight size={16} /></Pill>
        </div>

        {/* Right — perks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {perks.map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              background: '#fff',
              border: '1px solid #E0DDD8',
              borderRadius: 12,
              padding: '0.9rem 1rem',
            }}>
              <span style={{ color: '#F5C518', flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <span style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .split-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .split-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      `}</style>
    </section>
  );
}

// ── For Drivers ────────────────────────────────────────────────────────────

function ForDrivers() {
  const perks = [
    { icon: <CheckCircle2 size={18} />, text: 'Offset your fuel cost — share it with 1-3 riders' },
    { icon: <BadgeCheck size={18} />,   text: 'Only verified riders from corporate or university accounts' },
    { icon: <Clock size={18} />,        text: 'Post your daily route once — matches come to you' },
    { icon: <Car size={18} />,          text: 'No detours — riders match to your existing route' },
    { icon: <Star size={18} />,         text: 'Build your driver rating with every completed trip' },
    { icon: <Zap size={18} />,          text: 'Real-time notifications when a rider matches your drive' },
  ];

  return (
    <section id="drivers" style={{ background: '#fff', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="split-grid-rev">
        {/* Left — perks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="driver-perks">
          {perks.map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              background: '#F5F4F0',
              border: '1px solid #E0DDD8',
              borderRadius: 12,
              padding: '0.9rem 1rem',
            }}>
              <span style={{ color: '#2563EB', flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <span style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="driver-text">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#2563EB', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            For drivers
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', textTransform: 'uppercase', color: '#111', lineHeight: 1.05, marginBottom: '1rem' }}>
            YOU'RE ALREADY<br />
            <span style={{ color: '#2563EB' }}>GOING THAT WAY.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6B6B6B', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 400 }}>
            You drive the same route every morning. Hopon connects you with verified riders heading the same direction — so your empty seats help someone commute and offset your fuel bill.
          </p>
          <Pill href={APP_URL} variant="dark">Post a drive <ArrowRight size={16} /></Pill>
        </div>
      </div>

      <style>{`
        .split-grid-rev { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .split-grid-rev { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .driver-perks { order: 2; }
          .driver-text { order: 1; }
        }
      `}</style>
    </section>
  );
}

// ── Why Hopon ──────────────────────────────────────────────────────────────

function WhyHopon() {
  const reasons = [
    {
      icon: <BadgeCheck size={28} color="#F5C518" />,
      title: 'Verified community',
      body: 'Every account is tied to a work or university email. No anonymous profiles — just real, accountable commuters.',
    },
    {
      icon: <Zap size={28} color="#F5C518" />,
      title: 'Real-time matching',
      body: 'Our engine scans active rides every minute and notifies both parties the moment a match is found.',
    },
    {
      icon: <Clock size={28} color="#F5C518" />,
      title: 'Flexible departure windows',
      body: "Set a ±15, ±30, or ±60 minute window — so you get matched even if your timing isn't perfectly exact.",
    },
    {
      icon: <MapPin size={28} color="#F5C518" />,
      title: 'Lahore-first',
      body: 'Built specifically for Lahore\'s roads, neighbourhoods, and commute patterns — not a generic platform.',
    },
    {
      icon: <Star size={28} color="#F5C518" />,
      title: 'Transparent fares',
      body: 'Estimated fare shown upfront based on distance. No surge pricing, no bidding, no awkward negotiations.',
    },
  ];

  return (
    <section style={{ background: '#F5F4F0', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#F5C518', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Why Hopon
          </p>
          <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.5rem)', textTransform: 'uppercase', color: '#111', lineHeight: 1.05 }}>
            BUILT DIFFERENT.<br />
            <span style={{ color: '#F5C518' }}>BUILT FOR LAHORE.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="why-grid">
          {reasons.map((r, i) => (
            <div key={r.title} style={{
              background: '#fff',
              border: '1px solid #E0DDD8',
              borderRadius: 20,
              padding: '1.75rem',
              gridColumn: i === 3 ? '1 / span 1' : undefined,
            }}>
              <div style={{ marginBottom: '1rem' }}>{r.icon}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', color: '#111', marginBottom: '0.5rem' }}>
                {r.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6B6B6B', lineHeight: 1.65 }}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── Safety ─────────────────────────────────────────────────────────────────

function Safety() {
  const items = [
    {
      icon: <BadgeCheck size={24} color="#22A06B" />,
      title: 'Verified profiles',
      body: 'Every user signs up with a corporate or university email. Identity is tied to a real institution.',
    },
    {
      icon: <MessageSquare size={24} color="#22A06B" />,
      title: 'In-app messaging',
      body: 'Coordinate with your driver or rider entirely through Hopon — no need to share your phone number.',
    },
    {
      icon: <Star size={24} color="#22A06B" />,
      title: 'Two-way ratings',
      body: 'After every trip, both rider and driver rate each other. Poor-rated accounts are flagged automatically.',
    },
    {
      icon: <Shield size={24} color="#22A06B" />,
      title: 'SOS & reporting',
      body: 'In-app SOS button and quick report flow. Any safety concern is escalated immediately to our team.',
    },
  ];

  return (
    <section id="safety" style={{ background: '#fff', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="split-grid">
          {/* Left */}
          <div>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#22A06B', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Safety first
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', textTransform: 'uppercase', color: '#111', lineHeight: 1.05, marginBottom: '1rem' }}>
              EVERY RIDE.<br />
              <span style={{ color: '#22A06B' }}>EVERY TRIP.</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#6B6B6B', lineHeight: 1.7, maxWidth: 420 }}>
              Hopon's safety model starts at sign-up. By requiring institutional email addresses, we create an accountable community before the first ride is posted.
            </p>
          </div>

          {/* Right — safety cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {items.map(({ icon, title, body }) => (
              <div key={title} style={{
                background: '#F5F4F0',
                border: '1px solid #E0DDD8',
                borderRadius: 16,
                padding: '1.25rem',
              }}>
                <div style={{ marginBottom: '0.75rem' }}>{icon}</div>
                <h4 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', color: '#111', marginBottom: '0.4rem' }}>{title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.55 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Join CTA ───────────────────────────────────────────────────────────────

function JoinCTA() {
  return (
    <section style={{
      background: '#F5C518',
      padding: '6rem 1.5rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Barlow Condensed'", fontWeight: 900,
          fontSize: 'clamp(2.5rem,7vw,4.5rem)',
          textTransform: 'uppercase', color: '#111', lineHeight: 1.0,
          marginBottom: '1rem',
        }}>
          READY TO SHARE<br />THE ROAD?
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
          Sign up with your work or university email and find your first carpool match in Lahore today.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Pill href={APP_URL} variant="dark">Get started <ChevronRight size={16} /></Pill>
          <Pill href={`${APP_URL}/auth/signup`} variant="outline-light">Create account</Pill>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      heading: 'Product',
      links: [
        { label: 'How it works', href: '#how' },
        { label: 'For riders',   href: '#riders' },
        { label: 'For drivers',  href: '#drivers' },
        { label: 'Safety',       href: '#safety' },
      ],
    },
    {
      heading: 'Account',
      links: [
        { label: 'Sign up',  href: `${APP_URL}/auth/signup` },
        { label: 'Sign in',  href: `${APP_URL}/auth/signin` },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',    href: '#' },
        { label: 'Contact',  href: '#' },
        { label: 'Privacy',  href: '#' },
        { label: 'Terms',    href: '#' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#0A0A0A', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <Logo />
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, maxWidth: 260 }}>
              Lahore's carpooling platform for verified professionals and students. Same road. Split the ride.
            </p>
          </div>
          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {col.heading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href} style={{
                    fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', transition: 'color 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Hopon. All rights reserved. Lahore, Pakistan.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>
            admin@hopon.pk
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ── Password Gate ──────────────────────────────────────────────────────────

const GATE_KEY = 'hopon_preview_unlocked';
const GATE_PASSWORD = 'hopon2025';

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(GATE_KEY) === '1');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!unlocked) inputRef.current?.focus(); }, [unlocked]);

  if (unlocked) return <>{children}</>;

  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (value === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1800);
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#F5F4F0', padding: '1.5rem',
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <img src="/logo.jpg" alt="Hopon" style={{ height: 80, width: 80, borderRadius: 16, objectFit: 'cover' }} />
      </div>
      <form onSubmit={attempt} style={{ width: '100%', maxWidth: 340 }}>
        <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          This preview is private. Enter the password to continue.
        </p>
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          style={{
            width: '100%', padding: '0.85rem 1rem',
            background: '#fff', border: `1.5px solid ${error ? '#ef4444' : '#E0DDD8'}`,
            borderRadius: 10, color: '#111', fontSize: '1rem',
            outline: 'none', marginBottom: '0.75rem',
            transition: 'border-color 140ms',
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem', textAlign: 'center' }}>
            Incorrect password.
          </p>
        )}
        <button type="submit" style={{
          width: '100%', padding: '0.85rem',
          background: '#F5C518', color: '#111', border: 'none', borderRadius: 10,
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem',
          fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Enter
        </button>
      </form>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

export function App() {
  return (
    <PasswordGate>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ForRiders />
        <ForDrivers />
        <WhyHopon />
        <Safety />
        <JoinCTA />
      </main>
      <Footer />
    </PasswordGate>
  );
}
