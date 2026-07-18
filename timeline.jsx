/* Neil Kaji site — full TIMELINE page. */

function TimelineApp() {
  return (
    <React.Fragment>
      <PageNav />
      <main>
        <Container style={{ paddingTop: 100, paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="tlpage-overline" text="The path" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="tlpage-head" text="How I got here" />
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-muted)', marginTop: 16, maxWidth: 520, fontStyle: 'italic' }}>
              <Editable id="tlpage-intro" text="Every milestone with a date and one honest sentence. Newest first." multiline />
            </p>
          </Reveal>

          <div style={{ marginTop: 64, maxWidth: 720 }}>
            <TimelineList items={window.TIMELINE} style="line" />
          </div>
        </Container>
      </main>
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TimelineApp />);
