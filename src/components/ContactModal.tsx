/**
 * Contact — "Start a project" dialog.
 *
 * Split panel: a brand-blue side with the pitch and what happens next, and
 * a form with floating labels, project-type tiles and an in-dialog success
 * state. Sends through EmailJS (loaded by App when the dialog opens).
 * Escape closes, focus is trapped and returned, page scroll is paused.
 */

import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
  'We read your brief and look at what you have today.',
  'We reply with questions, next steps and a rough scope.',
  'Once it’s a fit, we plan, design and build it with you.',
];

const EMPTY = { name: '', email: '', phone: '', message: '' };
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState(EMPTY);
  const [types, setTypes] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const set = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));
  const toggleType = (t: string) => setTypes((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));

  const close = () => {
    onClose();
    if (status === 'sent') {
      window.setTimeout(() => {
        setForm(EMPTY);
        setTypes([]);
        setStatus('idle');
      }, 400);
    }
  };

  // Scroll lock, Escape, focus trap, focus return.
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

    // Mobile keyboards: size the backdrop to the visible area (above the
    // keyboard) and bring the focused field into the middle of it.
    const vv = window.visualViewport;
    const backdrop = panelRef.current?.parentElement;
    const fitViewport = () => {
      if (vv && backdrop) backdrop.style.height = `${vv.height}px`;
    };
    let fieldTimer = 0;
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!touch || !el.matches('input, textarea')) return;
      window.clearTimeout(fieldTimer);
      // Wait for the keyboard to finish opening before scrolling.
      fieldTimer = window.setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 320);
    };
    vv?.addEventListener('resize', fitViewport);
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
      window.clearTimeout(fieldTimer);
      vv?.removeEventListener('resize', fitViewport);
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

  // Staggered children
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay: 0.18 + i * 0.05 },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cm-backdrop"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
          transition={{ duration: 0.35 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            ref={panelRef}
            className="cm-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
            tabIndex={-1}
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <button type="button" className="cm-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <aside className="cm-aside">
              <motion.div {...item(0)}><LogoMark size={34} frame="#FFFFFF" letter="#FFFFFF" /></motion.div>
              <motion.p className="cm-kicker" {...item(1)}>Start a project</motion.p>
              <motion.h2 id="cm-title" {...item(2)}>Let&rsquo;s build something bold.</motion.h2>
              <motion.p className="cm-intro" {...item(3)}>
                A few lines about what you need is plenty. The more we know, the sharper our reply.
              </motion.p>

              <motion.ol className="cm-steps" {...item(4)}>
                {NEXT_STEPS.map((step, i) => (
                  <li key={step}><span>0{i + 1}</span>{step}</li>
                ))}
              </motion.ol>

              <motion.div className="cm-direct" {...item(5)}>
                <span>Prefer email?</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <button type="button" onClick={copyEmail} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
              </motion.div>
            </aside>

            <div className="cm-main">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    className="cm-sent"
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <svg className="cm-check" viewBox="0 0 64 64" aria-hidden="true">
                      <circle cx="32" cy="32" r="30" />
                      <path d="M20 33l8 8 16-17" />
                    </svg>
                    <h3>Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h3>
                    <p>Your message is with us. We&rsquo;ll reply to <strong>{form.email}</strong> soon.</p>
                    <ConnectButton label="Close" onClick={close} />
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="cm-form"
                    onSubmit={submit}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                  >
                    <motion.fieldset className="cm-types" {...item(1)}>
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
                    </motion.fieldset>

                    <motion.div className="cm-row" {...item(2)}>
                      <Field id="cm-name" label="Your name" value={form.name} onChange={set('name')} required autoComplete="name" />
                      <Field id="cm-email" label="Email" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
                    </motion.div>
                    <motion.div {...item(3)}>
                      <Field id="cm-phone" label="Phone" type="tel" value={form.phone} onChange={set('phone')} optional autoComplete="tel" />
                    </motion.div>
                    <motion.div {...item(4)}>
                      <Field id="cm-message" label="Tell us about the project" value={form.message} onChange={set('message')} required textarea />
                    </motion.div>

                    {status === 'error' && (
                      <p className="cm-error" role="alert">
                        That didn&rsquo;t send. Please try again, or email{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                      </p>
                    )}

                    <motion.div className="cm-submit" {...item(5)}>
                      <ConnectButton
                        type="submit"
                        label={status === 'sending' ? 'Sending…' : 'Send message'}
                        disabled={status === 'sending'}
                      />
                      <span>We only use your details to reply.</span>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
