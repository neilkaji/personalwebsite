/* Neil Kaji site — PORTFOLIO page. */

function PortfolioApp() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'calc(var(--nk-nav-h, 52px) + 72px)', paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="portfoliopage-overline" text="Portfolio" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="portfoliopage-head" text="Things I've built" />
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-muted)', marginTop: 16, maxWidth: 520, fontStyle: 'italic' }}>
              <Editable id="portfoliopage-intro" text="Projects, experiments, and things I've shipped." multiline />
            </p>
          </Reveal>

          <div style={{ marginTop: 64 }}>
            <PortfolioGrid items={window.PORTFOLIO} />
          </div>
        </Container>
      </main>
      <ContactBar />
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PortfolioApp />);
