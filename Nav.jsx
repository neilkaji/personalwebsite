/* Neil Kaji site — shared top nav. Links across the multi-page site + the
   inline-edit toggle. Active item is derived from the current filename. */

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const editing = useEditMode();
  const unlocked = useEditUnlocked();

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const items = [
    { href: 'index.html', label: 'Home' },
    { href: 'timeline.html', label: 'Timeline' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'portfolio.html', label: 'Portfolio' },
    { href: 'inspirations.html', label: 'Inspirations' },
    { href: 'bio.html', label: 'Bio' },
  ];
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const current = path === '' ? 'index.html' : path;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, height: 64,
      background: scrolled ? 'rgba(246,240,232,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--color-surface-border)' : 'transparent'}`,
      boxShadow: scrolled ? '0 1px 2px rgba(26,22,18,0.06)' : 'none',
      transition: 'background 280ms cubic-bezier(0.22,1,0.36,1), border-color 280ms, box-shadow 280ms',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto', height: '100%',
        padding: '0 clamp(24px, 5vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="index.html" style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-ink-primary)', letterSpacing: '-0.02em' }}>NK</a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.4vw, 28px)' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2vw, 26px)' }}>
            {items.map((it) => {
              const active = current === it.href;
              return (
                <a key={it.href} href={it.href} style={{
                  fontSize: 13.5, fontWeight: 500,
                  color: active ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)',
                  position: 'relative', paddingBottom: 2,
                  borderBottom: active ? '1.5px solid var(--color-primary-500)' : '1.5px solid transparent',
                  transition: 'color 160ms ease-out',
                }}>{it.label}</a>
              );
            })}
          </nav>
          <button
            onClick={() => editStore.toggle()}
            title={editing ? 'Done editing' : 'Edit this site'}
            style={{
              display: unlocked ? 'inline-flex' : 'none', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
              fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-base)', cursor: 'pointer',
              borderRadius: 9999, border: '1px solid var(--color-surface-border)',
              background: editing ? 'var(--color-primary-500)' : 'var(--color-surface-1)',
              color: editing ? 'var(--color-ink-inverse)' : 'var(--color-ink-secondary)',
              transition: 'background 160ms ease-out, color 160ms ease-out',
            }}>
            <Icon name={editing ? 'check' : 'pencil'} size={15} />
            {editing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>
    </header>
  );
}

/* Thin banner shown only while editing — tells the user what's going on. */
function EditHint() {
  const editing = useEditMode();
  if (!editing) return null;
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 20, transform: 'translateX(-50%)', zIndex: 60,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 16px', borderRadius: 9999,
      background: 'var(--color-ink-primary)', color: 'var(--color-ink-inverse)',
      fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(26,22,18,0.18)',
    }}>
      <Icon name="info" size={15} />
      Click any text to rewrite it. Changes save in your browser.
    </div>
  );
}

Object.assign(window, { Nav, EditHint });
