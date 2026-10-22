/**
 * Contact — "Start a project" dialog.
 *
 * Split panel: a brand-blue side with the pitch and what happens next, and
 * a form with floating labels, project-type tiles and an in-dialog
 * confirmation. Sends through EmailJS (App preloads it when the page is
 * idle). Escape closes, focus is trapped and returned, page scroll pauses.
 *
 * Animation is plain CSS (transform/opacity, compositor-only) — no
 * animation library — so opening never waits on extra JavaScript. The
 * dialog stays mounted for its exit animation, then unmounts.
 */

import { useEffect, useRef, useState } from 'react';
import { setScrollLocked } from '../lib/smoothScroll';
import { ConnectButton } from './site/ConnectButton';
import { LogoMark } from './site/Logo';
import { CONTACT_EMAIL } from './site/data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS configuration, overridable through environment variables.
const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'NwMPwoO6mOuR1IeSD';
const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID || 'service_7ys7xff';
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'template_hl5a33o';
// Where EmailJS delivers form submissions. Unchanged on purpose; the address
// shown to visitors is CONTACT_EMAIL.
const EMAILJS_TO_EMAIL = 'nikhilwebworks@gmail.com';

const PROJECT_TYPES = ['Landing page', 'Business website', 'E-commerce', 'Redesign', 'Something else'];

const NEXT_STEPS = [
  'We read your brief to understand the problem and the outcome you want.',
  'We reply with questions, a rough workflow and next steps.',
  'Then research, a written plan (PRD), and the build itself.',
];

const EXIT_MS = 380;

const EMPTY = { name: '', email: '', phone: '', message: '' };
type Status = 'idle' | 'sending' | 'sent' | 'error';

const indiaTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  }).format(new Date());

