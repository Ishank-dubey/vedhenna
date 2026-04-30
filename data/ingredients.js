export const ingredientPages = [
  {
    name: 'Amla',
    slug: 'amla',
    botanicalName: 'Phyllanthus emblica',
    visual: 'amla',
    image: '/amla-botanical.jpg',
    summary:
      'Amla, also known as Indian gooseberry, is a fruit valued in traditional hair care for its naturally tart, tannin-rich profile.',
    botanicalProperties: [
      'Fruit-bearing tree commonly known as Indian gooseberry.',
      'Known for tannins, polyphenols, and naturally occurring vitamin C.',
      'Traditionally used in herbal preparations for scalp and hair care.'
    ],
    hairBenefits: [
      'Supports a healthy-looking scalp and hair-care routine.',
      'Helps hair feel stronger, smoother, and more conditioned.',
      'Often used in natural color-care blends for shine and depth.'
    ]
  },
  {
    name: 'Reetha',
    slug: 'reetha',
    botanicalName: 'Sapindus mukorossi',
    visual: 'reetha',
    image: '/reetha-botanical.jpg',
    imageCredit: 'Photo by Salil Kumar Mukherjee, CC BY-SA 4.0',
    imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Ritha_(Sapindus_mukorossi)_fruits.jpg',
    summary:
      'Reetha, or soapnut, is known for natural saponins that create a gentle cleansing effect.',
    botanicalProperties: [
      'Fruit from the soapnut tree.',
      'Contains natural saponins that produce mild foam when mixed with water.',
      'Traditionally used as a plant-based cleanser.'
    ],
    hairBenefits: [
      'Helps cleanse hair without a harsh feel.',
      'Useful in herbal hair washes and natural care routines.',
      'Supports a cleaner, lighter hair feel after rinsing.'
    ]
  },
  {
    name: 'Shikakai',
    slug: 'shikakai',
    botanicalName: 'Acacia concinna',
    visual: 'shikakai',
    image: '/shikakai-botanical.jpg',
    imageCredit: 'Photo by Salil Kumar Mukherjee, CC BY-SA 4.0',
    imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Shikakai_(Senegalia_rugata)_seed_pods.jpg',
    summary:
      'Shikakai is a pod-based botanical used in traditional Indian hair cleansing and conditioning blends.',
    botanicalProperties: [
      'Climbing shrub whose pods are commonly used in hair-care powders.',
      'Contains natural saponins.',
      'Often paired with Amla and Reetha in herbal hair blends.'
    ],
    hairBenefits: [
      'Helps cleanse while keeping hair feeling soft.',
      'Supports easier detangling and manageability.',
      'Fits gentle, plant-based hair-care routines.'
    ]
  },
  {
    name: 'Bhringraj',
    slug: 'bhringraj',
    botanicalName: 'Eclipta prostrata',
    visual: 'bhringraj',
    image: '/bhringraj-botanical.jpg',
    imageCredit: 'Photo by Billjones94, CC BY-SA 4.0',
    imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:False_daisy_or_bhringraj_(Eclipta_prostrata)_flower.jpg',
    summary:
      'Bhringraj is a leafy herb widely associated with traditional hair oils and scalp-care formulations.',
    botanicalProperties: [
      'Small herbaceous plant with white flower heads.',
      'Leaves are commonly used in traditional hair-care preparations.',
      'Frequently used in oil infusions and herbal powders.'
    ],
    hairBenefits: [
      'Supports scalp-focused hair-care rituals.',
      'Helps hair feel nourished and cared for.',
      'Traditionally valued for hair wellness and shine.'
    ]
  },
  {
    name: 'Kathha',
    slug: 'kathha',
    botanicalName: 'Acacia catechu',
    visual: 'kathha',
    summary:
      'Kathha is a catechu extract traditionally prepared from Acacia catechu and valued for its tannin-rich character.',
    botanicalProperties: [
      'Derived from the heartwood of Acacia catechu.',
      'Naturally rich in tannins and catechins.',
      'Known for its deep brown botanical tone.'
    ],
    hairBenefits: [
      'Contributes depth to natural color-care blends.',
      'Adds a botanical tone profile to henna-based mixtures.',
      'Helps support a rich, naturally inspired finish.'
    ]
  },
  {
    name: 'Hibiscus flowers',
    slug: 'hibiscus-flowers',
    botanicalName: 'Hibiscus rosa-sinensis',
    visual: 'hibiscus',
    summary:
      'Hibiscus flowers bring a soft, conditioning character to herbal hair-care formulations.',
    botanicalProperties: [
      'Flowering plant known for vibrant petals.',
      'Flowers contain plant mucilage and natural pigments.',
      'Commonly used in traditional hair masks and rinses.'
    ],
    hairBenefits: [
      'Helps hair feel soft and conditioned.',
      'Supports shine and smoother manageability.',
      'Adds a floral botanical element to hair-care blends.'
    ]
  },
  {
    name: 'Fenugreek seeds',
    slug: 'fenugreek-seeds',
    botanicalName: 'Trigonella foenum-graecum',
    visual: 'fenugreek',
    summary:
      'Fenugreek seeds are valued for their mucilage-rich texture, which gives herbal blends a conditioning slip.',
    botanicalProperties: [
      'Small golden seeds from the fenugreek plant.',
      'Known for mucilage, proteins, and plant compounds.',
      'Often soaked or powdered for traditional care uses.'
    ],
    hairBenefits: [
      'Helps improve the feel of conditioning blends.',
      'Supports slip, softness, and easier application.',
      'Useful in scalp and hair-care routines focused on comfort.'
    ]
  },
  {
    name: 'Amaltas',
    slug: 'amaltas',
    botanicalName: 'Cassia fistula',
    visual: 'amaltas',
    summary:
      'Amaltas, also known as the golden shower tree, is a botanical used in traditional wellness and care preparations.',
    botanicalProperties: [
      'Flowering tree known for bright yellow hanging blossoms.',
      'Different plant parts have a history of traditional use.',
      'Adds a gentle botanical profile to herbal formulations.'
    ],
    hairBenefits: [
      'Supports a plant-based hair-care blend.',
      'Complements other herbs used for conditioning and scalp care.',
      'Adds botanical richness to the overall formulation.'
    ]
  }
];

export const getIngredientBySlug = (slug) =>
  ingredientPages.find((ingredient) => ingredient.slug === slug);
