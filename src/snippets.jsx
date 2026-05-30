// ── Atomic Hopon app UI pieces. Reused inside screens AND as feature crops.
const sn = {
  card: { background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14 },
  label: { fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted },
};

// Address / location chip (confirmed pickup = green, destination = yellow)
function AddressChip({ kind = 'pickup', text, action }) {
  const green = kind === 'pickup';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: green ? 'rgba(34,160,107,0.10)' : 'rgba(245,197,24,0.10)',
      borderRadius: 12, padding: '9px 11px',
    }}>
      <Icon name={green ? 'CheckCircle2' : 'MapPin'} size={14} color={green ? C.green : C.yellowD} />
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: green ? C.green : C.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
      {action && <span style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{action}</span>}
    </div>
  );
}

// Fare pill (green tinted)
function FarePill({ amount }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(34,160,107,0.10)', color: C.green, borderRadius: 9999, padding: '5px 11px', fontWeight: 700, fontSize: 12.5 }}>
      <Icon name="Wallet" size={11} color={C.green} />
      PKR {amount}
    </div>
  );
}

// Fare estimate box
function FareBox({ amount, route }) {
  return (
    <div style={{ ...sn.card, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(245,197,24,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="BarChart2" size={16} color={C.fg} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 26, color: C.fg, lineHeight: 1 }}>~Rs {amount}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{route}</div>
      </div>
    </div>
  );
}

// Route color dot
const DOTS = [C.yellow, C.blue, C.green, '#EC4899'];

// Flex-window chips
function FlexChips({ value = '15 min' }) {
  const opts = ['Exact', '15 min', '30 min', '60 min'];
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {opts.map((o) => (
        <div key={o} style={{
          flex: 1, textAlign: 'center', padding: '7px 2px', borderRadius: 9,
          fontSize: 11, fontWeight: 700,
          background: value === o ? C.fg : '#fff',
          color: value === o ? '#fff' : C.muted,
          border: `1px solid ${value === o ? C.fg : C.border}`,
        }}>{o}</div>
      ))}
    </div>
  );
}

// Weekly day picker
function WeekPicker({ on = [0, 1, 2, 3] }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {days.map((d, i) => {
        const sel = on.includes(i);
        return (
          <div key={i} style={{
            flex: 1, aspectRatio: '1', maxWidth: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', fontSize: 11, fontWeight: 700,
            background: sel ? C.yellow : '#fff', color: sel ? C.fg : C.muted,
            border: `1px solid ${sel ? C.yellow : C.border}`,
          }}>{d}</div>
        );
      })}
    </div>
  );
}

