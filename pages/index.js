import Head from 'next/head';
import { useEffect, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import { ingredientPages } from '../data/ingredients';

const seo = {
  title: 'Vedhenna | Natural Hair Care',
  description:
    'Vedhenna natural hair care with Amla, Reetha, Shikakai, Bhringraj, Kathha, Hibiscus, Fenugreek and Amaltas for color, conditioning and hairfall care.',
  url: 'https://www.vedhenna.com/',
  socialImage: '/vedhenna-social.jpg'
};

const business = {
  name: 'Vedhenna',
  category: 'Natural hair care',
  headline: 'Herbal hair care made with trusted botanical ingredients.',
  intro:
    'A natural hair care product crafted with traditional herbs for rich color, conditioning, and everyday hair wellness.',
  phone: '+91 98286 08796',
  whatsappNumber: '919828608796',
  whatsappMessage: 'I want to order Vedhenna - quantity, my address for delivery is',
  email: 'preetisharma.0613@gmail.com',
  instagramUrl: 'https://www.instagram.com/vedheenabypreeti?igsh=eWh6aWNvZ2JiNGhj',
  location: 'Located in Hyderabad, Telangana, India',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',
  heroImage: '/vedhenna-hero.jpg',
  ingredients: ingredientPages,
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
  services: [
    {
      title: 'Natural blend',
      description: 'Made with Amla, Reetha, Shikakai, Bhringraj, Kathha, Hibiscus flowers, Fenugreek seeds, and Amaltas.',
      price: '8 herbs'
    },
    {
      title: 'Hair color care',
      description: 'Designed for deep natural color while keeping hair care gentle and simple.',
      price: 'Natural tone'
    },
    {
      title: 'Daily confidence',
      description: 'Supports conditioning, hair growth care, and reduced hairfall in one product.',
      price: 'All-in-one'
    }
  ],
  productRates: [
    {
      product: 'Vedhenna Hair Care',
      unit: '400ML',
      usualRate: 'Rs 499',
      introductoryRate: 'Rs 299',
      availability: 'Introductory offer'
    }
  ],
  stats: [
    ['8', 'botanical ingredients'],
    ['1', 'signature product'],
    ['4', 'key hair care benefits']
  ],
  reviews: [
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
      quote: 'Highly effective and natural.',
      name: 'Akanksha'
    },
    {
      quote: 'Good job Preeti on putting together this formula.',
      name: 'Bhawna'
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
const navLinks = [
  ['product', 'Product'],
  ['ingredients', 'Ingredients'],
  ['rates', 'Price'],
  ['reviews', 'Reviews'],
  ['social', 'Social'],
  ['contact', 'Order']
];

const isLikelyMobileDevice = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function Home() {
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [fallbackEmailLink, setFallbackEmailLink] = useState('');
  const [showMobileFallback, setShowMobileFallback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('product');
  const [highlightNameField, setHighlightNameField] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const socialImageUrl = siteUrl ? `${siteUrl}${seo.socialImage}` : seo.socialImage;
  const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`;
  const emailFallbackLink = `mailto:${business.email}?subject=${encodeURIComponent('Vedhenna inquiry')}&body=${encodeURIComponent(business.whatsappMessage)}`;

  const getContactEmailLink = ({ name, email, phone, address, message }) => {
    const emailLines = [
      business.whatsappMessage,
      '',
      `Name: ${name}`,
      `Email: ${email}`
    ];

    if (phone) {
      emailLines.push(`Phone: ${phone}`);
    }

    if (address) {
      emailLines.push(`Delivery address: ${address}`);
    }

    emailLines.push('', 'Message:', message);

    return `mailto:${business.email}?subject=${encodeURIComponent('Vedhenna inquiry')}&body=${encodeURIComponent(emailLines.join('\n'))}`;
  };

  const getContactWhatsappLink = ({ name, email, phone, address, message }) => {
    const whatsappLines = [
      business.whatsappMessage,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Delivery address: ${address}`
    ];

    if (phone) {
      whatsappLines.push(`Phone: ${phone}`);
    }

    whatsappLines.push(`Message: ${message}`);

    return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(whatsappLines.join('\n'))}`;
  };

  useEffect(() => {
    const sections = navLinks
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      const activationLine = headerHeight + 48;
      let currentSectionId = sections[0]?.id || 'product';
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
    if (activeSection !== 'contact') {
      return undefined;
    }

    setHighlightNameField(true);
    const timer = window.setTimeout(() => setHighlightNameField(false), 1800);

    return () => window.clearTimeout(timer);
  }, [activeSection]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const message = formData.get('message');
    const contactDetails = { name, email, phone, address, message };

    setFormError('');
    setShowMobileFallback(false);
    setIsSubmitting(true);

    if (isLikelyMobileDevice()) {
      setFallbackEmailLink(getContactEmailLink(contactDetails));
      setFormStatus('If WhatsApp did not open, use Email or Call.');
      setShowMobileFallback(true);
      window.open(getContactWhatsappLink(contactDetails), '_blank', 'noopener,noreferrer');
      form.reset();
      setIsSubmitting(false);
      return;
    }

    setFormStatus('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactDetails)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Message could not be sent right now.');
      }

      setFormStatus('Email sent. We will get back soon.');
      form.reset();
    } catch (error) {
      setFormStatus('');
      setFallbackEmailLink(getContactEmailLink(contactDetails));
      setFormError(`${error.message} You can still contact us by WhatsApp, phone, or email.`);
    } finally {
      setIsSubmitting(false);
    }
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
      <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${business.name} home`}>
          <span>{business.name}</span>
        </a>
        <nav>
          {navLinks.map(([id, label]) => (
            <a
              className={activeSection === id ? 'active' : ''}
              href={id === 'contact' ? '#order-name-target' : `#${id}`}
              key={id}
              onClick={() => setActiveSection(id)}
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
            <a className="button whatsapp" href="#order-name-target" onClick={() => setActiveSection('contact')}>
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
        {business.stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section" id="product">
        <div className="section-heading">
          <p className="eyebrow">The Product</p>
          <h2>Vedhenna brings traditional herbs into simple hair care.</h2>
          <p>
            A single product today, focused on natural color, conditioning, hair growth support, and helping reduce hairfall.
          </p>
        </div>
        <div className="service-grid">
          {business.services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span>{service.price}</span>
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
          <p>Open the packet, wear the gloves provided, and apply the henna.</p>
          <a href="/how-to-apply">Read application guidance</a>
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

      <section className="rates-section" id="rates">
        <div className="section-heading">
          <p className="eyebrow">Product Price</p>
          <h2>Today&apos;s Vedhenna price.</h2>
          <p>
            Vedhenna is available at an introductory price for a limited time, with the usual price shown for clarity.
          </p>
        </div>
        <div className="rates-table-wrap">
          <table className="rates-table">
            <caption>Current product rate</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Unit</th>
                <th scope="col">Usual Price</th>
                <th scope="col">Introductory Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {business.productRates.map((item) => (
                <tr key={item.product}>
                  <th scope="row">{item.product}</th>
                  <td>{item.unit}</td>
                  <td className="usual-rate">{item.usualRate}</td>
                  <td className="rate-value">{item.introductoryRate}</td>
                  <td><span className="rate-status">{item.availability}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rates-note">
          The introductory price is Rs 299 for 400ML; the usual price is Rs 499. Delivery within Hyderabad is handled as per the listed rate. For delivery addresses outside Hyderabad, an additional delivery charge may apply.
        </p>
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">Why Customers Choose Us</p>
          <h2>Natural ingredients, clear rates, and quick WhatsApp ordering.</h2>
        </div>
        <div className="feature-list">
          <p>Made with familiar herbs used in traditional hair care</p>
          <p>Single product page keeps ordering simple</p>
          <p>WhatsApp link makes customer questions quick to answer</p>
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
            <strong>@vedheenabypreeti</strong>
            <small>Open Instagram page</small>
          </span>
        </a>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="eyebrow">Order</p>
          <h2>Start your Vedhenna order.</h2>
          <p>
            Share your details and delivery address to initiate your order. We will review it and get back to you soon.
          </p>
        </div>
        <form className="contact-form" name="contact" onSubmit={handleSubmit}>
          <label id="order-name-target" htmlFor="order-name">
            Name
            <input
              className={highlightNameField ? 'field-focus-cue' : ''}
              id="order-name"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label className="desktop-only-field">
            Phone <span className="optional-label">Optional</span>
            <input type="tel" name="phone" placeholder="+91 98765 43210" />
          </label>
          <label>
            Address
            <textarea
              name="address"
              rows="3"
              placeholder="Delivery address"
              required
            />
          </label>
          <label>
            What can we help with?
            <textarea
              name="message"
              rows="5"
              placeholder={business.whatsappMessage}
              required
            />
          </label>
          <button className="button primary" type="submit" disabled={isSubmitting}>
            <Icon>&gt;</Icon>
            {isSubmitting ? 'Sending...' : 'Place order'}
          </button>
          {formStatus ? (
            <p className={`form-status ${formStatus.includes('Email sent') ? 'success' : ''}`} role="status">
              {formStatus}
            </p>
          ) : null}
          {showMobileFallback ? (
            <div className="form-fallbacks mobile-fallback" aria-label="Contact fallback options">
              <a href={fallbackEmailLink || emailFallbackLink}>Email</a>
              <a href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}>Call</a>
            </div>
          ) : null}
          {formError ? (
            <div className="form-status error" role="alert">
              <p>{formError}</p>
              <div className="form-fallbacks">
                <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href={fallbackEmailLink || emailFallbackLink}>Email</a>
              </div>
            </div>
          ) : null}
        </form>
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
