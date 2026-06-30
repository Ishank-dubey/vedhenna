import Head from 'next/head';
import { useEffect, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import { ingredientPages } from '../data/ingredients';
import { defaultProduct, getProductApplyPath, products } from '../data/products';

const seo = {
  title: 'Vedhenna | Natural Hair Care',
  description:
    'Vedhenna is a Hyderabad-based natural henna hair care paste with Amla, Reetha, Shikakai, Bhringraj and herbs, delivered across India.',
  url: 'https://www.vedhenna.com/',
  socialImage: '/vedhenna-social.jpg'
};

const business = {
  name: 'Vedhenna',
  category: 'Natural hair care',
  headline: 'Herbal hair care products made with trusted botanical ingredients.',
  intro:
    'Hyderabad-based natural hair care products crafted with traditional herbs for rich color, conditioning, and delivery across India.',
  phone: '+91 98286 08796',
  whatsappNumber: '919828608796',
  email: 'preetisharma.0613@gmail.com',
  instagramUrl: 'https://www.instagram.com/vedhennabypreeti/',
  location: 'Located in Hyderabad, Telangana, India',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',
  heroImage: '/vedhenna-hero.jpg',
  ingredients: ingredientPages,
  products,
  benefits: [
    {
      title: 'Hair growth support',
      description: 'A herbal blend selected to support stronger-looking, healthier-feeling hair.'
    },
    {
      title: 'Deep natural color',
      description: 'Helps deliver a rich, naturally inspired tone without a harsh artificial look.'
    },
    {
      title: 'Conditioning care',
      description: 'Leaves hair feeling smoother, softer, and easier to manage after use.'
    },
    {
      title: 'Helps reduce hairfall',
      description: 'Supports regular hair care routines focused on reducing breakage and hairfall.'
    }
  ],
  stats: [
    ['8', 'botanical ingredients', '#ingredients'],
    ['2', 'Vedhenna products', '/products'],
    ['', 'Read about the hair care benefits of Vedhenna products', '/usage-and-benefits']
  ],
  reviews: [
    {
      quote:
        'It is really good! It gave my hair a beautiful color and worked as an excellent conditioner too. My hair is naturally curly and frizzy, but your henna made it so much smoother. I am really happy with the results. I feel like applying it again and again. Please keep continuing the great work and maintain the same high quality. Wishing you all the very best and good luck. May your product become even better and reach many more people.',
      name: 'Jhanshi'
    },
    {
      quote:
        'Of all the hennas I have tried, this one is the best. I do not see any gray hair after a day; the color turns either black or maroon, which was not the case with previous organic henna I tried. As for frizz, my hair feels less frizzy compared to when I have used other henna products, though it is not completely frizz-free. I think that may be due to my natural hair type rather than the henna itself.',
      name: 'Bindu'
    },
    {
      quote:
        'I really liked it. It gave my hair a beautiful, rich colour and left it feeling soft, smooth, and healthy. The application was easy, and the results looked very natural.',
      name: 'Chandni'
    },
    {
      quote:
        'I am so happy to see you start this, Preeti! It takes me right back to our school days when I would watch you carefully mix henna, amla, reetha, and other herbs in an iron pot. Even then, you were so passionate about natural hair care and always shared the amazing benefits of this herbal blend. I love that you are now bringing your own tried-and-tested recipe, one you have trusted for years, to others. Wishing you all the success in this wonderful journey. More power to you!',
      name: 'Deepti'
    },
    {
      quote:
        'This is my first Vedhenna order. It came in a lovely hand-packaged bag, with a pair of gloves for applying the henna. The henna is in a vacuum pack, and there is a handwritten note with instructions on how to apply it!',
      name: 'Ria'
    },
    {
      quote:
        'The mehndi is really good. What makes it different is that it does not give an orange color, but a nice burgundy and blackish color. I also really feel that my hair has become softer and cannot stop touching it. Highly recommended! Will order the next batch soon!',
      name: 'Nazia'
    },
    {
      quote:
        'I have used Vedhenna. It is awesome as it makes the hair soft, shining, and thick. Loved the natural chemical-free care for my hair!',
      name: 'Shweta'
    }
  ]
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: business.name,
  url: seo.url,
  image: `${seo.url.replace(/\/$/, '')}${seo.socialImage}`,
  description: seo.description,
  email: business.email,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.city,
    addressRegion: business.region,
    addressCountry: business.country
  },
  areaServed: {
    '@type': 'City',
    name: business.city
  },
  sameAs: [business.instagramUrl]
};

