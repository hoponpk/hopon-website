// ── Composed Hopon app screens (used in mockups, thumbnails, crops) ────

// local helpers
function GpsCard() {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(245,197,24,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="Locate" size={16} color={C.yellowD} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.fg }}>Use my location</div>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 1 }}>Accurate to 20 meters.</div>
      </div>
    </div>);

}
function SearchInput({ placeholder, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${active ? C.yellow : C.border}`, borderRadius: 16, padding: '10px 12px' }}>
      <Icon name="Search" size={15} color={C.muted} />
      <span style={{ fontSize: 12.5, color: active ? C.fg : C.muted, fontWeight: active ? 600 : 400 }}>{placeholder}</span>
    </div>);

}
function RecentChip({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 4px' }}>
      <Icon name="Clock" size={13} color={C.muted} />
      <span style={{ fontSize: 12, color: C.fg }}>{text}</span>
    </div>);

}
function Suggestion({ text, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 2px' }}>
      <Icon name="MapPin" size={14} color={C.muted} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{text}</div>
        {sub && <div style={{ fontSize: 10, color: C.muted }}>{sub}</div>}
      </div>
    </div>);

}
function StatusChip({ color, bg, children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: bg, color, borderRadius: 9999, padding: '4px 10px', fontSize: 10.5, fontWeight: 700, fontFamily: "'Barlow Condensed'", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{children}</div>);

}

// ═══════════ HERO ANIMATION FRAMES ═══════════
function HeroF1() {
  return (
    <Screen>
      <MapBg variant="hero1" />
      <TopBar credit="PKR 250" mode="Rider" />
      <div style={{ position: 'absolute', top: 95, left: '50%', transform: 'translateX(-50%)', background: '#fff', borderRadius: 9999, padding: '8px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
        <Icon name="Route" size={13} color={C.blue} />
        <span style={{ fontSize: 11.5, fontWeight: 600, color: C.fg }}>Askari 10 to Johar Town · 18 km</span>
      </div>
    </Screen>);

}
function HeroF2() {
  return (
    <Screen>
      <MapBg variant="shared" dim />
      <BottomSheet style={{ animation: 'sheetUp 500ms cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <StepLabel>New rider on your route</StepLabel>
          <StatusChip color={C.fg} bg={C.yellow}>New match</StatusChip>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 96 }}>
            <RouteTimeline stops={[{ label: 'You', place: 'Askari 10', color: C.green }, { label: 'Detour', place: 'Walton Rd', color: C.green }, { label: 'Drop', place: 'Johar Town', color: C.red }]} />
          </div>
          <div style={{ flex: 1, borderLeft: `1px solid ${C.border}`, paddingLeft: 12 }}>
            <PersonCard initials="NF" name="Noor Fatima" meta="Walton Road pickup" color={C.green} />
            <div style={{ marginTop: 10 }}><FarePill amount="400" /></div>
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: C.muted, margin: '12px 0' }}>1.2 km detour · within your range</div>
        <AppCTA>Accept match</AppCTA>
      </BottomSheet>
    </Screen>);

}
function HeroF3() {
  return (
    <Screen bg="#fff">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 18px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,160,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="CheckCircle2" size={30} color={C.green} />
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 24, textTransform: 'uppercase', color: C.fg }}>Trip complete</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.16)', borderRadius: 14, padding: '11px 12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="Car" size={18} color={C.blue} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.blue }}>Driver</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.fg, marginTop: 1, lineHeight: 1.3 }}>Fuel cost cut to <span style={{ fontWeight: 800 }}>PKR 0</span></div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: C.muted, whiteSpace: 'nowrap' }}><Icon name="Clock" size={12} color={C.muted} />+2 min</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(212,168,0,0.28)', borderRadius: 14, padding: '11px 12px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(212,168,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="Users" size={18} color={C.yellowD} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.yellowD }}>Rider</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.fg, marginTop: 1, lineHeight: 1.3 }}>Saves vs ride-hailing</div>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.green, fontFamily: "'Barlow Condensed'", whiteSpace: 'nowrap' }}>−50%</span>
          </div>
        </div>
      </div>
    </Screen>);

}
function HeroF4() {
  return (
    <Screen bg="#fff">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 18px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,160,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="CheckCircle2" size={30} color={C.green} />
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 24, textTransform: 'uppercase', color: C.fg }}>Trip complete</div>
        </div>
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12.5, color: C.muted }}>Your fuel cost</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: C.muted, textDecoration: 'line-through' }}>PKR 800</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.green, fontFamily: "'Barlow Condensed'" }}>PKR 400</span>
            </span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
            <StatusChip color={C.green} bg="rgba(34,160,107,0.10)">Saved 50% with Hopon</StatusChip>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, textAlign: 'center', lineHeight: 1.5 }}>Your route. Your car. One extra passenger.</div>
      </div>
    </Screen>);

}

// ═══════════ RIDER SCREENS ═══════════
function RiderS1() {
  return (
    <Screen>
      <MapBg variant="city" dim />
      <TopBar credit="PKR 250" mode="Rider" />
      <BottomSheet>
        <StepDots total={4} current={0} />
        <StepLabel>Step 1 · Riding</StepLabel>
        <SheetTitle>Where are you?</SheetTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <GpsCard />
          <SearchInput placeholder="Search a place or address" />
          <div>
            <RecentChip text="Gulberg III, Lahore" />
            <RecentChip text="Arfa Tech Park" />
          </div>
          <AppCTA>Confirm pickup</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function RiderS2() {
  return (
    <Screen>
      <MapBg variant="city" dim />
      <TopBar credit="PKR 250" mode="Rider" />
      <BottomSheet>
        <StepDots total={4} current={1} />
        <StepLabel>Step 2 · Destination</StepLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AddressChip kind="pickup" text="Pickup: Gulberg III" action="Change" />
          <SearchInput placeholder="DHA Phase 5" active />
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 4 }}>
            <Suggestion text="DHA Phase 5, Lahore" sub="11 km away" />
            <Suggestion text="DHA Phase 6" sub="13 km away" />
            <Suggestion text="Defence Raya" sub="14 km away" />
          </div>
          <FareBox amount="350" route="Gulberg III to DHA Phase 5" />
          <AppCTA>Confirm destination</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function RiderS3() {
  return (
    <Screen>
      <MapBg variant="city" dim />
      <BottomSheet>
        <div style={{ marginBottom: 12 }}><StatusChip color={C.fg} bg={C.yellow}>Match found</StatusChip></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <Avatar initials="HR" size={48} color={C.blue} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: C.fg }}>Hamza R.</span>
              <Icon name="ShieldCheck" size={14} color={C.green} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <Icon name="Star" size={11} color={C.yellow} />
              <span style={{ fontSize: 11.5, color: C.muted }}>4.9 · White Corolla · LHR-2847</span>
            </div>
          </div>
        </div>
        <div style={{ margin: '14px 0', padding: '12px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 130 }}>
            <RouteTimeline stops={[{ label: 'Pickup', place: 'Gulberg III', color: C.green }, { label: 'Drop', place: 'DHA Phase 5', color: C.red }]} />
          </div>
          <FarePill amount="350" />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}><AppCTA>Accept</AppCTA></div>
          <div style={{ padding: '12px 20px', borderRadius: 9999, border: `1.5px solid ${C.border}`, fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 14, textTransform: 'uppercase', color: C.muted }}>Decline</div>
        </div>
      </BottomSheet>
    </Screen>);

}
function RiderS4() {
  return (
    <Screen>
      <MapBg variant="rider-enroute" dim />
      <TopBar credit="PKR 250" mode="Rider" />
      <BottomSheet>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <StatusChip color={C.blue} bg="rgba(37,99,235,0.10)">Driver en route</StatusChip>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="pulseDot" style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Live</span>
          </div>
        </div>
        <PersonCard initials="HR" name="Hamza R." meta="4 min away · White Corolla" color={C.blue}
        right={<div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 12px', borderRadius: 9999, background: 'rgba(37,99,235,0.10)', color: C.blue, fontSize: 11.5, fontWeight: 700 }}><Icon name="MessageSquare" size={13} color={C.blue} />Chat</div>} />
      </BottomSheet>
    </Screen>);

}

// ═══════════ DRIVER SCREENS ═══════════
function DriverS1() {
  return (
    <Screen>
      <MapBg variant="driver" dim />
      <TopBar credit="PKR 400" mode="Driver" />
      <BottomSheet>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div><StepDots total={3} current={0} /><StepLabel>Step 1 · Driving</StepLabel></div>
          <StatusChip color={C.blue} bg="rgba(37,99,235,0.10)">Driver</StatusChip>
        </div>
        <SheetTitle>Your route</SheetTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <AddressChip kind="pickup" text="Askari 10" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(245,197,24,0.10)', borderRadius: 12, padding: '9px 11px' }}>
            <Icon name="Star" size={14} color={C.yellowD} />
            <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: C.fg }}>Johar Town</span>
          </div>
          <div style={{ background: '#F1EFE9', borderRadius: 12, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>Est. fare PKR 400</span>
            <span style={{ fontSize: 10.5, color: C.muted }}>per matched rider</span>
          </div>
          <AppCTA>Choose route</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function DriverS2() {
  return (
    <Screen>
      <MapBg variant="driver" dim />
      <BottomSheet>
        <StepDots total={3} current={1} />
        <SheetTitle>Lock in your schedule</SheetTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FlexChips value="15 min" />
          <WeekPicker on={[0, 1, 2, 3]} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>Seats</span>
            <SeatsCounter n={2} />
          </div>
          <RadiusSlider value="1.5 km" pct={50} />
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `5px solid ${C.yellow}`, background: '#fff' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.fg }}>White Corolla · LHR-2847</span>
          </div>
          <AppCTA>Publish drive</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function DriverS3() {
  return (
    <Screen bg="#fff">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 22px', gap: 14, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,160,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="CheckCircle2" size={34} color={C.green} />
        </div>
        <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 26, textTransform: 'uppercase', color: C.fg, lineHeight: 1 }}>Your ride is live.</div>
        <div style={{ fontSize: 12, color: C.muted }}>Recurring · Mon to Thu · 8:00 AM</div>
        <StatusChip color={C.green} bg="rgba(34,160,107,0.10)">Earn up to PKR 800 this week</StatusChip>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>You will be notified when a rider matches.</div>
        <div style={{ width: '100%', marginTop: 4 }}><AppCTA>View my drives</AppCTA></div>
      </div>
    </Screen>);

}

// ═══════════ COVERAGE SCREENS ═══════════
function CovIsb() {
  return (
    <Screen>
      <MapBg variant="city" city="isb" dim />
      <TopBar credit="PKR 180" mode="Rider" />
      <BottomSheet>
        <StepDots total={4} current={1} />
        <StepLabel>Step 1 · Riding</StepLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AddressChip kind="pickup" text="F-7 Markaz" action="Change" />
          <FareBox amount="280" route="F-7 Markaz to I-8" />
          <AppCTA>Confirm destination</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function CovIntercity() {
  return (
    <Screen>
      <MapBg variant="intercity" dim />
      <BottomSheet>
        <StepLabel>Intercity route</StepLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FareBox amount="1,200" route="Lahore to Islamabad · 290 km" />
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6, background: 'rgba(245,197,24,0.12)', borderRadius: 9999, padding: '6px 12px' }}>
            <Icon name="CircleDot" size={12} color={C.yellowD} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: C.fg }}>Pickup range: 15 km</span>
          </div>
          <AppCTA>Choose route</AppCTA>
        </div>
      </BottomSheet>
    </Screen>);

}
function CovKarachi() {
  return (
    <Screen>
      <MapBg variant="city" city="khi" dim />
      <BottomSheet>
        <div style={{ marginBottom: 12 }}><StatusChip color={C.fg} bg={C.yellow}>Match found</StatusChip></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <Avatar initials="BA" size={46} color={C.blue} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.fg }}>Bilal A.</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, background: '#F1EFE9', padding: '2px 7px', borderRadius: 9999 }}>Karachi</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <Icon name="Star" size={11} color={C.yellow} />
              <span style={{ fontSize: 11.5, color: C.muted }}>4.8</span>
            </div>
          </div>
        </div>
        <div style={{ margin: '14px 0', padding: '12px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 130 }}>
            <RouteTimeline stops={[{ label: 'Pickup', place: 'Clifton', color: C.green }, { label: 'Drop', place: 'DHA Phase 6', color: C.red }]} />
          </div>
          <FarePill amount="320" />
        </div>
        <AppCTA>Accept</AppCTA>
      </BottomSheet>
    </Screen>);

}

// ═══════════ HOME (incentive) ═══════════
function HomeScreen({ cta = 'Find a carpool', color = C.yellow, textColor = C.fg, mode = 'Rider' }) {
  return (
    <Screen>
      <MapBg variant="city" dim />
      <div style={{ position: 'absolute', top: 38, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', background: '#fff', borderRadius: 9999, padding: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}>
          {['Rider', 'Driver'].map((m) =>
          <span key={m} style={{ fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 9999, fontFamily: "'DM Sans'", transition: 'background 250ms, color 250ms', background: mode === m ? m === 'Driver' ? C.blue : C.yellow : 'transparent', color: mode === m ? m === 'Driver' ? '#fff' : C.fg : C.muted }}>{m}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', padding: '7px 12px', borderRadius: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}>
          <Icon name="Coins" size={13} color={C.yellowD} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.fg }}>10 rides</span>
        </div>
      </div>
      <BottomSheet>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Good morning</div>
        <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 30, textTransform: 'uppercase', color: C.fg, lineHeight: 1, marginBottom: 16 }}>Hey, Ayesha.</div>
        <AppCTA color={color} textColor={textColor}>{cta}</AppCTA>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
          <StatusChip color={C.green} bg="rgba(34,160,107,0.10)">10 free rides credited</StatusChip>
        </div>
      </BottomSheet>
    </Screen>);

}

// ── small crop: post-trip rating card (safety pillar 4) ────────────────
function RatingCrop() {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <StarRating filled={4} />
      <span style={{ fontSize: 11, fontWeight: 600, color: C.fg }}>Rate your driver</span>
    </div>);

}

Object.assign(window, {
  HeroF1, HeroF2, HeroF3, HeroF4,
  RiderS1, RiderS2, RiderS3, RiderS4,
  DriverS1, DriverS2, DriverS3,
  CovIsb, CovIntercity, CovKarachi, HomeScreen, RatingCrop
});