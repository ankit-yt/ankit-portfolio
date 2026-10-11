import { useEffect, useRef } from 'react';

export default function LiquidCursor() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const lifetime = 1700;
    let points = [], frame = 0, last = null, lastFrame = 0;
    const enabled = () => fine.matches && !reduced.matches && !document.hidden;
    // Reuse two tiny glow textures instead of blurring the whole viewport.
    const sprites = ['93,125,255', '255,60,158'].map(color => {
      const sprite = document.createElement('canvas'); sprite.width = sprite.height = 128;
      const brush = sprite.getContext('2d');
      const gradient = brush.createRadialGradient(64,64,0,64,64,64);
      gradient.addColorStop(0,`rgba(${color},.32)`);
      gradient.addColorStop(.35,`rgba(${color},.16)`);
      gradient.addColorStop(1,`rgba(${color},0)`);
      brush.fillStyle = gradient; brush.fillRect(0,0,128,128);
      return sprite;
    });
    const clear = () => { cancelAnimationFrame(frame); frame = 0; points = []; last = null; ctx.clearRect(0,0,canvas.width,canvas.height); canvas.dataset.active = 'false'; };
    const resize = () => { clear(); canvas.width = innerWidth; canvas.height = innerHeight; };
    const draw = now => {
      frame = 0;
      if (!enabled()) { clear(); return; }
      if (now-lastFrame < 24) { frame = requestAnimationFrame(draw); return; }
      lastFrame = now;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      points = points.filter(point => now-point.time < lifetime);
      ctx.globalCompositeOperation = 'lighter';
      points.forEach((point,index) => {
        const age = (now-point.time)/lifetime;
        const fade = (1-age)**2;
        const radius = 28+age*50;
        const x = point.x+Math.sin(age*7+point.seed)*age*12;
        const y = point.y+Math.cos(age*6+point.seed)*age*10;
        ctx.globalAlpha = fade;
        ctx.drawImage(sprites[index%7===0?1:0],x-radius,y-radius,radius*2,radius*2);
        // A delicate irregular wave spreads out, then evaporates.
        ctx.beginPath();
        for (let step=0;step<=32;step++) {
          const angle=step/32*Math.PI*2;
          const wave=radius*.58*(1+.09*Math.sin(angle*3+age*8+point.seed));
          const px=x+Math.cos(angle)*wave, py=y+Math.sin(angle)*wave*.8;
          if (step===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.strokeStyle=`rgba(198,133,255,${fade*.16})`; ctx.lineWidth=.8; ctx.stroke();
      });
      ctx.globalAlpha = 1;
      if (points.length) { canvas.dataset.active = 'true'; frame=requestAnimationFrame(draw); }
      else { last=null; canvas.dataset.active='false'; }
    };
    const move = event => {
      if (!enabled() || event.pointerType==='touch') return;
      const now=performance.now();
      if (last && Math.hypot(event.clientX-last.x,event.clientY-last.y)<10 && now-last.time<45) return;
      const point={x:event.clientX,y:event.clientY,time:now,seed:Math.random()*6};
      points.push(point); if(points.length>42) points.shift(); last=point;
      if (!frame) frame=requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('pointermove',move,{passive:true});
    window.addEventListener('resize',resize,{passive:true});
    window.addEventListener('blur',clear); document.documentElement.addEventListener('pointerleave',clear);
    document.addEventListener('visibilitychange',clear);
    fine.addEventListener('change',clear); reduced.addEventListener('change',clear);
    return () => { clear(); window.removeEventListener('pointermove',move); window.removeEventListener('resize',resize); window.removeEventListener('blur',clear); document.documentElement.removeEventListener('pointerleave',clear); document.removeEventListener('visibilitychange',clear); fine.removeEventListener('change',clear); reduced.removeEventListener('change',clear); };
  },[]);
  return <canvas ref={canvasRef} className="liquid-cursor" data-active="false" aria-hidden="true" />;
}
