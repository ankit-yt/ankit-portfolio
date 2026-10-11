import { useEffect, useRef } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';
export default function LiquidCursor() {
  const cursorRef = useRef(null);
  const defsRef = useRef(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const targets = new Map();
    let points = [], frame = 0, previous = null, lastPaint = 0;
    const enabled = () => fine.matches && !reduced.matches && !document.hidden;
    const restore = () => {
      for (const [element, entry] of targets) {
        element.style.filter = entry.original;
        entry.filter.remove();
      }
      targets.clear();
    };
    const clear = () => {
      cancelAnimationFrame(frame); frame = 0; points = []; previous = null;
      restore(); cursor.dataset.visible = 'false';
      document.documentElement.classList.remove('editor-cursor-enabled');
    };
    const resize = () => { clear(); canvas.width = Math.ceil(innerWidth / 2); canvas.height = Math.ceil(innerHeight / 2); };
    const render = now => {
      frame = 0;
      if (!enabled() || document.querySelector('dialog[open]')) { clear(); return; }
      points = points.filter(point => now - point.time < 800);
      if (!points.length) { restore(); previous = null; return; }
      if (now - lastPaint < 32) { frame = requestAnimationFrame(render); return; }
      lastPaint = now;
      const pixels = context.createImageData(canvas.width, canvas.height);
      const data = pixels.data;
      for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = 128; data[i + 2] = 128; data[i + 3] = 255; }
      // Encode a radial displacement field, not a colored or blurred trail.
      for (const point of points) {
        const age = (now - point.time) / 800;
        const radius = 22 + age * 20;
        const cx = point.x / 2, cy = point.y / 2;
        for (let y = Math.max(0, Math.floor(cy - radius)); y < Math.min(canvas.height, cy + radius); y++) {
          for (let x = Math.max(0, Math.floor(cx - radius)); x < Math.min(canvas.width, cx + radius); x++) {
            const dx = x - cx, dy = y - cy, distance = Math.hypot(dx, dy);
            if (distance >= radius || distance < 1) continue;
            const strength = Math.sin(distance / radius * Math.PI * 3 - age * 8) * (1 - distance / radius) ** 2 * (1 - age) ** 2 * 100;
            const index = (y * canvas.width + x) * 4;
            data[index] += dx / distance * strength;
            data[index + 1] += dy / distance * strength;
          }
        }
      }
      context.putImageData(pixels, 0, 0);
      const map = canvas.toDataURL();
      const elements = [...document.querySelectorAll('main > *, .site-header, .portfolio-site > footer')];
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) continue;
        let entry = targets.get(element);
        if (!entry) {
          const filter = document.createElementNS(SVG_NS, 'filter');
          const id = `page-liquid-${targets.size}`;
          filter.id = id;
          filter.setAttribute('color-interpolation-filters', 'sRGB');
          filter.setAttribute('primitiveUnits', 'userSpaceOnUse');
          filter.setAttribute('x', '-5%'); filter.setAttribute('y', '-5%');
          filter.setAttribute('width', '110%'); filter.setAttribute('height', '110%');
          const image = document.createElementNS(SVG_NS, 'feImage');
          image.setAttribute('result', 'path-map'); image.setAttribute('preserveAspectRatio', 'none');
          const displacement = document.createElementNS(SVG_NS, 'feDisplacementMap');
          displacement.setAttribute('in', 'SourceGraphic'); displacement.setAttribute('in2', 'path-map');
          displacement.setAttribute('scale', '30'); displacement.setAttribute('xChannelSelector', 'R'); displacement.setAttribute('yChannelSelector', 'G');
          // Neutral displacement outside the viewport keeps the rest of long sections intact.
          const flood = document.createElementNS(SVG_NS, 'feFlood'); flood.setAttribute('flood-color', 'rgb(128,128,128)'); flood.setAttribute('result', 'neutral');
          const merge = document.createElementNS(SVG_NS, 'feMerge'); merge.setAttribute('result', 'field');
          for (const input of ['neutral', 'path-map']) { const node = document.createElementNS(SVG_NS, 'feMergeNode'); node.setAttribute('in', input); merge.append(node); }
          displacement.setAttribute('in2', 'field');
          filter.append(flood, image, merge, displacement); defsRef.current.append(filter);
          entry = { filter, image, original: element.style.filter }; targets.set(element, entry);
          element.style.filter = `url('#${id}')`;
        }
        entry.image.setAttribute('x', String(-rect.left)); entry.image.setAttribute('y', String(-rect.top));
        entry.image.setAttribute('width', String(innerWidth)); entry.image.setAttribute('height', String(innerHeight));
        entry.image.setAttribute('href', map);
      }
      frame = requestAnimationFrame(render);
    };
    const move = event => {
      if (!enabled() || event.pointerType === 'touch') { clear(); return; }
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursor.dataset.visible = 'true'; document.documentElement.classList.add('editor-cursor-enabled');
      cursor.dataset.interactive = Boolean(event.target.closest('a,button,[role="button"]')).toString();
      const now = performance.now();
      if (previous && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 9) return;
      const point = { x: event.clientX, y: event.clientY, time: now };
      points.push(point); if (points.length > 24) points.shift(); previous = point;
      if (!frame) frame = requestAnimationFrame(render);
    };
    resize();
    document.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize); window.addEventListener('scroll', clear, { passive: true });
    document.documentElement.addEventListener('pointerleave', clear); window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear); fine.addEventListener('change', clear); reduced.addEventListener('change', clear);
    return () => {
      clear(); document.removeEventListener('pointermove', move); window.removeEventListener('resize', resize); window.removeEventListener('scroll', clear);
      document.documentElement.removeEventListener('pointerleave', clear); window.removeEventListener('blur', clear);
      document.removeEventListener('visibilitychange', clear); fine.removeEventListener('change', clear); reduced.removeEventListener('change', clear);
    };
  }, []);
  return <>
    <svg className="liquid-filter-defs" aria-hidden="true" width="0" height="0"><defs ref={defsRef} /></svg>
    <div ref={cursorRef} className="editor-cursor" data-visible="false" aria-hidden="true">
      <svg width="25" height="30" viewBox="0 0 38 46">
        <path className="cursor-neon-halo" d="M5 4 33 29 19 29 11 41Z" />
        <path className="cursor-arrow" d="M5 4 33 29 19 29 11 41Z" />
        <path className="cursor-pink-accent" d="m12.5 27 1.2 6" />
      </svg>
    </div>
  </>;
}
