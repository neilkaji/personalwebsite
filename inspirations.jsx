/* Neil Kaji site — INSPIRATIONS page. */

function InspirationsApp() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'calc(var(--nk-nav-h, 52px) + 72px)', paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="insppage-overline" text="Inspirations" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="insppage-head" text="What pushes me" />
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-muted)', marginTop: 16, maxWidth: 520, fontStyle: 'italic' }}>
              <Editable id="insppage-intro" text="The people, books, products, and words I come back to." multiline />
            </p>
          </Reveal>

          <div style={{ marginTop: 64, maxWidth: 720 }}>
            <InspirationGrid items={window.INSPIRATIONS} />
          </div>
        </Container>
      </main>
      <ContactBar />
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<InspirationsApp />);
