/* Neil Kaji site — corner music player.
   A small warm pill in the bottom-left with a play/pause control, the track
   name, and a subtle Web-Audio frequency visualizer. Self-mounts on every page.
   Playback position + state persist in localStorage so a refresh keeps the place.

   Browser policy blocks autoplay-with-sound until the visitor interacts, so we
   attempt to start immediately and otherwise begin on the first pointer/keypress
   anywhere on the page. */

const NKPlayer = (function () {
  const { useState, useEffect, useRef } = React;

  const SRC = 'audio/Raindance.mp3';
  const TITLE = 'Raindance';
  const TIME_KEY = 'nk:player:time';
  const PLAY_KEY = 'nk:player:playing';
  const PRIMARY = '#3A3D52';
  const BARS = 5;

  // Distinguish a real browser refresh (reset the track) from in-site link
  // navigation (carry the track over). Both are full document loads, so we
  // lean on the Navigation Timing API: a reload reports type "reload", while
  // clicking a nav link reports "navigate". On reload we wipe the saved state.
  const navType = (() => {
    try {
      const e = performance.getEntriesByType('navigation')[0];
      if (e && e.type) return e.type;
      // legacy fallback
      const legacy = performance.navigation && performance.navigation.type;
      return legacy === 1 ? 'reload' : 'navigate';
    } catch (e) { return 'navigate'; }
  })();
  if (navType === 'reload') {
    try { sessionStorage.removeItem(TIME_KEY); sessionStorage.removeItem(PLAY_KEY); } catch (e) {}
  }

  function MusicPlayer() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const levelsRef = useRef(new Array(BARS).fill(0.12));
    const [playing, setPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── playback (fully trigger-based) ───────────────────────────────────────
    const play = async () => {
      try { await audioRef.current.play(); } catch (e) {}
    };
    const pause = () => { try { audioRef.current.pause(); } catch (e) {} };
    const toggle = () => { playing ? pause() : play(); };

    // ── carry track across in-site navigation; reset on full refresh ─────────
    useEffect(() => {
      const a = audioRef.current;

      // Restore position + resume (only after link navigation, not on refresh —
      // reload already cleared the keys above).
      let resume = false;
      try {
        const t = parseFloat(sessionStorage.getItem(TIME_KEY));
        if (!isNaN(t)) a.currentTime = t;
        resume = sessionStorage.getItem(PLAY_KEY) === '1';
      } catch (e) {}
      if (resume) {
        // The link click that loaded this page counts as a user gesture, so
        // playback is generally allowed; if a browser still blocks it, the
        // track just stays paused at the restored position.
        a.play().catch(() => {});
      }

      // Indicator is driven straight off the media element so it always
      // reflects reality (covers ended, stalls, external pauses, etc).
      const sync = () => setPlaying(!a.paused && !a.ended);
      const onTime = () => {
        try { sessionStorage.setItem(TIME_KEY, String(a.currentTime)); } catch (e) {}
      };
      const onPlayState = () => {
        sync();
        try { sessionStorage.setItem(PLAY_KEY, (!a.paused && !a.ended) ? '1' : '0'); } catch (e) {}
      };
      a.addEventListener('play', onPlayState);
      a.addEventListener('playing', onPlayState);
      a.addEventListener('pause', onPlayState);
      a.addEventListener('ended', onPlayState);
      a.addEventListener('timeupdate', onTime);
      sync();

      requestAnimationFrame(() => setMounted(true));

      return () => {
        a.removeEventListener('play', onPlayState);
        a.removeEventListener('playing', onPlayState);
        a.removeEventListener('pause', onPlayState);
        a.removeEventListener('ended', onPlayState);
        a.removeEventListener('timeupdate', onTime);
      };
    }, []);

    // ── visualizer loop (synthetic — looks lively, not analytical) ───────────
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = 46, cssH = 18;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      const g = canvas.getContext('2d');
      g.scale(dpr, dpr);

      const barW = 3;
      const gap = (cssW - BARS * barW) / (BARS - 1);
      // per-bar speed + phase so the bars feel uncorrelated and organic
      const speed = [3.1, 4.7, 2.3, 5.3, 3.9];
      const phase = [0.0, 1.7, 3.4, 0.9, 2.5];
      const start = performance.now();

      const render = () => {
        rafRef.current = requestAnimationFrame(render);
        const levels = levelsRef.current;
        const t = (performance.now() - start) / 1000;

        for (let i = 0; i < BARS; i++) {
          let target;
          if (playing && !reduceMotion) {
            // two summed sines → smooth, non-repetitive bounce in ~[0.18, 0.95]
            const a = Math.sin(t * speed[i] + phase[i]);
            const b = Math.sin(t * speed[i] * 0.5 + phase[i] * 1.3);
            target = 0.55 + 0.4 * (0.7 * a + 0.3 * b);
          } else {
            target = 0.14 + (reduceMotion ? 0 : 0.03 * Math.sin(i));
          }
          levels[i] += (target - levels[i]) * (playing ? 0.4 : 0.12);
        }

        g.clearRect(0, 0, cssW, cssH);
        g.fillStyle = PRIMARY;
        for (let i = 0; i < BARS; i++) {
          const h = Math.max(2, Math.min(1, levels[i]) * cssH);
          const x = i * (barW + gap);
          const y = (cssH - h) / 2;
          g.globalAlpha = playing ? 0.9 : 0.4;
          roundRect(g, x, y, barW, h, 1.5);
          g.fill();
        }
      };
      render();
      return () => cancelAnimationFrame(rafRef.current);
    }, [playing, reduceMotion]);

    return (
      <div
        style={{
          position: 'fixed', left: 16, bottom: 16, zIndex: 55,
          display: 'flex', alignItems: 'center', gap: 11,
          padding: '6px 15px 6px 6px',
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-surface-border)',
          borderRadius: 9999,
          boxShadow: '0 2px 8px rgba(26,22,18,0.08)',
          fontFamily: 'var(--font-base)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 160ms ease-out',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,22,18,0.14)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,22,18,0.08)'; }}
      >
        <audio ref={audioRef} src={SRC} preload="auto" loop></audio>

        <button
          onClick={toggle}
          aria-label={playing ? 'Pause Raindance' : 'Play Raindance'}
          style={{
            width: 34, height: 34, flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            border: 0, borderRadius: '50%', cursor: 'pointer', padding: 0,
            background: playing ? 'var(--color-primary-500)' : 'var(--color-surface-2)',
            color: playing ? 'var(--color-ink-inverse)' : 'var(--color-primary-600)',
            transition: 'background 160ms ease-out, color 160ms ease-out',
          }}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, minWidth: 0 }}>
          <span style={{
            fontSize: 9.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-ink-muted)',
          }}>{playing ? 'Now playing' : 'Paused'}</span>
          <span style={{
            fontSize: 13.5, fontWeight: 600, color: 'var(--color-ink-primary)',
            letterSpacing: '-0.01em', marginTop: 2, whiteSpace: 'nowrap',
          }}>{TITLE}</span>
        </div>

        <canvas
          ref={canvasRef}
          style={{ width: 46, height: 18, marginLeft: 2 }}
          aria-hidden="true"
        ></canvas>
      </div>
    );
  }

  function PlayGlyph() {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z"></path>
      </svg>
    );
  }
  function PauseGlyph() {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6.5" y="5" width="4" height="14" rx="1.2"></rect>
        <rect x="13.5" y="5" width="4" height="14" rx="1.2"></rect>
      </svg>
    );
  }

  function roundRect(g, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    g.beginPath();
    g.moveTo(x + rr, y);
    g.arcTo(x + w, y, x + w, y + h, rr);
    g.arcTo(x + w, y + h, x, y + h, rr);
    g.arcTo(x, y + h, x, y, rr);
    g.arcTo(x, y, x + w, y, rr);
    g.closePath();
  }

  return MusicPlayer;
})();

// Self-mount into its own root so every page gets the player with one script tag.
(function mountPlayer() {
  if (document.getElementById('nk-player-root')) return;
  const el = document.createElement('div');
  el.id = 'nk-player-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(React.createElement(NKPlayer));
})();
