/* Neil Kaji site — shared library.
   Primitives, inline-edit system, scroll Reveal, tweak helpers.
   Loaded on every page. Exports everything to window. */

const { useState, useEffect, useRef, useCallback } = React;

/* ── Tweaks (read side) ──────────────────────────────────────────────────────*/
const TWEAK_DEFAULTS = {
  heroLayout:    'statement',
  timelineStyle: 'line',
  blogStyle:     'rows',
  density:       'comfortable',
  fontScale:     100,
};
function getTweaks() {
  try { return { ...TWEAK_DEFAULTS, ...JSON.parse(localStorage.getItem('nk:tweaks') || '{}') }; }
  catch (e) { return { ...TWEAK_DEFAULTS }; }
}
function useTweakValues() {
  const [t, setT] = useState(getTweaks);
  useEffect(() => {
    const h = () => { setT(getTweaks()); if (window.__nkApplyTheme) window.__nkApplyTheme(); };
    window.addEventListener('tweakchange', h);
    window.addEventListener('storage', (e) => { if (!e.key || e.key === 'nk:tweaks') h(); });
    return () => window.removeEventListener('tweakchange', h);
  }, []);
  return t;
}

/* ── Edit-mode store ─────────────────────────────────────────────────────────*/
const EDIT_KEY = 'nk:editmode';
const UNLOCK_KEY = 'nk:editunlock';
const editStore = {
  on: (() => { try { return localStorage.getItem(EDIT_KEY) === '1'; } catch (e) { return false; } })(),
  unlocked: (() => { try { return localStorage.getItem(UNLOCK_KEY) === '1'; } catch (e) { return false; } })(),
  listeners: new Set(),
  notify() { this.listeners.forEach((l) => l(this.on && this.unlocked)); },
  set(v) {
    this.on = v;
    try { localStorage.setItem(EDIT_KEY, v ? '1' : '0'); } catch (e) {}
    this.notify();
  },
  toggle() { this.set(!this.on); },
  unlock() {
    this.unlocked = true;
    try { localStorage.setItem(UNLOCK_KEY, '1'); } catch (e) {}
    this.notify();
  },
  lock() {
    this.unlocked = false;
    this.on = false;
    try { localStorage.setItem(UNLOCK_KEY, '0'); localStorage.setItem(EDIT_KEY, '0'); } catch (e) {}
    this.notify();
  },
  sub(l) { this.listeners.add(l); return () => this.listeners.delete(l); },
};
(function () {
  try { if (new URLSearchParams(location.search).has('edit')) editStore.unlock(); } catch (e) {}
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      if (editStore.unlocked) editStore.lock(); else editStore.unlock();
    }
  });
})();
function useEditMode() {
  const [, force] = useState(0);
  useEffect(() => editStore.sub(() => force((n) => n + 1)), []);
  return editStore.on && editStore.unlocked;
}
function useEditUnlocked() {
  const [, force] = useState(0);
  useEffect(() => editStore.sub(() => force((n) => n + 1)), []);
  return editStore.unlocked;
}

/* ── Editable ────────────────────────────────────────────────────────────────*/
function Editable({ id, text, as = 'span', className, style = {}, multiline = false }) {
  const ref = useRef(null);
  const editing = useEditMode();
  const Tag = as;

  useEffect(() => {
    if (!ref.current) return;
    let saved = null;
    try { saved = localStorage.getItem('nk:txt:' + id); } catch (e) {}
    ref.current.textContent = (saved != null ? saved : text);
  }, [id]);

  const editStyle = editing
    ? { outline: '1px dashed var(--color-ink-muted)', outlineOffset: 3, borderRadius: 2, cursor: 'text' }
    : {};

  return (
    <Tag
      ref={ref}
      className={className}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      data-editable="1"
      title={editing ? 'Click to edit' : undefined}
      onBlur={(e) => { try { localStorage.setItem('nk:txt:' + id, e.currentTarget.textContent); } catch (err) {} }}
      onKeyDown={(e) => {
        if (!multiline && e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); }
      }}
      style={{ ...style, ...editStyle }}
    />
  );
}

/* ── Lucide icon ─────────────────────────────────────────────────────────────*/
function lucideSvg(name, size) {
  const L = window.lucide;
  if (!L) return '';
  const toPascal = name.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
  const node = (L.icons && (L.icons[toPascal] || L.icons[name])) || L[toPascal];
  if (!node) return '';
  try {
    const svg = L.createElement(node);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('stroke-width', 1.5);
    return svg.outerHTML;
  } catch (e) { return ''; }
}
function Icon({ name, size = 20, className = '', style = {} }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.innerHTML = lucideSvg(name, size); }, [name, size]);
  return (
    <span ref={ref} className={className} aria-hidden="true"
      style={{ display: 'inline-flex', alignItems: 'center', width: size, height: size, ...style }} />
  );
}

/* ── Button — small, minimal, flat ──────────────────────────────────────────*/
function Button({ variant = 'primary', size = 'md', children, onClick, href, type = 'button', style = {} }) {
  const [hover, setHover] = useState(false);
  const sizes = {
    sm: { height: 26, padding: '0 10px', fontSize: 11, gap: 5 },
    md: { height: 30, padding: '0 13px', fontSize: 12, gap: 6 },
    lg: { height: 34, padding: '0 16px', fontSize: 12, gap: 7 },
  };
  const palette = {
    primary: {
      bg: hover ? 'var(--color-ink-primary)' : 'transparent',
      color: hover ? 'var(--color-ink-inverse)' : 'var(--color-ink-primary)',
      border: 'var(--color-ink-primary)',
    },
    secondary: {
      bg: 'transparent',
      color: hover ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)',
      border: 'var(--color-surface-border)',
    },
    ghost: {
      bg: 'transparent',
      color: hover ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
      border: 'transparent',
    },
  };
  const p = palette[variant];
  const s = sizes[size];
  const common = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: s.gap, height: s.height, padding: s.padding,
    fontSize: s.fontSize, fontWeight: 400, fontFamily: 'var(--font-base)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    borderRadius: 0, cursor: 'pointer', textDecoration: 'none',
    background: p.bg, color: p.color, border: `1px solid ${p.border}`,
    transition: 'background 200ms ease, color 200ms ease',
    ...style,
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  if (href) return <a href={href} onClick={onClick} {...handlers} style={common}>{children}</a>;
  return <button type={type} onClick={onClick} {...handlers} style={common}>{children}</button>;
}

/* ── Badge ───────────────────────────────────────────────────────────────────*/
function Badge({ children, variant = 'primary', style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center',
      padding: '2px 9px', fontSize: 10.5, fontWeight: 400,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--color-ink-muted)', border: '1px solid var(--color-surface-border)',
      ...style,
    }}>
      {children}
    </span>
  );
}

/* ── Reveal — scroll-driven fade+rise ────────────────────────────────────────*/
function Reveal({ children, delay = 0, style = {}, as = 'div' }) {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(16px)',
      transition: reduced ? 'none' : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </Tag>
  );
}

/* ── Container ───────────────────────────────────────────────────────────────*/
function Container({ children, style = {}, narrow = false }) {
  return (
    <div style={{ maxWidth: narrow ? 720 : 1040, margin: '0 auto', padding: '0 clamp(24px, 5vw, 56px)', width: '100%', boxSizing: 'border-box', ...style }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  Editable, useEditMode, useEditUnlocked, editStore,
  Icon, Button, Badge, Reveal, Container,
  TWEAK_DEFAULTS, getTweaks, useTweakValues,
});
