import Head from 'next/head';
import SiteFooter from '../components/SiteFooter';

const siteUrl = 'https://www.vedhenna.com';
const title = 'Natural Henna Hair Care Paste in Hyderabad | Vedhenna';
const description =
  'Vedhenna is a Hyderabad-based natural henna hair care paste made with traditional herbs and available for delivery across India.';

export default function NaturalHennaHairCareHyderabadPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/natural-henna-hair-care-hyderabad`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/natural-henna-hair-care-hyderabad`} />
      </Head>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
        <nav>
          <a href="/products">Products</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#reviews">Reviews</a>
          <a href="/how-to-apply">How to Apply</a>
          <a href="/order">Order</a>
        </nav>
      </header>

      <main className="ingredient-page local-seo-page">
        <header className="apply-hero local-seo-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural henna hair care paste" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/">Back to Vedhenna</a>
            <p className="eyebrow">Natural henna hair care paste</p>
            <h1>Natural henna hair care paste in Hyderabad, delivered across India.</h1>
            <p>
              Vedhenna is a Hyderabad-based herbal hair care paste made with traditional ingredients for natural color,
              conditioning, and everyday hair wellness.
            </p>
          </div>
        </header>

        <section className="local-seo-grid" aria-label="Vedhenna natural henna hair care highlights">
          <article className="ingredient-info-card">
            <h2>Based in Hyderabad</h2>
            <p>
              Vedhenna is located in Hyderabad, Telangana, India, and serves customers looking for a natural henna hair care
              paste with direct ordering support.
            </p>
          </article>

          <article className="ingredient-info-card">
            <h2>Delivered across India</h2>
            <p>
              Customers outside Hyderabad can also place an order. Delivery charges may apply for addresses outside Hyderabad,
              and we confirm details before processing the order.
            </p>
          </article>

          <article className="ingredient-info-card">
            <h2>Made with traditional herbs</h2>
            <p>
              The Vedhenna blend includes Amla, Reetha, Shikakai, Bhringraj, Kathha, Hibiscus flowers, Fenugreek seeds, and
              Amaltas.
            </p>
          </article>
        </section>

        <section className="local-seo-content">
          <div className="section-heading">
            <p className="eyebrow">Why customers choose Vedhenna</p>
            <h2>A simple herbal hair care paste for color and conditioning.</h2>
            <p>
              Vedhenna is for customers who prefer a natural henna hair care paste, familiar botanical ingredients, and a straightforward
              ordering process. Customers have shared feedback about softer-feeling hair, a richer burgundy-blackish color tone,
              thoughtful packaging, and easy-to-follow application instructions.
            </p>
          </div>

          <div className="local-seo-actions">
            <a className="button primary" href="/order">Order Vedhenna</a>
            <a className="button secondary" href="/how-to-apply">How to apply</a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
