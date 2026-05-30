/* Neil Kaji site — shared library.
   Primitives (Icon, Button, Badge), the inline-edit system (Editable + edit-mode
   store), scroll Reveal, and read-only tweak helpers for non-home pages.
   Loaded on every page. Exports everything to window. */

const { useState, useEffect, useRef, useCallback } = React;

/* ── Tweaks (read side) ──────────────────────────────────────────────────────
   Home owns the panel via useTweaks (tweaks-panel.jsx). Every page reads the
   same localStorage key so layout choices stay consistent site-wide. */
const TWEAK_DEFAULTS = {
  heroLayout: 'statement',   // statement | split | minimal
  timelineStyle: 'line',     // line | compact
  blogStyle: 'cards',        // cards | rows
  density: 'comfortable',    // comfortable | compact
  fontScale: 100,            // 90–115
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

/* ── Edit-mode store ─────────────────────────────────────────────────────────
   Global toggle, persisted so it carries across page navigations. */
const EDIT_KEY = 'nk:editmode';
const UNLOCK_KEY = 'nk:editunlock';
const editStore = {
  on: (() => { try { return localStorage.getItem(EDIT_KEY) === '1'; } catch (e) { return false; } })(),
  // Owner-only: editing tools stay hidden until the site owner unlocks them
  // (via the ?edit URL param or the Cmd/Ctrl+Shift+E shortcut). Persisted so
  // it carries across page loads on the owner's own browser.
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
// Owner unlock triggers — a visitor never sees the editing UI.
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

/* ── Editable ─────────────────────────────────────────────────────────────────
   Uncontrolled contentEditable. Initial text comes from localStorage (if the
   user edited it before) or the `text` prop default. React never reconciles the
   inner text, so typing is stable. Saves on blur. Single-line by default;
   multiline keeps Enter. */
function Editable({ id, text, as = 'span', className, style = {}, multiline = false }) {
  const ref = useRef(null);
  const editing = useEditMode();
  const Tag = as;

  useEffect(() => {
    if (!ref.current) return;
    let saved = null;
    try { saved = localStorage.getItem('nk:txt:' + id); } catch (e) {}
    ref.current.textContent = (saved != null ? saved : text);
  }, [id]); // intentionally not depending on `text` so we never clobber edits

  const editStyle = editing
    ? { outline: '1px dashed var(--color-primary-300)', outlineOffset: 3, borderRadius: 3, cursor: 'text' }
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

/* ── Lucide icon (CDN, 1.5 stroke, currentColor) ───────────────────────────── */
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

/* ── Button ──────────────────────────────────────────────────────────────────*/
function Button({ variant = 'primary', size = 'md', children, onClick, href, type = 'button', style = {} }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const sizes = {
    sm: { height: 32, padding: '0 12px', fontSize: 13, fontWeight: 500, gap: 6 },
    md: { height: 40, padding: '0 16px', fontSize: 15, fontWeight: 500, gap: 8 },
    lg: { height: 48, padding: '0 24px', fontSize: 16, fontWeight: 600, gap: 8 },
  };
  const palette = {
    primary: { bg: press ? 'var(--color-primary-700)' : hover ? 'var(--color-primary-600)' : 'var(--color-primary-500)', color: 'var(--color-ink-inverse)', border: 'transparent' },
    secondary: { bg: press ? 'var(--color-surface-border)' : hover ? 'var(--color-surface-2)' : 'var(--color-surface-1)', color: 'var(--color-ink-primary)', border: 'var(--color-surface-border)' },
    ghost: { bg: press ? 'var(--color-surface-2)' : hover ? 'var(--color-surface-1)' : 'transparent', color: hover ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)', border: 'transparent' },
  };
  const p = palette[variant];
  const s = sizes[size];
  const common = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: s.gap, height: s.height, padding: s.padding,
    fontSize: s.fontSize, fontWeight: s.fontWeight, fontFamily: 'var(--font-base)',
    borderRadius: 6, cursor: 'pointer', textDecoration: 'none',
    background: p.bg, color: p.color, border: `1px solid ${p.border}`,
    transition: 'background 160ms cubic-bezier(0,0,0.2,1), color 160ms cubic-bezier(0,0,0.2,1)',
    ...style,
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };
  if (href) return <a href={href} onClick={onClick} {...handlers} style={common}>{children}</a>;
  return <button type={type} onClick={onClick} {...handlers} style={common}>{children}</button>;
}

/* ── Badge ───────────────────────────────────────────────────────────────────*/
function Badge({ children, variant = 'primary', style = {} }) {
  const variants = {
    primary: { bg: 'var(--color-primary-50)', color: 'var(--color-primary-700)' },
    default: { bg: 'var(--color-surface-2)', color: 'var(--color-ink-secondary)' },
  };
  const v = variants[variant];
  return (
    <span style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', padding: '3px 11px', borderRadius: 9999, fontSize: 13, fontWeight: 500, background: v.bg, color: v.color, ...style }}>
      {children}
    </span>
  );
}

/* ── Reveal — passthrough wrapper (kept as the seam for production scroll
   reveals; renders content immediately so it's reliable in every browser and
   capture tool, matching the design-system website kit). ──────────────────── */
function Reveal({ children, delay = 0, style = {}, as = 'div' }) {
  const Tag = as;
  return <Tag style={style}>{children}</Tag>;
}

/* ── Shared layout shell ─────────────────────────────────────────────────────
   Centered max-width container with responsive page padding. */
function Container({ children, style = {}, narrow = false }) {
  return (
    <div style={{ maxWidth: narrow ? 760 : 1120, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)', width: '100%', boxSizing: 'border-box', ...style }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  Editable, useEditMode, useEditUnlocked, editStore,
  Icon, Button, Badge, Reveal, Container,
  TWEAK_DEFAULTS, getTweaks, useTweakValues,
});
