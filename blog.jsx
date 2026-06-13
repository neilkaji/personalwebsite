/* Neil Kaji site — full BLOG page. Lists every post (style from the home Tweaks
   panel). Clicking a post opens a reading overlay with the full body. Arriving
   with a #post-id hash (from the home preview) auto-opens that post. */

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
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(26,22,18,0.32)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 20px',
      overflowY: 'auto', animation: 'nk-fade 200ms ease-out',
    }}>
      <article onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: 660, background: 'var(--color-surface-canvas)',
        border: '1px solid var(--color-surface-border)', borderRadius: 12, padding: 'clamp(28px, 5vw, 48px)',
        boxShadow: '0 20px 48px rgba(26,22,18,0.16)', animation: 'nk-rise 280ms cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <Badge><Editable id={post.id + '-tag'} text={post.tag} /></Badge>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--color-ink-muted)', display: 'inline-flex' }}>
            <Icon name="x" size={22} />
          </button>
        </div>
        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 16 }}>
          <Editable id={post.id + '-title'} text={post.title} />
        </h1>
        <div style={{ marginTop: 12 }}><PostMeta post={post} /></div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {post.body.map((para, i) => (
            <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--color-ink-secondary)' }}>
              <Editable id={post.id + '-body-' + i} text={para} multiline />
            </p>
          ))}
        </div>
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--color-surface-border)' }}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </article>
    </div>
  );
}

function BlogApp() {
  const t = useTweakValues();
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
        <Container style={{ paddingTop: 'var(--nk-section-pad-sm, 64px)', paddingBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <p className="overline" style={{ margin: 0 }}><Editable id="blogpage-overline" text="Writing" /></p>
            <div style={{ flex: 1, height: 1, background: 'var(--color-ink-primary)', opacity: 0.1 }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 14 }}>
            <Editable id="blogpage-head" text="The blog" />
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-ink-secondary)', marginTop: 16, maxWidth: 600 }}>
            <Editable id="blogpage-intro" text="Notes on what I'm building, learning, and thinking about. Click a post to read it." multiline />
          </p>
        </Container>
        <Container style={{ paddingBottom: 'var(--nk-section-pad, 96px)' }}>
          <div style={{ marginTop: 24 }}>
            <BlogList posts={[]} style={t.blogStyle} onOpen={setOpen} />
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
