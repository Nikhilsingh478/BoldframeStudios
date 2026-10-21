/**
 * Footer — links up top; the giant BOLDFRAME wordmark (the hero's type,
 * same blue gradient) rises letter by letter as the page ends.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LogoMark } from './Logo';
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

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer ref={root} className="bfx-footer">
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
        {'BOLDFRAME'.split('').map((c, i) => (
          <span key={i} className="bfx-ch"><span className="bfx-ch-inner">{c}</span></span>
        ))}
      </div>

      <div className="bfx-wrap bfx-foot-bottom">
        <span>© {new Date().getFullYear()} BoldFrame Studios</span>
        <a href="#hero" onClick={(e) => go(e, 'hero')}>Back to top ↑</a>
      </div>
    </footer>
  );
}
