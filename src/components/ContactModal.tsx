'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { CONTACT_SUBJECTS, type ContactSubject } from '@/lib/contact';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  initialSubject?: ContactSubject;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM = {
  name: '',
  email: '',
  subject: 'general' as ContactSubject,
  message: '',
  demoLink: '',
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

export default function ContactModal({ open, onClose, initialSubject = 'general' }: ContactModalProps) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset the form whenever the modal transitions from closed to open.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setForm({ ...EMPTY_FORM, subject: initialSubject });
      setStatus('idle');
    }
  }

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 200);
  };

  // Mount the overlay first, then flip `visible` on the next frame so the
  // CSS transition (opacity/transform) actually animates in.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className={`contact-overlay${visible ? ' contact-overlay--visible' : ''}`}
      onClick={close}
    >
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="contact-close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>

        <p className="label" style={{ marginBottom: '8px' }}>Get in Touch</p>
        <h2 className="contact-title">Contact</h2>

        {status === 'success' ? (
          <p className="contact-status contact-status--success">
            Your message has been sent. We&apos;ll get back to you soon.
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-field">
              <span className="contact-label">Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="contact-input"
              />
            </label>

            <label className="contact-field">
              <span className="contact-label">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="contact-input"
              />
            </label>

            <label className="contact-field">
              <span className="contact-label">Subject</span>
              <select
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value as ContactSubject }))}
                className="contact-input contact-select"
              >
                {CONTACT_SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>

            {form.subject === 'demo' && (
              <label className="contact-field">
                <span className="contact-label">Demo Link</span>
                <input
                  type="text"
                  placeholder="WeTransfer, Google Drive or similar link"
                  value={form.demoLink}
                  onChange={(e) => setForm((f) => ({ ...f, demoLink: e.target.value }))}
                  className="contact-input"
                />
              </label>
            )}

            <label className="contact-field">
              <span className="contact-label">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="contact-input contact-textarea"
              />
            </label>

            {status === 'error' && (
              <p className="contact-status contact-status--error">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button type="submit" className="btn btn--filled contact-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
