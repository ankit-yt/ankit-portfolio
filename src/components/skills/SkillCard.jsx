import Icon from '../Icon';
export default function SkillCard({ skill, visible, delay }) {
  return <div className={`expertise-item reveal ${visible ? 'is-visible' : ''}`} style={{ '--reveal-delay': `${Math.min(delay,.2)}s` }}>
    <div><Icon name={skill.icon} size={22} /><h3>{skill.name}</h3><p>{skill.sub}</p></div><span className="expertise-level">{skill.level}<small>%</small></span>
    <div className="expertise-bar" aria-hidden="true"><span style={{ width: `${skill.level}%` }} /></div>
  </div>;
}
