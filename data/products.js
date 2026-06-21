export const products = [
  {
    name: 'Vedhenna Henna Paste',
    slug: 'vedhenna-henna-paste',
    shortName: 'Henna Paste',
    category: 'Natural henna hair care paste',
    summary:
      'A natural henna hair care paste made for rich botanical color, conditioning, and a simple at-home application routine.',
    detail:
      'Vedhenna Henna Paste is the original Vedhenna product, crafted with henna and familiar botanical ingredients for customers who want natural color care, softer-feeling hair, and straightforward ordering.',
    heroLine: 'Natural henna hair care paste for color, conditioning, and everyday hair wellness.',
    image: '/vedhenna-hero.jpg',
    unit: '400ML',
    usualPrice: 'Rs 499',
    introductoryPrice: 'Rs 299',
    status: 'Introductory offer',
    ingredients: [
      'Henna',
      'Amla',
      'Reetha',
      'Shikakai',
      'Bhringraj',
      'Kathha',
      'Hibiscus flowers',
      'Fenugreek seeds',
      'Amaltas'
    ],
    ingredientNote:
      'This product includes henna along with the eight botanical ingredients used across Vedhenna hair care.',
    benefits: [
      'Colors hair naturally with a richer botanical tone.',
      'Supports softer, smoother-feeling hair after application.',
      'Uses familiar herbs selected for traditional hair care.',
      'Includes simple application guidance and gloves with the order.'
    ],
    applyIntro:
      'Apply Vedhenna Henna Paste on non-oiled hair, wear the supplied gloves, leave it on for 2-3 hours, rinse with water, and shampoo the next day.',
    applyNoun: 'henna paste',
    orderMessage: 'I want to order Vedhenna Henna Paste - quantity is'
  },
  {
    name: 'Vedhenna Hair Pack',
    slug: 'vedhenna-hair-pack',
    shortName: 'Hair Pack',
    category: 'Natural botanical hair pack',
    summary:
      'A natural botanical hair pack made with Vedhenna herbs for customers who want hair care without henna in the formulation.',
    detail:
      'Vedhenna Hair Pack is the second Vedhenna product. It keeps the botanical hair care direction of the original blend, while removing henna from the ingredient list.',
    heroLine: 'Natural botanical hair care without henna in the formulation.',
    image: '/vedhenna-hero.jpg',
    unit: 'To be confirmed',
    usualPrice: 'To be announced',
    introductoryPrice: 'Rs 199',
    status: 'Introductory offer',
    ingredients: [
      'Amla',
      'Reetha',
      'Shikakai',
      'Bhringraj',
      'Kathha',
      'Hibiscus flowers',
      'Fenugreek seeds',
      'Amaltas'
    ],
    ingredientNote:
      'This product uses the Vedhenna botanical ingredient family, except henna is not included.',
    benefits: [
      'Supports botanical hair care through familiar herbal ingredients.',
      'Keeps the formulation focused on familiar herbal hair care.',
      'Designed for customers who want a non-henna Vedhenna hair pack option.',
      'Made to sit alongside the original Vedhenna Henna Paste in the product catalogue.'
    ],
    applyIntro:
      'Apply Vedhenna Hair Pack on non-oiled hair, wear the supplied gloves, apply evenly from roots to lengths, rinse with water, and follow the after-care note included with your order.',
    applyNoun: 'natural hair color blend',
    orderMessage: 'I want to order Vedhenna Hair Pack - quantity is'
  }
];

export const defaultProduct = products[0];

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug) || null;

export const getProductApplyPath = (product) =>
  product.slug === defaultProduct.slug ? '/how-to-apply' : `/how-to-apply/${product.slug}`;