// Seats counter
function SeatsCounter({ n = 2 }) {
  const btn = { width: 30, height: 30, borderRadius: '50%', border: `1px solid ${C.border}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <div style={btn}><Icon name="Minus" size={15} color={C.muted} /></div>
      <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 26, color: C.fg, minWidth: 24, textAlign: 'center' }}>{n}</span>
      <div style={{ ...btn, borderColor: C.fg }}><Icon name="Plus" size={15} color={C.fg} /></div>
    </div>
  );
}

// Radius slider
function RadiusSlider({ value = '1.5 km', pct = 50 }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={sn.label}>Pickup range</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>{value}</span>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 9999, background: '#EAE8E1' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', borderRadius: 9999, background: C.blue }} />
        <div style={{ position: 'absolute', left: `calc(${pct}% - 8px)`, top: -5, width: 16, height: 16, borderRadius: '50%', background: '#fff', border: `3px solid ${C.blue}`, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 9.5, color: C.muted }}>0.25 km</span>
        <span style={{ fontSize: 9.5, color: C.muted }}>3 km</span>
      </div>
    </div>
  );
}

// Gender preference toggle
function GenderToggle({ value = 'Same gender' }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {['Same gender', 'Any gender'].map((g) => (
        <div key={g} style={{
          flex: 1, textAlign: 'center', padding: '9px 4px', borderRadius: 10, fontSize: 11.5, fontWeight: 700,
          background: value === g ? C.yellow : '#fff', color: C.fg,
          border: `1px solid ${value === g ? C.yellow : C.border}`,
        }}>{g}</div>
      ))}
    </div>
  );
}

// Along-route toggle (on)
function AlongRouteToggle({ on = true }) {
  return (
    <div style={{ ...sn.card, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: C.fg, lineHeight: 1.35 }}>Pick up riders anywhere on my route</div>
      <div style={{ width: 38, height: 22, borderRadius: 9999, background: on ? C.blue : '#D8D5CD', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 150ms' }} />
      </div>
    </div>
  );
}

// Avatar
function Avatar({ initials, size = 44, color = C.blue, ring }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, ${color}, ${color === C.blue ? '#1E40AF' : color === C.green ? '#0F7C50' : C.yellowD})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.32, fontFamily: "'DM Sans'",
      border: ring ? '2px solid #fff' : 'none',
    }}>{initials}</div>
  );
}

// Driver / rider profile row card
function PersonCard({ initials, name, meta, badge = true, color = C.blue, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Avatar initials={initials} size={42} color={color} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.fg }}>{name}</span>
          {badge && <Icon name="BadgeCheck" size={14} color={C.green} />}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{meta}</div>
      </div>
      {right}
    </div>
  );
}

// Star rating
function StarRating({ filled = 4, total = 5, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Icon key={i} name="Star" size={size} color={i < filled ? C.yellow : 'none'} style={{ stroke: i < filled ? C.yellow : '#CFCBC1' }} />
      ))}
    </div>
  );
}

// Route timeline (vertical stops)
function RouteTimeline({ stops }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 4 }}>
      {stops.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: i < stops.length - 1 ? 14 : 0, position: 'relative' }}>
          {i < stops.length - 1 && <div style={{ position: 'absolute', left: 5, top: 14, bottom: 0, width: 2, background: '#E2DFD8' }} />}
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, marginTop: 2, flexShrink: 0, zIndex: 1, border: '2px solid #fff', boxShadow: `0 0 0 1px ${s.color}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.fg }}>{s.place}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Verification rows (safety)
function VerifyRow({ icon, label, status = 'Verified' }) {
  return (
    <div style={{ ...sn.card, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(34,160,107,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={15} color={C.green} />
      </div>
      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: C.fg }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
        <span style={{ fontSize: 10.5, fontWeight: 600, color: C.green }}>{status}</span>
      </div>
    </div>
  );
}

// Chat bubbles
function ChatBubbles() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#F1EFE9', borderRadius: 14, borderBottomLeftRadius: 4, padding: '8px 11px', fontSize: 11.5, color: C.fg }}>I am at the gate</div>
      <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: C.blue, color: '#fff', borderRadius: 14, borderBottomRightRadius: 4, padding: '8px 11px', fontSize: 11.5 }}>On my way, 2 minutes</div>
    </div>
  );
}

// SOS button
function SOSButton() {
  return (
    <div style={{ ...sn.card, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 6px rgba(220,40,40,0.12)' }}>
        <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, color: '#fff', fontSize: 18, letterSpacing: '0.06em' }}>SOS</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.fg, fontFamily: "'Barlow Condensed'", textTransform: 'uppercase' }}>Emergency</div>
      <div style={{ fontSize: 10.5, color: C.muted, textAlign: 'center', lineHeight: 1.4 }}>Shares your live location with emergency contacts.</div>
    </div>
  );
}

// Mini overlap map (feature crop)
function OverlapMini({ h = 90 }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', height: h, position: 'relative', border: `1px solid ${C.border}` }}>
      <MapBg variant="overlap" />
    </div>
  );
}

Object.assign(window, {
  AddressChip, FarePill, FareBox, FlexChips, WeekPicker, SeatsCounter,
  RadiusSlider, GenderToggle, AlongRouteToggle, Avatar, PersonCard,
  StarRating, RouteTimeline, VerifyRow, ChatBubbles, SOSButton, OverlapMini, DOTS,
});
