/* Neil Kaji site — HOME. Name + page links only. No nav bar. */

const traverseLink = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--color-ink-muted)', textDecoration: 'none',
  borderBottom: '1px solid var(--color-surface-border)', paddingBottom: 1,
  transition: 'color 200ms ease, border-color 200ms ease',
};

function App() {
  return (
    <React.Fragment>
      <main>
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 clamp(24px, 5vw, 56px)',
        }}>
          <h1 style={{
            fontSize: 'clamp(5rem, 15vw, 11rem)', fontWeight: 700, lineHeight: 0.92,
            letterSpacing: '-0.04em', color: 'var(--color-ink-primary)',
            margin: 0,
            animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 80ms both',
          }}>
            <Editable id="hero-head" text="Neil Kaji" multiline />
          </h1>
          <p style={{
            fontSize: 14, color: 'var(--color-ink-muted)', marginTop: 28, fontStyle: 'italic',
            letterSpacing: '0.01em',
            animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 180ms both',
          }}>
            <Editable id="hero-desc" text="Creating. Learning. Building." />
          </p>
          <div style={{
            display: 'flex', gap: 32, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center',
            animation: 'nk-rise 1000ms cubic-bezier(0.22,1,0.36,1) 280ms both',
          }}>
            <a href="timeline.html" style={traverseLink}>Timeline</a>
            <a href="blog.html" style={traverseLink}>Blog</a>
            <a href="portfolio.html" style={traverseLink}>Portfolio</a>
            <a href="bio.html" style={traverseLink}>Bio</a>
            <a href="contact.html" style={traverseLink}>Contact</a>
          </div>
        </div>
      </main>
      <EditHint />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
