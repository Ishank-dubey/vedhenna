import Head from 'next/head';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';

const siteUrl = 'https://www.vedhenna.com';
const shortVideoUrl = 'https://drive.google.com/file/d/1bvbESTxR0ltzB1GHDkGsTKbfMSBAhmG1/view?usp=sharing';
const detailedVideoUrl = 'https://drive.google.com/file/d/1FICyIwqDKhRJds2PNtxps8wWjNG2_Yi0/view?usp=sharing';

export default function HowToApplyPage() {
  const title = 'How to Apply Vedhenna Henna Hair Care';
  const description =
    'Vedhenna henna application guidance: apply on non-oiled hair, wear gloves, leave for 2-3 hours, rinse with water, and shampoo the next day.';

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
              natural henna hair care blend, including video instructions and the main after-care steps for richer color.
            </p>
          </div>
        </header>

        <section className="apply-steps" aria-label="Vedhenna application steps">
          <article className="ingredient-info-card apply-card">
            <h2>Before you begin</h2>
            <ul>
              <li>Do not apply Vedhenna on oiled hair.</li>
              <li>Read the handwritten instruction note included with your order.</li>
              <li>Keep the supplied gloves ready before opening the henna pack.</li>
            </ul>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Apply Vedhenna</h2>
            <ol>
              <li>Wear the gloves supplied while applying.</li>
              <li>Apply evenly from the roots to the lengths.</li>
              <li>Leave it on for at least 2 hours.</li>
              <li>For best results, keep it for 3 hours.</li>
            </ol>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Rinse and after-care</h2>
            <ul>
              <li>Rinse thoroughly with water. Do not use shampoo immediately.</li>
              <li>Oil your hair at night.</li>
              <li>Wash with shampoo the next day.</li>
            </ul>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Tip for richer color</h2>
            <p>Avoid shampoo immediately after rinsing. Waiting until the next day helps support a richer color result.</p>
            <a className="button primary apply-order-link" href="/#order-name-target">
              Order Vedhenna
            </a>
          </article>
        </section>

        <section className="apply-videos" aria-label="Vedhenna video instructions">
          <div className="section-heading compact">
            <p className="eyebrow">Video instructions</p>
            <h2>Watch how to apply Vedhenna.</h2>
            <p>Start with the short video, or open the detailed walkthrough when you want the full explanation.</p>
          </div>
          <div className="apply-video-grid">
            <article className="apply-video-card">
              <h3>Short instructions</h3>
              <iframe
                src="https://drive.google.com/file/d/1bvbESTxR0ltzB1GHDkGsTKbfMSBAhmG1/preview"
                title="Short Vedhenna application instructions"
                allow="autoplay"
                loading="lazy"
              />
              <a href={shortVideoUrl} target="_blank" rel="noreferrer">Open short video</a>
            </article>
            <article className="apply-video-card">
              <h3>Detailed instructions</h3>
              <iframe
                src="https://drive.google.com/file/d/1FICyIwqDKhRJds2PNtxps8wWjNG2_Yi0/preview"
                title="Detailed Vedhenna application instructions"
                allow="autoplay"
                loading="lazy"
              />
              <a href={detailedVideoUrl} target="_blank" rel="noreferrer">Open detailed video</a>
            </article>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