function Field({
  id, label, type = 'text', value, onChange, required, optional, textarea, autoComplete,
}: {
  id: string; label: string; type?: string; value: string; required?: boolean; optional?: boolean;
  textarea?: boolean; autoComplete?: string; onChange: (v: string) => void;
}) {
  const common = {
    id,
    value,
    required,
    autoComplete,
    placeholder: ' ', // lets CSS float the label once there's text
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };
  return (
    <div className={`cm-field${textarea ? ' cm-field--area' : ''}`}>
      {textarea ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
      <label htmlFor={id}>
        {label}
        {optional && <em> (optional)</em>}
      </label>
      <span className="cm-field-line" aria-hidden="true" />
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);
  const [form, setForm] = useState(EMPTY);
  const [types, setTypes] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [sentAt, setSentAt] = useState('');
  const [copied, setCopied] = useState(false);

  // Stay mounted through the exit animation.
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const set = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));
  const toggleType = (t: string) => setTypes((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));

  const close = () => {
    onClose();
    if (status === 'sent') {
      window.setTimeout(() => {
        setForm(EMPTY);
        setTypes([]);
        setStatus('idle');
      }, EXIT_MS + 50);
    }
  };

  // Scroll lock, Escape, focus trap, focus return, mobile keyboard.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    setScrollLocked(true, 'contact');

    // Desktop: focus the first field. Touch: focus the dialog itself, so
    // the keyboard doesn't jump up before the visitor has read anything.
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const focusTimer = window.setTimeout(() => {
      const target = touch
        ? panelRef.current
        : panelRef.current?.querySelector<HTMLElement>('input, textarea');
      target?.focus({ preventScroll: true });
    }, 450);

    // Mobile keyboards: don't react to every step of the keyboard sliding
    // up (that's what jittered). Once it has settled, give the dialog room
    // below the fields for the keyboard, then scroll the focused field to the
    // middle of what's visible, once, smoothly.
    const vv = window.visualViewport;
    const backdrop = panelRef.current?.parentElement;
    let settleTimer = 0;
    const settle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (!backdrop) return;
        const keyboard = vv ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
        backdrop.style.paddingBottom = keyboard > 80 ? `${keyboard + 24}px` : '';
        const el = document.activeElement as HTMLElement | null;
        if (touch && el && panelRef.current?.contains(el) && el.matches('input, textarea')) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 180);
    };
    const onFocusIn = (e: FocusEvent) => {
      if (touch && (e.target as HTMLElement).matches('input, textarea')) settle();
    };
    vv?.addEventListener('resize', settle);
    panelRef.current?.addEventListener('focusin', onFocusIn);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled)',
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    const panel = panelRef.current;
    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(settleTimer);
      vv?.removeEventListener('resize', settle);
      panel?.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      setScrollLocked(false, 'contact');
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const emailjs = (window as any).emailjs;
      if (!emailjs || typeof emailjs.send !== 'function') throw new Error('EmailJS has not loaded.');
      const typeLine = types.length ? `Project type: ${types.join(', ')}\n\n` : '';
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          to_email: EMAILJS_TO_EMAIL,
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          message: typeLine + form.message,
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSentAt(indiaTime());
      setStatus('sent');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  if (!mounted) return null;

  const firstName = form.name.trim().split(' ')[0];

  return (
    <div
      className={`cm-backdrop${isOpen ? '' : ' is-closing'}`}
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={panelRef}
        className={`cm-panel${status === 'sent' ? ' is-sent' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cm-title"
        tabIndex={-1}
      >
        <button type="button" className="cm-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <aside className="cm-aside">
          <div>
            <LogoMark size={34} frame="#FFFFFF" letter="#FFFFFF" />
          </div>
          <p className="cm-kicker">Start a project</p>
          <h2 id="cm-title" >
            Let&rsquo;s build something bold.
          </h2>
          <p className="cm-intro">
            A few lines about what you need is plenty. The more we know, the sharper our reply.
          </p>

          <ol className="cm-steps">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className={status === 'sent' && i === 0 ? 'is-done' : undefined}>
                <span>0{i + 1}</span>{step}
              </li>
            ))}
          </ol>

          <div className="cm-direct">
            <span>Prefer email?</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button type="button" onClick={copyEmail} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
          </div>
        </aside>

        <div className="cm-main">
          {status === 'sent' ? (
            <div className="cm-sent" role="status">
              <div className="cm-sent-badge" aria-hidden="true">
                <span className="cm-sent-ring" />
                <svg className="cm-check" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="30" />
                  <path d="M20 33l8 8 16-17" />
                </svg>
              </div>

              <p className="cm-sent-label cm-rise" style={{ '--d': 2 } as React.CSSProperties}>Message received</p>
              <h3 className="cm-rise" style={{ '--d': 3 } as React.CSSProperties}>
                Thank you{firstName ? `, ${firstName}` : ''}.
              </h3>
              <p className="cm-sent-copy cm-rise" style={{ '--d': 4 } as React.CSSProperties}>
                Your brief is with us. We read every message ourselves and will reply
                to <strong>{form.email}</strong> with questions and next steps.
              </p>

              <dl className="cm-receipt cm-rise" style={{ '--d': 5 } as React.CSSProperties}>
                <div><dt>From</dt><dd>{form.name}</dd></div>
                <div><dt>Reply to</dt><dd>{form.email}</dd></div>
                <div><dt>Looking for</dt><dd>{types.length ? types.join(', ') : 'Not specified'}</dd></div>
                <div><dt>Sent</dt><dd>{sentAt} IST</dd></div>
              </dl>

              <div className="cm-sent-actions cm-rise" style={{ '--d': 6 } as React.CSSProperties}>
                <ConnectButton label="Back to the site" onClick={close} />
                <a className="bfx-link" href={`mailto:${CONTACT_EMAIL}`}>
                  Add something by email <span className="bfx-link-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ) : (
            <form className="cm-form" onSubmit={submit}>
              <fieldset className="cm-types">
                <legend>What are you looking for?</legend>
                <div>
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={types.includes(t) ? 'is-on' : undefined}
                      aria-pressed={types.includes(t)}
                      onClick={() => toggleType(t)}
                    >
                      <i aria-hidden="true" />{t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="cm-row">
                <Field id="cm-name" label="Your name" value={form.name} onChange={set('name')} required autoComplete="name" />
                <Field id="cm-email" label="Email" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
              </div>
              <div>
                <Field id="cm-phone" label="Phone" type="tel" value={form.phone} onChange={set('phone')} optional autoComplete="tel" />
              </div>
              <div>
                <Field id="cm-message" label="Tell us about the project" value={form.message} onChange={set('message')} required textarea />
              </div>

              {status === 'error' && (
                <p className="cm-error" role="alert">
                  That didn&rsquo;t send. Please try again, or email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}

              <div className="cm-submit">
                <ConnectButton
                  type="submit"
                  label={status === 'sending' ? 'Sending…' : 'Send message'}
                  disabled={status === 'sending'}
                />
                <span>We only use your details to reply.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
