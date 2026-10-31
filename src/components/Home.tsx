import { useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk } from 'lucide-react';
import { categories, profile, projects, type Category } from '../content';
import { Artwork } from './Artwork';
import { Capabilities } from './Capabilities';

export function Home() {
  const [category, setCategory] = useState<Category>('All work');
  const visible = projects.filter(p => category === 'All work' || p.category === category);
  return <>
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-topline"><span className="eyebrow"><span className="tiny-dot" /> INDEPENDENT CREATIVE PERSPECTIVE</span><span className="collection-date">PORTFOLIO — 2026 / 27</span></div>
      <div className="hero-grid">
        <div className="hero-copy"><p className="hero-role">GRAPHIC DESIGNER & VISUAL STORYTELLER</p><h1 id="hero-heading"><span className="headline-line"><span>Ideas made</span></span><span className="headline-line"><em>unforgettable.</em></span></h1><p className="hero-description">A distinct visual world for every event.<br />Conference identities, medical congress visuals,<br className="desktop-break" /> and stories that bring people together.</p><div className="hero-actions"><a className="button button-dark" data-magnetic href="#work">Explore my work <ArrowDownRight size={19} aria-hidden="true" /></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="hero-note"><span className="small-rule" /> IDEAS. IMAGES. IMPACT.</div><a className="scroll-cue" href="#work"><span className="scroll-cue-line" aria-hidden="true" /><span>SCROLL TO EXPLORE</span><ArrowDown size={14} aria-hidden="true" /></a></div>
        <a className="hero-art" data-tilt data-cursor="Explore" href="#/project/efncc">
          <span className="sr-only">Explore the EFNCC conference identity case study.</span>
          <div className="hero-art-background" /><div className="orbital-ring" aria-hidden="true" /><span className="stage-coordinate" aria-hidden="true">VISUAL EXPLORATION / 01</span><span className="floating-spark spark-one" aria-hidden="true">+</span><span className="floating-spark spark-two" aria-hidden="true">+</span>
          <div className="poster poster-back"><Artwork id="p02-01" alt="Pediascape golden-hour Cairo conference artwork" priority sizes="220px" /></div>
          <div className="poster poster-front"><Artwork id="p01-02" alt="EFNCC — a storybook forest and a girl in green" priority sizes="(min-width: 1000px) 320px, 55vw" /></div>
          <span className="art-stamp"><Asterisk size={36} strokeWidth={1.3} aria-hidden="true" /><span>BUILT AROUND<br />A BIG IDEA.</span></span>
          <span className="art-caption"><span>01 / A WORLD OF ITS OWN</span><ArrowUpRight size={18} aria-hidden="true" /></span>
        </a>
      </div>
    </section>
    <div className="discipline-strip"><div className="container"><span>CONFERENCE IDENTITIES</span><Asterisk size={18} aria-hidden="true" /><span>PRINT & DIGITAL</span><Asterisk size={18} aria-hidden="true" /><span>VISUAL STORYTELLING</span><Asterisk size={18} aria-hidden="true" /><span>MEDICAL EVENT DESIGN</span></div></div>
    <section id="work" className="container work-section section-space" aria-labelledby="work-heading">
      <div className="section-top" data-reveal><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-heading">Different events.<br /><em>Distinctive worlds.</em></h2></div><p className="section-intro">From the first impression to the last detail.<br />A collection of conference identities<br />and the stories behind them.</p></div>
      <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter selected work">{categories.map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)}>{c}{category === c && <span aria-hidden="true">{visible.length.toString().padStart(2,'0')}</span>}</button>)}</div><span className="work-year">2026 — 2027</span></div>
      <p className="sr-only" role="status">{visible.length} projects shown{category === 'All work' ? '' : ` in ${category}`}</p>
      <div className="project-grid">{visible.map((project) => <article className="project-card" data-reveal key={project.slug}>
        <a href={`#/project/${project.slug}`} className="project-card-link" data-tilt data-cursor="View">
          <div className="project-canvas" ><Artwork id={project.cover} alt={`${project.title} — ${project.subtitle}`} sizes="(min-width: 1440px) 330px, (min-width: 1000px) 25vw, (min-width: 700px) 24vw, 45vw" /><span className="project-type">{project.gallery.length > 1 ? 'IDENTITY & CAMPAIGN' : 'KEY VISUAL'}</span><span className="project-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span></div>
          <div className="project-title-line"><h3>{project.title}</h3><span>{project.year}</span></div><p className="project-subtitle">{project.subtitle}</p>
        </a>
      </article>)}</div>
      <div className="collection-footnote"><span className="tiny-dot" /><p>A curated collection of {projects.length + 1} key visuals across {projects.length} project stories.<br className="mobile-break" /> Original artwork, from concept to application.</p><ArrowDown size={18} aria-hidden="true" /></div>
    </section>
    <section id="about" className="about-section section-space" aria-labelledby="about-heading"><div className="container about-grid"><div className="about-art" data-reveal><div className="about-art-frame"><Artwork id="p04-07" alt="MAPC Aswan artwork drawing on Egyptian architecture and Nubian motifs" sizes="(min-width: 800px) 380px, 70vw" /></div><span className="about-art-label">LOCAL CULTURE. A NEW PERSPECTIVE.</span><span className="about-flower" aria-hidden="true"><Asterisk /></span></div><div className="about-copy" data-reveal><p className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</p><h2 id="about-heading">Ahmed Abdallah.<br /><em>A storyteller by design.</em></h2><p className="about-lead">Every event has a story.<br />I help it find its visual voice.</p><p>{profile.introduction}</p><p>This collection brings together work from 2026 and 2027, exploring nature, journeys, emotion, and culture. Different themes. One focus: making each event feel like its own world.</p><div className="about-signoff"><span className="signature">Ahmed Abdallah</span><span>IDEA → IMAGE → IMPACT</span></div></div></div></section>
    <section id="services" className="container services-section section-space" aria-labelledby="services-heading"><div className="section-top" data-reveal><div><p className="eyebrow">03 / CREATIVE PRACTICE</p><h2 id="services-heading">Big-picture thinking.<br /><em>Thoughtful details.</em></h2></div><p className="section-intro">One visual language.<br />Every touchpoint considered.</p></div><Capabilities /><div className="practice-note"><Asterisk size={24} aria-hidden="true" /><p>Built around the theme.<br /><strong>Never the same story twice.</strong></p></div></section>
    <section className="container language-section section-space" aria-labelledby="language-heading"><div className="section-top" data-reveal><div><p className="eyebrow">04 / A VISUAL LANGUAGE</p><h2 id="language-heading">One perspective.<br /><em>Endless possibilities.</em></h2></div><p className="section-intro">The theme sets the direction.<br />The story makes it distinctive.</p></div><div className="language-sequence">{[{theme:'Nature',project:'EFNCC',slug:'efncc',description:'Botanical worlds. A sense of wonder.'},{theme:'Journey',project:'Pedia Forum',slug:'pedia-forum',description:'Curiosity, movement, and discovery.'},{theme:'Emotion',project:'Heart Is Life',slug:'heart-is-life',description:'A medical message. A human connection.'},{theme:'Culture',project:'MAPC Aswan',slug:'mapc-aswan',description:'Local identity becomes visual narrative.'}].map((item,i) => <a data-reveal className="language-step" href={`#/project/${item.slug}`} key={item.theme}><span className="sequence-point">0{i+1}</span><span className="eyebrow">{item.project}</span><h3>{item.theme}</h3><p>{item.description}</p><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div></section>
  </>;
}
