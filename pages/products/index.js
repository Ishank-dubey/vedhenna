import Head from 'next/head';
import SiteFooter from '../../components/SiteFooter';
import { products } from '../../data/products';

const siteUrl = 'https://www.vedhenna.com';
const title = 'Vedhenna Product Catalogue | Natural Hair Care';
const description =
  'Explore Vedhenna Henna Paste and Vedhenna Hair Pack, two botanical hair care products from Hyderabad.';

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/products`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/products`} />
      </Head>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
        <nav>
          <a className="active" href="/products" aria-current="page">Products</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#reviews">Reviews</a>
          <a href="/how-to-apply">How to Apply</a>
          <a href="/order">Order</a>
        </nav>
      </header>

      <main className="ingredient-page product-catalogue-page">
        <header className="apply-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural hair care products" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/">Back to Vedhenna</a>
            <p className="eyebrow">Product catalogue</p>
            <h1>Vedhenna natural hair care products</h1>
            <p>
              Choose between the original Vedhenna Henna Paste and the new Vedhenna Hair Pack. Both products are
              built around familiar botanical hair care ingredients and direct ordering support.
            </p>
          </div>
        </header>

        <section className="section product-catalogue-section">
          <div className="section-heading">
            <p className="eyebrow">Catalogue</p>
            <h2>Two Vedhenna products for natural color care.</h2>
            <p>
              Review the product details, ingredients, price status, and application guidance before starting your order.
            </p>
          </div>
          <div className="product-grid catalogue-grid">
            {products.map((product) => (
              <article className="product-card" key={product.slug}>
                <p className="eyebrow">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
                <div className="product-card-meta">
                  <span>{product.introductoryPrice}</span>
                  <span>{product.status}</span>
                </div>
                <div className="product-card-actions">
                  <a className="button primary" href={`/products/${product.slug}`}>View product</a>
                  <a className="button secondary" href={`/order?product=${product.slug}`}>
                    Order now
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
