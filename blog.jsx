/* Neil Kaji site — full BLOG page. */

function PostOverlay({ post, onClose }) {
  React.useEffect(() => {
    if (!post) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [post]);
  if (!post) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(12,14,27,0.55)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '6vh 24px', overflowY: 'auto',
      animation: 'nk-fade 250ms ease both',
    }}>
      <article onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: 620,
        background: 'var(--color-surface-canvas)',
        padding: 'clamp(32px, 6vw, 56px)',
        boxShadow: '0 32px 80px rgba(12,14,27,0.22)',
        animation: 'nk-rise 350ms cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <PostMeta post={post} />
          <button onClick={onClose} aria-label="Close" style={{
            background: 'none', border: 0, cursor: 'pointer', color: 'var(--color-ink-muted)',
            display: 'inline-flex', padding: 4, transition: 'opacity 200ms ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.4'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 20, lineHeight: 1.2 }}>
          <Editable id={post.id + '-title'} text={post.title} />
        </h1>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {post.body.map((para, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--color-ink-secondary)' }}>
              <Editable id={post.id + '-body-' + i} text={para} multiline />
            </p>
          ))}
        </div>
        <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--color-surface-border)' }}>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--color-surface-border)', cursor: 'pointer',
            padding: '0 14px', height: 30, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-ink-muted)', fontFamily: 'var(--font-base)',
            transition: 'color 200ms ease, border-color 200ms ease',
          }}>
            Close
          </button>
        </div>
      </article>
    </div>
  );
}

function BlogApp() {
  const [open, setOpen] = React.useState(null);

  React.useEffect(() => {
    const id = (location.hash || '').replace('#', '');
    if (id) {
      const p = window.POSTS.find((x) => x.id === id);
      if (p) setOpen(p);
    }
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Container style={{ paddingTop: 'calc(var(--nk-nav-h, 52px) + 72px)', paddingBottom: 140 }}>
          <Reveal>
            <p className="overline" style={{ margin: 0 }}>
              <Editable id="blogpage-overline" text="Writing" />
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
              <Editable id="blogpage-head" text="The blog" />
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--color-ink-muted)', marginTop: 16, maxWidth: 520, fontStyle: 'italic' }}>
              <Editable id="blogpage-intro" text="Notes on what I'm building, learning, and thinking about." multiline />
            </p>
          </Reveal>

          <div style={{ marginTop: 64, maxWidth: 720 }}>
            <BlogList posts={[]} style="rows" onOpen={setOpen} />
          </div>
        </Container>
      </main>
      <ContactBar />
      <EditHint />
      <PostOverlay post={open} onClose={() => setOpen(null)} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogApp />);
