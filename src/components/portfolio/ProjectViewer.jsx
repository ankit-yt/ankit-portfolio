import Icon from '../Icon';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
export default function ProjectViewer({ item, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    const hidden = () => { if (document.hidden) onClose(); };
    document.addEventListener('visibilitychange', hidden);
    return () => { element.close(); document.body.style.overflow = overflow; document.removeEventListener('visibilitychange', hidden); previous?.focus(); };
  }, [onClose]);
  return createPortal(<dialog ref={dialog} className="media-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-label={item.title}>
    <div className="viewer-toolbar"><span>{item.title}</span><button autoFocus onClick={onClose} aria-label="Close project viewer">Close <Icon name="close" /></button></div>
    {item.type === 'video' ? <div className="video-stage"><iframe src={item.url} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <img className="viewer-image" src={item.url || item.thumbnail} alt={item.title} />}
    <p className="viewer-note">{item.cat} / {item.sub}</p>
  </dialog>, document.body);
}
