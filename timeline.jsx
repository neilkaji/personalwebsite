/* Neil Kaji site — full TIMELINE page. All milestones, honoring the timeline
   style chosen in the home Tweaks panel. */

function TimelineApp() {
  const t = useTweakValues();
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'var(--nk-section-pad-sm, 64px)', paddingBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <p className="overline" style={{ margin: 0 }}><Editable id="tlpage-overline" text="The path" /></p>
            <div style={{ flex: 1, height: 1, background: 'var(--color-ink-primary)', opacity: 0.1 }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 14 }}>
            <Editable id="tlpage-head" text="How I got here" />
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-ink-secondary)', marginTop: 16, maxWidth: 600 }}>
            <Editable id="tlpage-intro" text="Every milestone with a date and one honest sentence. Newest first." multiline />
          </p>
        </Container>
        <Container style={{ paddingBottom: 'var(--nk-section-pad, 96px)' }}>
          <div style={{ marginTop: 24, maxWidth: 760 }}>
            <TimelineList items={window.TIMELINE} style={t.timelineStyle} />
          </div>
        </Container>
      </main>
      <ContactBar />
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TimelineApp />);
