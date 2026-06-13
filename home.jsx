/* Neil Kaji site — HOME. Hero (3 layouts) + previews of Timeline, Blog,
   Inspirations + a Bio teaser. Owns the Tweaks panel for the whole site. */

function Hero({ layout }) {
  const overline = <Editable id="hero-overline" text="Westchester · 15 y/o" />;
  const head = <Editable id="hero-head" text="Neil Kaji" multiline />;
  const ctas = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
      <Button size="lg" href="#timeline-preview">See the timeline <Icon name="arrow-right" size={18} /></Button>
      <Button size="lg" variant="secondary" href="#contact">Get in touch</Button>
    </div>
  );

  if (layout === 'split') {
    return (
      <Container style={{ paddingTop: 40, paddingBottom: 'var(--nk-section-pad, 96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.85fr)', gap: 'clamp(32px, 6vw, 72px)', alignItems: 'center', minHeight: 'calc(82vh - 64px)' }} className="nk-hero-split">
          <div>
            <p className="overline" style={{ margin: 0 }}>{overline}</p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 16 }}>{head}</h1>
            {ctas}
          </div>
          <div style={{ width: '100%', aspectRatio: '4 / 5', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-surface-border)' }}>
            <image-slot id="hero-photo" shape="rounded" radius="12" placeholder="Drop a photo of you" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
          </div>
        </div>
      </Container>
    );
  }

  if (layout === 'minimal') {
    return (
      <Container style={{ paddingTop: 40, paddingBottom: 'var(--nk-section-pad, 96px)' }}>
        <div style={{ minHeight: 'calc(78vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <p className="overline" style={{ margin: 0 }}>{overline}</p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 18, maxWidth: 760 }}>{head}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32, justifyContent: 'center' }}>
            <Button size="lg" href="#timeline-preview">See the timeline <Icon name="arrow-right" size={18} /></Button>
            <Button size="lg" variant="secondary" href="#contact">Get in touch</Button>
          </div>
        </div>
      </Container>
    );
  }

  // 'statement' (default) — editorial, centered, big type
  return (
    <Container style={{ paddingTop: 24 }}>
      <div style={{ minHeight: 'calc(90vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

        {/* Rule + location overline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%', maxWidth: 680, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--color-ink-primary)', opacity: 0.12 }} />
          <p className="overline" style={{ margin: 0, letterSpacing: '0.14em' }}>{overline}</p>
          <div style={{ flex: 1, height: 1, background: 'var(--color-ink-primary)', opacity: 0.12 }} />
        </div>

        {/* Giant name */}
        <h1 style={{ fontSize: 'clamp(4.5rem, 13vw, 9.5rem)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'var(--color-ink-primary)', margin: 0 }}>{head}</h1>

        {/* Editorial descriptor strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36, padding: '11px 0', borderTop: '1px solid var(--color-surface-border)', borderBottom: '1px solid var(--color-surface-border)', width: '100%', maxWidth: 520, justifyContent: 'center' }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-secondary)' }}>Building</span>
          <span style={{ color: 'var(--color-primary-500)', fontWeight: 700, fontSize: 13, lineHeight: 1 }}>×</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-secondary)' }}>Creating</span>
          <span style={{ color: 'var(--color-primary-500)', fontWeight: 700, fontSize: 13, lineHeight: 1 }}>×</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-secondary)' }}>Shipping</span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 36, justifyContent: 'center' }}>
          <Button size="lg" href="#timeline-preview">See the timeline <Icon name="arrow-right" size={18} /></Button>
          <Button size="lg" variant="secondary" href="#contact">Get in touch</Button>
        </div>
      </div>
    </Container>
  );
}

function BioTeaser() {
  return (
    <section style={{ background: 'var(--color-surface-1)', borderTop: '1px solid var(--color-surface-border)', borderBottom: '1px solid var(--color-surface-border)' }}>
      <Container style={{ paddingTop: 'var(--nk-section-pad, 96px)', paddingBottom: 'var(--nk-section-pad, 96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,6vw,64px)', alignItems: 'center' }} className="nk-bio-teaser">
          <div style={{ width: '100%', aspectRatio: '3 / 2', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-surface-border)' }}>
            <image-slot id="home-bio-photo" shape="rounded" radius="12" placeholder="Drop a workspace photo" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
          </div>
          <div>
            <p className="overline" style={{ margin: 0 }}><Editable id="home-about-overline" text="About" /></p>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="home-about-head" text="Fifteen, Westchester." />
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-ink-secondary)', marginTop: 16, maxWidth: 480 }}>
              <Editable id="home-about-body" text="I want to make an impact on the world." multiline />
            </p>
            <div style={{ marginTop: 24 }}>
              <Button variant="secondary" href="bio.html">Read the full bio <Icon name="arrow-right" size={16} /></Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionBlock({ children, id, surface = false }) {
  return (
    <section id={id} style={surface ? { background: 'var(--color-surface-1)', borderTop: '1px solid var(--color-surface-border)', borderBottom: '1px solid var(--color-surface-border)' } : {}}>
      <Container style={{ paddingTop: 'var(--nk-section-pad, 96px)', paddingBottom: 'var(--nk-section-pad, 96px)' }}>
        {children}
      </Container>
    </section>
  );
}

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const goPost = (p) => { location.href = 'blog.html#' + p.id; };

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero layout={t.heroLayout} />

        <BioTeaser />

        <SectionBlock id="timeline-preview">
          <SectionHeader
            overlineId="home-tl-overline" overline="The path"
            headId="home-tl-head" head="Timeline"
            link="timeline.html" linkLabel="Full timeline" />
          <div style={{ marginTop: 36 }}>
            <TimelineList items={window.TIMELINE.slice(0, 5)} style={t.timelineStyle} />
          </div>
        </SectionBlock>

        <SectionBlock id="blog-preview" surface>
          <SectionHeader
            overlineId="home-blog-overline" overline="Writing"
            headId="home-blog-head" head="From the blog"
            link="blog.html" linkLabel="All posts" />
          <div style={{ marginTop: 36 }}>
            <BlogList posts={[]} style={t.blogStyle} onOpen={goPost} />
          </div>
        </SectionBlock>

        <SectionBlock id="insp-preview">
          <SectionHeader
            overlineId="home-insp-overline" overline="Inspirations"
            headId="home-insp-head" head="What pushes me"
            link="inspirations.html" linkLabel="See all" />
          <div style={{ marginTop: 36 }}>
            <InspirationGrid items={window.INSPIRATIONS.slice(0, 3)} />
          </div>
        </SectionBlock>
      </main>

      <ContactBar />
      <EditHint />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.heroLayout} options={['statement', 'split', 'minimal']} onChange={(v) => setTweak('heroLayout', v)} />
        <TweakRadio label="Timeline" value={t.timelineStyle} options={['line', 'compact']} onChange={(v) => setTweak('timelineStyle', v)} />
        <TweakRadio label="Blog" value={t.blogStyle} options={['cards', 'rows']} onChange={(v) => setTweak('blogStyle', v)} />
        <TweakSection label="Density & type" />
        <TweakRadio label="Density" value={t.density} options={['comfortable', 'compact']} onChange={(v) => setTweak('density', v)} />
        <TweakSlider label="Text size" value={t.fontScale} min={90} max={115} step={5} unit="%" onChange={(v) => setTweak('fontScale', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
