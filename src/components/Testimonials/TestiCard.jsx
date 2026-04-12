import { Reveal } from "../../App";
import { useState, useRef, useEffect } from "react";

export default function TestiCard({ t, delay }) {
  const [lightbox, setLightbox] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStart = useRef(null);
  const lastOffset = useRef({ x: 0, y: 0 });
  const lastDist = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null); // 👈 NEW

  // Reset zoom/pan when lightbox closes
  useEffect(() => {
    if (!lightbox) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
      lastOffset.current = { x: 0, y: 0 };
    }
  }, [lightbox]);

  // 👇 NEW — attach wheel + pinch as non-passive to avoid preventDefault error
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !lightbox) return;

    const onWheel = (e) => {
      e.preventDefault();
      setScale((prev) => Math.min(5, Math.max(1, prev - e.deltaY * 0.001)));
    };

    const onTouchMoveNative = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastDist.current !== null) {
          const delta = dist - lastDist.current;
          setScale((prev) => Math.min(5, Math.max(1, prev + delta * 0.01)));
        }
        lastDist.current = dist;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMoveNative, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMoveNative);
    };
  }, [lightbox]); // re-attaches when lightbox opens

  // Mouse drag to pan
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX - lastOffset.current.x, y: e.clientY - lastOffset.current.y };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newOffset = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    lastOffset.current = newOffset;
    setOffset(newOffset);
  };

  const handleMouseUp = () => setDragging(false);

  // 👇 UPDATED — single finger drag only, pinch handled natively above
  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && dragging) {
      const newOffset = {
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      };
      lastOffset.current = newOffset;
      setOffset(newOffset);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - lastOffset.current.x,
        y: e.touches[0].clientY - lastOffset.current.y,
      };
    }
    if (e.touches.length === 2) lastDist.current = null;
  };

  const handleTouchEnd = () => {
    setDragging(false);
    lastDist.current = null;
  };

  return (
    <>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl"
          onClick={() => setLightbox(false)}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setScale((p) => Math.max(1, p - 0.5)); }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition"
            >−</button>
            <span
              className="text-xs text-slate-400 font-bold w-10 text-center"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setScale((p) => Math.min(5, p + 0.5)); }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition"
            >+</button>
            <button
              onClick={(e) => { e.stopPropagation(); setScale(1); setOffset({ x: 0, y: 0 }); lastOffset.current = { x: 0, y: 0 }; }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-bold flex items-center justify-center transition"
              style={{ fontFamily: "Syne, sans-serif" }}
            >↺</button>
            <button
              onClick={() => setLightbox(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500/40 text-white font-bold flex items-center justify-center transition"
            >✕</button>
          </div>

          {/* Hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 tracking-widest uppercase pointer-events-none"
            style={{ fontFamily: "Syne, sans-serif" }}>
            Scroll or pinch to zoom · Drag to pan
          </p>

          {/* 👇 UPDATED — ref added, onWheel removed */}
          <div
            ref={containerRef}
            className="overflow-hidden w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
          >
            <img
              ref={imgRef}
              src={t.screenshot}
              alt={`${t.name} testimonial screenshot`}
              draggable={false}
              className="max-w-sm w-full rounded-2xl shadow-2xl select-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.1s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Card — unchanged */}
      <Reveal delay={delay}>
        <div className="group bg-white/3 border border-white/[0.07] rounded-2xl p-7 sm:p-8 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(79,255,232,0.08)] hover:border-teal-400/20 transition-all duration-300 h-full flex flex-col">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: t.stars }).map((_, k) => (
              <span key={k} className="text-amber-400 text-sm">★</span>
            ))}
          </div>

          {t.screenshot && (
            <div
              onClick={() => setLightbox(true)}
              className="relative mb-5 rounded-xl overflow-hidden border border-white/[0.07] cursor-zoom-in group/img"
            >
              <img
                src={t.screenshot}
                alt={`${t.name} testimonial`}
                className="w-full object-cover max-h-48 transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  style={{ fontFamily: "Syne, sans-serif" }}>
                  View
                </span>
              </div>
            </div>
          )}

          <p className="text-slate-400 text-sm leading-relaxed flex-1 italic mb-6">"{t.text}"</p>

          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-linear-to-br ${t.from} ${t.to} flex items-center justify-center text-xs font-extrabold text-white shrink-0`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {t.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}