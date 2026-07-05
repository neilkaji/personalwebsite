/* Neil Kaji site — shared section renderers used on BOTH the home previews and
   the full pages. Editable ids are derived from each item's stable id, so a tweak
   typed on the home preview shows up on the full page and vice-versa. */

/* ── Section header — overline + heading, with optional "see all" link ──────── */
function SectionHeader({ overlineId, overline, headId, head, link, linkLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 1.5, background: 'var(--color-primary-500)', opacity: 0.75, flexShrink: 0 }} />
          <p className="overline" style={{ margin: 0 }}><Editable id={overlineId} text={overline} /></p>
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 12 }}>
          <Editable id={headId} text={head} />
        </h2>
      </div>
      {link && (
        <a href={link} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--color-primary-500)', whiteSpace: 'nowrap' }}>
          {linkLabel} <Icon name="arrow-right" size={16} />
        </a>
      )}
    </div>
  );
}

/* ── Timeline ────────────────────────────────────────────────────────────────*/
function TimelineList({ items, style = 'line' }) {
  if (style === 'compact') {
    return (
      <div style={{ marginTop: 8 }}>
        {items.map((it, i) => (
          <Reveal key={it.id} delay={Math.min(i, 4) * 50}>
            <div style={{
              display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'baseline',
              padding: '20px 0', borderBottom: '1px solid var(--color-surface-border)',
            }} className="nk-tl-compact-row">
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary-600)', letterSpacing: '0.01em' }}>
                <Editable id={it.id + '-date'} text={it.date} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink-primary)', letterSpacing: '-0.01em' }}>
                  <Editable id={it.id + '-title'} text={it.title} />
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 5 }}>
                  <Editable id={it.id + '-desc'} text={it.desc} multiline />
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }
  // 'line' — vertical rail with dots
  return (
    <div style={{ position: 'relative', marginTop: 8, paddingLeft: 28 }}>
      <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 2, background: 'var(--color-surface-border)' }} />
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 4) * 60}>
          <div style={{ position: 'relative', paddingBottom: i === items.length - 1 ? 0 : 32 }}>
            <span style={{
              position: 'absolute', left: -28, top: 4, width: 12, height: 12, borderRadius: 9999,
              background: 'var(--color-surface-canvas)', border: '2px solid var(--color-primary-500)', boxSizing: 'border-box',
            }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary-600)' }}>
              <Editable id={it.id + '-date'} text={it.date} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink-primary)', letterSpacing: '-0.01em', marginTop: 3 }}>
              <Editable id={it.id + '-title'} text={it.title} />
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 6, maxWidth: 620 }}>
              <Editable id={it.id + '-desc'} text={it.desc} multiline />
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Blog ────────────────────────────────────────────────────────────────────*/
function PostMeta({ post }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--color-ink-muted)' }}>
      <span><Editable id={post.id + '-date'} text={post.date} /></span>
      <span aria-hidden="true">·</span>
      <span><Editable id={post.id + '-read'} text={post.read} /> read</span>
    </div>
  );
}

function BlogCard({ post, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(post)}
      style={{
        background: 'var(--color-surface-1)', border: '1px solid var(--color-surface-border)', borderRadius: 8,
        padding: 'var(--nk-card-pad, 24px)', cursor: onOpen ? 'pointer' : 'default',
        boxShadow: hover && onOpen ? '0 2px 8px rgba(26,22,18,0.08),0 1px 2px rgba(26,22,18,0.04)' : 'none',
        transform: hover && onOpen ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box',
      }}>
      <Badge><Editable id={post.id + '-tag'} text={post.tag} /></Badge>
      <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 14 }}>
        <Editable id={post.id + '-title'} text={post.title} />
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-ink-secondary)', marginTop: 8, flex: 1 }}>
        <Editable id={post.id + '-excerpt'} text={post.excerpt} multiline />
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--color-surface-border)' }}>
        <PostMeta post={post} />
        {onOpen && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: hover ? 'var(--color-primary-600)' : 'var(--color-primary-500)', transition: 'color 160ms ease-out' }}>
            Read <Icon name="arrow-right" size={15} />
          </span>
        )}
      </div>
    </article>
  );
}

