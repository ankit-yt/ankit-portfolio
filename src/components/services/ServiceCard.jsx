import { Reveal } from '../Reveal';
export default function ServiceCard({ sv, delay, index }) {
  return <Reveal delay={delay} className="service-item"><span className="service-number">0{index+1}</span><div><h3>{sv.title}</h3><p>{sv.desc}</p><ul>{sv.items.map(item => <li key={item}>{item}</li>)}</ul></div><span className="service-arrow" aria-hidden="true">↗</span></Reveal>;
}
