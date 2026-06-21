import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import SiteFooter from '../components/SiteFooter';
import { defaultProduct, getProductBySlug, products } from '../data/products';

const siteUrl = 'https://www.vedhenna.com';
const business = {
  phone: '+91 98286 08796',
  whatsappNumber: '919828608796',
  email: 'preetisharma.0613@gmail.com'
};

const isLikelyMobileDevice = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const getInitialQuantities = (selectedSlug = defaultProduct.slug) =>
  products.reduce((quantities, product) => ({
    ...quantities,
    [product.slug]: product.slug === selectedSlug ? 1 : 0
  }), {});

const scrollToOrderForm = (behavior = 'smooth') => {
  const form = document.getElementById('order-form');

  if (!form) {
    return;
  }

  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  const formTop = form.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(0, formTop - headerHeight - 24),
    behavior
  });
};

export default function OrderPage() {
  const router = useRouter();
  const [quantities, setQuantities] = useState(() => getInitialQuantities());
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [fallbackEmailLink, setFallbackEmailLink] = useState('');
  const [showMobileFallback, setShowMobileFallback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const productFromQuery = getProductBySlug(router.query.product) || defaultProduct;
    setQuantities(getInitialQuantities(productFromQuery.slug));

    if (router.query.product) {
      const scrollDelays = [0, 160, 420, 800];
      const timers = scrollDelays.map((delay, index) =>
        window.setTimeout(() => scrollToOrderForm(index === 0 ? 'auto' : 'smooth'), delay)
      );

      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
  }, [router.isReady, router.query.product]);

  const selectedItems = useMemo(
    () => products
      .map((product) => ({
        ...product,
        quantity: quantities[product.slug] || 0
      }))
      .filter((product) => product.quantity > 0),
    [quantities]
  );

  const orderDetails = useMemo(() => {
    if (!selectedItems.length) {
      return 'Please select at least one Vedhenna product.';
    }

    return [
      'I want to order Vedhenna:',
      ...selectedItems.map((product) => `- ${product.name}: ${product.quantity}`),
      '',
      'Delivery address:',
      ''
    ].join('\n');
  }, [selectedItems]);

  const setProductQuantity = (slug, nextQuantity) => {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [slug]: Math.max(0, nextQuantity)
    }));
  };

  const getContactEmailLink = ({ name, email, phone, address, message }) => {
    const emailLines = [
      message,
      '',
      `Name: ${name}`,
      `Email: ${email}`
    ];

    if (phone) {
      emailLines.push(`Phone: ${phone}`);
    }

    emailLines.push(`Delivery address: ${address}`);

    return `mailto:${business.email}?subject=${encodeURIComponent('Vedhenna order')}&body=${encodeURIComponent(emailLines.join('\n'))}`;
  };

  const getContactWhatsappLink = ({ name, email, phone, address, message }) => {
    const whatsappLines = [
      message,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Delivery address: ${address}`
    ];

    if (phone) {
      whatsappLines.push(`Phone: ${phone}`);
    }

    return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(whatsappLines.join('\n'))}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItems.length) {
      setFormError('Please select at least one Vedhenna product before placing the order.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const note = String(formData.get('note') || '').trim();
    const message = note ? `${orderDetails}\nCustomer note:\n${note}` : orderDetails;
    const contactDetails = { name, email, phone, address, message };

    setFormError('');
    setShowMobileFallback(false);
    setIsSubmitting(true);

    if (isLikelyMobileDevice()) {
      setFallbackEmailLink(getContactEmailLink(contactDetails));
      setFormStatus('If WhatsApp did not open, use Email or Call.');
      setShowMobileFallback(true);
      window.open(getContactWhatsappLink(contactDetails), '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      return;
    }

    setFormStatus('Sending your order...');

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
        throw new Error(result.message || 'Order could not be sent right now.');
      }

      setFormStatus('Order sent. We will get back soon.');
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
        <title>Order Vedhenna Products | Natural Hair Care</title>
        <meta
          name="description"
          content="Select Vedhenna products, choose quantities, and start your natural hair care order."
        />
        <link rel="canonical" href={`${siteUrl}/order`} />
        <meta property="og:title" content="Order Vedhenna Products | Natural Hair Care" />
        <meta
          property="og:description"
          content="Select Vedhenna products, choose quantities, and start your natural hair care order."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/order`} />
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
          <a className="active" href="/order" aria-current="page">Order</a>
        </nav>
      </header>

      <main className="order-page">
        <section className="feedback-hero order-hero">
          <img className="apply-hero-image" src="/vedhenna-hero.jpg" alt="Vedhenna product order" />
          <div className="hero-overlay" />
          <div className="apply-hero-content">
            <a href="/products">Back to products</a>
            <p className="eyebrow">Order Vedhenna</p>
            <h1>Select products and start your order.</h1>
            <p>
              Choose the products and quantities below. Your selected product details are added to the order message
              automatically.
            </p>
          </div>
        </section>

        <section className="order-builder" aria-label="Vedhenna order builder">
          <div className="order-products">
            <div className="section-heading compact">
              <p className="eyebrow">Products</p>
              <h2>Choose quantity.</h2>
            </div>
            <div className="order-product-list">
              {products.map((product) => (
                <article className="order-product-row" key={product.slug}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.summary}</p>
                    <span>{product.introductoryPrice} · {product.status}</span>
                  </div>
                  <div className="quantity-control" aria-label={`${product.name} quantity`}>
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name}`}
                      onClick={() => setProductQuantity(product.slug, (quantities[product.slug] || 0) - 1)}
                    >
                      -
                    </button>
                    <strong>{quantities[product.slug] || 0}</strong>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name}`}
                      onClick={() => setProductQuantity(product.slug, (quantities[product.slug] || 0) + 1)}
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form
            className="contact-form order-form"
            id="order-form"
            name="order"
            onSubmit={handleSubmit}
          >
            <div className="order-summary-box">
              <p className="eyebrow">Order summary</p>
              <pre>{orderDetails}</pre>
              <p>
                Delivery or transport fee may be added based on the address. We will confirm the final order details before
                processing.
              </p>
            </div>

            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
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
              <textarea name="address" rows="3" placeholder="Delivery address" required />
            </label>
            <label>
              Note <span className="optional-label">Optional</span>
              <textarea name="note" rows="4" placeholder="Any timing, delivery, or product note..." />
            </label>
            <button className="button primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Place order'}
            </button>
            {formStatus ? (
              <p className={`form-status ${formStatus.includes('sent') ? 'success' : ''}`} role="status">
                {formStatus}
              </p>
            ) : null}
            {showMobileFallback ? (
              <div className="form-fallbacks mobile-fallback" aria-label="Contact fallback options">
                <a href={fallbackEmailLink}>Email</a>
                <a href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}>Call</a>
              </div>
            ) : null}
            {formError ? (
              <div className="form-status error" role="alert">
                <p>{formError}</p>
                <div className="form-fallbacks">
                  <a
                    href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(orderDetails)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a href={fallbackEmailLink}>Email</a>
                </div>
              </div>
            ) : null}
          </form>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
