/* Neil Kaji site — CONTACT page. */

function ContactApp() {
  const links = [
    { id: 'cb-email', kind: 'Email', label: 'neilkajibusiness@gmail.com', href: 'mailto:neilkajibusiness@gmail.com' },
    { id: 'cb-ig', kind: 'Instagram', label: '@neilnkaji', href: 'https://www.instagram.com/neilnkaji/' },
    { id: 'cb-yt', kind: 'YouTube', label: 'youtube.com/@neilkaji', href: 'https://www.youtube.com/@neilkaji' },
  ];

  return (
    <React.Fragment>
      <TopNav />
      <main>
        <Container style={{ paddingTop: 100, paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="cb-overline" text="Get in touch" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12, maxWidth: 480 }}>
              <Editable id="cb-head" text="Let's chat." />
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-muted)', marginTop: 16, maxWidth: 440, fontStyle: 'italic' }}>
              <Editable id="cb-sub" text="I'll probably reply the fastest on Instagram." multiline />
            </p>
          </Reveal>

          <div style={{ marginTop: 32, maxWidth: 560, display: 'flex', flexDirection: 'column' }}>
            {links.map((l, i) => (
              <Reveal key={l.id} delay={i * 60}>
                <a href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24,
                    padding: '20px 0', borderTop: '1px solid var(--color-surface-border)',
                    color: 'var(--color-ink-primary)', textDecoration: 'none',
                    transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.45'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
                    <Editable id={l.id + '-kind'} text={l.kind} />
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--color-ink-secondary)' }}>
                    <Editable id={l.id} text={l.label} />
                  </span>
                </a>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid var(--color-surface-border)' }} />
          </div>
        </Container>
      </main>
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContactApp />);
