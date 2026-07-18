/* Neil Kaji site — minimal footer contact bar. */

function ContactBar() {
  const links = [
    { id: 'cb-email', kind: 'Email', label: 'neilkajibusiness@gmail.com', href: 'mailto:neilkajibusiness@gmail.com' },
    { id: 'cb-ig', kind: 'Instagram', label: '@neilnkaji', href: 'https://www.instagram.com/neilnkaji/' },
    { id: 'cb-yt', kind: 'YouTube', label: 'youtube.com/@neilkaji', href: 'https://www.youtube.com/@neilkaji' },
  ];

  return (
    <footer id="contact" style={{ borderTop: '1px solid var(--color-surface-border)', marginTop: 'auto' }}>
      <Container style={{ paddingTop: 88, paddingBottom: 56 }}>
        <Reveal>
          <p className="overline" style={{ margin: 0 }}>
            <Editable id="cb-overline" text="Get in touch" />
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12, maxWidth: 400 }}>
            <Editable id="cb-head" text="Let's chat." />
          </h2>
        </Reveal>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column' }}>
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

        <div style={{
          marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, fontStyle: 'italic', color: 'var(--color-ink-primary)', letterSpacing: '-0.01em' }}>NK</span>
          <small style={{ color: 'var(--color-ink-muted)' }}>
            <Editable id="cb-credit" text="Neil Kaji · Westchester, New York · 2026" />
          </small>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { ContactBar });
