import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Contact, Footer } from './components/Footer';
import { ProjectView } from './components/ProjectView';
import { projects } from './content';
import { usePortfolioMotion } from './hooks/usePortfolioMotion';

export default function App() {
  // Start with the same home document on server and client; resolve fragments after hydration.
  const [hash, setHash] = useState('');
  usePortfolioMotion(hash);
  const projectRoute = hash.startsWith('#/');
  const match = /^#\/project\/([a-z0-9-]+)$/.exec(hash);
  const project = match ? projects.find(p => p.slug === match[1]) : undefined;
  useEffect(() => {
    const change = () => setHash(window.location.hash);
    change();
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    document.title = project ? `${project.title} — Ahmed Abdallah` : projectRoute ? 'Project not found — Ahmed Abdallah' : 'Ahmed Abdallah — Graphic Designer & Visual Storyteller';
    document.querySelector('meta[name="description"]')?.setAttribute('content', project?.overview ?? 'Conference identities, medical congress visuals and imaginative event campaigns by graphic designer Ahmed Abdallah. Explore selected work from 2026–2027.');
    const frame = requestAnimationFrame(() => {
      if (projectRoute) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.querySelector<HTMLElement>('#case-heading, #main')?.focus({ preventScroll: true });
      } else if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, project, projectRoute]);
  return <><div className="page-atmosphere" aria-hidden="true" /><div className="cursor-aura" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header home={!projectRoute} /><main id="main" tabIndex={-1}>{project ? <ProjectView key={project.slug} project={project} /> : projectRoute ? <section className="container not-found"><p className="eyebrow">A DIFFERENT DIRECTION</p><h1>That project isn’t here.</h1><p>Explore the complete collection of selected work instead.</p><a className="button button-dark" href="#work">Back to selected work</a></section> : <Home />}<Contact /></main><Footer /></>;
}
