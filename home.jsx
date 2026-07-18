/* Neil Kaji site — HOME. */

/* ── Shared text link style ──────────────────────────────────────────────────*/
const traverseLink = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--color-ink-muted)', textDecoration: 'none',
  borderBottom: '1px solid var(--color-surface-border)', paddingBottom: 1,
  transition: 'color 200ms ease, border-color 200ms ease',
};

/* ── Hero ────────────────────────────────────────────────────────────────────*/
function Hero() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '0 clamp(24px, 5vw, 56px)',
    }}>
      <p style={{
        margin: 0, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'var(--color-ink-muted)',
        animation: 'nk-rise 900ms cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <Editable id="hero-overline" text="Westchester · 15" />
      </p>
      <h1 style={{
        fontSize: 'clamp(5rem, 15vw, 11rem)', fontWeight: 700, lineHeight: 0.92,
        letterSpacing: '-0.04em', color: 'var(--color-ink-primary)',
        margin: '18px 0 0',
        animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 80ms both',
      }}>
        <Editable id="hero-head" text="Neil Kaji" multiline />
      </h1>
      <p style={{
        fontSize: 14, color: 'var(--color-ink-muted)', marginTop: 28, fontStyle: 'italic',
        letterSpacing: '0.01em',
        animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 180ms both',
      }}>
        <Editable id="hero-desc" text="Building. Creating. Shipping." />
      </p>
      <div style={{
        display: 'flex', gap: 36, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center',
        animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 280ms both',
      }}>
        <a href="#timeline-preview" style={traverseLink}>
          Timeline <Icon name="arrow-right" size={13} />
        </a>
        <a href="#portfolio-preview" style={traverseLink}>
          Work <Icon name="arrow-right" size={13} />
        </a>
        <a href="#contact" style={traverseLink}>
          Contact <Icon name="arrow-right" size={13} />
        </a>
      </div>
    </div>
  );
}

/* ── Section wrapper — just whitespace, all on the same canvas ───────────────*/
function Section({ id, children }) {
  return (
    <section id={id}>
      <Container style={{ paddingTop: 120, paddingBottom: 120 }}>
        {children}
      </Container>
    </section>
  );
}

/* ── App ─────────────────────────────────────────────────────────────────────*/
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const goPost = (p) => { location.href = 'blog.html#' + p.id; };

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />

        <Section id="about-preview">
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>About</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.875rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 10, maxWidth: 560 }}>
              <Editable id="home-about-head" text="Fifteen years old. Westchester." />
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-secondary)', marginTop: 20, maxWidth: 520 }}>
              <Editable id="home-about-body" text="I want to make an impact on the world. I build things and put them in front of people." multiline />
            </p>
            <div style={{ marginTop: 28 }}>
              <a href="bio.html" style={traverseLink}>
                Full bio <Icon name="arrow-right" size={13} />
              </a>
            </div>
          </Reveal>
        </Section>

        <Section id="timeline-preview">
          <Reveal>
            <SectionHeader
              overlineId="home-tl-overline" overline="The path"
              headId="home-tl-head" head="Timeline" />
          </Reveal>
          <div style={{ position: 'relative', marginTop: 12 }}>
            <TimelineList items={window.TIMELINE.slice(0, 5)} style={t.timelineStyle} />
            <div aria-hidden="true" style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, pointerEvents: 'none',
              background: 'linear-gradient(to bottom, transparent, var(--color-surface-canvas))',
            }} />
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="timeline.html" style={traverseLink}>
              Full timeline <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </Section>

        <Section id="blog-preview">
          <Reveal>
            <SectionHeader
              overlineId="home-blog-overline" overline="Writing"
              headId="home-blog-head" head="From the blog" />
          </Reveal>
          <div style={{ marginTop: 12 }}>
            <BlogList posts={window.POSTS.slice(0, 3)} style="rows" onOpen={goPost} />
          </div>
          <div style={{ marginTop: 12 }}>
            <a href="blog.html" style={traverseLink}>
              All posts <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </Section>

        <Section id="insp-preview">
          <Reveal>
            <SectionHeader
              overlineId="home-insp-overline" overline="Inspirations"
              headId="home-insp-head" head="What pushes me" />
          </Reveal>
          <div style={{ marginTop: 12 }}>
            <InspirationGrid items={window.INSPIRATIONS.slice(0, 3)} />
          </div>
          <div style={{ marginTop: 12 }}>
            <a href="inspirations.html" style={traverseLink}>
              See all <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </Section>

        <Section id="portfolio-preview">
          <Reveal>
            <SectionHeader
              overlineId="home-portfolio-overline" overline="Work"
              headId="home-portfolio-head" head="Portfolio" />
          </Reveal>
          <div style={{ marginTop: 32 }}>
            <PortfolioGrid items={window.PORTFOLIO.slice(0, 3)} />
          </div>
          <div style={{ marginTop: 32 }}>
            <a href="portfolio.html" style={traverseLink}>
              See all <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </Section>
      </main>

      <ContactBar />
      <EditHint />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Timeline" />
        <TweakRadio label="Timeline" value={t.timelineStyle} options={['line', 'compact']} onChange={(v) => setTweak('timelineStyle', v)} />
        <TweakSection label="Blog" />
        <TweakRadio label="Blog" value={t.blogStyle} options={['cards', 'rows']} onChange={(v) => setTweak('blogStyle', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