function BlogRow({ post, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(post)}
      style={{
        display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 28, alignItems: 'baseline',
        padding: '24px 0', borderBottom: '1px solid var(--color-surface-border)', cursor: onOpen ? 'pointer' : 'default',
      }} className="nk-blog-row">
      <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
        <div style={{ fontWeight: 600, color: 'var(--color-primary-600)' }}><Editable id={post.id + '-tag'} text={post.tag} /></div>
        <div style={{ marginTop: 4 }}><Editable id={post.id + '-date'} text={post.date} /></div>
      </div>
      <div>
        <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', color: hover && onOpen ? 'var(--color-primary-600)' : 'var(--color-ink-primary)', transition: 'color 160ms ease-out' }}>
          <Editable id={post.id + '-title'} text={post.title} />
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-ink-secondary)', marginTop: 6, maxWidth: 620 }}>
          <Editable id={post.id + '-excerpt'} text={post.excerpt} multiline />
        </p>
      </div>
      {onOpen && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--color-primary-500)', whiteSpace: 'nowrap', alignSelf: 'center' }}>
          Read <Icon name="arrow-right" size={15} />
        </span>
      )}
    </article>
  );
}

function BlogList({ posts, style = 'cards', onOpen }) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{
        background: 'var(--color-surface-1)', border: '1px solid var(--color-surface-border)', borderRadius: 8,
        padding: '40px 24px', marginTop: 8, textAlign: 'center',
      }}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-ink-secondary)', margin: 0 }}>
          <Editable id="blog-empty" text="Nothing yet, come back soon for more" />
        </p>
      </div>
    );
  }
  if (style === 'rows') {
    return <div style={{ marginTop: 8 }}>{posts.map((p) => (
      <Reveal key={p.id}><BlogRow post={p} onOpen={onOpen} /></Reveal>
    ))}</div>;
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 8 }}>
      {posts.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 3) * 60} style={{ height: '100%' }}>
          <BlogCard post={p} onOpen={onOpen} />
        </Reveal>
      ))}
    </div>
  );
}

/* ── Inspirations ────────────────────────────────────────────────────────────*/
function InspirationGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 8 }}>
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 3) * 60} style={{ height: '100%' }}>
          <div style={{
            background: 'var(--color-surface-1)', border: '1px solid var(--color-surface-border)', borderRadius: 8,
            padding: 'var(--nk-card-pad, 24px)', height: '100%', boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
          }}>
            <span className="overline" style={{ color: 'var(--color-primary-600)' }}><Editable id={it.id + '-kind'} text={it.kind} /></span>
            <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 10 }}>
              <Editable id={it.id + '-name'} text={it.name} />
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 8 }}>
              <Editable id={it.id + '-note'} text={it.note} multiline />
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Portfolio ───────────────────────────────────────────────────────────────*/
function PortfolioGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div style={{
        background: 'var(--color-surface-1)', border: '1px solid var(--color-surface-border)', borderRadius: 8,
        padding: '40px 24px', marginTop: 8, textAlign: 'center',
      }}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-ink-secondary)', margin: 0 }}>
          <Editable id="portfolio-empty" text="Nothing here yet, check back soon" />
        </p>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 8 }}>
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 3) * 60} style={{ height: '100%' }}>
          <div style={{
            background: 'var(--color-surface-1)', border: '1px solid var(--color-surface-border)', borderRadius: 8,
            overflow: 'hidden', height: '100%', boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <image-slot id={it.id + '-image'} shape="rect" placeholder="Drop a project image" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
            </div>
            <div style={{ padding: 'var(--nk-card-pad, 24px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span className="overline" style={{ color: 'var(--color-primary-600)' }}><Editable id={it.id + '-category'} text={it.category} /></span>
              <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 10 }}>
                <Editable id={it.id + '-title'} text={it.title} />
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 8 }}>
                <Editable id={it.id + '-desc'} text={it.desc} multiline />
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

Object.assign(window, { SectionHeader, TimelineList, BlogList, BlogCard, BlogRow, InspirationGrid, PortfolioGrid, PostMeta });
