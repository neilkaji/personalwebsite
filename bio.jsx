/* Neil Kaji site — BIO page. */

function BioApp() {
  return (
    <React.Fragment>
      <PageNav />
      <main>
        <Container style={{ paddingTop: 100, paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="biopage-overline" text="Bio" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12, maxWidth: 640 }}>
              <Editable id="biopage-head" text="Fifteen years old. Westchester. I learn by building." multiline />
            </h1>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.7fr) minmax(0,1.3fr)', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start', marginTop: 64 }} className="nk-bio-teaser">
            <Reveal>
              <div style={{ width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', borderTop: '1px solid var(--color-surface-border)', position: 'sticky', top: 'calc(var(--nk-nav-h, 52px) + 24px)' }}>
                <image-slot id="bio-portrait" shape="rect" placeholder="Drop a portrait" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
              </div>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <Reveal delay={80}>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--color-ink-secondary)' }}>
                  <Editable id="bio-p1" text="I'm a high school student and entrepreneur that wants to make an impact on the world. I make content on social media and build what comes to mind." multiline />
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </main>
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BioApp />);
