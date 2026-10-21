import { useState } from 'react';
import { CONTACT_EMAIL } from '../site';
import { Dialog } from './Dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS configuration, overridable through environment variables.
const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'NwMPwoO6mOuR1IeSD';
const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID || 'service_7ys7xff';
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'template_hl5a33o';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleClose = () => {
    if (status === 'sent') {
      setForm(EMPTY_FORM);
      setStatus('idle');
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const emailjs = (window as any).emailjs;
      if (!emailjs || typeof emailjs.send !== 'function') {
        throw new Error('EmailJS has not loaded.');
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          to_email: CONTACT_EMAIL,
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
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

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} labelledBy="contact-title" className="dialog-contact">
      {status === 'sent' ? (
        <div className="contact-sent">
          <h2 id="contact-title">Thanks, {form.name.split(' ')[0] || 'we got it'}.</h2>
          <p>Your message is with us. We&rsquo;ll reply to {form.email} soon.</p>
          <button className="btn btn-dark" type="button" onClick={handleClose}>Close</button>
        </div>
      ) : (
        <>
          <div className="dialog-head">
            <h2 id="contact-title">Start a project</h2>
            <p>A few lines about what you need is plenty to get started.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label className="field">
                <span>Name</span>
                <input type="text" required autoComplete="name" value={form.name} onChange={update('name')} />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" required autoComplete="email" value={form.email} onChange={update('email')} />
              </label>
            </div>
            <label className="field">
              <span>Phone <em>(optional)</em></span>
              <input type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} />
            </label>
            <label className="field">
              <span>About your project</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="What are you building, and roughly when do you need it?"
              />
            </label>

            {status === 'error' && (
              <p className="form-error" role="alert">
                Your message couldn&rsquo;t be sent. Please try again, or email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}

            <button className="btn btn-accent btn-block" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </>
      )}
    </Dialog>
  );
}
