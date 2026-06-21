import Head from 'next/head';
import SiteFooter from './SiteFooter';
import { products } from '../data/products';

const siteUrl = 'https://www.vedhenna.com';
const shortVideoUrl = 'https://drive.google.com/file/d/1bvbESTxR0ltzB1GHDkGsTKbfMSBAhmG1/view?usp=sharing';
const detailedVideoUrl = 'https://drive.google.com/file/d/1FICyIwqDKhRJds2PNtxps8wWjNG2_Yi0/view?usp=sharing';

export default function HowToApplyContent({ selectedProduct }) {
  const showHennaVideos = selectedProduct.slug === 'vedhenna-henna-paste';
  const title = `How to Apply ${selectedProduct.name}`;
  const description =
    `${selectedProduct.name} application guidance: apply on non-oiled hair, wear gloves, apply evenly, rinse with water, and follow the Vedhenna after-care notes.`;
  const canonicalPath = selectedProduct.slug === 'vedhenna-henna-paste'
    ? '/how-to-apply'
    : `/how-to-apply/${selectedProduct.slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${canonicalPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}${canonicalPath}`} />
      </Head>

      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Vedhenna home">
          <span>Vedhenna</span>
        </a>
        <nav>
          <a href="/products">Products</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#reviews">Reviews</a>
          <a className="active" href={canonicalPath} aria-current="page">How to Apply</a>
          <a href={`/order?product=${selectedProduct.slug}`}>Order</a>
        </nav>
      </header>

      <main className="ingredient-page apply-page">
        <header className="apply-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna natural hair care branding" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/products">Back to products</a>
            <p className="eyebrow">How to apply</p>
            <h1>How to apply {selectedProduct.name}</h1>
            <p>{selectedProduct.applyIntro}</p>
          </div>
        </header>

        <section className="apply-product-selector" aria-label="Choose product application guidance">
          <div className="section-heading compact">
            <p className="eyebrow">Choose product</p>
            <h2>Application guidance by product.</h2>
          </div>
          <div className="ingredient-list">
            {products.map((product) => {
              const productPath = product.slug === 'vedhenna-henna-paste'
                ? '/how-to-apply'
                : `/how-to-apply/${product.slug}`;

              return (
                <a
                  className={product.slug === selectedProduct.slug ? 'ingredient-chip active-chip' : 'ingredient-chip'}
                  href={productPath}
                  key={product.slug}
                >
                  {product.name}
                </a>
              );
            })}
          </div>
        </section>

        <section className="apply-steps" aria-label="Vedhenna application steps">
          <article className="ingredient-info-card apply-card">
            <h2>Before you begin</h2>
            <ul>
              <li>Do not apply {selectedProduct.shortName} on oiled hair.</li>
              <li>Read the handwritten instruction note included with your order.</li>
              <li>Keep the supplied gloves ready before opening the product pack.</li>
            </ul>
          </article>

          <article className="ingredient-info-card apply-card">
            <h2>Apply {selectedProduct.shortName}</h2>
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
            <a className="button primary apply-order-link" href={`/order?product=${selectedProduct.slug}`}>
              Order {selectedProduct.shortName}
            </a>
          </article>
        </section>

        <section className="apply-videos" aria-label="Vedhenna video instructions">
          <div className="section-heading compact">
            <p className="eyebrow">{showHennaVideos ? 'Video instructions' : 'Product instructions'}</p>
            <h2>{showHennaVideos ? 'Watch how to apply Vedhenna Henna Paste.' : `${selectedProduct.name} instructions are being prepared.`}</h2>
            <p>
              {showHennaVideos
                ? 'Start with the short video, or open the detailed walkthrough when you want the full explanation.'
                : 'Use the written product guidance above for now. Detailed photos or video instructions can be added when they are ready.'}
            </p>
          </div>
          {showHennaVideos ? (
            <div className="apply-video-grid">
              <article className="apply-video-card">
                <h3>Short instructions</h3>
                <div className="apply-video-frame">
                  <iframe
                    src="https://drive.google.com/file/d/1bvbESTxR0ltzB1GHDkGsTKbfMSBAhmG1/preview"
                    title="Short Vedhenna Henna Paste application instructions"
                    allow="autoplay"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <a href={shortVideoUrl} target="_blank" rel="noreferrer">Open short video</a>
              </article>
              <article className="apply-video-card">
                <h3>Detailed instructions</h3>
                <div className="apply-video-frame">
                  <iframe
                    src="https://drive.google.com/file/d/1FICyIwqDKhRJds2PNtxps8wWjNG2_Yi0/preview"
                    title="Detailed Vedhenna Henna Paste application instructions"
                    allow="autoplay"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <a href={detailedVideoUrl} target="_blank" rel="noreferrer">Open detailed video</a>
              </article>
            </div>
          ) : null}
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
