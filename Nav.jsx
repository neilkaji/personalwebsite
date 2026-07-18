/* Neil Kaji site — navigation components.
   Nav: legacy top bar (unused on home, kept for compatibility).
   PageNav: inner-page back button + vertical side nav.
   EditHint: editing mode banner. */

const NAV_ITEMS = [
  { href: 'index.html',        label: 'Home' },
  { href: 'timeline.html',     label: 'Timeline' },
  { href: 'blog.html',         label: 'Blog' },
  { href: 'portfolio.html',    label: 'Portfolio' },
  { href: 'inspirations.html', label: 'Inspirations' },
  { href: 'bio.html',          label: 'Bio' },
  { href: 'contact.html',      label: 'Contact' },
];

function currentPage() {
  const p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  return p === '' ? 'index.html' : p;
}

/* ── PageNav — back button + vertical side nav for inner pages ───────────────*/
function PageNav() {
  const unlocked = useEditUnlocked();
  const editing = useEditMode();
  const current = currentPage();

  const goBack = (e) => {
    e.preventDefault();
    if (history.length > 1) history.back();
    else location.href = 'index.html';
  };

  return (
    <div className="nk-sidenav" style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 60,
      zIndex: 40, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {/* Back */}
      <a href="index.html" onClick={goBack} style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'auto',
        fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--color-ink-muted)', textDecoration: 'none',
        opacity: 0.55, transition: 'opacity 200ms ease',
        whiteSpace: 'nowrap', writingMode: 'horizontal-tb',
      }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.55'}
        aria-label="Back"
      >←</a>

      {/* Page links */}
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, pointerEvents: 'auto' }}>
        {NAV_ITEMS.map((it) => {
          const active = current === it.href;
          return (
            <a key={it.href} href={it.href} title={it.label} style={{
              fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: active ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
              opacity: active ? 1 : 0.45,
              textDecoration: 'none',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              transition: 'opacity 200ms ease, color 200ms ease',
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.opacity = '0.45'; }}
            >{it.label}</a>
          );
        })}
      </nav>

      {/* Edit toggle — owner only */}
      {unlocked && (
        <button
          onClick={() => editStore.toggle()}
          title={editing ? 'Done editing' : 'Edit this site'}
          style={{
            position: 'absolute', bottom: 28,
            pointerEvents: 'auto',
            appearance: 'none', border: '1px solid var(--color-surface-border)',
            background: editing ? 'var(--color-ink-primary)' : 'transparent',
            color: editing ? 'var(--color-ink-inverse)' : 'var(--color-ink-muted)',
            fontFamily: 'var(--font-base)',
            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 7px', cursor: 'pointer',
            transition: 'background 200ms ease, color 200ms ease',
            opacity: 0.65,
          }}
        >{editing ? 'Done' : 'Edit'}</button>
      )}
    </div>
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
