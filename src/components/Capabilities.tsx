import { useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, Asterisk, HeartPulse, Layers, Palette, Sparkles } from 'lucide-react';
import { services } from '../content';

const icons = [Layers, HeartPulse, Palette, Sparkles];
export function Capabilities() {
  const [active, setActive] = useState(0);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': case 'ArrowDown': next = (index + 1) % services.length; break;
      case 'ArrowLeft': case 'ArrowUp': next = (index + services.length - 1) % services.length; break;
      case 'Home': next = 0; break;
      case 'End': next = services.length - 1; break;
      default: return;
    }
    event.preventDefault(); setActive(next);
    document.getElementById(`capability-tab-${next}`)?.focus();
  }
  return <>
    <div className="capabilities" data-reveal>
      <div className="capability-tabs" role="tablist" aria-label="Creative capabilities" aria-orientation="vertical">
        {services.map((service, index) => {
          const Icon = icons[index];
          return <button key={service.title} id={`capability-tab-${index}`} role="tab"
            aria-selected={active === index} aria-controls="capability-panel" tabIndex={active === index ? 0 : -1}
            className={active === index ? 'capability-tab active' : 'capability-tab'}
            onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
            <span className="service-number">0{index + 1}</span><Icon size={21} aria-hidden="true" />
            <span>{service.title}</span><ArrowUpRight size={17} aria-hidden="true" />
          </button>;
        })}
      </div>
      <div id="capability-panel" role="tabpanel" aria-labelledby={`capability-tab-${active}`} tabIndex={0} className="capability-panel">
        <span className="capability-orbit" aria-hidden="true"><Asterisk /></span>
        <div key={active} className="capability-panel-content">
          <p className="eyebrow">FROM IDEA TO EXPERIENCE / 0{active + 1}</p>
          <h3>{services[active].title}</h3><p>{services[active].description}</p>
          <a className="text-link" href="#work">Explore the applications <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <div className="service-summary" data-reveal>
      {services.map(service => <div key={service.title}><h3>{service.title}</h3><p>{service.description}</p></div>)}
    </div>
  </>;
}
