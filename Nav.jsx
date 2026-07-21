/* Neil Kaji site — navigation components.
   Nav: legacy top bar (unused on home, kept for compatibility).
   PageNav: inner-page back button + vertical side nav.
   EditHint: editing mode banner. */

const NAV_ITEMS = [
  { href: 'index.html',        label: 'Home' },
  { href: 'timeline.html',     label: 'Timeline' },
  { href: 'blog.html',         label: 'Blog' },
  { href: 'portfolio.html',    label: 'Portfolio' },
  { href: 'bio.html',          label: 'Bio' },
  { href: 'contact.html',      label: 'Contact' },
];

function currentPage() {
  const p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  return p === '' ? 'index.html' : p;
}

/* ── PageNav — back button for inner pages ───────────────────────────────────*/
function PageNav() {
  const goBack = (e) => {
    e.preventDefault();
    if (history.length > 1) history.back();
    else location.href = 'index.html';
  };

  return (
    <a href="index.html" onClick={goBack} style={{
      position: 'fixed', top: 28, left: 28, zIndex: 40,
      fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'var(--color-ink-muted)', textDecoration: 'none',
      opacity: 0.55, transition: 'opacity 200ms ease',
    }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.55'}
    >← Back</a>
  );
}

/* ── Nav — legacy top bar (kept for pages that still import it) ──────────────*/
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const unlocked = useEditUnlocked();
  const editing = useEditMode();
  const current = currentPage();

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 'var(--nk-nav-h, 52px)',
      background: scrolled ? 'rgba(242,243,245,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--color-surface-border)' : 'transparent'}`,
      transition: 'background 500ms ease, border-color 500ms ease',
    }}>
      <div style={{
        maxWidth: 1040, margin: '0 auto', height: '100%',
        padding: '0 clamp(24px, 5vw, 56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="index.html" style={{
          fontSize: 15, fontWeight: 700, fontStyle: 'italic',
          color: 'var(--color-ink-primary)', letterSpacing: '-0.01em', textDecoration: 'none',
          transition: 'opacity 200ms ease',
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >NK</a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.5vw, 30px)' }}>
          {NAV_ITEMS.map((it) => {
            const active = current === it.href;
            return (
              <a key={it.href} href={it.href} style={{
                fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
                borderBottom: active ? '1px solid var(--color-ink-primary)' : '1px solid transparent',
                paddingBottom: 1, transition: 'color 200ms ease', textDecoration: 'none',
              }}>{it.label}</a>
            );
          })}
          {unlocked && (
            <button onClick={() => editStore.toggle()} style={{
              display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px',
              fontSize: 10, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'var(--font-base)', cursor: 'pointer',
              border: '1px solid var(--color-surface-border)',
              background: editing ? 'var(--color-ink-primary)' : 'transparent',
              color: editing ? 'var(--color-ink-inverse)' : 'var(--color-ink-muted)',
              transition: 'background 200ms ease, color 200ms ease',
            }}>{editing ? 'Done' : 'Edit'}</button>
          )}
        </nav>
      </div>
    </header>
  );
}

/* ── EditHint ────────────────────────────────────────────────────────────────*/
function EditHint() {
  const editing = useEditMode();
  if (!editing) return null;
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 20, transform: 'translateX(-50%)', zIndex: 60,
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px',
      background: 'var(--color-ink-primary)', color: 'var(--color-ink-inverse)',
      fontSize: 11, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
      boxShadow: '0 8px 32px rgba(12,14,27,0.18)',
    }}>
      Click any text to rewrite it.
    </div>
  );
}

Object.assign(window, { Nav, PageNav, EditHint });
