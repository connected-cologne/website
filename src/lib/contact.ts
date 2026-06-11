export type ContactSubject = 'general' | 'booking' | 'press' | 'radio';

export const CONTACT_SUBJECTS: { value: ContactSubject; label: string; to: string }[] = [
  { value: 'general', label: 'General', to: 'info@connected-cologne.de' },
  { value: 'booking', label: 'Booking', to: 'booking@connected-cologne.de' },
  { value: 'press', label: 'Press', to: 'info@connected-cologne.de' },
  { value: 'radio', label: 'Radio / Demo Submission', to: 'radio@connected-cologne.de' },
];
