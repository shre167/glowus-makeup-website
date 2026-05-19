export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  brand: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  skinType: string[];
  image: string;
  description: string;
  ingredients: string[];
  usage: string;
  bestseller?: boolean;
  trending?: boolean;
};

export const categories = [
  "Face Wash", "Serum", "Moisturizer", "Sunscreen",
  "Lipstick", "Foundation", "Blush", "Toner",
  "Face Mask", "Makeup Kits", "Hair Care", "Body Care",
];

export const products: Product[] = [
  {
    id: "swiss-beauty-creamy-lipstick-01",
    name: "Swiss Beauty Select High On Shine Creamy Lipstick - 01 Rich Rose",
    tagline: "Mirror-Shine Finish · Hydrating",
    category: "Lipstick",
    brand: "Swiss Beauty",
    price: 369, compareAt: 450,
    rating: 4.8, reviews: 342,
    skinType: ["All"],
    image: "https://img.thecdn.in/365412/swiss-beauty-select-high-on-shine-creamy-lipstick-1768224809502_SKU-12917_0.jpg?width=600&format=webp",
    description: "Experience high-pigment, mirror-shine glossy finish with the hydrating goodness of Vitamin E. Keeps your lips looking lush and radiant all day.",
    ingredients: ["Vitamin E", "Jojoba Esters", "Microcrystalline Wax", "Castor Oil"],
    usage: "Glide directly onto the lips from the center outwards. Layer for intense shine.",
    bestseller: true, trending: true,
  },
  {
    id: "swiss-beauty-cream-tint-blush",
    name: "Swiss Beauty Cream N Tint For Lip, Cheek & Eyeshadow - Pretty Peach",
    tagline: "3-in-1 Cream Tint · Soft Focus",
    category: "Blush",
    brand: "Swiss Beauty",
    price: 399, compareAt: 499,
    rating: 4.7, reviews: 219,
    skinType: ["All"],
    image: "https://img.thecdn.in/365412/swiss-beauty-cream-n-tint-for-lip-cheek-and-eyesha-1728229349853_SKU-9803_0.jpg?width=600&format=webp",
    description: "An incredibly blendable 3-in-1 cream tint that adds a seamless, dew-kissed flush of color to your lips, cheeks, and eyelids.",
    ingredients: ["Rosehip Oil", "Shea Butter", "Almond Oil", "Mica"],
    usage: "Dab a small amount onto cheeks, lips, or eyelids and blend seamlessly using fingertips or a makeup sponge.",
    trending: true,
  },
  {
    id: "pilgrim-matte-liquid-lipstick-01",
    name: "Pilgrim Oh So Creme Liquid Matte Lipstick - 01 Nude Elegance",
    tagline: "12hr Smudge-Proof · Light Wear",
    category: "Lipstick",
    brand: "Pilgrim",
    price: 499, compareAt: 599,
    rating: 4.9, reviews: 512,
    skinType: ["All"],
    image: "https://img.thecdn.in/365412/pilgrim-oh-so-creme-lipstick-01-nude-elegance-ult-1756019864415_SKU-12209_0.jpg?width=600&format=webp",
    description: "An ultra-light, highly-pigmented matte liquid lipstick that lasts up to 12 hours. Completely transfer-resistant and comfortable to wear all day.",
    ingredients: ["Hyaluronic Acid", "Camellia Oil", "Vitamin E"],
    usage: "Apply starting from the Cupid's bow and swipe across lips. Allow 30 seconds to set to a flawless matte.",
    bestseller: true,
  },
  {
    id: "pilgrim-24k-gold-serum",
    name: "Pilgrim 24K Gold Face Serum for Luminous Glow",
    tagline: "Anti-Aging · Radiant Shine",
    category: "Serum",
    brand: "Pilgrim",
    price: 599, compareAt: 699,
    rating: 4.8, reviews: 789,
    skinType: ["All", "Dull"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    description: "Infused with real 24k gold flakes and niacinamide, this luxury serum reduces pigmentation, stimulates collagen, and imparts an instant luminous glow.",
    ingredients: ["24K Gold Flakes", "Niacinamide", "Mulberry Extract", "Hyaluronic Acid"],
    usage: "Massage 2-3 drops onto clean face and neck in upward circular motions before applying moisturizer.",
    trending: true, bestseller: true,
  },
  {
    id: "mars-city-paradise-makeup-kit",
    name: "Mars The City Paradise Makeup Kit - 02 Delhi",
    tagline: "Eyeshadow · Highlighter · Blush",
    category: "Makeup Kits",
    brand: "Mars",
    price: 749, compareAt: 899,
    rating: 4.6, reviews: 198,
    skinType: ["All"],
    image: "https://img.thecdn.in/365412/mars-the-city-paradise-makeup-kit-02-delhi-16g-9-1735632349588_SKU-10605_0.jpg?width=600&format=webp",
    description: "A compact all-in-one face palette containing 9 highly pigmented eyeshadows, a luminous highlighter, a silky blusher, a bronzer, and a setting powder.",
    ingredients: ["Talc-Free Mica", "Magnesium Stearate", "Jojoba Esters"],
    usage: "Create endless looks using eyeshadow shades, and sweep the blush and highlighter on the high points of the face.",
    trending: true,
  },
  {
    id: "biolage-smoothproof-serum",
    name: "Biolage Professional Smoothproof Hair Serum",
    tagline: "Frizz Control · Mirror-Shine",
    category: "Hair Care",
    brand: "Biolage",
    price: 399, compareAt: 475,
    rating: 4.8, reviews: 928,
    skinType: ["Frizzy", "Dry"],
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    description: "Enriched with botanical extracts of Camellia flowers, this professional-grade serum controls flyaways, tames frizz, and leaves hair silky smooth even in 97% humidity.",
    ingredients: ["Camellia Flower Extract", "Cyclopentasiloxane", "Dimethiconol"],
    usage: "Rub a few drops between palms and distribute evenly through towel-dried or dry hair. Do not rinse.",
    bestseller: true,
  },
  {
    id: "o3-professional-facial-kit",
    name: "O3+ Professional Brightening & Whitening Facial Kit",
    tagline: "Salon-Quality Glow · Complete Reset",
    category: "Face Mask",
    brand: "O3+",
    price: 2850, compareAt: 3100,
    rating: 4.9, reviews: 1432,
    skinType: ["All", "Pigmented", "Dull"],
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    description: "India's #1 professional facial kit, designed to reduce dark spots, dramatically brighten skin tone, and deeply hydrate in 5 curated skincare steps.",
    ingredients: ["Arbutin", "Vitamin C", "Aloe Vera Extract", "Lactic Acid"],
    usage: "Follow the 5-step packaging guides starting with the cleanser, scrub, massage gel, face mask, and ending with the serum.",
    bestseller: true,
  },
  {
    id: "cetaphil-gentle-cleanser",
    name: "Cetaphil Gentle Skin Cleanser for Sensitive Skin",
    tagline: "pH Balanced · Dermatologist Recommended",
    category: "Face Wash",
    brand: "Cetaphil",
    price: 399, compareAt: 450,
    rating: 4.7, reviews: 2012,
    skinType: ["Sensitive", "Dry", "Normal"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    description: "Dermatologist-recommended clinical formula that removes dirt, makeup, and impurities while actively preserving skin's natural moisture barrier.",
    ingredients: ["Glycerin", "Niacinamide (Vitamin B3)", "Panthenol (Pro-Vitamin B5)"],
    usage: "Apply onto damp skin, massage gently and rinse with water. Can also be used without water.",
    bestseller: true,
  },
  {
    id: "aroma-magic-sunscreen-30",
    name: "Aroma Magic Aloe Vera Sunscreen Gel SPF 30",
    tagline: "Mineral Sunscreen · Matte Finish",
    category: "Sunscreen",
    brand: "Aroma Magic",
    price: 350, compareAt: 395,
    rating: 4.5, reviews: 314,
    skinType: ["All", "Oily"],
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    description: "An all-natural mineral sunscreen gel that creates a physical barrier against harsh UV rays, while aloe vera hydrates and leaves a cool matte finish.",
    ingredients: ["Aloe Vera Juice", "Zinc Oxide", "Wheatgerm Oil", "Peppermint Essential Oil"],
    usage: "Apply generously to face, neck, and hands 15 minutes before sun exposure. Reapply every 3 hours.",
  },
  {
    id: "swiss-beauty-non-transfer-lipstick",
    name: "Swiss Beauty Non-Transfer Waterproof Lipstick - Orange Red",
    tagline: "Waterproof · Bold Color",
    category: "Lipstick",
    brand: "Swiss Beauty",
    price: 429, compareAt: 499,
    rating: 4.6, reviews: 512,
    skinType: ["All"],
    image: "https://img.thecdn.in/365412/swiss-beauty-non-transfer-waterproof-lipstick-3g-1722842985144_SKU-8540_0.jpg?width=600&format=webp",
    description: "A super rich matte formula that stays completely smudgeproof and waterproof for over 14 hours. Feels completely weightless on the lips.",
    ingredients: ["Jojoba Oil", "Vitamin E", "Beeswax", "Pigment Pastes"],
    usage: "Glide over clean, dry lips. Wait for a minute to allow the product to dry completely and become transfer-proof.",
  }
];

export const getProduct = (id: string) => products.find(p => p.id === id);
