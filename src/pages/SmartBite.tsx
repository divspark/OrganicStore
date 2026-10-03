import React, { useState, useMemo } from 'react';
import {
  Flame, Search, Activity, ChefHat, Leaf,
  Sparkles, Clock, X, Plus, Check, Droplets, Apple, ArrowRight
} from 'lucide-react';
import { useGrowStore } from '../store/useGrowStore';

interface FullRecipe {
  id: string;
  name: string;
  category: string;
  diet: string;
  prepTime: string;
  servings: number;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
  image: string;
  description: string;
  ingredients: { name: string; quantity: string; price?: number }[];
  steps: string[];
  chefTip: string;
  tags: string[];
}

const curatedRecipes: FullRecipe[] = [
  {
    id: 'rec-1',
    name: 'Organic Mediterranean Garden Harvest Bowl',
    category: 'Salad & Bowls',
    diet: 'high-protein',
    prepTime: '15 mins',
    servings: 2,
    calories: 340,
    protein: 14,
    carbs: 38,
    fat: 16,
    fiber: 9,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crisp pesticide-free greens tossed with juicy heirloom cherry tomatoes, Persian cucumbers, Kalamata olives, and cold-pressed extra virgin olive oil.',
    ingredients: [
      { name: 'Organic Mixed Baby Greens', quantity: '3 cups', price: 45 },
      { name: 'Farm Heirloom Vine Tomatoes', quantity: '1 cup, diced', price: 70 },
      { name: 'Persian Crisp Cucumbers', quantity: '1 medium', price: 30 },
      { name: 'Cold Pressed Wild Mustard / Olive Oil', quantity: '2 tbsp', price: 195 },
      { name: 'Organic Roasted Pumpkin & Sunflower Seeds', quantity: '2 tbsp', price: 60 }
    ],
    steps: [
      'Gently wash all freshly harvested greens and pat dry with clean cloth.',
      'Chop heirloom vine tomatoes and crisp cucumbers into bite-sized wedges.',
      'In a small glass bowl, whisk cold-pressed olive oil, fresh lemon juice, sea salt, and crushed black pepper.',
      'Toss greens and vegetables with the dressing and top with roasted crunchy seeds before serving.'
    ],
    chefTip: 'Use farm-fresh cold-pressed oil to retain delicate polyphenols and antioxidants.',
    tags: ['Vegan', 'High Fiber', 'Heart Healthy', 'Pesticide Free']
  },
  {
    id: 'rec-2',
    name: 'Ayurvedic Golden Turmeric & Roasted Pumpkin Soup',
    category: 'Soups & Broths',
    diet: 'balanced',
    prepTime: '25 mins',
    servings: 3,
    calories: 220,
    protein: 6,
    carbs: 32,
    fat: 8,
    fiber: 7,
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A comforting, anti-inflammatory soup made from slow-roasted sweet organic pumpkin, raw turmeric root, ginger, and creamy coconut milk.',
    ingredients: [
      { name: 'Organic Sweet Field Pumpkin', quantity: '500g, cubed', price: 50 },
      { name: 'Fresh Raw Turmeric Root', quantity: '1 inch, grated', price: 35 },
      { name: 'Organic Ginger Root', quantity: '1 inch, minced', price: 25 },
      { name: 'Pure Coconut Milk', quantity: '1/2 cup', price: 80 },
      { name: 'Crushed Black Pepper & Himalayan Pink Salt', quantity: 'to taste', price: 40 }
    ],
    steps: [
      'Roast cubed pumpkin in an oven or skillet with a drop of cold-pressed oil until golden and tender.',
      'In a saucepan, sauté grated raw turmeric and fresh ginger until aromatic.',
      'Add roasted pumpkin and vegetable broth, simmering gently for 10 minutes.',
      'Blend until silky smooth, stir in coconut milk, and garnish with fresh cilantro leaves and cracked black pepper.'
    ],
    chefTip: 'Black pepper increases the bioavailability of curcumin in turmeric by up to 2000%.',
    tags: ['Immunity Booster', 'Anti-Inflammatory', 'Gluten Free', 'Ayurvedic']
  },
  {
    id: 'rec-3',
    name: 'Sprouted Moong & Pomegranate Vitality Salad',
    category: 'Power Snacks',
    diet: 'high-protein',
    prepTime: '10 mins',
    servings: 2,
    calories: 280,
    protein: 18,
    carbs: 42,
    fat: 4,
    fiber: 12,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'High-protein bio-active sprouted green gram paired with sweet pomegranate pearls, mint, roasted cumin, and Himalayan pink salt.',
    ingredients: [
      { name: 'Fresh Organic Sprouted Moong', quantity: '2 cups', price: 40 },
      { name: 'Farm Pomegranate Pearls', quantity: '1/2 cup', price: 90 },
      { name: 'Finely Chopped Green Coriander & Mint', quantity: '1/4 cup', price: 20 },
      { name: 'Fresh Farm Lemon Juice', quantity: '1 tbsp', price: 15 },
      { name: 'Roasted Cumin Powder & Chaat Spices', quantity: '1 tsp', price: 25 }
    ],
    steps: [
      'Lightly steam the sprouted moong for 3 minutes to enhance nutrient absorption.',
      'In a large bowl, combine warm sprouts with pomegranate pearls and chopped herbs.',
      'Squeeze fresh lemon juice and sprinkle roasted cumin powder and rock salt.',
      'Mix thoroughly and enjoy as an energizing pre-workout or clean midday meal.'
    ],
    chefTip: 'Sprouting multiplies the vitamin C and bioavailable plant protein content by over 300%.',
    tags: ['High Protein', 'Raw Energy', 'Low Fat', 'Weight Management']
  },
  {
    id: 'rec-4',
    name: 'Green Superfood Detox Smoothie Bowl',
    category: 'Smoothies & Breakfast',
    diet: 'low-carb',
    prepTime: '8 mins',
    servings: 1,
    calories: 260,
    protein: 11,
    carbs: 34,
    fat: 9,
    fiber: 10,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Nutrient-dense morning bowl blending organic baby spinach, ripe avocado, chia seeds, and raw organic honey.',
    ingredients: [
      { name: 'Baby Spinach Bunches', quantity: '2 tightly packed cups', price: 45 },
      { name: 'Organic Hass Avocados', quantity: '1/2 ripe avocado', price: 180 },
      { name: 'Chia Seeds & Flaxseed Meal', quantity: '1 tbsp', price: 55 },
      { name: 'Chilled Coconut Water', quantity: '1 cup', price: 40 },
      { name: 'Wild Forest Raw Honey', quantity: '1 tsp', price: 160 }
    ],
    steps: [
      'Add fresh baby spinach, sliced avocado, and cold coconut water into a high-speed blender.',
      'Blend on high for 45 seconds until thick, velvety, and vibrant green.',
      'Pour into a chilled bowl and top with chia seeds, sliced bananas, and a gentle drizzle of raw honey.'
    ],
    chefTip: 'Spinach provides vital iron and magnesium that naturally combat fatigue without caffeine.',
    tags: ['Detox Cleanse', 'Keto Friendly', 'Antioxidants', 'Morning Fuel']
  },
  {
    id: 'rec-5',
    name: 'Organic Quinoa & Stir-Fried Farm Veggie Skillet',
    category: 'Mains',
    diet: 'balanced',
    prepTime: '20 mins',
    servings: 2,
    calories: 390,
    protein: 16,
    carbs: 58,
    fat: 11,
    fiber: 8,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fluffy whole-grain quinoa sautéed with crunchy bell peppers, broccoli florets, and ginger tamari reduction.',
    ingredients: [
      { name: 'Organic Royal White Quinoa', quantity: '1 cup cooked', price: 120 },
      { name: 'Farm Crisp Bell Peppers (Tri-color)', quantity: '1 cup sliced', price: 65 },
      { name: 'Fresh Farm Broccoli Florets', quantity: '1 cup', price: 75 },
      { name: 'Cold-Pressed Sesame Oil', quantity: '1 tbsp', price: 140 },
      { name: 'Naturally Fermented Tamari / Soy', quantity: '1 tbsp', price: 90 }
    ],
    steps: [
      'Rinse quinoa and cook in water with a pinch of rock salt for 15 minutes until fluffy.',
      'In a cast-iron skillet, heat cold-pressed sesame oil over medium-high flame.',
      'Stir-fry bell peppers and broccoli for 4 minutes until tender yet pleasantly crisp.',
      'Fold in cooked quinoa, drizzle tamari reduction, and toss for 2 minutes.'
    ],
    chefTip: 'Quinoa is one of the few plant foods that contains all nine essential amino acids.',
    tags: ['Complete Protein', 'Gluten Free', 'Zero Cholesterol', 'Farm Fresh']
  },
  {
    id: 'rec-6',
    name: 'Smashed Avocado & Heirloom Tomato Toast',
    category: 'Breakfast & Brunch',
    diet: 'balanced',
    prepTime: '10 mins',
    servings: 2,
    calories: 310,
    protein: 9,
    carbs: 36,
    fat: 15,
    fiber: 8,
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Creamy Hass avocado mashed with lime juice, sea salt, and layered over artisan stone-ground whole wheat bread.',
    ingredients: [
      { name: 'Organic Hass Avocados', quantity: '1 ripe avocado', price: 180 },
      { name: 'Stone-Ground Sourdough / Multigrain Bread', quantity: '2 thick slices', price: 55 },
      { name: 'Vine-Ripened Cherry Tomatoes', quantity: '4 sliced', price: 70 },
      { name: 'Fresh Basil & Red Pepper Flakes', quantity: 'to taste', price: 20 }
    ],
    steps: [
      'Toast artisan sourdough bread slices until golden brown and crispy.',
      'In a bowl, mash ripe avocado with fresh lime juice, sea salt, and cracked pepper.',
      'Spread generously over warm toast, arrange sliced cherry tomatoes, and garnish with fresh garden basil.'
    ],
    chefTip: 'Monounsaturated fats in avocado assist in the cellular uptake of fat-soluble vitamins A, D, E, and K.',
    tags: ['Healthy Fats', 'Quick Meal', 'Heart Smart', 'Artisan']
  }
];

