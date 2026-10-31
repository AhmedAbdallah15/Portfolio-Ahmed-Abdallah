import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { GalleryItem } from '../content';
import { Artwork } from './Artwork';

export function Lightbox({ items, start, title, onClose }: { items: GalleryItem[]; start: number; title: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const item = items[index];
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    document.body.classList.add('body-modal-open');
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const controls = [...element.querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(i => Math.min(i + 1, items.length - 1)); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
    };
    element.addEventListener('keydown', keyboard);
    return () => {
      element.removeEventListener('keydown', keyboard);
      element.close();
      document.body.classList.remove('body-modal-open');
    };
  }, [items]);
  return <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-caption" onClose={onClose} onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}>
    <div className="lightbox-inner">
      <div className="lightbox-header"><h2 id="lightbox-title">{title} / Artwork</h2><button className="icon-button" aria-label="Close artwork viewer" autoFocus onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button></div>
      <div className="lightbox-stage"><Artwork key={item.id} id={item.id} alt={`${title} — ${item.caption}`} priority sizes="(min-width: 1100px) 950px, 95vw" /></div>
      <div className="lightbox-controls"><button className="icon-button" aria-label="Previous artwork" disabled={index === 0} onClick={() => setIndex(i => i - 1)}><ArrowLeft size={18} aria-hidden="true" /></button><p id="lightbox-caption" aria-live="polite">{item.caption}<span className="lightbox-count">{index + 1} / {items.length}</span></p><button className="icon-button" aria-label="Next artwork" disabled={index === items.length - 1} onClick={() => setIndex(i => i + 1)}><ArrowRight size={18} aria-hidden="true" /></button></div>
    </div>
  </dialog>;
}
