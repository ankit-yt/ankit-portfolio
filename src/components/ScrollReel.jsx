import { useEffect, useRef } from 'react';
import Icon from './Icon';

const chapters = [
  { word: 'CUT.', label: '01 / FIND THE RHYTHM', text: 'Sharp cuts. Strong pacing. Every second earns its place.' },
  { word: 'COLOUR.', label: '02 / SET THE MOOD', text: 'A visual language that gives every story its own atmosphere.' },
  { word: 'FEEL.', label: '03 / MAKE IT STAY', text: 'Turn a passing moment into something worth remembering.' },
];
// Swap this local artwork montage for a direct showreel MP4/WebM when available.
export default function ScrollReel({ source = '/motion/portfolio-reel.mp4' }) {
  const root = useRef(null), video = useRef(null), range = useRef(null), clock = useRef(null);
  useEffect(() => {
    const element = root.current, media = video.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, active = false, loaded = false, progress = 0;
    const seek = () => {
      if (!active || document.hidden || motion.matches || !Number.isFinite(media.duration) || media.seeking) return;
      const target = progress*Math.max(0,media.duration-.05);
      if (Math.abs(media.currentTime-target) > .07) media.currentTime = target;
    };
    const paint = () => {
      frame = 0;
      if (document.hidden) return;
      const rect = element.getBoundingClientRect();
      const travel = Math.max(1,element.offsetHeight-innerHeight+76);
      progress = motion.matches ? 0 : Math.max(0,Math.min(1,(76-rect.top)/travel));
      element.style.setProperty('--reel-progress',progress);
      element.dataset.chapter = String(Math.min(2,Math.floor(progress*3)));
      range.current.value = Math.round(progress*1000);
      const seconds = progress*(Number.isFinite(media.duration) ? media.duration : 9);
      clock.current.textContent = `00:00:${String(Math.floor(seconds)).padStart(2,'0')}:${String(Math.floor(seconds%1*24)).padStart(2,'0')}`;
      element.querySelectorAll('.reel-chapter').forEach((chapter,index) => {
        const distance = progress*3-index;
        const opacity = Math.max(0,1-Math.abs(distance-.45)*1.8);
        chapter.style.opacity = motion.matches ? (index === 0 ? 1 : 0) : opacity;
        chapter.style.transform = motion.matches ? 'none' : `translate3d(0,${-distance*65}px,0)`;
        chapter.setAttribute('aria-hidden', String(index !== Math.min(2,Math.floor(progress*3))));
      });
      seek();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const settings = () => { element.dataset.reduced = String(motion.matches); if (motion.matches) media.pause(); else if (active && !loaded) { loaded = true; media.src = source; media.load(); } schedule(); };
    const onScroll = () => { if (active) schedule(); };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active && !loaded && !motion.matches) { loaded = true; media.src = source; media.load(); }
      if (active) schedule(); else media.pause();
    },{rootMargin:'250px'});
    observer.observe(element);
    const resize = new ResizeObserver(schedule); resize.observe(element);
    const visibility = () => { if (document.hidden) { media.pause(); cancelAnimationFrame(frame); frame = 0; } else if (active) schedule(); };
    window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',schedule,{passive:true});
    document.addEventListener('visibilitychange',visibility);
    media.addEventListener('loadedmetadata',schedule); media.addEventListener('seeked',seek);
    motion.addEventListener('change',settings);
    settings();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',schedule); document.removeEventListener('visibilitychange',visibility); media.removeEventListener('loadedmetadata',schedule); media.removeEventListener('seeked',seek); motion.removeEventListener('change',settings); media.pause(); media.removeAttribute('src'); media.load(); };
  },[source]);
  const scrub = event => {
    const element = root.current;
    const start = element.getBoundingClientRect().top+scrollY-76;
    const travel = Math.max(1,element.offsetHeight-innerHeight+76);
    window.scrollTo({top:start+Number(event.target.value)/1000*travel,behavior:'instant'});
  };
  return <section ref={root} id="scroll-reel" className="scroll-reel" aria-label="Scroll-controlled creative reel">
    <div className="reel-sticky">
      <div className="reel-header"><span className="eyebrow"><Icon name="film" size={16} /> THE EDIT / SCROLL TO SCRUB</span><span className="reel-live"><i /> CREATIVE SEQUENCE</span></div>
      <div className="reel-space">
        <span className="reel-ghost" aria-hidden="true">IN MOTION</span>
        <img className="reel-satellite reel-satellite-left" src="/optimized/trading3-640.webp" alt="" loading="lazy" width="640" height="400" />
        <img className="reel-satellite reel-satellite-right" src="/optimized/averixis-640.webp" alt="" loading="lazy" width="640" height="400" />
        <div className="reel-screen"><div className="reel-screen-bar"><span><i /><i /><i /></span><span>ANKIT / CREATIVE TIMELINE</span><Icon name="layers" size={14} /></div><video ref={video} muted playsInline preload="none" poster="/optimized/gymstart1.webp" aria-label="Scroll-scrubbed montage of selected project artwork" /><div className="reel-screen-bottom"><span>PROJECT VISUALS / MOTION STUDY</span><span ref={clock}>00:00:00:00</span></div></div>
        <div className="reel-copy">{chapters.map((chapter,index) => <div key={chapter.word} className="reel-chapter" aria-hidden={index !== 0}><p className="eyebrow">{chapter.label}</p><h2>{chapter.word}</h2><p>{chapter.text}</p></div>)}</div>
      </div>
      <div className="reel-timeline"><div className="timeline-label"><Icon name="cut" size={16} /><span>YOUR SCROLL. THE PLAYHEAD.</span><a href="#portfolio">View full projects <Icon name="arrow-up-right" size={16} /></a></div><div className="timeline-tracks" aria-hidden="true"><div className="timeline-ruler"/><div className="timeline-clips"><span>FITNESS / EDIT 01</span><span>JOIN THE TEAM / EDIT 04</span><span>BULL RUN / EDIT 03</span></div><div className="timeline-audio"/><i className="timeline-playhead"/></div><input ref={range} type="range" min="0" max="1000" defaultValue="0" onInput={scrub} aria-label="Scrub creative sequence" /><p className="reel-caption">A motion study using selected project artwork. Full videos live in the portfolio below.</p></div>
    </div>
  </section>;
}
