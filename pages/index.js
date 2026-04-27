import Head from 'next/head';
import { useEffect, useState } from 'react';

const seo = {
  title: 'Vedhenna | Natural Hair Care',
  description:
    'Vedhenna is a natural hair care product made with Amla, Reetha, Shikakai, Bhringraj, Kathha, and Hibiscus flowers for color, conditioning, growth support, and reduced hairfall'
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
  location: 'Serving your neighborhood',
  heroImage: '/business-image.svg',
  ingredients: ['Amla', 'Reetha', 'Shikakai', 'Bhringraj', 'Kathha', 'Hibiscus flowers', 'Fenugreek seeds', 'Amaltas'],
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
      unit: '1 pack',
      rate: '399/month',
      availability: 'Available today'
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
        'Fast, professional, and easy to work with. The booking process was simple and the result was exactly what we needed.',
      name: 'Maya R.'
    },
    {
      quote:
        'They explained everything clearly, arrived on time, and made the whole thing feel effortless.',
      name: 'Daniel K.'
    }
  ]
};

const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>;
const navLinks = [
  ['product', 'Product'],
  ['ingredients', 'Ingredients'],
  ['rates', 'Rates'],
  ['reviews', 'Reviews'],
  ['social', 'Social'],
  ['contact', 'Contact']
];

export default function Home() {
  const [formStatus, setFormStatus] = useState('');
  const [activeSection, setActiveSection] = useState('product');
  const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`;

  useEffect(() => {
    const sections = navLinks
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const whatsappMessage = [
      business.whatsappMessage,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`
    ].join('\n');
    const formWhatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    setFormStatus('Opening WhatsApp with your message...');
    window.open(formWhatsappLink, '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Head>
      <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${business.name} home`}>
          <span className="brand-mark">B</span>
          <span>{business.name}</span>
        </a>
        <nav>
          {navLinks.map(([id, label]) => (
            <a
              className={activeSection === id ? 'active' : ''}
              href={`#${id}`}
              key={id}
              onClick={() => setActiveSection(id)}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
          <a className="nav-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
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
            <a className="button whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
              <Icon>WA</Icon>
              Chat on WhatsApp
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
              <div className="card-icon">OK</div>
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
            <span className="ingredient-chip" key={ingredient}>{ingredient}</span>
          ))}
        </div>
        <div className="benefit-grid">
          {business.benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="card-icon">OK</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rates-section" id="rates">
        <div className="section-heading">
          <p className="eyebrow">Product Rates</p>
          <h2>Today&apos;s Vedhenna rate.</h2>
          <p>
            Keep the current price visible for customers. This table is ready for more rows whenever you add more products.
          </p>
        </div>
        <div className="rates-table-wrap">
          <table className="rates-table">
            <caption>Current product rate</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Unit</th>
                <th scope="col">Rate</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {business.productRates.map((item) => (
                <tr key={item.product}>
                  <th scope="row">{item.product}</th>
                  <td>{item.unit}</td>
                  <td className="rate-value">{item.rate}</td>
                  <td><span className="rate-status">{item.availability}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rates-note">
          Delivery within Hyderabad is handled as per the listed rate. For delivery addresses outside Hyderabad, an additional delivery charge may apply.
        </p>
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">Why Customers Choose Us</p>
          <h2>Natural ingredients, clear rates, and quick WhatsApp ordering.</h2>
        </div>
        <div className="feature-list">
          <p><Icon>OK</Icon>Made with familiar herbs used in traditional hair care</p>
          <p><Icon>OK</Icon>Single product page keeps ordering simple</p>
          <p><Icon>OK</Icon>WhatsApp link makes customer questions quick to answer</p>
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
          <p className="eyebrow">Contact</p>
          <h2>Send your Vedhenna inquiry on WhatsApp.</h2>
          <p>
            Share your name, email, and question. The form will open WhatsApp with your message ready to send.
          </p>
          <div className="contact-options">
            <a className="whatsapp-link" href={whatsappLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            <a href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <span>{business.location}</span>
          </div>
        </div>
        <form className="contact-form" name="contact" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
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
          <button className="button primary" type="submit">
            <Icon>&gt;</Icon>
            Open WhatsApp
          </button>
          {formStatus ? <p className="form-status" role="status">{formStatus}</p> : null}
        </form>
      </section>

      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        WA
      </a>
      </main>
    </>
  );
}
