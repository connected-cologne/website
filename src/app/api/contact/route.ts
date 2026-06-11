import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { CONTACT_SUBJECTS, type ContactSubject } from '@/lib/contact';

// TODO: add real RESEND_API_KEY to .env.local
const resend = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder_key');

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    subject?: ContactSubject;
    message?: string;
    demoLink?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, subject, message, demoLink } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const subjectInfo = CONTACT_SUBJECTS.find((s) => s.value === subject);
  if (!subjectInfo) {
    return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subjectInfo.label}`,
    ...(demoLink ? [`Demo Link: ${demoLink}`] : []),
    '',
    message,
  ];

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: subjectInfo.to,
    replyTo: email,
    subject: `[Contact] ${subjectInfo.label} — ${name}`,
    text: lines.join('\n'),
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
