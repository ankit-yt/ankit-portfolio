import { useEffect } from 'react';
export default function Motion() {
  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, target, eventX = 0, eventY = 0;
    const paint = () => {
      frame = 0;
      if (!target?.isConnected) return;
      const rect = target.getBoundingClientRect();
      const x = (eventX-rect.left)/rect.width-.5, y = (eventY-rect.top)/rect.height-.5;
      target.style.setProperty('--glow-x', `${eventX-rect.left}px`);
      target.style.setProperty('--glow-y', `${eventY-rect.top}px`);
      if (target.classList.contains('magnetic')) { target.style.setProperty('--mx', `${x*10}px`); target.style.setProperty('--my', `${y*8}px`); }
      else { target.style.setProperty('--rx', `${-y*3}deg`); target.style.setProperty('--ry', `${x*3}deg`); }
    };
    const reset = () => { if (target) { for (const property of ['--mx','--my','--rx','--ry','--glow-x','--glow-y']) target.style.removeProperty(property); } target = null; cancelAnimationFrame(frame); frame = 0; };
    const move = event => {
      if (!fine.matches || reduced.matches) return;
      const next = event.target.closest('.magnetic, .project-card');
      if (next !== target) reset();
      target = next;
      if (!target) return;
      eventX = event.clientX; eventY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener('pointermove',move,{ passive:true });
    document.addEventListener('pointerleave',reset); window.addEventListener('blur',reset);
    reduced.addEventListener('change',reset); fine.addEventListener('change',reset);
    return () => { reset(); document.removeEventListener('pointermove',move); document.removeEventListener('pointerleave',reset); window.removeEventListener('blur',reset); reduced.removeEventListener('change',reset); fine.removeEventListener('change',reset); };
  }, []);
  return null;
}
