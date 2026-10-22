import { useEffect, useState } from 'react';
import { LogoMark } from './Logo';
import { ConnectButton } from './ConnectButton';
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

  // Hide on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        <nav aria-label="Mobile">
          {[...LINKS, { label: 'Contact', id: 'contact' }].map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.06}s` : '0s' }}
              onClick={(e) => { e.preventDefault(); if (l.id === 'contact') contact(); else go(l.id); }}
            >
              <span className="bfx-menu-index">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="bfx-menu-foot">
          <a href="mailto:nikhilwebworks@gmail.com" tabIndex={menuOpen ? 0 : -1}>nikhilwebworks@gmail.com</a>
        </div>
      </div>
    </header>
  );
}
