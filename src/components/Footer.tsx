import { CONTACT_EMAIL, SOCIAL_LINKS } from '../site';

interface FooterProps {
  onContactClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function Footer({ onContactClick, onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="cta">
          <h2>Have a project in mind?</h2>
          <p>
            Tell us what you&rsquo;re working on. We&rsquo;ll reply with next steps and an honest
            idea of what it would take.
          </p>
          <div className="cta-actions">
            <button className="btn btn-accent" type="button" onClick={onContactClick}>
              Start a project <span aria-hidden="true">→</span>
            </button>
            <a className="cta-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        <div className="footer-bar">
          <span>© {new Date().getFullYear()} BoldFrame Studios</span>
          <nav className="footer-links" aria-label="Footer">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
            <button type="button" onClick={onPrivacyClick}>Privacy</button>
            <button type="button" onClick={onTermsClick}>Terms</button>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
