/* Neil Kaji site — bottom contact bar + footer. Shared across every page.
   A warm surface-1 band: editable handles, a one-line CTA, and the NK mark.
   "Contact bar at the bottom" — present on all pages. */

function ContactBar() {
  const links = [
    { id: 'cb-email', kind: 'Email', label: 'neilkajibusiness@gmail.com', href: 'mailto:neilkajibusiness@gmail.com' },
    { id: 'cb-ig', kind: 'Instagram', label: '@neilnkaji', href: 'https://www.instagram.com/neilnkaji/' },
    { id: 'cb-yt', kind: 'YouTube', label: 'youtube.com/@neilkaji', href: 'https://www.youtube.com/@neilkaji' },
  ];
  const [hover, setHover] = React.useState(null);

  return (
    <footer id="contact" style={{
      background: 'var(--color-surface-1)', borderTop: '1px solid var(--color-surface-border)', marginTop: 'auto',
    }}>
      <Container style={{ paddingTop: 'var(--nk-section-pad-sm, 64px)', paddingBottom: 40 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: 48, alignItems: 'end',
        }} className="nk-contact-grid">
          <div>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="cb-overline" text="Get in touch" />
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 12, maxWidth: 440 }}>
              <Editable id="cb-head" text="Let's chat!" />
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-ink-secondary)', marginTop: 14, maxWidth: 460 }}>
              <Editable id="cb-sub" text="I'll probably reply the fastest on Instagram" multiline />
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {links.map((l) => (
              <a key={l.id} href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHover(l.id)} onMouseLeave={() => setHover(null)}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16,
                  padding: '12px 16px', borderRadius: 8,
                  border: '1px solid var(--color-surface-border)',
                  background: hover === l.id ? 'var(--color-surface-2)' : 'var(--color-surface-canvas)',
                  color: 'var(--color-ink-primary)', textDecoration: 'none',
                  transition: 'background 160ms ease-out',
                }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
                  <Editable id={l.id + '-kind'} text={l.kind} />
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--color-ink-primary)' }}>
                  <Editable id={l.id} text={l.label} />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--color-surface-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-primary)', letterSpacing: '-0.02em' }}>NK</span>
          <small style={{ color: 'var(--color-ink-muted)' }}>
            <Editable id="cb-credit" text="Neil Kaji · Westchester, New York · 2026" />
          </small>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { ContactBar });
