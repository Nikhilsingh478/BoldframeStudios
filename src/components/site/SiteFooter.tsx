/**
 * Footer.
 *
 * 1. Closing statement — a large "Have a project in mind?" with the main
 *    action and the email (copyable).
 * 2. A three-part grid — a big numbered index of the page's sections, the
 *    studio's other places online, and a studio card with a live India
 *    clock.
 * 3. The giant BOLDFRAME STUDIOS wordmark (the hero's type and gradient),
 *    rising letter by letter as the page ends.
 * 4. A quiet legal line with the rotating back-to-top badge.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
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

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface FooterProps {
  onContactClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function SiteFooter({ onContactClick, onPrivacyClick, onTermsClick }: FooterProps) {
  const root = useRef<HTMLElement>(null);
  const istTime = useIndiaTime();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.from(q('.bfx-fcta-line > span'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.bfx-fcta')[0], start: 'top 80%' },
      });
      gsap.from(q('.bfx-fcta-side, .bfx-fgrid > *'), {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.bfx-fcta')[0], start: 'top 70%' },
      });
      // Wordmark: unchanged.
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <footer ref={root} className="bfx-footer">
      {/* 1. Closing statement */}
      <div className="bfx-wrap bfx-fcta">
        <p className="bfx-fcta-title">
          <span className="bfx-fcta-line"><span>Have a project</span></span>
          <span className="bfx-fcta-line"><span>in mind? <em>Let&rsquo;s make it bold.</em></span></span>
        </p>
        <div className="bfx-fcta-side">
          <ConnectButton label="Start a project" onClick={onContactClick} />
          <div className="bfx-fcta-mail">
            <span>Or write to us</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button type="button" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
          </div>
        </div>
      </div>

      {/* 2. Index · Elsewhere · Studio */}
      <div className="bfx-wrap bfx-fgrid">
        <nav className="bfx-findex" aria-label="Footer">
          <p className="bfx-fhead">Index</p>
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id} style={{ '--n': i } as CSSProperties}>
                <a href={`#${n.id}`} onClick={(e) => go(e, n.id)}>
                  <span className="bfx-findex-num">0{i + 1}</span>
                  <span className="bfx-findex-label" data-text={n.label}>{n.label}</span>
                  <span className="bfx-findex-arrow" aria-hidden="true"><Arrow /></span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="bfx-fblock">
          <p className="bfx-fhead">Elsewhere</p>
          <ul className="bfx-fsocial">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className="bfx-fsocial-arrow" aria-hidden="true"><Arrow /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bfx-fblock bfx-fstudio">
          <p className="bfx-fhead">Studio</p>
          <div className="bfx-fstudio-card">
            <LogoMark size={34} />
            <p>
              A design-led frontend studio building websites that look bold, load fast and
              convert.
            </p>
            <p className="bfx-fclock">
              <i aria-hidden="true" />
              <span>India</span>
              <strong>{istTime}</strong>
              <span>IST</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Wordmark (unchanged) */}
      <div className="bfx-foot-mark" aria-hidden="true">
        {'BOLDFRAME STUDIOS'.split('').map((c, i) =>
          c === ' '
            ? <span key={i} className="bfx-foot-gap" />
            : <span key={i} className="bfx-ch"><span className="bfx-ch-inner">{c}</span></span>,
        )}
      </div>

      {/* 4. Legal line */}
      <div className="bfx-wrap bfx-flegal">
        <div className="bfx-flegal-meta">
          <span>© {new Date().getFullYear()} BoldFrame Studios</span>
          <span className="bfx-flegal-links">
            <button type="button" onClick={onPrivacyClick}>Privacy</button>
            <button type="button" onClick={onTermsClick}>Terms</button>
          </span>
        </div>
        <a href="#hero" className="bfx-totop" onClick={(e) => go(e, 'hero')} aria-label="Back to top">
          <svg className="bfx-totop-ring" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="bfx-totop-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text>
              {/* textLength = the circle's circumference (2π·38), so the
                  three repeats meet evenly. */}
              <textPath href="#bfx-totop-path" textLength="238" lengthAdjust="spacing">
                BACK TO TOP · BACK TO TOP · BACK TO TOP ·
              </textPath>
            </text>
          </svg>
          <span className="bfx-totop-core" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </a>
      </div>
    </footer>
  );
}
