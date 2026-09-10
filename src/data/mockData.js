export const COMPANY_INFO = {
  name: "KB",
  legalName: "KB Beverages Private Limited",
  tagline: "Pure Taste, Every Time",
  slogan: "Pure by Nature. Perfect in Every Sip.",
  mission: "To deliver high-quality, innovative, and affordable beverage solutions that create value for customers, distributors, and business partners while maintaining the highest standards of quality and service.",
  vision: "To become one of India's most trusted and preferred beverage brands, creating a nationwide distribution network and empowering business partners to grow with us.",
  phones: ["+91 96240 91000", "+91 85111 16618"],
  email: "contact@kbealeas.store",
  website: "www.kbealeas.store",
  address: "202, Sai Pancham Flat, Gajanand Society, B/S - Riddhi Avenue Appartment, Near Arihant Super Market, Manjalpur Naka, Manjalpur, Vadodara - 390011, Gujarat, India",
  founders: [
    {
      name: "Hiral Shah",
      role: "Founder",
      bio: "Visionary Leader with a passion for innovation and excellence in the beverage industry.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Kush Shah",
      role: "Co-Founder",
      bio: "Strategic Thinker driving growth, commercial partnerships, and long-term expansion.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Preeti Shah",
      role: "Co-Founder",
      bio: "Operations Expert ensuring quality, consistency, supply chain rigor, and customer satisfaction.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    }
  ],
  pillars: [
    { title: "PURE", desc: "Carefully selected ingredients for pure enjoyment.", icon: "Leaf" },
    { title: "TASTY", desc: "Rich flavors crafted to delight your senses.", icon: "Coffee" },
    { title: "QUALITY", desc: "High standards in every step, every time.", icon: "ShieldCheck" },
    { title: "NATURAL", desc: "Goodness of nature, made for a better you.", icon: "Sparkles" },
    { title: "TRUST", desc: "Committed to consistency, care & customer satisfaction.", icon: "Users" }
  ],
  clientel: [
    { name: "Prakruti Resort", category: "Hospitality & Resorts", image: "/clients/prakruti.jpg" },
    { name: "Anju Corporation", category: "Corporate Enterprises", image: "/clients/anju.jpg" },
    { name: "Rushee Beverages", category: "Beverage Supply", image: "/clients/rushee.jpg" },
    { name: "Trinity Smiles", category: "Healthcare Clinics", image: "/clients/trinity.jpg" },
    { name: "Aura Laser & Cosmetic Clinic", category: "Wellness Centers", image: "/clients/aura.jpg" },
    { name: "The Tooth Clinic", category: "Multispeciality Clinics", image: "/clients/tooth_clinic.jpg" },
    { name: "Sheel Design Studio", category: "Architect & Interior", image: "/clients/sheel_design.jpg" },
    { name: "Superbizzlead", category: "Media & Advertising", image: "/clients/superbizzlead.jpg" },
    { name: "Sapphire Studio", category: "Creative Studios", image: "/clients/sapphire.jpg" },
    { name: "JV Finance", category: "Financial Institutions", image: "/clients/jv_finance.jpg" },
    { name: "DS Associates", category: "Professional Consultancy", image: "/clients/ds_associates.jpg" }
  ]
};

export const BRANDS = {
  vrinda: {
    id: "vrinda",
    name: "VRINDA",
    tagline: "Sip Nature, Sip Wellness.",
    categoryName: "Tea Premixes",
    description: "Premium handcrafted tea premixes made with natural spices and authentic Indian tea leaves for an uplifting, instant cup of warmth.",
    themeColor: "#2D5A27",
    lightBg: "#E8F5E9",
    heroImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
    bannerBg: "from-emerald-900 to-green-800"
  },
  sangam: {
    id: "sangam",
    name: "SANGAM",
    tagline: "Cool Refresh, Anytime, Anywhere.",
    categoryName: "Iced Tea Premixes",
    description: "Exotic, zesty, and fruity iced tea premixes that dissolve instantly in cold water for instant summer refreshment.",
    themeColor: "#0277BD",
    lightBg: "#E1F5FE",
    heroImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80",
    bannerBg: "from-sky-900 to-blue-700"
  },
  "urban-roast": {
    id: "urban-roast",
    name: "URBAN ROAST",
    tagline: "Brew Bold, Live Urban.",
    categoryName: "Coffee Premixes",
    description: "Richly roasted coffee premixes crafted for urban coffee enthusiasts seeking barista-style frothy cappuccinos and bold mochas in seconds.",
    themeColor: "#4A2C2A",
    lightBg: "#F5F0EB",
    heroImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    bannerBg: "from-amber-950 to-stone-900"
  },
  "coco-joy": {
    id: "coco-joy",
    name: "COCO JOY",
    tagline: "Joy in Every Sip.",
    categoryName: "Chocolate & Beverage Premixes",
    description: "Indulcent cocoa and chocolate beverage premixes crafted with premium Dutch cocoa for decadent hot and cold milk beverages.",
    themeColor: "#C2185B",
    lightBg: "#FCE4EC",
    heroImage: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=1200&q=80",
    bannerBg: "from-pink-950 to-rose-900"
  }
};

export const CATEGORIES = [
  { id: "all", name: "All Premixes", icon: "Grid" },
  { id: "tea", name: "Tea Premixes", brandId: "vrinda", icon: "Coffee" },
  { id: "iced-tea", name: "Iced Tea Premixes", brandId: "sangam", icon: "GlassWater" },
  { id: "coffee", name: "Coffee Premixes", brandId: "urban-roast", icon: "CupSoda" },
  { id: "chocolate", name: "Chocolate Premixes", brandId: "coco-joy", icon: "Heart" }
];

export const PRODUCTS = [
  {
    id: "vrinda-cardamom",
    name: "Cardamom Tea Premix",
    slug: "cardamom-tea-premix",
    brandId: "vrinda",
    brandName: "VRINDA",
    category: "tea",
    categoryLabel: "Tea Premix",
    tagline: "Aromatic. Soothing. Timeless.",
    description: "Infused with crushed green cardamom pods and rich tea extract, Vrinda Cardamom Tea Premix delivers a soothing, highly aromatic home-style chai experience instantly.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 128,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Mix 14g (approx 1 tbsp) of Vrinda Cardamom Tea Premix with 100ml hot boiling water. Stir well and enjoy your piping hot cardamom chai.",
    ingredients: ["Pure Tea Extract", "Green Cardamom Powder", "Dairy Milk Solids", "Natural Sugar"],
    nutrition: { calories: "55 kcal per serving", protein: "1.2g", carbs: "9.5g", fat: "1.1g" },
    variants: [
      { id: "v-card-1kg", packSize: "1 Kg Pouch", price: 450, originalPrice: 500, servings: "70 Cups" },
      { id: "v-card-500g", packSize: "500g Pouch", price: 240, originalPrice: 270, servings: "35 Cups" },
      { id: "v-card-250g", packSize: "250g Pouch", price: 130, originalPrice: 150, servings: "17 Cups" }
    ]
  },
  {
    id: "vrinda-masala",
    name: "Masala Tea Premix",
    slug: "masala-tea-premix",
    brandId: "vrinda",
    brandName: "VRINDA",
    category: "tea",
    categoryLabel: "Tea Premix",
    tagline: "Spiced. Strong. Invigorating.",
    description: "A robust blend of black pepper, clove, ginger, cinnamon, and cardamom crafted for an energizing spiced chai break anytime.",
    inStock: true,
    rating: 4.8,
    reviewsCount: 94,
    isBestSeller: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 14g of Vrinda Masala Tea Premix to 100ml hot water. Stir thoroughly for instant traditional kadak masala tea.",
    ingredients: ["Black Tea Extract", "Natural Spice Mix (Ginger, Clove, Cinnamon, Black Pepper, Cardamom)", "Milk Solids", "Sugar"],
    nutrition: { calories: "58 kcal per serving", protein: "1.3g", carbs: "9.8g", fat: "1.2g" },
    variants: [
      { id: "v-mas-1kg", packSize: "1 Kg Pouch", price: 460, originalPrice: 510, servings: "70 Cups" },
      { id: "v-mas-500g", packSize: "500g Pouch", price: 245, originalPrice: 275, servings: "35 Cups" }
    ]
  },
  {
    id: "vrinda-ginger",
    name: "Ginger Tea Premix",
    slug: "ginger-tea-premix",
    brandId: "vrinda",
    brandName: "VRINDA",
    category: "tea",
    categoryLabel: "Tea Premix",
    tagline: "Zesty. Warm. Refreshing.",
    description: "Made with authentic sun-dried ginger root extract to provide warm immunity support and a fiery, refreshing zesty taste.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 14g of Vrinda Ginger Tea Premix into 100ml hot water. Stir well.",
    ingredients: ["Tea Solids", "Natural Ginger Extract", "Milk Powder", "Sugar"],
    nutrition: { calories: "54 kcal per serving", protein: "1.1g", carbs: "9.4g", fat: "1.0g" },
    variants: [
      { id: "v-gin-1kg", packSize: "1 Kg Pouch", price: 450, originalPrice: 500, servings: "70 Cups" },
      { id: "v-gin-500g", packSize: "500g Pouch", price: 240, originalPrice: 270, servings: "35 Cups" }
    ]
  },
  {
    id: "sangam-guava-chilly",
    name: "Guava Chilly Iced Tea Premix",
    slug: "guava-chilly-iced-tea-premix",
    brandId: "sangam",
    brandName: "SANGAM",
    category: "iced-tea",
    categoryLabel: "Iced Tea Premix",
    tagline: "Sweet, Spicy & Refreshing.",
    description: "An adventurous Indian twist on iced tea! Sweet tropical guava paired with a mild hint of red chili for a lip-smacking iced mocktail.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 86,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Mix 25g of Sangam Guava Chilly Premix into 150ml chilled water. Add ice cubes, shake or stir well and serve cold.",
    ingredients: ["Black Tea Extract", "Natural Guava Flavor", "Chili Powder Trace", "Citric Acid", "Sugar"],
    nutrition: { calories: "85 kcal per serving", protein: "0.2g", carbs: "21g", fat: "0g" },
    variants: [
      { id: "s-guav-1kg", packSize: "1 Kg Pouch", price: 490, originalPrice: 550, servings: "40 Glasses" },
      { id: "s-guav-500g", packSize: "500g Pouch", price: 260, originalPrice: 290, servings: "20 Glasses" }
    ]
  },
  {
    id: "sangam-lemon",
    name: "Lemon Iced Tea Premix",
    slug: "lemon-iced-tea-premix",
    brandId: "sangam",
    brandName: "SANGAM",
    category: "iced-tea",
    categoryLabel: "Iced Tea Premix",
    tagline: "Zesty, Tangy & Refreshing.",
    description: "The classic sunny refreshment! Sun-ripened citrus lemons combined with smooth iced tea extract for immediate thirst quenching.",
    inStock: true,
    rating: 4.8,
    reviewsCount: 145,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 25g of Sangam Lemon Iced Tea Premix to 150ml ice-cold water. Stir well.",
    ingredients: ["Black Tea Solids", "Lemon Extract", "Vitamin C", "Citric Acid", "Sugar"],
    nutrition: { calories: "82 kcal per serving", protein: "0.1g", carbs: "20.5g", fat: "0g" },
    variants: [
      { id: "s-lem-1kg", packSize: "1 Kg Pouch", price: 440, originalPrice: 490, servings: "40 Glasses" },
      { id: "s-lem-500g", packSize: "500g Pouch", price: 230, originalPrice: 260, servings: "20 Glasses" }
    ]
  },
  {
    id: "sangam-watermelon",
    name: "Watermelon Iced Tea Premix",
    slug: "watermelon-iced-tea-premix",
    brandId: "sangam",
    brandName: "SANGAM",
    category: "iced-tea",
    categoryLabel: "Iced Tea Premix",
    tagline: "Juicy, Sweet & Refreshing.",
    description: "Bursting with juicy watermelon goodness! Sangam Watermelon Iced Tea offers a vibrant red, fruity cooling sensation.",
    inStock: true,
    rating: 4.7,
    reviewsCount: 68,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Dissolve 25g into 150ml chilled water with ice. Stir vigorously.",
    ingredients: ["Tea Extract", "Natural Watermelon Essence", "Citric Acid", "Sugar"],
    nutrition: { calories: "80 kcal per serving", protein: "0.1g", carbs: "20g", fat: "0g" },
    variants: [
      { id: "s-wm-1kg", packSize: "1 Kg Pouch", price: 470, originalPrice: 520, servings: "40 Glasses" },
      { id: "s-wm-500g", packSize: "500g Pouch", price: 250, originalPrice: 280, servings: "20 Glasses" }
    ]
  },
  {
    id: "urban-classic-coffee",
    name: "Classic Instant Coffee Premix",
    slug: "classic-instant-coffee-premix",
    brandId: "urban-roast",
    brandName: "URBAN ROAST",
    category: "coffee",
    categoryLabel: "Coffee Premix",
    tagline: "Rich Roasted Aroma.",
    description: "Crafted from fine Arabica and Robusta coffee beans roasted to perfection, blended with milk powder for an instant, aromatic hot coffee.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 162,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 14g Urban Roast Coffee Premix to 100ml boiling hot water. Stir for a smooth, aromatic cup.",
    ingredients: ["Freeze-Dried Coffee Extract", "Non-Dairy Creamer / Milk Solids", "Sugar"],
    nutrition: { calories: "62 kcal per serving", protein: "1.4g", carbs: "10.2g", fat: "1.8g" },
    variants: [
      { id: "u-class-1kg", packSize: "1 Kg Pouch", price: 580, originalPrice: 650, servings: "70 Cups" },
      { id: "u-class-500g", packSize: "500g Pouch", price: 300, originalPrice: 340, servings: "35 Cups" }
    ]
  },
  {
    id: "urban-cappuccino",
    name: "Cappuccino Coffee Premix",
    slug: "cappuccino-coffee-premix",
    brandId: "urban-roast",
    brandName: "URBAN ROAST",
    category: "coffee",
    categoryLabel: "Coffee Premix",
    tagline: "Frothy, Creamy & Velvety.",
    description: "Enjoy cafe-quality velvety frothy cappuccino at home or office without expensive coffee machines. Creamy, rich, and indulgent.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 198,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 18g into 120ml hot water. Stir rapidly or use a mini hand frother for luxurious foam top.",
    ingredients: ["Espresso Coffee Solids", "Foam Creamer", "Milk Powder", "Sugar"],
    nutrition: { calories: "78 kcal per serving", protein: "1.8g", carbs: "12g", fat: "2.4g" },
    variants: [
      { id: "u-cap-1kg", packSize: "1 Kg Pouch", price: 620, originalPrice: 700, servings: "55 Cups" },
      { id: "u-cap-500g", packSize: "500g Pouch", price: 320, originalPrice: 360, servings: "27 Cups" }
    ]
  },
  {
    id: "urban-hazelnut",
    name: "Hazelnut Gourmet Coffee Premix",
    slug: "hazelnut-gourmet-coffee-premix",
    brandId: "urban-roast",
    brandName: "URBAN ROAST",
    category: "coffee",
    categoryLabel: "Coffee Premix",
    tagline: "Nutty, Aromatic & Smooth.",
    description: "Infused with toasted hazelnut notes for a sophisticated, nutty coffee experience loved by modern urban coffee enthusiasts.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 110,
    isBestSeller: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Dissolve 16g in 110ml hot water or warm milk.",
    ingredients: ["Roasted Coffee Solids", "Hazelnut Aroma Blend", "Milk Solids", "Sugar"],
    nutrition: { calories: "70 kcal per serving", protein: "1.5g", carbs: "11g", fat: "2.0g" },
    variants: [
      { id: "u-haz-1kg", packSize: "1 Kg Pouch", price: 650, originalPrice: 730, servings: "60 Cups" },
      { id: "u-haz-500g", packSize: "500g Pouch", price: 340, originalPrice: 380, servings: "30 Cups" }
    ]
  },
  {
    id: "coco-hot-chocolate",
    name: "Classic Hot Chocolate Premix",
    slug: "classic-hot-chocolate-premix",
    brandId: "coco-joy",
    brandName: "COCO JOY",
    category: "chocolate",
    categoryLabel: "Chocolate Premix",
    tagline: "Rich, Velvety Cocoa Indulgence.",
    description: "Premium cocoa powder blended into a creamy chocolate powder premix. Perfect for warm comforting night caps or chilled chocolate milkshakes.",
    inStock: true,
    rating: 4.9,
    reviewsCount: 175,
    isBestSeller: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Add 20g of Coco Joy Chocolate Premix to 120ml hot milk or water. Stir until thick, creamy, and completely dissolved.",
    ingredients: ["Dutch Processed Cocoa Powder", "Whole Milk Solids", "Vanilla Extract", "Sugar"],
    nutrition: { calories: "92 kcal per serving", protein: "2.2g", carbs: "15g", fat: "2.8g" },
    variants: [
      { id: "c-hot-1kg", packSize: "1 Kg Pouch", price: 520, originalPrice: 590, servings: "50 Cups" },
      { id: "c-hot-500g", packSize: "500g Pouch", price: 275, originalPrice: 310, servings: "25 Cups" }
    ]
  },
  {
    id: "coco-dark-cocoa",
    name: "Dark Cocoa Beverage Premix",
    slug: "dark-cocoa-beverage-premix",
    brandId: "coco-joy",
    brandName: "COCO JOY",
    category: "chocolate",
    categoryLabel: "Chocolate Premix",
    tagline: "Deep 70% Intense Cocoa.",
    description: "Designed for true dark chocolate connoisseurs! Bittersweet dark cocoa rich in antioxidants and deep chocolate notes.",
    inStock: true,
    rating: 4.8,
    reviewsCount: 92,
    isBestSeller: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
    prepInstructions: "Mix 20g into 120ml steaming milk for an intense dark cocoa cup.",
    ingredients: ["70% Dark Cocoa Extract", "Milk Powder", "Cane Sugar"],
    nutrition: { calories: "88 kcal per serving", protein: "2.5g", carbs: "13.5g", fat: "3.1g" },
    variants: [
      { id: "c-dark-1kg", packSize: "1 Kg Pouch", price: 560, originalPrice: 630, servings: "50 Cups" },
      { id: "c-dark-500g", packSize: "500g Pouch", price: 295, originalPrice: 330, servings: "25 Cups" }
    ]
  }
];
