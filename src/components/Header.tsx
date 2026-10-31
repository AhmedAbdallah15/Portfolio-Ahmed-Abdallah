import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Header({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const button = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0, lastActive: string | null = null;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
      setScrolled(scrollY > 30);
      let next = home ? '' : 'work';
      if (home) for (const id of ['work','about','services','contact']) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= innerHeight * .4) next = id;
      }
      if (next !== lastActive) { lastActive = next; setActive(next); }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll); };
  }, [home]);
  useEffect(() => {
    const close = () => setOpen(false);
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); }
    };
    window.addEventListener('hashchange', close); window.addEventListener('keydown', keyboard);
    return () => { window.removeEventListener('hashchange', close); window.removeEventListener('keydown', keyboard); };
  }, [open]);
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' menu-is-open' : ''}`}>
    <div className="header-inner">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="monogram" aria-hidden="true">a<span>.</span></span>
        <span>Ahmed Abdallah<span className="brand-role">Graphic designer</span></span>
      </a>
      <button ref={button} className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
        {['work','about','services'].map(id => <a key={id} href={`#${id}`} data-active={active === id} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>)}
        <a href="#contact" className="nav-contact" data-active={active === 'contact'} aria-current={active === 'contact' ? 'location' : undefined} onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </div>
    <div ref={progress} className="reading-progress" aria-hidden="true" />
  </header>;
}
