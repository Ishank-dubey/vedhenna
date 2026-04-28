const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'preetisharma.0613@gmail.com';
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
  const phone = sanitize(req.body?.phone);
  const address = sanitize(req.body?.address);
  const message = sanitize(req.body?.message);
  const contactPhone = phone || 'Not provided';
  const deliveryAddress = address || 'Not provided';

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please enter your name, email, and message.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ message: 'The contact email service is not configured yet.' });
  }

  const text = [
    'New Vedhenna inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${contactPhone}`,
    `Delivery address: ${deliveryAddress}`,
    '',
    'Message:',
    message
  ].join('\n');

  const html = `
    <h2>New Vedhenna inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(contactPhone)}</p>
    <p><strong>Delivery address:</strong><br />${escapeHtml(deliveryAddress).replace(/\n/g, '<br />')}</p>
    <p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New Vedhenna inquiry from ${name}`,
      text,
      html
    })
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error('Resend email failed', {
      status: resendResponse.status,
      body: resendError
    });

    return res.status(502).json({ message: 'The message could not be sent right now.' });
  }

  return res.status(200).json({ message: 'Message sent.' });
}
