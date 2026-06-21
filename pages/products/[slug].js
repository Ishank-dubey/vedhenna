import Head from 'next/head';
import SiteFooter from '../../components/SiteFooter';
import { getProductApplyPath, getProductBySlug, products } from '../../data/products';

const siteUrl = 'https://www.vedhenna.com';
const ingredientSlugs = {
  Amla: 'amla',
  Reetha: 'reetha',
  Shikakai: 'shikakai',
  Bhringraj: 'bhringraj',
  Kathha: 'kathha',
  'Hibiscus flowers': 'hibiscus-flowers',
  'Fenugreek seeds': 'fenugreek-seeds',
  Amaltas: 'amaltas'
};

export default function ProductPage({ product }) {
  const title = `${product.name} | Vedhenna`;
  const description = `${product.name}: ${product.heroLine}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/products/${product.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${siteUrl}/products/${product.slug}`} />
      </Head>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
        <nav>
          <a className="active" href="/products" aria-current="page">Products</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#reviews">Reviews</a>
          <a href={getProductApplyPath(product)}>How to Apply</a>
          <a href={`/order?product=${product.slug}`}>Order</a>
        </nav>
      </header>

      <main className="ingredient-page product-page">
        <header className="apply-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt={`${product.name} by Vedhenna`} />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/products">Back to products</a>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p>{product.heroLine}</p>
            <div className="local-seo-actions">
              <a className="button primary" href={`/order?product=${product.slug}`}>
                Order now
              </a>
              <a className="button secondary" href={getProductApplyPath(product)}>
                How to apply
              </a>
            </div>
          </div>
        </header>

        <section className="product-detail-section">
          <article className="ingredient-info-card product-summary-card">
            <p className="eyebrow">Product details</p>
            <h2>{product.name}</h2>
            <p>{product.detail}</p>
            <dl className="product-facts">
              <div>
                <dt>Unit</dt>
                <dd>{product.unit}</dd>
              </div>
              <div>
                <dt>Introductory price</dt>
                <dd>{product.introductoryPrice}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{product.status}</dd>
              </div>
            </dl>
          </article>

          <article className="ingredient-info-card">
            <p className="eyebrow">Ingredients</p>
            <h2>What goes into this product</h2>
            <p>{product.ingredientNote}</p>
            <div className="ingredient-list product-ingredient-list">
              {product.ingredients.map((ingredient) => {
                const slug = ingredientSlugs[ingredient];

                return slug ? (
                  <a className="ingredient-chip" href={`/ingredients/${slug}`} key={ingredient}>
                    {ingredient}
                  </a>
                ) : (
                  <span className="ingredient-chip product-ingredient-chip" key={ingredient}>
                    {ingredient}
                  </span>
                );
              })}
            </div>
          </article>

          <article className="ingredient-info-card">
            <p className="eyebrow">Benefits</p>
            <h2>Why customers may choose it</h2>
            <ul>
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="ingredient-info-card">
            <p className="eyebrow">Application</p>
            <h2>Product-aware guidance</h2>
            <p>{product.applyIntro}</p>
            <div className="ingredient-actions">
              <a className="button primary" href={getProductApplyPath(product)}>
                Read how to apply
              </a>
              <a className="button secondary" href={`/order?product=${product.slug}`}>
                Start order
              </a>
            </div>
          </article>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: products.map((product) => ({
      params: { slug: product.slug }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      product: getProductBySlug(params.slug)
    }
  };
}
