import Icon from '../Icon';
import { useInView } from '../Reveal';
export default function PortfolioCard({ item, index, openModal }) {
  const [ref, visible] = useInView(.05);
  const available = Boolean(item.url || item.thumbnail);
  const Tag = available ? 'button' : 'div';
  return <article ref={ref} className={`project-card reveal ${visible ? 'is-visible' : ''} project-${item.type}`} style={{ '--reveal-delay': `${Math.min(index*.04,.2)}s` }}>
    <Tag className="project-trigger" onClick={available ? () => openModal(item) : undefined} aria-label={available ? `Open ${item.title}` : undefined}>
      <div className="project-artwork">
        {item.thumbnail ? <img src={item.thumbnail} srcSet={`${item.thumbnail.replace(".webp", "-640.webp")} 640w, ${item.thumbnail} 1280w`} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 55vw, 800px" loading="lazy" decoding="async" width="800" height="500" alt={item.title} style={{ objectPosition: item.position?.replace('_',' ') || 'center' }} /> : <div className="project-placeholder"><span>PRODUCT<br />LAUNCH</span><p>POSTER DESIGN / PREVIEW UNAVAILABLE</p></div>}
        <div className="project-top"><span>{String(index+1).padStart(2,'0')} / {item.cat}</span>{item.badge && <span>{item.badge}</span>}</div>
        {available && <span className="project-open" aria-hidden="true"><Icon name={item.type === "video" ? "play" : "arrow-up-right"} size={22} /></span>}
        <span className="project-view">{item.type === 'video' ? 'Watch film' : available ? 'View project' : 'Preview unavailable'} <span aria-hidden="true"><Icon name="arrow-up-right" /></span></span>
      </div>
      <div className="project-meta"><h3>{item.title}</h3><span>{item.sub} <span aria-hidden="true"><Icon name="arrow-up-right" /></span></span></div>
    </Tag>
  </article>;
}
