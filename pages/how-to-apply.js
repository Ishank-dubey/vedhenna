import Head from 'next/head';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';

const siteUrl = 'https://www.vedhenna.com';

export default function HowToApplyPage() {
  const title = 'How to Apply Vedhenna Henna Hair Care';
  const description =
    'Simple Vedhenna henna application guidance: open the packet, wear the gloves provided, apply the henna, and follow the included note.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/how-to-apply`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/how-to-apply`} />
      </Head>

      <main className="ingredient-page apply-page">
        <header className="apply-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural hair care branding" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <Link href="/#ingredients">Back to Vedhenna</Link>
            <p className="eyebrow">How to apply</p>
            <h1>How to apply Vedhenna</h1>
            <p>
              Thank you for being interested in Vedhenna. This page shares the current simple application guidance for our
              natural henna hair care blend. Detailed photos, videos, timing guidance, and after-care notes will be added soon.
            </p>
          </div>
        </header>

        <section className="apply-steps" aria-label="Vedhenna application steps">
          <article className="ingredient-info-card apply-card">
            <h2>Before you begin</h2>
            <ul>
              <li>Read the handwritten instruction note included with your Vedhenna order.</li>
              <li>Keep the gloves ready before opening the henna pack.</li>
              <li>Apply carefully and avoid contact with eyes.</li>
            </ul>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Simple application</h2>
            <ol>
              <li>Open the packet.</li>
              <li>Wear the gloves provided.</li>
              <li>Apply the henna evenly as guided in the instruction note.</li>
            </ol>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>What comes with your order</h2>
            <ul>
              <li>Vedhenna henna in a vacuum pack.</li>
              <li>A pair of gloves for application.</li>
              <li>A handwritten note with application guidance.</li>
            </ul>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Need help?</h2>
            <p>Questions are welcome before or after ordering. We will help you understand the current application guidance.</p>
            <a className="button primary apply-order-link" href="/#order-name-target">
              Order Vedhenna
            </a>
          </article>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
