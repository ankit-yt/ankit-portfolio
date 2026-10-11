import { useEffect, useRef } from 'react';
export default function ChromeScene() {
  const root = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    let disposed = false, started = false, renderer, idle;
    const element = root.current;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = async () => {
        if (disposed) return;
        try {
          const { createChromeRenderer } = await import('./chromeRenderer');
          if (disposed) return;
          renderer = createChromeRenderer(canvas.current, element);
        } catch { element.dataset.render = 'fallback'; }
      };
      if ('requestIdleCallback' in window) idle = requestIdleCallback(start, { timeout: 1200 });
      else idle = setTimeout(start, 100);
    }, { rootMargin: '120px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); if ('cancelIdleCallback' in window) cancelIdleCallback(idle); else clearTimeout(idle); renderer?.dispose(); };
  }, []);
  return <div ref={root} className="chrome-scene" data-render="fallback" role="img" aria-label="Sculptural liquid silver form, lit like a cinematic studio object">
    <div className="object-orbit" aria-hidden="true" />
    <svg className="chrome-fallback" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7f8ff"/><stop offset=".2" stopColor="#4fe4ca"/><stop offset=".36" stopColor="#10141c"/><stop offset=".49" stopColor="#eff4ff"/><stop offset=".56" stopColor="#188c80"/><stop offset=".7" stopColor="#10121b"/><stop offset=".85" stopColor="#b6ffeb"/><stop offset="1" stopColor="#384359"/></linearGradient>
        <radialGradient id="metal-shine" cx=".3" cy=".15" r=".8"><stop stopColor="#fff" stopOpacity=".7"/><stop offset=".5" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#ff754c" stopOpacity=".2"/></radialGradient>
      </defs>
      <path d="M301 77C377 41 421 120 431 169C445 223 521 234 498 309C480 367 413 359 394 424C376 495 299 532 244 480C202 440 119 452 101 384C85 324 139 290 125 229C110 163 163 111 220 126C260 139 259 97 301 77Z" fill="url(#metal)"/>
      <path d="M301 77C377 41 421 120 431 169C445 223 521 234 498 309C480 367 413 359 394 424C376 495 299 532 244 480C202 440 119 452 101 384C85 324 139 290 125 229C110 163 163 111 220 126C260 139 259 97 301 77Z" fill="url(#metal-shine)"/>
    </svg>
    <canvas ref={canvas} aria-hidden="true" />
    <div className="object-caption" aria-hidden="true"><span>01 / LIQUID STUDY</span><span>CHROME, IN MOTION</span></div>
  </div>;
}
