/* Neil Kaji site — INSPIRATIONS page. The full set. */

function InspirationsApp() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'var(--nk-section-pad-sm, 64px)', paddingBottom: 28 }}>
          <p className="overline" style={{ margin: 0 }}><Editable id="insppage-overline" text="Inspirations" /></p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 14 }}>
            <Editable id="insppage-head" text="What I keep close" />
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-ink-secondary)', marginTop: 16, maxWidth: 600 }}>
            <Editable id="insppage-intro" text="The people, books, products, and words I come back to. A short, honest note on each one." multiline />
          </p>
        </Container>
        <Container style={{ paddingBottom: 'var(--nk-section-pad, 96px)' }}>
          <div style={{ marginTop: 24 }}>
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
