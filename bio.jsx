/* Neil Kaji site — BIO page. Portrait slot, longer bio, and a stat group. */

const BIO_STATS = [
  { id: 'bio-stat-1', value: '14,000', label: 'Users', sub: 'A product · 2 weeks' },
  { id: 'bio-stat-2', value: '30M+', label: 'Views', sub: 'Building in public' },
  { id: 'bio-stat-3', value: '17', label: 'Chapters', sub: 'Something I started' },
  { id: 'bio-stat-4', value: '15', label: 'Years old', sub: 'Westchester, NY' },
];

function BioApp() {
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'var(--nk-section-pad-sm, 64px)', paddingBottom: 'var(--nk-section-pad, 96px)' }}>
          <p className="overline" style={{ margin: 0 }}><Editable id="biopage-overline" text="Bio" /></p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 14, maxWidth: 720 }}>
            <Editable id="biopage-head" text="Fifteen years old. Westchester. I learn by building." multiline />
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: 'clamp(32px,6vw,64px)', alignItems: 'start', marginTop: 44 }} className="nk-bio-teaser">
            <div style={{ width: '100%', aspectRatio: '4 / 5', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-surface-border)', position: 'sticky', top: 88 }}>
              <image-slot id="bio-portrait" shape="rounded" radius="12" placeholder="Drop a portrait" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--color-ink-secondary)' }}>
                <Editable id="bio-p1" text="I'm a high school student and entrepreneur that wants to make an impact on the world. I make content on social media and build what comes to mind." multiline />
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--color-ink-secondary)' }}>
                <Editable id="bio-p3" text="I play the viola, soccer, and some video games as well. " multiline />
              </p>

            </div>
          </div>
        </Container>
      </main>
      <ContactBar />
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BioApp />);
