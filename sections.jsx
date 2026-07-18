/* Neil Kaji site — shared section renderers. */

/* ── Section header ──────────────────────────────────────────────────────────*/
function SectionHeader({ overlineId, overline, headId, head, link, linkLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <p className="overline" style={{ margin: 0 }}>
          <Editable id={overlineId} text={overline} />
        </p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 1.875rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-ink-primary)', marginTop: 10 }}>
          <Editable id={headId} text={head} />
        </h2>
      </div>
      {link && (
        <a href={link} style={{
          fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-ink-muted)', whiteSpace: 'nowrap',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          borderBottom: '1px solid var(--color-surface-border)', paddingBottom: 1,
        }}>
          {linkLabel} <Icon name="arrow-right" size={12} />
        </a>
      )}
    </div>
  );
}

/* ── Timeline ────────────────────────────────────────────────────────────────*/
function TimelineList({ items, style = 'line' }) {
  return (
    <div>
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 5) * 60}>
          <div style={{
            padding: '28px 0',
            borderTop: '1px solid var(--color-surface-border)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
              <Editable id={it.id + '-date'} text={it.date} />
            </div>
            <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-ink-primary)', letterSpacing: '-0.01em', marginTop: 8 }}>
              <Editable id={it.id + '-title'} text={it.title} />
            </h3>
            {it.desc && (
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 7, maxWidth: 640 }}>
                <Editable id={it.id + '-desc'} text={it.desc} multiline />
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Blog ────────────────────────────────────────────────────────────────────*/
function PostMeta({ post }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
      <span><Editable id={post.id + '-date'} text={post.date} /></span>
      <span>·</span>
      <span><Editable id={post.id + '-tag'} text={post.tag} /></span>
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
        padding: '28px 0', borderTop: '1px solid var(--color-surface-border)',
        cursor: onOpen ? 'pointer' : 'default',
      }}>
      <PostMeta post={post} />
      <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 10,
        opacity: hover && onOpen ? 0.55 : 1, transition: 'opacity 200ms ease',
      }}>
        <Editable id={post.id + '-title'} text={post.title} />
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 7, maxWidth: 620 }}>
        <Editable id={post.id + '-excerpt'} text={post.excerpt} multiline />
      </p>
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
        padding: '28px 0', borderTop: '1px solid var(--color-surface-border)',
        cursor: onOpen ? 'pointer' : 'default',
      }}>
      <PostMeta post={post} />
      <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 10,
        opacity: hover && onOpen ? 0.55 : 1, transition: 'opacity 200ms ease',
      }}>
        <Editable id={post.id + '-title'} text={post.title} />
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 7, maxWidth: 640 }}>
        <Editable id={post.id + '-excerpt'} text={post.excerpt} multiline />
      </p>
    </article>
  );
}

function BlogList({ posts, style = 'rows', onOpen }) {
  if (!posts || posts.length === 0) {
    return (
      <div style={{ padding: '56px 0', borderTop: '1px solid var(--color-surface-border)' }}>
        <p style={{ fontSize: 15, color: 'var(--color-ink-muted)', margin: 0, fontStyle: 'italic' }}>
          <Editable id="blog-empty" text="Nothing yet — check back soon." />
        </p>
      </div>
    );
  }
  return (
    <div>
      {posts.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 4) * 60}>
          <BlogRow post={p} onOpen={onOpen} />
        </Reveal>
      ))}
    </div>
  );
}

/* ── Inspirations ────────────────────────────────────────────────────────────*/
function InspirationGrid({ items }) {
  return (
    <div>
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 4) * 60}>
          <div style={{ padding: '28px 0', borderTop: '1px solid var(--color-surface-border)' }}>
            <span className="overline">
              <Editable id={it.id + '-kind'} text={it.kind} />
            </span>
            <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 8 }}>
              <Editable id={it.id + '-name'} text={it.name} />
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 7, maxWidth: 640 }}>
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
      <div style={{ padding: '56px 0', borderTop: '1px solid var(--color-surface-border)' }}>
        <p style={{ fontSize: 15, color: 'var(--color-ink-muted)', margin: 0, fontStyle: 'italic' }}>
          <Editable id="portfolio-empty" text="Nothing here yet — check back soon." />
        </p>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 40 }}>
      {items.map((it, i) => (
        <Reveal key={it.id} delay={Math.min(i, 3) * 80}>
          <PortfolioCard it={it} />
        </Reveal>
      ))}
    </div>
  );
}

function PortfolioCard({ it }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', aspectRatio: '1867 / 583', overflow: 'hidden', borderTop: '1px solid var(--color-surface-border)' }}>
        <image-slot id={it.id + '-image'} shape="rect" placeholder="Drop a project image" style={{ width: '100%', height: '100%', display: 'block' }}></image-slot>
      </div>
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <span className="overline">
            <Editable id={it.id + '-category'} text={it.category} />
          </span>
          <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--color-ink-muted)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            <Editable id={it.id + '-date'} text={it.date} />
          </span>
        </div>
        <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-ink-primary)', marginTop: 8 }}>
          <Editable id={it.id + '-title'} text={it.title} />
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink-secondary)', marginTop: 7 }}>
          {expanded
            ? <Editable id={it.id + '-descFull'} text={it.descFull || it.desc} multiline />
            : <Editable id={it.id + '-desc'} text={it.desc} multiline />}
        </p>
        {it.descFull && (
          <button onClick={() => setExpanded((e) => !e)} style={{
            appearance: 'none', border: 0, background: 'none', padding: 0, marginTop: 6, cursor: 'pointer',
            alignSelf: 'flex-start', fontSize: 11, fontWeight: 400, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-ink-muted)',
            fontFamily: 'var(--font-base)',
          }}>
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        {it.url && (
          <a href={it.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-ink-primary)', marginTop: 14,
            borderBottom: '1px solid var(--color-surface-border)', paddingBottom: 1,
          }}>
            Visit site <Icon name="arrow-right" size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { SectionHeader, TimelineList, BlogList, BlogCard, BlogRow, InspirationGrid, PortfolioGrid, PostMeta });
