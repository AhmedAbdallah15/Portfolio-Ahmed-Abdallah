import { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy, Expand } from 'lucide-react';
import { projects, type Project } from '../content';
import { Artwork } from './Artwork';
import { Lightbox } from './Lightbox';

export function ProjectView({ project }: { project: Project }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState('Copy project link');
  const shareRef = useRef<HTMLInputElement>(null);
  const closeViewer = useCallback(() => setSelected(null), []);
  const next = projects[(projects.findIndex(p => p.slug === project.slug) + 1) % projects.length];
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Project link copied');
    } catch {
      // Select the actual URL for manual copy when clipboard permissions are unavailable.
      if (shareRef.current) {
        shareRef.current.hidden = false;
        shareRef.current.value = window.location.href;
        shareRef.current.focus();
        shareRef.current.select();
      }
      setCopyStatus('Select and copy the link below');
    }
  }
  return <>
    <section className="container case-header" aria-labelledby="case-heading"><a href="#work" className="back-link"><ArrowLeft size={16} aria-hidden="true" />All selected work</a><div className="case-title-row"><div><p className="eyebrow">{project.category.toUpperCase()} / {project.year}</p><h1 id="case-heading" tabIndex={-1}>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p></div><span className="case-year">SELECTED WORKS / {project.year}</span></div></section>
    <div className="container"><div className="case-cover" ><Artwork id={project.cover} alt={`${project.title} — full conference key visual`} priority sizes="(min-width: 1000px) 600px, 85vw" /></div></div>
    <section className="case-info container" data-reveal aria-labelledby="overview-heading"><div><h2 id="overview-heading">The idea behind the identity.</h2><p>{project.overview}</p><p>{project.approach}</p>{project.event && <p className="event-details">Event details from the artwork:<br />{project.event}</p>}</div><div className="deliverables"><h3>PROJECT OUTPUTS</h3><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="gallery-section container" aria-labelledby="gallery-heading"><div className="section-top"><div><p className="eyebrow">FROM THE COLLECTION</p><h2 id="gallery-heading">The visual world.</h2></div><p className="gallery-hint">{project.gallery.length} original {project.gallery.length === 1 ? 'artwork' : 'artworks'}<br />Select an image to take a closer look.</p></div><div className={`gallery-grid${project.gallery.length === 1 ? ' single' : ''}`}>{project.gallery.map((item,index) => <figure data-reveal key={item.id}><button className="gallery-image" aria-label={`View artwork ${index + 1}: ${item.caption}`} onClick={() => setSelected(index)}><Artwork id={item.id} alt={`${project.title} — ${item.caption}`} sizes={project.gallery.length === 1 ? '(min-width: 1000px) 700px, 85vw' : '(min-width: 1000px) 520px, (min-width: 700px) 43vw, 82vw'} /><span className="gallery-zoom"><Expand size={15} aria-hidden="true" /></span></button><figcaption>{String(index + 1).padStart(2,'0')} / {item.caption}</figcaption></figure>)}</div></section>
    <div className="container case-end"><a href="#work" className="text-link"><ArrowLeft size={15} aria-hidden="true" />Back to selected work</a><div><button className="text-link share-button" onClick={share}>{copyStatus === 'Project link copied' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}<span>{copyStatus}</span></button><span className="sr-only" role="status">{copyStatus === 'Copy project link' ? '' : copyStatus}</span><input ref={shareRef} type="text" readOnly hidden aria-label="Project URL to copy" className="share-url" /></div></div>
    <section className="container next-project" aria-label="Next project"><a href={`#/project/${next.slug}`}><div><span className="eyebrow">EXPLORE THE NEXT STORY</span><h2>{next.title}</h2></div><ArrowUpRight aria-hidden="true" /></a></section>
    {selected !== null && <Lightbox title={project.title} items={project.gallery} start={selected} onClose={closeViewer} />}
  </>;
}
