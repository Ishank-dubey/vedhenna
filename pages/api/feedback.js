const FEEDBACK_TO_EMAIL = process.env.FEEDBACK_TO_EMAIL || 'preetisharma.0613@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Vedhenna <onboarding@resend.dev>';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (value) => String(value || '').trim();
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const name = sanitize(req.body?.name);
  const email = sanitize(req.body?.email);
  const feedback = sanitize(req.body?.feedback);
  const rating = Number(req.body?.rating);
  const contactEmail = email || 'Not provided';

  if (!name || !feedback || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Please enter your name, rating, and feedback.' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ message: 'The feedback email service is not configured yet.' });
  }

  const text = [
    'New Vedhenna customer feedback',
    '',
    `Name: ${name}`,
    `Email: ${contactEmail}`,
    `Rating: ${rating}/5`,
    '',
    'Feedback:',
    feedback
  ].join('\n');

  const html = `
    <h2>New Vedhenna customer feedback</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(contactEmail)}</p>
    <p><strong>Rating:</strong> ${rating}/5</p>
    <p><strong>Feedback:</strong><br />${escapeHtml(feedback).replace(/\n/g, '<br />')}</p>
  `;

  const emailPayload = {
    from: CONTACT_FROM_EMAIL,
    to: FEEDBACK_TO_EMAIL,
    subject: `Vedhenna feedback from ${name} - ${rating}/5`,
    text,
    html
  };

  if (email) {
    emailPayload.reply_to = email;
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error('Resend feedback email failed', {
      status: resendResponse.status,
      body: resendError
    });

    return res.status(502).json({ message: 'The feedback could not be sent right now.' });
  }

  return res.status(200).json({ message: 'Feedback sent.' });
}
