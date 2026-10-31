import { ArrowUpRight, Mail, Phone, ArrowUp } from 'lucide-react';
import { profile } from '../content';

export function Contact() {
  return <section id="contact" className="contact-section section-space">
    <div className="container">
      <div className="eyebrow light"><span className="tiny-dot" /> START A CONVERSATION</div>
      <div className="contact-heading" data-reveal><h2>Let the next<br /><em>idea begin.</em></h2><a className="contact-circle" data-magnetic href={`mailto:${profile.email}`} aria-label="Email Ahmed to discuss a project"><ArrowUpRight aria-hidden="true" /></a></div>
      <div className="contact-bottom" data-reveal><p>Thoughtful visual design for conferences,<br />medical events, and the stories that connect us.</p>
        <div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" />{profile.email}</a><a href={profile.phoneHref}><Phone size={18} aria-hidden="true" />{profile.phone}</a><div className="social-links">{profile.socials.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div></div>
      </div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer container"><a href="#top" className="footer-name">Ahmed Abdallah<span>Graphic designer & visual storyteller</span></a><p>Selected works · 2026 / 2027</p><a className="back-top" href="#top">Back to top <ArrowUp size={16} aria-hidden="true" /></a></footer>;
}
