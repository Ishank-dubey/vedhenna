import Head from 'next/head';
import SiteFooter from '../components/SiteFooter';

const siteUrl = 'https://www.vedhenna.com';
const title = 'Vedhenna Usage and Benefits | Natural Hair Blend';
const description =
  'Vedhenna is a 100% natural hair blend made to enrich hair color naturally, with botanical ingredients, easy use, and no preservatives or chemicals.';

export default function UsageAndBenefitsPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/usage-and-benefits`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/usage-and-benefits`} />
      </Head>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
        <nav>
          <a href="/#product">Product</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#rates">Price</a>
          <a href="/#reviews">Reviews</a>
          <a href="/how-to-apply">How to Apply</a>
          <a href="/#order-name-target">Order</a>
        </nav>
      </header>

      <main className="ingredient-page usage-page">
        <header className="apply-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural hair blend" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/">Back to Vedhenna</a>
            <p className="eyebrow">Usage and benefits</p>
            <h1>100% natural hair blend for natural color care.</h1>
            <p>
              Vedhenna is made to enrich hair color naturally while supporting everyday hair care through familiar botanical
              ingredients.
            </p>
          </div>
        </header>

        <section className="usage-benefits-grid" aria-label="Vedhenna usage and benefits">
          <article className="ingredient-info-card">
            <h2>Color your hair naturally</h2>
            <p>
              Vedhenna helps enrich hair color naturally with a herbal blend designed for a deeper, naturally inspired finish.
            </p>
          </article>

          <article className="ingredient-info-card">
            <h2>Botanical hair care benefits</h2>
            <p>
              Ingredients such as Amla, Reetha, Shikakai, Bhringraj, Kathha, Hibiscus, Fenugreek, and Amaltas support a
              traditional botanical hair care routine.
            </p>
          </article>

          <article className="ingredient-info-card">
            <h2>Easy to use</h2>
            <p>
              The product comes with application guidance and gloves, making it easier to follow the usage steps at home.
            </p>
          </article>

          <article className="ingredient-info-card">
            <h2>No preservatives or chemicals</h2>
            <p>
              Vedhenna is positioned as a natural hair blend, with no preservatives or added chemicals in the product.
            </p>
          </article>
        </section>

        <section className="usage-content">
          <div className="section-heading">
            <p className="eyebrow">How it fits your routine</p>
            <h2>Use Vedhenna when you want natural color care with simple application.</h2>
            <p>
              Apply Vedhenna on non-oiled hair, wear the supplied gloves, leave it on for 2-3 hours, and rinse thoroughly
              with water. For richer color, avoid shampoo immediately and wash with shampoo the next day.
            </p>
          </div>
          <div className="local-seo-actions">
            <a className="button primary" href="/#order-name-target">Order Vedhenna</a>
            <a className="button secondary" href="/how-to-apply">How to apply</a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
