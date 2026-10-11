import { NAV_LINKS } from '../navigation';
import VisitCounter from './VisitCounter';
export default function Footer() {
  return <footer className="site-footer"><a className="wordmark" href="#hero" aria-label="Back to top">AJ<span>.</span></a><nav aria-label="Footer navigation">{NAV_LINKS.map(link => <a href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}</nav><p>© {new Date().getFullYear()} Ankit</p><VisitCounter /><span>EDITED WITH INTENTION.</span></footer>;
}
