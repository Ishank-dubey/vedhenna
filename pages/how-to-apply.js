import Head from 'next/head';
import Link from 'next/link';

const siteUrl = 'https://www.vedhenna.com';

export default function HowToApplyPage() {
  const title = 'How to Apply Vedhenna | Natural Hair Care';
  const description =
    'Thank you for your interest in Vedhenna. Learn the current simple application guidance for Vedhenna natural henna hair care.';

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
        <header className="ingredient-page-header">
          <Link href="/#ingredients">Back to Vedhenna</Link>
          <p className="eyebrow">How to apply</p>
          <h1>How to apply Vedhenna</h1>
          <p>
            Thank you for being interested in Vedhenna. We are happy to share this simple guidance for now, and we will add
            detailed photos, videos, and step-by-step instructions soon.
          </p>
        </header>

        <section className="apply-steps" aria-label="Vedhenna application steps">
          <article className="ingredient-info-card apply-card">
            <h2>Current instructions</h2>
            <p>Open the packet, wear the gloves provided, and apply the henna.</p>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>More guidance coming soon</h2>
            <p>
              We will update this page with detailed application photos, videos, timing guidance, and after-care notes as
              soon as they are ready.
            </p>
          </article>
        </section>
      </main>
    </>
  );
}
