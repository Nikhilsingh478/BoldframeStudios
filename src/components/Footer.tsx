interface FooterProps {
  onContactClick: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

export function Footer({ onContactClick, onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <p className="footer-kicker">The next good thing starts somewhere.</p>
        <div className="footer-invite">
          <h2>Have something<br /><em>in mind?</em></h2>
          <button className="button button-inverse" type="button" onClick={onContactClick}>
            Tell us about it <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="footer-lower">
          <a className="footer-email" href="mailto:nikhilwebworks@gmail.com">nikhilwebworks@gmail.com</a>
          <div className="footer-links" aria-label="Footer links">
            <a href="#capabilities">Services</a>
            <a href="#work-gallery">Work</a>
            <a href="https://github.com/Nikhilsingh478" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/nikhilsingh14788" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {onPrivacyClick && <button type="button" onClick={onPrivacyClick}>Privacy</button>}
            {onTermsClick && <button type="button" onClick={onTermsClick}>Terms</button>}
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <a className="footer-wordmark" href="#hero">BoldFrame Studios</a>
        <span>© {new Date().getFullYear()} BoldFrame Studios</span>
        <a href="#hero" className="back-to-top">Back to top ↑</a>
      </div>
    </footer>
  );
}
export default Footer;
