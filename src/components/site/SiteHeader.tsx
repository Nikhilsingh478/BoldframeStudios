import { useEffect, useState, type CSSProperties } from 'react';
import { LogoMark } from './Logo';
import { ConnectButton } from './ConnectButton';
import { CONTACT_EMAIL, SOCIALS } from './data';
import { scrollToId, setScrollLocked } from '../../lib/smoothScroll';
import { onReveal } from './reveal';

const LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
];


export function SiteHeader({ onContactClick }: { onContactClick: () => void }) {
  const [shown, setShown] = useState(false);       // after the loader
  const [hidden, setHidden] = useState(false);     // scrolling down
  const [scrolled, setScrolled] = useState(false); // off the very top
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => onReveal(() => window.setTimeout(() => setShown(true), 650)), []);

  // Hide on scroll down, return on scroll up. Read once per frame and only
  // touch React state when a value actually flips.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    let wasScrolled = false;
    let wasHidden = false;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const scrolledNow = y > 24;
      if (scrolledNow !== wasScrolled) setScrolled((wasScrolled = scrolledNow));
      if (Math.abs(y - last) > 6) {
        const hiddenNow = y > last && y > 160;
        if (hiddenNow !== wasHidden) setHidden((wasHidden = hiddenNow));
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setScrollLocked(menuOpen, 'menu');
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), menuOpen ? 350 : 0);
  };

  const contact = () => {
    setMenuOpen(false);
    onContactClick();
  };

  const cls = [
    'bfx-header',
    shown && 'is-shown',
    hidden && !menuOpen && 'is-hidden',
    (scrolled || menuOpen) && 'is-scrolled',
    menuOpen && 'is-menu-open',
  ].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="bfx-header-inner">
        <a
          href="#hero"
          className="bfx-header-logo"
          aria-label="BoldFrame Studios, back to top"
          onClick={(e) => { e.preventDefault(); go('hero'); }}
        >
          <LogoMark size={38} />
        </a>

        <nav className="bfx-nav" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); contact(); }}>
            Contact
          </a>
        </nav>

        <div className="bfx-header-actions">
          <ConnectButton label="Let’s Connect" onClick={contact} className="bfx-connect" />
          <button
            type="button"
            className="bfx-burger"
            aria-expanded={menuOpen}
            aria-controls="bfx-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i /><i /><i />
          </button>
        </div>
      </div>

      <div id="bfx-mobile-menu" className="bfx-menu" aria-hidden={!menuOpen}>
        <span className="bfx-menu-layer" aria-hidden="true" />
        <div className="bfx-menu-panel">
          <nav aria-label="Mobile">
            {[...LINKS, { label: 'Contact', id: 'contact' }].map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                tabIndex={menuOpen ? 0 : -1}
                style={{ '--mi': i } as CSSProperties}
                onClick={(e) => { e.preventDefault(); if (l.id === 'contact') contact(); else go(l.id); }}
              >
                <span className="bfx-menu-index">0{i + 1}</span>
                <span className="bfx-menu-mask"><span className="bfx-menu-text">{l.label}</span></span>
                <span className="bfx-menu-go" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="bfx-menu-foot">
            <p className="bfx-menu-tag">Let&rsquo;s build something bold.</p>
            <div className="bfx-menu-links">
              <a href={`mailto:${CONTACT_EMAIL}`} tabIndex={menuOpen ? 0 : -1}>{CONTACT_EMAIL}</a>
              {SOCIALS.map((so) => (
                <a key={so.href} href={so.href} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>{so.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
