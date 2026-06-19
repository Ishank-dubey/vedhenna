import Head from 'next/head';
import { useState } from 'react';
import SiteFooter from '../components/SiteFooter';

const siteUrl = 'https://www.vedhenna.com';
const ratingLabels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const feedbackDetails = {
      name: formData.get('name'),
      email: formData.get('email'),
      rating,
      feedback: formData.get('feedback')
    };

    setStatus('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackDetails)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Feedback could not be sent right now.');
      }

      setStatus('Thank you. Your feedback has been sent.');
      form.reset();
      setRating(5);
    } catch (feedbackError) {
      setError(`${feedbackError.message} Please try again in a little while.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Share Feedback | Vedhenna</title>
        <meta
          name="description"
          content="Share private Vedhenna product feedback after receiving your order."
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href={`${siteUrl}/feedback`} />
        <meta property="og:title" content="Share Feedback | Vedhenna" />
        <meta
          property="og:description"
          content="Share private Vedhenna product feedback after receiving your order."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/feedback`} />
      </Head>

      <header className="site-header feedback-header" aria-label="Vedhenna feedback page">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
      </header>

      <main className="feedback-page">
        <section className="feedback-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural hair care" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <p className="eyebrow">Customer feedback</p>
            <h1>How was your Vedhenna experience?</h1>
            <p>
              Thank you for trying Vedhenna. Your feedback helps us improve the product, packaging, and delivery experience
              with care.
            </p>
          </div>
        </section>

        <section className="feedback-section" aria-label="Vedhenna feedback form">
          <div className="section-heading">
            <p className="eyebrow">Share your feedback</p>
            <h2>Tell us what worked well and what we can improve.</h2>
            <p>
              This page is shared after delivery. Your feedback is sent privately to Vedhenna and may be reviewed before being
              added to the website.
            </p>
          </div>

          <form className="feedback-form" name="feedback" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
            </label>

            <label>
              Email <span className="optional-label">Optional</span>
              <input type="email" name="email" placeholder="you@example.com" />
            </label>

            <fieldset className="rating-field">
              <legend>Rating</legend>
              <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    className={value <= rating ? 'star-button active' : 'star-button'}
                    type="button"
                    key={value}
                    aria-label={`${value} star${value > 1 ? 's' : ''}`}
                    aria-pressed={value === rating}
                    onClick={() => setRating(value)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p>{ratingLabels[rating - 1]}</p>
            </fieldset>

            <label>
              Feedback
              <textarea
                name="feedback"
                rows="7"
                placeholder="Share your Vedhenna experience..."
                required
              />
            </label>

            <button className="button primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send feedback'}
            </button>

            {status ? <p className="form-status success">{status}</p> : null}
            {error ? <p className="form-error">{error}</p> : null}
          </form>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
