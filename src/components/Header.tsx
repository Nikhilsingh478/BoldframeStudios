import { useState } from 'react';

export function Header({ onContactClick }: { onContactClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="#hero" onClick={closeMenu} aria-label="BoldFrame Studios, home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>BoldFrame<span className="brand-studios"> Studios</span></span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-glyph${menuOpen ? ' is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#capabilities" onClick={closeMenu}>Services</a>
          <a href="#journey" onClick={closeMenu}>Approach</a>
          <a href="#work-gallery" onClick={closeMenu}>Selected work</a>
          <button className="nav-contact" type="button" onClick={() => { closeMenu(); onContactClick(); }}>
            Start a conversation <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