const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>;
const loveFeatures = [
  ['Helps reduce hair fall', '/reduce_hairfall.png', 'Hair fall reduction'],
  ['Supports healthy hair growth', '/supports_healthy_hair_growth.png', 'Healthy hair growth'],
  ['Nourishes and repairs', '/nourishes_repairs.png', 'Hair nourishment and repair'],
  ['100% herbal and chemical free', '/chemical_free.png', 'Chemical free herbal care'],
  ['Strengthens from roots', '/from_root_strength.png', 'Hair strength from roots'],
  ['Ready to apply', '/ready_to_apply.png', 'Ready to apply Vedhenna']
];
const perfectForFeatures = [
  ['Hair fall concerns', '/hair_fall_concerns.png', 'Hair fall concerns'],
  ['Weak and thinning hair', '/weak_thinning.png', 'Weak and thinning hair'],
  ['Dry and dull hair', '/dry_dull.png', 'Dry and dull hair'],
  ['Dry and itchy scalp', '/Dry_itchy_scalp.png', 'Dry and itchy scalp']
];
const navLinks = [
  ['product', 'Products'],
  ['ingredients', 'Ingredients'],
  ['reviews', 'Reviews'],
  ['how-to-apply', 'How to Apply', '/how-to-apply'],
  ['order', 'Order', '/order']
];

