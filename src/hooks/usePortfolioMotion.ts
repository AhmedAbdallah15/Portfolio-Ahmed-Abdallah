import { useEffect } from 'react';

/** Content remains visible before JS and when reduced motion is enabled. */
export function usePortfolioMotion(route: string) {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let teardown = () => {};
    const setup = () => {
      teardown();
      if (reduced.matches) return;
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      const enrolled = new Set<HTMLElement>();
      const enroll = () => document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
        if (enrolled.has(element)) return;
        enrolled.add(element);
        if (element.getBoundingClientRect().top > innerHeight - 24) {
          element.classList.add('will-reveal'); observer.observe(element);
        }
      });
      enroll();
      const mutations = new MutationObserver(enroll);
      mutations.observe(document.querySelector('main')!, { childList: true, subtree: true });
      const aura = document.querySelector<HTMLElement>('.cursor-aura');
      let frame = 0, activeTilt: HTMLElement | null = null, activeMagnet: HTMLElement | null = null;
      let tiltBounds: DOMRect | null = null;
      const resetTilt = () => { activeTilt?.style.removeProperty('--rx'); activeTilt?.style.removeProperty('--ry'); activeTilt = null; tiltBounds = null; };
      const resetMagnet = () => { activeMagnet?.style.removeProperty('--mx'); activeMagnet?.style.removeProperty('--my'); activeMagnet = null; };
      const pointer = (event: PointerEvent) => {
        if (!fine.matches || event.pointerType === 'touch') return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (!(event.target instanceof Element)) return;
          if (aura) {
            aura.style.setProperty('--cursor-x', `${event.clientX}px`);
            aura.style.setProperty('--cursor-y', `${event.clientY}px`);
            aura.classList.add('is-active');
            aura.dataset.label = event.target.closest('[data-cursor]')?.getAttribute('data-cursor') ?? '';
            aura.classList.toggle('is-interactive', Boolean(event.target.closest('a,button')));
          }
          const tilt = event.target.closest<HTMLElement>('[data-tilt]');
          if (tilt !== activeTilt) {
            resetTilt();
            if (tilt) tiltBounds = (tilt.closest('.project-card') ?? tilt).getBoundingClientRect();
          }
          if (tilt) {
            activeTilt = tilt;
            const box = tiltBounds!;
            const x = Math.max(0, Math.min(1, (event.clientX-box.left)/box.width));
            const y = Math.max(0, Math.min(1, (event.clientY-box.top)/box.height));
            tilt.style.setProperty('--rx', `${(0.5-y)*5}deg`); tilt.style.setProperty('--ry', `${(x-0.5)*5}deg`);
            tilt.style.setProperty('--shine-x', `${x*100}%`); tilt.style.setProperty('--shine-y', `${y*100}%`);
          }
          const magnet = event.target.closest<HTMLElement>('[data-magnetic]');
          if (magnet !== activeMagnet) resetMagnet();
          if (magnet) {
            activeMagnet = magnet;
            const box = magnet.getBoundingClientRect();
            magnet.style.setProperty('--mx', `${(event.clientX-box.left-box.width/2)*0.1}px`);
            magnet.style.setProperty('--my', `${(event.clientY-box.top-box.height/2)*0.15}px`);
          }
          const hero = event.target.closest<HTMLElement>('.hero');
          if (hero) { const box = hero.getBoundingClientRect(); hero.style.setProperty('--light-x', `${event.clientX-box.left}px`); hero.style.setProperty('--light-y', `${event.clientY-box.top}px`); }
        });
      };
      const leave = () => { cancelAnimationFrame(frame); resetTilt(); resetMagnet(); aura?.classList.remove('is-active'); };
      document.addEventListener('pointermove', pointer, { passive:true });
      document.documentElement.addEventListener('pointerleave', leave);
      window.addEventListener('scroll', leave, { passive: true });
      window.addEventListener('resize', leave);
      teardown = () => {
        observer.disconnect(); mutations.disconnect(); leave(); document.removeEventListener('pointermove', pointer);
        document.documentElement.removeEventListener('pointerleave', leave);
        window.removeEventListener('scroll', leave); window.removeEventListener('resize', leave);
        enrolled.forEach(element => element.classList.remove('will-reveal', 'is-visible'));
      };
    };
    setup(); reduced.addEventListener('change', setup); fine.addEventListener('change', setup);
    return () => { teardown(); reduced.removeEventListener('change', setup); fine.removeEventListener('change', setup); };
  }, [route]);
}
