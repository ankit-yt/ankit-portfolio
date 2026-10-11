import Icon from './Icon';
import { Reveal } from './Reveal';
const instagram = 'https://www.instagram.com/ankitjangid._?igsh=d280ajV2N3hmZ3B1';
export default function Contact() {
  return <section id="contact" className="section-shell contact-section">
    <Reveal><div className="contact-top"><p className="eyebrow">LET’S MAKE SOMETHING GREAT</p><span className="availability"><i /> Available for freelance work</span></div><h2>Have a story?<br /><span className="chrome-type">Let’s give it life.</span></h2></Reveal>
    <div className="contact-bottom"><Reveal><p>Have a project in mind? Drop me a message and let’s create something amazing.</p><p>Available for freelance projects, long-term collaborations, and creative partnerships.</p><a className="button-primary magnetic" href={instagram} target="_blank" rel="noopener noreferrer">Send a message <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a><a className="contact-link" href="https://www.linkedin.com/in/ankitdevitor/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon name="arrow-up-right" /></a></Reveal><Reveal className="qr-panel"><img src="/qr.png" width="180" height="180" alt="Scan to connect with Ankit" loading="lazy" /><p>Scan to connect</p><span>ANKIT / VIDEO EDITOR & DESIGNER</span></Reveal></div>
  </section>;
}
