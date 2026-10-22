/**
 * Footer — links up top; the giant BOLDFRAME STUDIOS wordmark (the hero's type,
 * same blue gradient) rises letter by letter as the page ends.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LogoMark } from './Logo';
import { ConnectButton } from './ConnectButton';
import { CONTACT_EMAIL, SOCIALS } from './data';
import { scrollToId } from '../../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Process', id: 'journey' },
  { label: 'Results', id: 'outcomes' },
];

/** Current time in India (HH:MM), refreshed every 20 seconds. */
function useIndiaTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(format()), 20000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

interface FooterProps {
  onContactClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function SiteFooter({ onContactClick, onPrivacyClick, onTermsClick }: FooterProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.bfx-foot-mark .bfx-ch-inner'), {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: el.querySelector('.bfx-foot-mark'), start: 'top 95%' },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const istTime = useIndiaTime();

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer ref={root} className="bfx-footer">
      <div className="bfx-wrap bfx-foot-cta">
        <p className="bfx-foot-cta-text">
          Ready when you are.
          <span> Tell us about your project, we&rsquo;ll take it from there.</span>
        </p>
        <div className="bfx-foot-cta-actions">
          <ConnectButton label="Start a project" onClick={onContactClick} />
          <a className="bfx-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="bfx-wrap bfx-foot-top">
        <div className="bfx-foot-brand">
          <LogoMark size={40} />
          <p>
            A design-led frontend studio building websites that look bold, load fast and
            convert.
          </p>
          <a className="bfx-foot-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>

        <nav className="bfx-foot-col" aria-label="Footer">
          <span>Explore</span>
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
        </nav>

        <div className="bfx-foot-col">
          <span>Connect</span>
          {SOCIALS.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          <a href="#contact" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Start a project</a>
        </div>

        <div className="bfx-foot-col">
          <span>Legal</span>
          <button type="button" onClick={onPrivacyClick}>Privacy Policy</button>
          <button type="button" onClick={onTermsClick}>Terms of Service</button>
        </div>
      </div>

      <div className="bfx-foot-mark" aria-hidden="true">
        {'BOLDFRAME STUDIOS'.split('').map((c, i) =>
          c === ' '
            ? <span key={i} className="bfx-foot-gap" />
            : <span key={i} className="bfx-ch"><span className="bfx-ch-inner">{c}</span></span>,
        )}
      </div>

      <div className="bfx-wrap bfx-foot-bottom">
        <span>© {new Date().getFullYear()} BoldFrame Studios</span>
        <span className="bfx-foot-time">
          <i aria-hidden="true" />Based in India · {istTime} IST
        </span>
        <a href="#hero" onClick={(e) => go(e, 'hero')}>Back to top ↑</a>
      </div>
    </footer>
  );
}
