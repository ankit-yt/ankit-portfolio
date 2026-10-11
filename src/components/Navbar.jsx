import { useEffect, useRef, useState } from 'react';

const links = ['About', 'Skills', 'Services', 'Portfolio', 'Testimonials', 'Contact'];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    const query = matchMedia('(min-width: 1024px)');
    const resize = () => { if (query.matches) setOpen(false); };
    query.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', close); query.removeEventListener('change', resize); };
  }, [open]);
  return <header className="site-header">
    <nav aria-label="Main navigation" className="site-nav">
      <a href="#hero" className="wordmark" onClick={() => setOpen(false)}>AJ<span>.</span></a>
      <div className="desktop-nav">{links.map(link => <a href={`#${link.toLowerCase()}`} key={link}>{link === 'Testimonials' ? 'Feedback' : link}</a>)}<a className="nav-cta" href="#contact">Let’s talk ↗</a></div>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
    </nav>
    {open && <div id="mobile-menu" className="mobile-nav">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => { setOpen(false); toggle.current?.focus(); }}>{link}<span aria-hidden="true">↗</span></a>)}</div>}
  </header>;
}