const superfoodsIndex = [
  {
    name: 'Baby Spinach & Kale',
    category: 'Leafy Greens',
    benefits: 'Rich in iron, lutein, and chlorophyll. Protects cellular health and improves natural energy.',
    vitamins: 'Vit A, Vit K, Iron, Folate',
    icon: '🥬',
    pairing: 'Salads, smoothies, and light dals.'
  },
  {
    name: 'Hass Avocados',
    category: 'Healthy Fats',
    benefits: 'High in oleic acid and potassium. Regulates blood pressure and supports brain function.',
    vitamins: 'Vit E, Potassium, Omega-9',
    icon: '🥑',
    pairing: 'Toast, salads, dips, and smoothies.'
  },
  {
    name: 'Raw Turmeric & Ginger Root',
    category: 'Medicinal Roots',
    benefits: 'Potent anti-inflammatory curcumin. Enhances digestion and fortifies mucosal immunity.',
    vitamins: 'Curcumin, Gingerol, Antioxidants',
    icon: '🫚',
    pairing: 'Warm tonics, curries, broths, and tea.'
  },
  {
    name: 'Cold-Pressed Wild Oils',
    category: 'Pure Extracts',
    benefits: 'Zero hexane, zero high-heat refining. Retains natural vitamin E and balanced essential fatty acids.',
    vitamins: 'Omega-3, Omega-6, Vit E',
    icon: '🫒',
    pairing: 'Salad dressings and light pan cooking.'
  },
  {
    name: 'Heirloom Vine Tomatoes',
    category: 'Garden Fruits',
    benefits: 'Loaded with lycopene, a potent antioxidant that shields against cellular oxidative stress.',
    vitamins: 'Lycopene, Vit C, Potassium',
    icon: '🍅',
    pairing: 'Soups, salads, pasta, and roasted bowls.'
  },
  {
    name: 'Chia & Sprouted Seeds',
    category: 'Super Seeds',
    benefits: 'High hydrophilic fiber content that promotes gut microbiome diversity and healthy cholesterol.',
    vitamins: 'Soluble Fiber, Calcium, Protein',
    icon: '🌱',
    pairing: 'Oatmeal, yogurt, smoothies, and baking.'
  }
];