const monthBannerStorageKey = 'vedhenna-month-banner-dismissed';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');
  const [showMonthBanner, setShowMonthBanner] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const socialImageUrl = siteUrl ? `${siteUrl}${seo.socialImage}` : seo.socialImage;

  const dismissMonthBanner = () => {
    setShowMonthBanner(false);

    try {
      window.localStorage.setItem(monthBannerStorageKey, 'true');
    } catch (error) {
      // If storage is blocked, closing should still work for this page view.
    }
  };

  useEffect(() => {
    try {
      if (window.localStorage.getItem(monthBannerStorageKey) !== 'true') {
        setShowMonthBanner(true);
      }
    } catch (error) {
      setShowMonthBanner(true);
    }
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const activationLine = headerHeight + 48;
      const hero = document.getElementById('top');
      const heroBottom = hero?.getBoundingClientRect().bottom || 0;
      let currentSectionId = '';
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isNearViewport = rect.bottom >= activationLine && rect.top <= window.innerHeight;
        const distance = Math.abs(rect.top - activationLine);

        if (isNearViewport && distance < closestDistance) {
          closestDistance = distance;
          currentSectionId = section.id;
        }
      });

      setActiveSection(currentSectionId);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!showMonthBanner) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        dismissMonthBanner();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [showMonthBanner]);

  const handleBannerOrder = () => {
    dismissMonthBanner();
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={socialImageUrl} />
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </Head>
      {showMonthBanner && (
        <div
          className="month-banner-backdrop"
          role="presentation"
          onClick={dismissMonthBanner}
        >
          <aside
            className="month-banner-dialog"
            aria-label="Vedhenna one month banner"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="month-banner-close"
              type="button"
              aria-label="Close banner"
              onClick={dismissMonthBanner}
            >
              &times;
            </button>
            <img
              className="month-banner-image"
              src="/vedhenna-month-banner.jpeg"
              alt="Vedhenna one month celebration banner"
            />
            <div className="month-banner-actions">
              <a className="button primary" href="/order" onClick={handleBannerOrder}>
                Order now
              </a>
            </div>
          </aside>
        </div>
      )}
      <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${business.name} home`}>
          <span>{business.name}</span>
        </a>
        <nav>
          {navLinks.map(([id, label, href]) => (
            <a
              className={activeSection === id ? 'active' : ''}
              href={href || `#${id}`}
              key={id}
              onClick={() => {
                if (!href) {
                  setActiveSection(id);
                }
              }}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src={business.heroImage}
          alt={`${business.name} business image`}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">{business.category}</p>
          <h1>{business.name}</h1>
          <p className="hero-title">{business.headline}</p>
          <p className="hero-copy">{business.intro}</p>
          <div className="hero-actions">
            <a className="button whatsapp" href="/order">
              <Icon>&gt;</Icon>
              Order now
            </a>
            <a className="button secondary" href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}>
              <Icon>#</Icon>
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Business highlights">
        {business.stats.map(([value, label, href]) => {
          const StatElement = href ? 'a' : 'div';

          return (
            <StatElement className={`stat ${value ? '' : 'stat-text-only'}`} href={href} key={label}>
              {value ? <strong>{value}</strong> : null}
              <span>{label}</span>
            </StatElement>
          );
        })}
      </section>

      <section className="section" id="product">
        <div className="section-heading">
          <p className="eyebrow">The Products</p>
          <h2>Vedhenna now has a small natural hair care catalogue.</h2>
          <p>
            Choose from the original Vedhenna Henna Paste or the new Vedhenna Hair Pack. Both are made around familiar botanical hair care ingredients and are available for ordering from Hyderabad.
          </p>
          <a className="section-link" href="/products">
            View full product catalogue
          </a>
        </div>
        <div className="product-grid">
          {business.products.map((product) => (
            <article className="product-card" key={product.slug}>
              <p className="eyebrow">{product.category}</p>
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
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

      <section className="ingredients-section" id="ingredients">
        <div className="section-heading compact">
          <p className="eyebrow">Ingredients</p>
          <h2>Made with eight herbal ingredients.</h2>
        </div>
        <div className="ingredient-list" aria-label="Vedhenna ingredients">
          {business.ingredients.map((ingredient) => (
            <a className="ingredient-chip" href={`/ingredients/${ingredient.slug}`} key={ingredient.slug}>
              {ingredient.name}
            </a>
          ))}
        </div>
        <div className="how-to-apply">
          <h3>How to apply</h3>
          <p>Select the product on the application page to see product-aware guidance.</p>
          <a href={getProductApplyPath(defaultProduct)}>Read application guidance</a>
        </div>
        <div className="benefit-grid">
          {business.benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">Why Customers Choose Us</p>
          <h2>Herbal hair care made for strength, nourishment, and easy use.</h2>
        </div>
        <div className="feature-groups">
          <div className="feature-list">
            <h3>Why you will love it</h3>
            {loveFeatures.map(([label, image, alt]) => (
              <p className="feature-row" key={label}>
                <img src={image} alt={alt} />
                <span>{label}</span>
              </p>
            ))}
          </div>
          <div className="feature-list feature-list-compact">
            <h3>Perfect for</h3>
            {perfectForFeatures.map(([label, image, alt]) => (
              <p className="feature-row" key={label}>
                <img src={image} alt={alt} />
                <span>{label}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="section-heading compact">
          <p className="eyebrow">Reviews</p>
          <h2>Trusted by local customers.</h2>
        </div>
        <div className="review-grid">
          {business.reviews.map((review) => (
            <blockquote className="review-card" key={review.name}>
              <p>"{review.quote}"</p>
              <footer>{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="social-section" id="social">
        <div className="section-heading">
          <p className="eyebrow">Social Media</p>
          <h2>Follow Vedhenna on Instagram.</h2>
          <p>
            See updates, product posts, and customer-friendly hair care content from Vedhenna by Preeti.
          </p>
        </div>
        <a className="social-card" href={business.instagramUrl} target="_blank" rel="noreferrer">
          <span className="social-icon instagram-icon" aria-hidden="true">
            <span className="instagram-lens" />
            <span className="instagram-dot" />
          </span>
          <span>
            <strong>@vedhennabypreeti</strong>
            <small>Open Instagram page</small>
          </span>
        </a>
      </section>

      <section className="contact-details" aria-label="Contact details">
        <p className="eyebrow">Contact Details</p>
        <div className="contact-details-list">
          <a href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}>{business.phone}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <span>{business.location}</span>
        </div>
      </section>

      <SiteFooter />

      </main>
    </>
  );
}
