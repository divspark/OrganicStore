import { api, BackendProduct } from './api';

export interface SeedProductItem {
  name: string;
  category: string;
  price: number;
  stock: number;
  district: string;
  photo: string;
  description: string;
}

export const SEED_PRODUCTS: SeedProductItem[] = [
  {
    name: 'Nagpur Juicy Oranges',
    category: 'Fruits',
    price: 90,
    stock: 150,
    district: 'Nagpur',
    photo: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
    description: 'Direct from the sunny orchards of Nagpur, rich in natural vitamin C and bio-flavonoids with pesticide-free cultivation.'
  },
  {
    name: 'Crunchy Organic Carrots',
    category: 'Vegetables',
    price: 55,
    stock: 120,
    district: 'Nashik',
    photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Sweet, crisp, chemical-free root harvest grown in vermicompost enriched organic soils of Nashik.'
  },
  {
    name: 'Fresh Farm Broccoli Crown',
    category: 'Vegetables',
    price: 75,
    stock: 65,
    district: 'Pune',
    photo: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Dense, nutrient-dense green florets packed with sulforaphane, calcium, and antioxidants.'
  },
  {
    name: 'Vine Ripe Organic Tomatoes',
    category: 'Vegetables',
    price: 40,
    stock: 200,
    district: 'Pune',
    photo: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Naturally sun-ripened red tomatoes picked at peak maturity with high lycopene content.'
  },
  {
    name: 'Alphonso Ratnagiri Mangoes',
    category: 'Fruits',
    price: 240,
    stock: 80,
    district: 'Ratnagiri',
    photo: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The King of Mangoes! Naturally tree-ripened with carbide-free traditional ripening techniques.'
  },
  {
    name: 'Kashmiri Royal Gala Apples',
    category: 'Fruits',
    price: 180,
    stock: 90,
    district: 'Kashmir',
    photo: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Crisp mountain-grown apples packed with natural fiber and zero wax coating.'
  },
  {
    name: 'Tender Baby Spinach Leaves',
    category: 'Vegetables',
    price: 35,
    stock: 110,
    district: 'Pune',
    photo: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Pure green baby spinach leaves harvested fresh on the same morning of dispatch.'
  },
  {
    name: 'Ruby Red Pomegranate',
    category: 'Fruits',
    price: 130,
    stock: 85,
    district: 'Solapur',
    photo: 'https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-65256.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Plump, juicy antioxidant-packed ruby seeds grown in organic bio-diverse groves.'
  },
  {
    name: 'Organic Traditional Basmati Rice',
    category: 'Grains',
    price: 190,
    stock: 300,
    district: 'Punjab',
    photo: 'https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Aged long-grain aromatic basmati grown following Vedic natural farming practices.'
  },
  {
    name: 'Stone-Ground Whole Wheat Atta',
    category: 'Grains',
    price: 95,
    stock: 250,
    district: 'Madhya Pradesh',
    photo: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Cold chakki stone-ground flour retaining 100% natural wheat germ and dietary fiber.'
  },
  {
    name: 'Fresh Organic Basil & Mint Bundle',
    category: 'Herbs',
    price: 30,
    stock: 140,
    district: 'Pune',
    photo: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Freshly clipped culinary herbs for health-boosting teas, salads, and culinary garnishes.'
  },
  {
    name: 'Raw Unprocessed Forest Honey',
    category: 'Herbs',
    price: 350,
    stock: 50,
    district: 'Mahabaleshwar',
    photo: 'https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg?auto=compress&cs=tinysrgb&w=600',
    description: 'Wild forest multifloral honey, unheated, unpasteurized, retaining natural pollen enzymes.'
  }
];

export const SEED_TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    message: 'The quality of organic products here is exceptional. Fresh, healthy, and delivered right to my doorstep. My family loves the clean, pesticide-free taste!',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Rajesh Kumar',
    message: 'As a fitness coach, I recommend Grow to all my clients. The produce has unmatched nutrient density and the direct farm connection is trustworthy.',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Anita Patel',
    message: 'Being a mother, I am very particular about chemical residues in food. Grow has made clean eating completely hassle-free and affordable!',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Dr. Amit Singh',
    message: 'I recommend Grow to all my patients. The produce is genuinely chemical-free and packed with natural vitality.',
    photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

/**
 * Upserts products and testimonials to backend database via API
 */
export async function seedDatabase(onProgress?: (msg: string) => void): Promise<{ success: boolean; insertedCount: number; errors: string[] }> {
  const errors: string[] = [];
  let insertedCount = 0;

  onProgress?.('Connecting to backend API...');

  // 1. Fetch current backend products to avoid duplicate names
  let existingProducts: BackendProduct[] = [];
  try {
    existingProducts = await api.products.getAdminProducts();
  } catch (err) {
    console.warn('Could not fetch existing products:', err);
  }

  const existingNames = new Set(existingProducts.map((p) => (p.name || '').trim().toLowerCase()));

  // 2. Upsert Products
  for (const item of SEED_PRODUCTS) {
    if (existingNames.has(item.name.trim().toLowerCase())) {
      onProgress?.(`Skipping "${item.name}" (already present in database)`);
      continue;
    }

    try {
      onProgress?.(`Uploading "${item.name}" to database...`);
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('category', item.category);
      formData.append('price', String(item.price));
      formData.append('stock', String(item.stock));
      formData.append('district', item.district);
      formData.append('description', item.description);
      formData.append('photo', item.photo);

      await api.products.create(formData);
      insertedCount++;
      onProgress?.(`✓ Added "${item.name}"`);
    } catch (err: any) {
      console.warn(`Failed to seed ${item.name}:`, err.message);
      errors.push(`${item.name}: ${err.message}`);
    }
  }

  // 3. Upsert Testimonials
  for (const t of SEED_TESTIMONIALS) {
    try {
      const formData = new FormData();
      formData.append('name', t.name);
      formData.append('message', t.message);
      formData.append('photo', t.photo);
      await api.testimonials.create(formData);
    } catch (err) {
      // Ignored if testimonial exists
    }
  }

  onProgress?.(`Database seeding complete! Added ${insertedCount} new organic items.`);
  return { success: true, insertedCount, errors };
}