const SmartBite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'nutrition' | 'superfoods'>('recipes');

  // Recipe Filter & Search State
  const [query, setQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<FullRecipe | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Calorie & Macro Calculator State
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('28');
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('175');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [fitnessGoal, setFitnessGoal] = useState<'loss' | 'maintain' | 'muscle'>('maintain');
  const [calculatedPlan, setCalculatedPlan] = useState<{
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    waterLitres: number;
    bmr: number;
  } | null>(null);

  // Zustand
  const addToCart = useGrowStore((state) => state.addToCart);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return curatedRecipes.filter(recipe => {
      const matchesQuery = query.trim() === '' ||
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(i => i.name.toLowerCase().includes(query.toLowerCase())) ||
        recipe.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));

      const matchesDiet = selectedDiet === 'all' || recipe.diet === selectedDiet || recipe.tags.some(t => t.toLowerCase().includes(selectedDiet.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || recipe.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesQuery && matchesDiet && matchesCategory;
    });
  }, [query, selectedDiet, selectedCategory]);

  const handleAddIngredientToBasket = (ing: { name: string; price?: number }) => {
    addToCart({
      _id: `rec-ing-${Date.now()}`,
      name: ing.name,
      price: ing.price || 50,
      photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Farm Ingredients',
      stock: 25,
      rating: 4.9
    }, 1);

    setAddedNotice(`Added "${ing.name}" to your basket!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const handleAddAllIngredientsToBasket = (recipe: FullRecipe) => {
    recipe.ingredients.forEach(ing => {
      addToCart({
        _id: `rec-ing-${Math.random()}`,
        name: ing.name,
        price: ing.price || 50,
        photo: recipe.image,
        category: 'Organic Recipe Kit',
        stock: 25,
        rating: 4.9
      }, 1);
    });

    setAddedNotice(`Added all ${recipe.ingredients.length} organic ingredients for "${recipe.name}" to your basket!`);
    setTimeout(() => setAddedNotice(null), 4000);
  };

  const calculateNutritionPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(age) || 25;
    const w = parseFloat(weight) || 70;
    const h = parseFloat(height) || 170;

    // Mifflin-St Jeor Formula
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr += gender === 'male' ? 5 : -161;

    const activityMultipliers = {
      'sedentary': 1.2,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    let tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.4));

    if (fitnessGoal === 'loss') {
      tdee -= 400; // Caloric deficit
    } else if (fitnessGoal === 'muscle') {
      tdee += 350; // Caloric surplus
    }

    tdee = Math.max(1200, tdee);

    // Macro distribution
    let proteinPercent = 0.25;
    let fatPercent = 0.25;
    let carbsPercent = 0.50;

    if (fitnessGoal === 'muscle') {
      proteinPercent = 0.30;
      fatPercent = 0.25;
      carbsPercent = 0.45;
    } else if (fitnessGoal === 'loss') {
      proteinPercent = 0.30;
      fatPercent = 0.30;
      carbsPercent = 0.40;
    }

    const proteinCalories = tdee * proteinPercent;
    const carbsCalories = tdee * carbsPercent;
    const fatCalories = tdee * fatPercent;

    const proteinGrams = Math.round(proteinCalories / 4);
    const carbsGrams = Math.round(carbsCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    // Water intake in Litres: ~35ml per kg body weight
    const waterLitres = +(w * 0.038).toFixed(1);

    setCalculatedPlan({
      calories: tdee,
      proteinGrams,
      carbsGrams,
      fatGrams,
      waterLitres,
      bmr: Math.round(bmr)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/20 to-teal-50/30 py-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Added to basket floating notification */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2 animate-slide-up border border-emerald-600">
            <Check className="w-4 h-4 text-emerald-300" />
            <span>{addedNotice}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xs text-emerald-800 font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>SmartBite Farm Kitchen & Nutrition Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Nourish Your Body With <span className="text-emerald-700">Pure Organic Harvest</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Discover delicious chef-curated wholesome recipes made directly with pesticide-free farm produce, calculate your personal daily macronutrient goals, and understand superfood biology.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-8">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-emerald-100 inline-flex space-x-1 sm:space-x-2 max-w-full overflow-x-auto">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'recipes'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-800'
                  }`}
              >
                <ChefHat className="w-4 h-4" />
                <span>Farm Kitchen Recipes</span>
              </button>

              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'nutrition'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-800'
                  }`}
              >
                <Activity className="w-4 h-4" />
                <span>Macro & Calorie Planner</span>
              </button>

              <button
                onClick={() => setActiveTab('superfoods')}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'superfoods'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-800'
                  }`}
              >
                <Apple className="w-4 h-4" />
                <span>Superfoods Index</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Farm Kitchen Recipes */}
        {activeTab === 'recipes' && (
          <div className="space-y-8">

            {/* Search & Filter Controls */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-emerald-100 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recipes, ingredients (e.g. spinach, turmeric, quinoa, soup)..."
                  className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs sm:text-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                {/* Dietary Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-gray-500 mr-1">Diet Focus:</span>
                  {[
                    { id: 'all', label: 'All Wholesome' },
                    { id: 'high-protein', label: 'High Protein' },
                    { id: 'balanced', label: 'Balanced' },
                    { id: 'low-carb', label: 'Low Carb' },
                    { id: 'Immunity', label: 'Immunity' },
                    { id: 'Vegan', label: 'Vegan' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDiet(d.id)}
                      className={`px-3 py-1.5 rounded-full font-bold transition-colors ${selectedDiet === d.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'
                        }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-500">Meal:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 outline-none font-medium bg-stone-50 text-gray-700 text-xs"
                  >
                    <option value="all">All Courses</option>
                    <option value="Salad">Salads & Bowls</option>
                    <option value="Soups">Soups & Broths</option>
                    <option value="Power Snacks">Power Snacks</option>
                    <option value="Smoothies">Smoothies</option>
                    <option value="Mains">Mains</option>
                    <option value="Breakfast">Breakfast</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100/80 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-52 overflow-hidden bg-stone-100">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Calories badge */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-sm">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>{r.calories} kcal</span>
                      </div>

                      {/* Prep time badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-900 px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1 shadow-sm">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{r.prepTime}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {r.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-extrabold text-base text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {r.name}
                      </h3>

                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {r.description}
                      </p>

                      {/* Macronutrients Micro Bar */}
                      <div className="bg-stone-50 rounded-2xl p-3 mb-4 border border-stone-100">
                        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                          <div>
                            <span className="text-gray-400 block font-medium">Protein</span>
                            <span className="font-extrabold text-emerald-800">{r.protein}g</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-medium">Carbs</span>
                            <span className="font-extrabold text-gray-800">{r.carbs}g</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-medium">Healthy Fat</span>
                            <span className="font-extrabold text-gray-800">{r.fat}g</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-medium">Dietary Fiber</span>
                            <span className="font-extrabold text-emerald-700">{r.fiber}g</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Ingredients Snippet */}
                      <div className="space-y-1 text-xs text-gray-600 mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Farm Ingredients ({r.ingredients.length})</span>
                        {r.ingredients.slice(0, 3).map((ing, i) => (
                          <div key={i} className="flex items-center text-[11px] text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                            <span className="line-clamp-1">{ing.name} ({ing.quantity})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => setSelectedRecipeModal(r)}
                      className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>View Recipe & Steps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleAddAllIngredientsToBasket(r)}
                      className="w-full py-2.5 bg-white hover:bg-emerald-700 text-emerald-700 hover:text-white border border-emerald-200 hover:border-transparent rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Organic Ingredients to Cart</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <Leaf className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800">No matching recipes found</h3>
                <p className="text-xs text-gray-500 mt-1">Try changing your search query or selecting "All Wholesome".</p>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Nutrition & Macro Planner */}
        {activeTab === 'nutrition' && (
          <div className="grid lg:grid-cols-12 gap-8">

            {/* Left: Input Form (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Activity className="w-4 h-4" />
                <span>Scientific Metabolism Profiler</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Personalized Daily Energy Target</h2>
              <p className="text-xs text-gray-500 mb-6">
                Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with clean organic macronutrient splits.
              </p>

              <form onSubmit={calculateNutritionPlan} className="space-y-4">

                {/* Gender */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Biological Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${gender === 'male'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
                        }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${gender === 'female'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 text-gray-700 hover:bg-stone-200'
                        }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                {/* Age, Weight, Height */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Age (Years)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Daily Physical Activity</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sedentary', label: 'Desk / Sedentary', desc: 'Little to no exercise' },
                      { id: 'moderate', label: 'Moderate Active', desc: 'Exercise 3-5 days/wk' },
                      { id: 'active', label: 'Very Active', desc: 'Hard workout 6-7 days/wk' },
                      { id: 'very-active', label: 'Athletic / Physical', desc: 'Physical job / 2x training' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setActivityLevel(lvl.id as any)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${activityLevel === lvl.id
                            ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold'
                            : 'border-stone-200 text-gray-600 hover:bg-stone-50'
                          }`}
                      >
                        <div className="text-xs">{lvl.label}</div>
                        <div className="text-[10px] text-gray-400 font-normal">{lvl.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Wellness Goal */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Primary Nutrition Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'loss', label: 'Fat Loss', desc: 'Gentle deficit' },
                      { id: 'maintain', label: 'Maintain & Vitality', desc: 'Equilibrium' },
                      { id: 'muscle', label: 'Lean Muscle', desc: 'Protein surplus' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setFitnessGoal(g.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${fitnessGoal === g.id
                            ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold'
                            : 'border-stone-200 text-gray-600 hover:bg-stone-50'
                          }`}
                      >
                        <div className="text-xs">{g.label}</div>
                        <div className="text-[10px] text-gray-400">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Compute Personal Macro Breakdown</span>
                </button>
              </form>
            </div>

            {/* Right: Results Dashboard (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {calculatedPlan ? (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100 space-y-6 animate-fade-in">

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Target Energy Expenditure
                    </span>
                    <div className="flex items-baseline space-x-3 mt-3">
                      <span className="text-4xl sm:text-5xl font-black text-emerald-800">
                        {calculatedPlan.calories}
                      </span>
                      <span className="text-base font-bold text-gray-500">kcal / day</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on base metabolism BMR of {calculatedPlan.bmr} kcal with activity adjustments.
                    </p>
                  </div>

                  {/* Macronutrient Distribution Bars */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Recommended Daily Macro Balance
                    </h3>

                    {/* Protein */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-emerald-800">Clean Bioactive Protein</span>
                        <span className="text-gray-900">{calculatedPlan.proteinGrams}g ({Math.round(calculatedPlan.proteinGrams * 4)} kcal)</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full w-[30%]"></div>
                      </div>
                    </div>

                    {/* Complex Carbs */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-amber-700">Complex Farm Carbs & Fiber</span>
                        <span className="text-gray-900">{calculatedPlan.carbsGrams}g ({Math.round(calculatedPlan.carbsGrams * 4)} kcal)</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[45%]"></div>
                      </div>
                    </div>

                    {/* Healthy Fats */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-teal-700">Cold-Pressed Healthy Fats</span>
                        <span className="text-gray-900">{calculatedPlan.fatGrams}g ({Math.round(calculatedPlan.fatGrams * 9)} kcal)</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full w-[25%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Hydration Tracker Meter */}
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-blue-900">Hydration Target</h4>
                        <p className="text-[11px] text-blue-700">Pure filtered water & electrolyte broths</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-blue-900">{calculatedPlan.waterLitres} L</span>
                      <span className="text-[10px] text-blue-500 block">/ day</span>
                    </div>
                  </div>

                  {/* Curated Recommendations */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2 text-xs">
                    <h4 className="font-bold text-gray-900">Personalized Farm Basket Picks:</h4>
                    <ul className="space-y-1.5 text-gray-600 text-[11px]">
                      <li className="flex items-center space-x-2">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Incorporate sprouted legumes & baby spinach daily for plant iron.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Swap commercial refined fats with cold-pressed mustard or coconut oil.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Enter Your Biometrics</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Fill in your age, weight, and lifestyle factors on the left to see your comprehensive personalized macro blueprint.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 3: Superfoods Index */}
        {activeTab === 'superfoods' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Organic Farm Superfood Index</h2>
              <p className="text-xs text-gray-500 max-w-2xl mb-6">
                Scientifically recognized nutrient-dense organic foods harvested free from synthetic insecticides and glyphosates.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {superfoodsIndex.map((item, idx) => (
                  <div key={idx} className="bg-stone-50/70 hover:bg-white rounded-2xl p-5 border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {item.benefits}
                    </p>

                    <div className="space-y-1 pt-3 border-t border-stone-200/60 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Key Nutrients:</span>
                        <span className="font-bold text-emerald-800">{item.vitamins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Culinary Fit:</span>
                        <span className="font-medium text-gray-700">{item.pairing}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Full Recipe Modal View */}
        {selectedRecipeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto border border-emerald-100">

              <button
                onClick={() => setSelectedRecipeModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-60 rounded-2xl overflow-hidden mb-6 -mt-2">
                <img
                  src={selectedRecipeModal.image}
                  alt={selectedRecipeModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
                    {selectedRecipeModal.category} • {selectedRecipeModal.prepTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">{selectedRecipeModal.name}</h3>
                </div>
              </div>

              {/* Recipe Meta Chips */}
              <div className="grid grid-cols-4 gap-2 mb-6 bg-stone-50 p-3.5 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Energy</span>
                  <span className="font-extrabold text-emerald-800 text-sm">{selectedRecipeModal.calories} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Protein</span>
                  <span className="font-extrabold text-gray-900 text-sm">{selectedRecipeModal.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Carbs</span>
                  <span className="font-extrabold text-gray-900 text-sm">{selectedRecipeModal.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Healthy Fats</span>
                  <span className="font-extrabold text-gray-900 text-sm">{selectedRecipeModal.fat}g</span>
                </div>
              </div>

              {/* Ingredients List with Quick-Add */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>Organic Farm Ingredients</span>
                  </h4>
                  <button
                    onClick={() => handleAddAllIngredientsToBasket(selectedRecipeModal)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add All ({selectedRecipeModal.ingredients.length}) to Cart</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedRecipeModal.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/50 transition-colors text-xs border border-stone-100">
                      <div>
                        <span className="font-bold text-gray-800">{ing.name}</span>
                        <span className="text-gray-500 ml-2">({ing.quantity})</span>
                      </div>
                      <button
                        onClick={() => handleAddIngredientToBasket(ing)}
                        className="px-2.5 py-1 bg-white hover:bg-emerald-700 text-emerald-700 hover:text-white border border-emerald-200 rounded-lg text-[10px] font-bold transition-all shadow-2xs"
                      >
                        + Add ₹{ing.price || 50}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Cooking Method */}
              <div className="mb-6">
                <h4 className="text-sm font-extrabold text-gray-900 mb-3 flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-emerald-600" />
                  <span>Preparation Instructions</span>
                </h4>
                <div className="space-y-3">
                  {selectedRecipeModal.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Tip */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-xs text-emerald-900 flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Chef's Organic Secret:</span>
                  <p className="text-[11px] text-emerald-800">{selectedRecipeModal.chefTip}</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SmartBite;
