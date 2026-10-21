import { useEffect, useState } from 'react';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
];

export function Header({ onContactClick }: { onContactClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="BoldFrame Studios, back to top">
          <span className="brand-mark" aria-hidden="true" />
          BoldFrame <span className="brand-light">Studios</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <button
            className="btn btn-dark btn-small"
            type="button"
            onClick={() => { closeMenu(); onContactClick(); }}
          >
            Start a project
          </button>
        </nav>
      </div>
    </header>
  );
}
