/* Neil Kaji site — global theme applier.
   Runs on every page (plain script, before React) so layout/type tweaks set on
   the home page's Tweaks panel stay consistent across the multi-page site.
   Reads localStorage 'nk:tweaks' and maps the GLOBAL tweaks to CSS variables on
   <html>. Layout-only tweaks (heroLayout, timelineStyle, blogStyle) are read by
   the React pages directly and are not applied here. */
(function () {
  var DEFAULTS = { density: 'comfortable', fontScale: 100 };

  function read() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('nk:tweaks') || '{}')); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }

  function apply() {
    var t = read();
    var root = document.documentElement;
    // Type scale — clamp to a tasteful range.
    var scale = Math.max(90, Math.min(115, Number(t.fontScale) || 100));
    root.style.fontSize = (16 * scale / 100).toFixed(2) + 'px';
    // Density → section vertical rhythm + card padding.
    var compact = t.density === 'compact';
    root.style.setProperty('--nk-section-pad', compact ? '64px' : '96px');
    root.style.setProperty('--nk-section-pad-sm', compact ? '48px' : '64px');
    root.style.setProperty('--nk-card-pad', compact ? '20px' : '24px');
    root.setAttribute('data-density', t.density || 'comfortable');
  }

  apply();
  window.addEventListener('tweakchange', apply);
  window.addEventListener('storage', function (e) { if (!e.key || e.key === 'nk:tweaks') apply(); });
  window.__nkApplyTheme = apply;
})();
