/* Neil Kaji site — full TIMELINE page. */

function TimelineApp() {
  return (
    <React.Fragment>
      <TopNav />
      <main>
        <Container style={{ paddingTop: 100, paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="tlpage-overline" text="The path" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="tlpage-head" text="How I got here" />
            </h1>
          </Reveal>

          <div style={{ marginTop: 24, maxWidth: 720 }}>
            <TimelineList items={window.TIMELINE} style="line" />
          </div>
        </Container>
      </main>
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TimelineApp />);
