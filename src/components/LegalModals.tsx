import { CONTACT_EMAIL } from '../site';
import { Dialog } from './Dialog';

interface LegalModalsProps {
  activeModal: 'privacy' | 'terms' | null;
  onClose: () => void;
}

const ContactLine = () => (
  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
);

function Privacy() {
  return (
    <>
      <p>
        BoldFrame Studios (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting
        the information you share with us. This Privacy Policy explains how we collect, use and
        safeguard information when you visit our website or contact us.
      </p>
      <h3>1. Information we collect</h3>
      <p>We collect limited personal information only when you voluntarily provide it, such as when you:</p>
      <ul>
        <li>Fill out a contact or project inquiry form</li>
        <li>Reach out by email or WhatsApp</li>
      </ul>
      <h3>2. How we use your information</h3>
      <p>We use the information collected solely to:</p>
      <ul>
        <li>Respond to inquiries and messages</li>
        <li>Communicate about potential projects or collaborations</li>
        <li>Improve our website and user experience</li>
      </ul>
      <h3>3. Third-party services</h3>
      <p>We may use trusted third-party tools and services to operate this website, such as:</p>
      <ul>
        <li>Email delivery services (for example, contact form handling)</li>
        <li>Analytics tools to measure website performance</li>
      </ul>
      <h3>4. Data security</h3>
      <p>
        We take reasonable technical and organisational measures to protect your information.
        However, no method of transmission over the internet is completely secure, and we cannot
        guarantee absolute security.
      </p>
      <h3>5. Your rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to the personal information you have shared</li>
        <li>Request correction or deletion of your information</li>
      </ul>
      <h3>6. Contact us</h3>
      <p>If you have any questions about this Privacy Policy, contact us at <ContactLine />.</p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p>
        By accessing or using the BoldFrame Studios website, you agree to the following Terms of
        Service. If you do not agree with these terms, please refrain from using the site.
      </p>
      <h3>1. Use of the website</h3>
      <p>
        This website is provided for informational and portfolio purposes only. You agree to use it
        lawfully and in a manner that does not infringe on the rights of others or restrict their
        use of the site.
      </p>
      <h3>2. Services and engagements</h3>
      <ul>
        <li>All services displayed or described on this website are indicative only.</li>
        <li>Project scope, timelines, pricing and deliverables are finalised only after direct communication and mutual agreement.</li>
        <li>No service is guaranteed until a formal agreement is reached.</li>
      </ul>
      <h3>3. Intellectual property</h3>
      <p>
        Unless stated otherwise, all content on this website, including designs, layouts, text,
        graphics, animations and code, is the intellectual property of BoldFrame Studios.
      </p>
      <h3>4. Limitation of liability</h3>
      <p>
        BoldFrame Studios is not responsible for any damages or losses arising from your use or
        inability to use this website. The website is provided on an &ldquo;as-is&rdquo; basis.
      </p>
      <h3>5. External links</h3>
      <p>
        This website may include links to third-party platforms. We are not responsible for the
        content, availability or policies of these external websites.
      </p>
      <h3>6. Contact information</h3>
      <p>For questions regarding these Terms of Service, contact <ContactLine />.</p>
    </>
  );
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  return (
    <Dialog isOpen={activeModal !== null} onClose={onClose} labelledBy="legal-title" className="dialog-legal">
      <div className="dialog-head">
        <h2 id="legal-title">{activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h2>
        <p>Last updated: January 2026</p>
      </div>
      <div className="legal-body">
        {activeModal === 'privacy' ? <Privacy /> : <Terms />}
      </div>
    </Dialog>
  );
}
