
import { Biryani, Review, Restaurant, RecipeDetail, RestaurantDetails, Dish } from './types';

export const HOME_CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop", // Biryani Pot
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop", // Plated
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2010&auto=format&fit=crop",  // Spices/Rice
  "https://images.unsplash.com/photo-1631515243349-e0603604305e?q=80&w=2000&auto=format&fit=crop"   // Dark mood biryani
];

export const TERMS_TEXT = `
**TERMS AND CONDITIONS**

**1. Introduction**
Welcome to Biryani360. By accessing or using our mobile application, you agree to be bound by these Terms and Conditions and our Privacy Policy.

**2. Compliance with Indian Laws**
This agreement is governed by the laws of India, including the Information Technology Act, 2000 and its amendments.

**3. Data Usage & Privacy**
We collect location data to facilitate delivery. Your order history and preferences are stored securely. We do not sell your personal data to third parties.

**4. Payments**
Biryani360 uses third-party payment gateways (UPI, Cards). We are not responsible for transaction failures caused by banking networks.

**5. Food Safety**
We partner with FSSAI-licensed kitchens only. However, Biryani360 is an aggregator and is not directly liable for food quality, though we strive for excellence.

**6. Cancellation & Refunds**
Orders once placed cannot be cancelled after 1 minute. Refunds are processed within 5-7 business days for eligible disputes.

**7. User Responsibility**
Users must provide accurate address and contact details. Misuse of the platform (fake orders, abusive behavior) will result in a permanent ban.

**8. Jurisdiction**
Any disputes arising out of this agreement shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.

*(Scroll to the bottom to accept)*
`;

export const TOPPINGS = [
    { id: 'onion', name: 'Fried Onions', price: 20 },
    { id: 'egg', name: 'Boiled Egg', price: 15 },
    { id: 'raita', name: 'Extra Raita', price: 25 },
];

export const CHEF_TIPS = {
    'Dum': 'Dum Pukht is a slow-cooking technique where the pot is sealed with dough to trap steam, allowing ingredients to cook in their own juices.',
    'Marination': 'For biryani, allow at least 4 hours of marination. The yogurt enzymes tenderize the meat while spices infuse deep flavor.',
    'Saffron': 'Bloom saffron strands in warm milk for 20 minutes before using. This releases the golden color and distinct floral aroma.',
    'Rice': 'Always use aged Basmati rice. Rinse gently until water runs clear to remove excess starch, ensuring fluffy, separate grains.',
    'Layering': 'The art of layering involves alternating meat and rice. Place heavier meat at the bottom and lighter, aromatic rice at the top.',
    'Yakhni': 'A flavorful stock made by boiling meat with whole spices. This is the foundation of flavor for Pulao and Lucknowi Biryani.'
};

export const MENU_ITEMS: Biryani[] = [
  {
    id: '1',
    name: 'Royal Hyderabadi Dum',
    description: 'The classic. Marinated mutton, saffron-milk, and basmati rice cooked on slow dum.',
    sensoryDescription: 'Rich aroma of saffron, tender mutton falling off the bone, and a burst of spicy heat.',
    price: 450,
    rating: 4.8,
    spiceLevel: 8,
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
    hoverImageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    style: 'Hyderabadi',
    isVeg: false,
  },
  {
    id: '2',
    name: 'Lucknowi Nawabi',
    description: 'Subtle, fragrant, and lighter on spices. Cooked in the Awadhi style.',
    sensoryDescription: 'Delicate floral notes of rose water and kewra, with melt-in-the-mouth meat.',
    price: 420,
    rating: 4.6,
    spiceLevel: 4,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    hoverImageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
    style: 'Lucknowi',
    isVeg: false,
  },
  {
    id: '3',
    name: 'Kolkata Special',
    description: 'Characterized by the presence of a boiled egg and a large potato chunk.',
    sensoryDescription: 'Sweet undertones, aromatic rice, and the comforting texture of soft aloo.',
    price: 380,
    rating: 4.5,
    spiceLevel: 5,
    imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop',
    hoverImageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop',
    style: 'Kolkata',
    isVeg: false,
  },
  {
    id: '4',
    name: 'Malabar Fish Biryani',
    description: 'Uses short-grain Khaima rice (Jeerakasala) and plenty of ghee.',
    sensoryDescription: 'Fresh cloves, ghee, and dum-cooked rice releasing intense warmth.',
    price: 490,
    rating: 4.7,
    spiceLevel: 6,
    imageUrl: 'https://images.unsplash.com/photo-1630409351241-e90e7f5e47ac?q=80&w=800&auto=format&fit=crop',
    hoverImageUrl: 'https://images.unsplash.com/photo-1632204555819-24259b9a67e1?q=80&w=800&auto=format&fit=crop',
    style: 'Malabar',
    isVeg: false,
  },
  {
    id: '5',
    name: 'Ambur Star',
    description: 'Uses Seeraga samba rice and a sour curd base. Famous in the Arcot region.',
    sensoryDescription: 'Tangy, spicy punch with a distinct aroma of mint and coriander.',
    price: 390,
    rating: 4.4,
    spiceLevel: 9,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop',
    hoverImageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop',
    style: 'Ambur',
    isVeg: false,
  },
];

export const REVIEWS: Review[] = [
  { id: '1', userName: 'Arjun K.', userBadge: 'Spice Master', rating: 5, comment: 'The steam effect on the menu made me so hungry I ordered two!', likes: 24 },
  { id: '2', userName: 'Neha S.', userBadge: 'Dum Expert', rating: 4, comment: 'Authentic Hyderabadi taste. The saffron hit is real.', likes: 12 },
  { id: '3', userName: 'Rohan D.', userBadge: 'Eco Walker', rating: 5, comment: 'Fastest delivery ever. Rider was polite.', likes: 8 },
];

export const NEARBY_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: "Nizam's Dum House",
    rating: 4.8,
    ratingCount: 12050,
    distance: '0.4 km',
    time: '15 min',
    walkable: true,
    delivery: true,
    isNew: false,
    offers: true,
    tags: ['Hyderabadi', 'Legendary', 'Halal'],
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    desc: 'Legendary Hyderabadi Dum',
    address: 'SD Road, Secunderabad'
  },
  {
    id: 'r2',
    name: 'Awadh Spice Parlour',
    rating: 4.5,
    ratingCount: 8400,
    distance: '2.1 km',
    time: '35 min',
    walkable: false,
    delivery: true,
    isNew: true,
    offers: false,
    tags: ['Persian', 'Premium', 'Royal'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500',
    coordinates: { lat: 17.3950, lng: 78.4967 },
    desc: 'Royal Persian Flavors',
    address: 'Jubilee Hills, Rd 36'
  },
  {
    id: 'r3',
    name: 'Calcutta Comfort',
    rating: 4.2,
    ratingCount: 5200,
    distance: '0.9 km',
    time: '20 min',
    walkable: true,
    delivery: true,
    isNew: false,
    offers: true,
    tags: ['Potato', 'Aromatic', 'Bengali'],
    imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=500',
    coordinates: { lat: 17.3750, lng: 78.4767 },
    desc: 'Bongs & Biryani',
    address: 'RTC X Roads'
  },
  {
    id: 'r4',
    name: 'Malabar Coast Kitchens',
    rating: 4.9,
    ratingCount: 3200,
    distance: '1.5 km',
    time: '28 min',
    walkable: false,
    delivery: true,
    isNew: false,
    offers: false,
    tags: ['Kerala', 'Seafood', 'Ghee'],
    imageUrl: 'https://images.unsplash.com/photo-1631515243349-e0603604305e?q=80&w=500',
    coordinates: { lat: 17.3616, lng: 78.4747 },
    desc: 'Taste of Kerala',
    address: 'Near Charminar'
  },
  {
    id: 'r5',
    name: 'Ambur Flame',
    rating: 4.7,
    ratingCount: 15000,
    distance: '3.2 km',
    time: '40 min',
    walkable: false,
    delivery: true,
    isNew: false,
    offers: true,
    tags: ['Tamil', 'Spicy', 'Seeraga'],
    imageUrl: 'https://images.unsplash.com/photo-1604135307399-86c6ce0ab0ca?q=80&w=500',
    coordinates: { lat: 17.4100, lng: 78.4300 },
    desc: 'The Arcot Special',
    address: 'Tolichowki'
  },
  {
    id: 'r6',
    name: 'Dindigul Express',
    rating: 4.6,
    ratingCount: 11000,
    distance: '2.8 km',
    time: '38 min',
    walkable: false,
    delivery: true,
    isNew: false,
    offers: true,
    tags: ['Pepper', 'Spicy', 'Tamil'],
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500',
    coordinates: { lat: 17.3688, lng: 78.4750 },
    desc: 'Peppery Thalappakatti',
    address: 'Nayapul'
  },
  {
    id: 'r7',
    name: 'Bombay Bazaar Biryani',
    rating: 4.4,
    ratingCount: 9000,
    distance: '5.1 km',
    time: '50 min',
    walkable: false,
    delivery: true,
    isNew: false,
    offers: false,
    tags: ['Potato', 'Sweet', 'Mild'],
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500',
    coordinates: { lat: 17.4300, lng: 78.4500 },
    desc: 'Bohri Style',
    address: 'Punjagutta'
  },
  {
    id: 'r8',
    name: 'Bhatkali Corner',
    rating: 4.5,
    ratingCount: 13500,
    distance: '4.0 km',
    time: '42 min',
    walkable: false,
    delivery: true,
    isNew: false,
    offers: true,
    tags: ['Coastal', 'Onion', 'Spicy'],
    imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=500',
    coordinates: { lat: 17.4000, lng: 78.4800 },
    desc: 'Coastal Karnataka',
    address: 'Basheerbagh'
  },
  {
    id: 'r9',
    name: 'Veggie Dum Studio',
    rating: 4.9,
    ratingCount: 2100,
    distance: '8.5 km',
    time: '60 min',
    walkable: false,
    delivery: false,
    isNew: false,
    offers: false,
    tags: ['Pure Veg', 'Paneer', 'Jackfruit'],
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500',
    coordinates: { lat: 17.3900, lng: 78.3800 },
    desc: 'The Jackfruit Dum',
    address: 'Gandipet'
  },
  {
    id: 'r10',
    name: 'Memon Masala',
    rating: 4.3,
    ratingCount: 500,
    distance: '0.2 km',
    time: '10 min',
    walkable: true,
    delivery: true,
    isNew: true,
    offers: true,
    tags: ['Spicy', 'MeatHeavy', 'Community'],
    imageUrl: 'https://images.unsplash.com/photo-1632204555819-24259b9a67e1?q=80&w=500',
    coordinates: { lat: 17.3820, lng: 78.4840 },
    desc: 'Authentic Memoni',
    address: 'Abids'
  }
];

// --- MASTER RECIPE LIBRARY ---
export const MASTER_RECIPE_LIBRARY: Record<string, RecipeDetail> = {
    'hyderabadi': {
        id: 'hyderabadi',
        name: 'Hyderabadi Kachhi Dum Biryani',
        origin: 'Hyderabad, India',
        type: 'Meat',
        description: 'The crown jewel of biryanis. "Kachhi" means raw - the meat is marinated overnight and cooked together with the rice in a sealed pot.',
        sensoryDescription: 'Rich aroma of saffron, tender mutton falling off the bone, and a burst of spicy heat.',
        imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800',
        prepTime: '4 hrs (Marination) + 45 mins',
        cookTime: '45 mins',
        difficulty: 'Expert',
        serves: 4,
        spiceLevel: 8,
        calories: 650,
        ingredients: [
            { item: 'Mutton (Bone-in)', qty: '1 kg' },
            { item: 'Basmati Rice (Aged)', qty: '750 g' },
            { item: 'Raw Papaya Paste', qty: '2 tbsp (tenderizer)' },
            { item: 'Ginger Garlic Paste', qty: '3 tbsp' },
            { item: 'Fried Onions (Birista)', qty: '2 cups' },
            { item: 'Yogurt (Thick)', qty: '1.5 cups' },
            { item: 'Saffron Milk', qty: '1/2 cup' },
            { item: 'Desi Ghee', qty: '1/2 cup' }
        ],
        steps: [
            { title: 'Marinate Meat', desc: 'Mix mutton with papaya paste, ginger-garlic, yogurt, spices, and half the fried onions. Let sit for 4-12 hours.' },
            { title: 'Prepare Rice', desc: 'Boil water with whole spices (cardamom, clove, cinnamon). Add soaked rice. Cook until only 70% done.' },
            { title: 'Layering (The Art)', desc: 'In a heavy bottom handi, place the raw marinated meat. Layer the 70% cooked rice on top.' },
            { title: 'Garnishing', desc: 'Sprinkle saffron milk, remaining fried onions, mint, and generous ghee on top.' },
            { title: 'Dum Pukht', desc: 'Seal the pot with dough. Cook on high flame for 10 mins, then lowest flame for 35 mins.' }
        ],
        chefNotes: 'Do not open the pot immediately. Let it rest for 20 mins after turning off heat to let flavors settle.',
        pairings: ['Mirchi Ka Salan', 'Double Ka Meetha', 'Thums Up'],
        source: 'Traditional Nizami Kitchens'
    },
    'lucknowi': {
        id: 'lucknowi',
        name: 'Lucknowi Awadhi Biryani',
        origin: 'Lucknow, India',
        type: 'Meat',
        description: 'A "Pakki" biryani where meat and rice are cooked separately and then layered. Known for subtle, floral aromas.',
        sensoryDescription: 'Delicate floral notes of rose water and kewra, with melt-in-the-mouth meat cooked in yakhni.',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800',
        prepTime: '2 hrs',
        cookTime: '1 hr',
        difficulty: 'Expert',
        serves: 4,
        spiceLevel: 4,
        calories: 580,
        ingredients: [
            { item: 'Mutton', qty: '1 kg' },
            { item: 'Basmati Rice', qty: '750 g' },
            { item: 'Yakhni Stock', qty: '2 cups' },
            { item: 'Kewra Water', qty: '1 tsp' },
            { item: 'Rose Water', qty: '1 tsp' },
            { item: 'Yellow Chilli Powder', qty: '1 tsp' }
        ],
        steps: [
            { title: 'Prepare Yakhni', desc: 'Boil meat with whole spices and onions to create a rich, aromatic stock.' },
            { title: 'Strain & Cook', desc: 'Strain the stock. Cook the meat in ghee with the yakhni reduction.' },
            { title: 'Layering', desc: 'Layer the cooked meat and 80% cooked rice. Sprinkle rose and kewra water.' },
            { title: 'Dum', desc: 'Seal and cook on low heat for 20 minutes to infuse the floral aromas.' }
        ],
        chefNotes: 'The rice should be lighter than air. Do not overuse masala; let the meat stock shine.',
        pairings: ['Burani Raita', 'Galouti Kebab'],
        source: 'Royal Awadhi Kitchens'
    },
    'kolkata': {
        id: 'kolkata',
        name: 'Kolkata Chicken Biryani',
        origin: 'Kolkata, India',
        type: 'Meat',
        description: ' evolved from the Lucknowi style, this biryani is famous for its large potato chunk and boiled egg.',
        sensoryDescription: 'Subtly sweet, aromatic, with the comforting texture of soft, spice-infused potatoes.',
        imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800',
        prepTime: '1 hr',
        cookTime: '1.5 hrs',
        difficulty: 'Medium',
        serves: 4,
        spiceLevel: 5,
        calories: 620,
        ingredients: [
            { item: 'Chicken', qty: '1 kg' },
            { item: 'Potatoes (Large)', qty: '4 pcs' },
            { item: 'Boiled Eggs', qty: '4 pcs' },
            { item: 'Basmati Rice', qty: '750 g' },
            { item: 'Meetha Attar', qty: '2 drops' }
        ],
        steps: [
            { title: 'Fry Potatoes', desc: 'Marinate potatoes with turmeric and salt. Fry until golden brown.' },
            { title: 'Cook Chicken', desc: 'Cook chicken with yogurt and mild spices (white pepper, nutmeg) until tender.' },
            { title: 'Layering', desc: 'Layer rice, chicken, fried potatoes, and eggs. Add a drop of Meetha Attar.' },
            { title: 'Dum', desc: 'Seal and slow cook.' }
        ],
        chefNotes: 'The potato is the hero here. Ensure it is cooked through but holds its shape.',
        pairings: ['Chicken Chaap', 'Firni'],
        source: 'Kolkata Heritage'
    },
    'malabar': {
        id: 'malabar',
        name: 'Malabar Fish Biryani',
        origin: 'Kerala, India',
        type: 'Seafood',
        description: 'Made with short-grain Khaima/Jeerakasala rice. Uses plenty of ghee, cashew nuts, and raisins.',
        sensoryDescription: 'Rich ghee aroma, sweet undertones from raisins, and fresh spice from green chilies.',
        imageUrl: 'https://images.unsplash.com/photo-1630409351241-e90e7f5e47ac?q=80&w=800',
        prepTime: '45 mins',
        cookTime: '45 mins',
        difficulty: 'Medium',
        serves: 4,
        spiceLevel: 6,
        calories: 700,
        ingredients: [
            { item: 'King Fish/Seer Fish', qty: '500g' },
            { item: 'Jeerakasala Rice', qty: '3 cups' },
            { item: 'Green Chilies', qty: '10 pcs' },
            { item: 'Ghee', qty: '1/2 cup' },
            { item: 'Cashews & Raisins', qty: '1/2 cup' }
        ],
        steps: [
            { title: 'Fry Fish', desc: 'Lightly fry the marinated fish pieces.' },
            { title: 'Make Masala', desc: 'Sauté onions, green chili paste, and tomatoes. Add fried fish to this base.' },
            { title: 'Cook Rice', desc: 'Fry the rice in ghee, then boil until done.' },
            { title: 'Layer & Dum', desc: 'Layer fish masala and rice. Top with fried onions, nuts, and raisins.' }
        ],
        chefNotes: 'Do not overcook the rice; Jeerakasala can get mushy easily.',
        pairings: ['Date Pickle', 'Coconut Chutney'],
        source: 'Mappila Cuisine'
    },
    'ambur': {
        id: 'ambur',
        name: 'Ambur Star Biryani',
        origin: 'Tamil Nadu, India',
        type: 'Meat',
        description: 'Famous in the Arcot region. Uses Seeraga Samba rice and a distinct sour curd base with red chili paste.',
        sensoryDescription: 'Tangy, spicy punch with a distinct aroma of mint and coriander.',
        imageUrl: 'https://images.unsplash.com/photo-1604135307399-86c6ce0ab0ca?q=80&w=800',
        prepTime: '1 hr',
        cookTime: '1 hr',
        difficulty: 'Medium',
        serves: 4,
        spiceLevel: 9,
        calories: 650,
        ingredients: [
            { item: 'Mutton', qty: '1 kg' },
            { item: 'Seeraga Samba Rice', qty: '1 kg' },
            { item: 'Red Chili Paste', qty: '4 tbsp' },
            { item: 'Sour Curd', qty: '1 cup' },
            { item: 'Mint Leaves', qty: '1 bunch' }
        ],
        steps: [
            { title: 'Chili Paste', desc: 'Soak dried red chilies and grind to a fine paste. This gives the color and heat.' },
            { title: 'Cook Mutton', desc: 'Cook mutton with the chili paste, curd, and herbs until tender.' },
            { title: 'Add Rice', desc: 'Add water to the gravy, bring to boil, then add soaked Seeraga Samba rice.' },
            { title: 'Dum', desc: 'Once water evaporates, seal and cook on low heat.' }
        ],
        chefNotes: 'Serve with Ennai Kathirikai (Brinjal Curry) for the authentic experience.',
        pairings: ['Onion Raita', 'Brinjal Curry'],
        source: 'Arcot Kitchens'
    },
    'dhakai': {
        id: 'dhakai',
        name: 'Dhakai Kachchi',
        origin: 'Dhaka, Bangladesh',
        type: 'Meat',
        description: 'Famous for using short-grain Chinigura rice and distinct mustard oil marinade. The potatoes are fried whole and are a highlight.',
        sensoryDescription: 'Distinct aroma of mustard oil, sweet chinigura rice, and tender mutton.',
        imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800',
        prepTime: '3 hrs',
        cookTime: '1 hr',
        difficulty: 'Hard',
        serves: 4,
        spiceLevel: 6,
        calories: 700,
        ingredients: [{item: 'Chinigura Rice', qty: '1kg'}, {item: 'Mustard Oil', qty: '1 cup'}],
        steps: [{title: 'Mustard Marinade', desc: 'Use high quality mustard oil for the distinct pungency.'}],
        chefNotes: 'The potatoes must be pricked and fried golden before adding to the pot.',
        pairings: ['Borhani'],
        source: 'Old Dhaka'
    },
    'karachi': {
        id: 'karachi',
        name: 'Karachi Beef Biryani',
        origin: 'Karachi, Pakistan',
        type: 'Meat',
        description: 'Known for its high spice level and use of tomatoes and potatoes with beef. Very aromatic and tangy.',
        sensoryDescription: 'A spicy kick with tangy dried plums (alu bukhara) and rich beef flavor.',
        imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea287bc0a93?q=80&w=800',
        prepTime: '1 hr',
        cookTime: '1 hr',
        difficulty: 'Medium',
        serves: 5,
        spiceLevel: 9,
        calories: 800,
        ingredients: [{item: 'Beef', qty: '1kg'}, {item: 'Dried Plums', qty: '10 pcs'}],
        steps: [{title: 'Masala Base', desc: 'Cook beef with tomatoes and spices until oil separates.'}],
        chefNotes: 'Don’t skimp on the oil and chilies; this is meant to be spicy.',
        pairings: ['Raita'],
        source: 'Karachi Streets'
    },
    'persian': {
        id: 'persian',
        name: 'Persian Jeweled Pilaf',
        origin: 'Iran',
        type: 'Meat',
        description: 'Not technically a biryani, but the ancestor. A beautiful pilaf layered with candied citrus, saffron, nuts, and barberries.',
        sensoryDescription: 'Sweet, sour, and floral with a buttery finish.',
        imageUrl: 'https://images.unsplash.com/photo-1594982672422-540702d7e008?q=80&w=800',
        prepTime: '2 hrs',
        cookTime: '1 hr',
        difficulty: 'Hard',
        serves: 4,
        spiceLevel: 2,
        calories: 500,
        ingredients: [{item: 'Barberries', qty: '1/2 cup'}, {item: 'Saffron', qty: '1g'}],
        steps: [{title: 'Tahdig', desc: 'Create the crispy rice bottom layer.'}],
        chefNotes: 'Soak barberries to remove bitterness.',
        pairings: ['Yogurt'],
        source: 'Persian Heritage'
    },
    'burmese': {
        id: 'burmese',
        name: 'Danbauk',
        origin: 'Myanmar',
        type: 'Meat',
        description: 'Burmese style biryani influenced by Indian migrants. Often uses cashew nuts, raisins, and peas.',
        sensoryDescription: 'Mild, nutty, and savory with a distinct turmeric hue.',
        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800',
        prepTime: '1.5 hrs',
        cookTime: '45 min',
        difficulty: 'Medium',
        serves: 4,
        spiceLevel: 4,
        calories: 600,
        ingredients: [{item: 'Cashews', qty: '1/2 cup'}, {item: 'Peas', qty: '1 cup'}],
        steps: [{title: 'Rice Cooking', desc: 'Cook rice with turmeric and ghee.'}],
        chefNotes: 'Serve with cucumber salad.',
        pairings: ['Soup'],
        source: 'Yangon'
    },
    'korean-fusion': {
        id: 'korean-fusion',
        name: 'Kimchi Fried Biryani',
        origin: 'Fusion Lab',
        type: 'Fusion',
        description: 'A wild crossover. Biryani rice stir-fried with fermented kimchi and topped with a sunny side up egg.',
        sensoryDescription: 'Funky, spicy, and crunchy.',
        imageUrl: 'https://images.unsplash.com/photo-1553163147-621957516919?q=80&w=800',
        prepTime: '20 min',
        cookTime: '15 min',
        difficulty: 'Easy',
        serves: 2,
        spiceLevel: 7,
        calories: 450,
        ingredients: [{item: 'Kimchi', qty: '1 cup'}, {item: 'Leftover Biryani', qty: '2 cups'}],
        steps: [{title: 'Stir Fry', desc: 'Crisp up the rice with kimchi juice.'}],
        chefNotes: 'Best use of leftover biryani.',
        pairings: ['Soju'],
        source: 'Modern Fusion'
    },
    'bbq-fusion': {
        id: 'bbq-fusion',
        name: 'Texas Brisket Biryani',
        origin: 'USA/India Fusion',
        type: 'Fusion',
        description: 'Smoked brisket chunks layered with spicy basmati rice. Where charcoal smoke meets garam masala.',
        sensoryDescription: 'Deep smokey meat flavor cuts through the aromatic rice.',
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800',
        prepTime: '12 hrs (Smoke)',
        cookTime: '45 min',
        difficulty: 'Expert',
        serves: 6,
        spiceLevel: 6,
        calories: 900,
        ingredients: [{item: 'Brisket', qty: '1kg'}, {item: 'Basmati', qty: '750g'}],
        steps: [{title: 'Smoke Meat', desc: 'Smoke brisket for 12 hours.'}, {title: 'Layer', desc: 'Layer smoked meat with rice.'}],
        chefNotes: 'Use hickory wood for smoking.',
        pairings: ['Cola'],
        source: 'Austin Fusion'
    },
    'default': {
        id: 'default',
        name: 'Classic Dum Biryani',
        origin: 'India',
        type: 'Meat',
        description: 'A traditional layered rice dish.',
        sensoryDescription: 'Aromatic and fulfilling.',
        imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800',
        prepTime: '1 hr',
        cookTime: '1 hr',
        difficulty: 'Medium',
        serves: 4,
        spiceLevel: 5,
        calories: 600,
        ingredients: [{item: 'Rice', qty: '2 cups'}, {item: 'Meat/Veg', qty: '500g'}],
        steps: [{title: 'Cook', desc: 'Cook ingredients and layer.'}],
        chefNotes: 'Serve hot.',
        pairings: ['Raita'],
        source: 'Traditional'
    }
};

export const WORLD_FUSION_IDS = ['dhakai', 'karachi', 'burmese', 'korean-fusion', 'bbq-fusion', 'persian'];

export const RECIPES_DATA: RecipeDetail[] = Object.values(MASTER_RECIPE_LIBRARY);

export const LEADERBOARD_DATA = [
    { rank: 1, name: 'Arjun K.', badge: 'Spice King', points: 1540, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100', type: 'SPICE' },
    { rank: 2, name: 'Neha S.', badge: 'Dum Expert', points: 1200, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', type: 'EXPLORER' },
    { rank: 3, name: 'Rohan D.', badge: 'Eco Walker', points: 980, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100', type: 'EXPLORER' },
    { rank: 4, name: 'Priya M.', badge: 'Reviewer', points: 850, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', type: 'REVIEWER' },
    { rank: 5, name: 'Amit B.', badge: 'Connoisseur', points: 720, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100', type: 'SPICE' },
];

export const COMMUNITY_POSTS = [
    {
        id: '1',
        user: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
        badge: 'Spice Master',
        time: '2h ago',
        rating: 5,
        content: 'Just tried the new Nalli Biryani at Memon Masala. The spice level is insane! Not for the faint hearted. 🔥',
        image: 'https://images.unsplash.com/photo-1631515243349-e0603604305e?q=80&w=600',
        likes: 24,
        replies: 5
    },
    {
        id: '2',
        user: 'Anjali Rao',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        badge: 'Eco Walker',
        time: '5h ago',
        rating: 4,
        content: 'Walked 2km to pickup my order from Nizam\'s. The eco-walk discount made it taste even better! 🌿',
        likes: 45,
        replies: 12
    },
    {
        id: '3',
        user: 'Karan Mehta',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        badge: 'Dum Expert',
        time: '1d ago',
        rating: 5,
        content: 'The saffron aroma in the Lucknowi Biryani is just unmatched. Can anyone recommend similar places?',
        likes: 18,
        replies: 8
    }
];

export const WALLET_HISTORY = [
    { id: '1', action: 'Order #ORD-8821', date: 'Today, 2:30 PM', points: 45 },
    { id: '2', action: 'Eco Walk Bonus', date: 'Today, 1:15 PM', points: 20 },
    { id: '3', action: 'Redeemed: Free Raita', date: 'Yesterday', points: -100 },
    { id: '4', action: 'Review Bonus', date: '22 Oct', points: 50 },
    { id: '5', action: 'Referral Bonus', date: '20 Oct', points: 100 },
];

const DEFAULT_MENU: Dish[] = [
    { id: 'm1', name: 'Special Dum Biryani', price: 400, description: 'Chef special.', sensoryDescription: 'Aromatic and spicy.', spiceLevel: 7, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800', category: 'Signature', rating: 4.5, votes: 100 },
    { id: 'm2', name: 'Paneer Tikka', price: 250, description: 'Grilled cottage cheese.', sensoryDescription: 'Smoky and tender.', spiceLevel: 5, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800', category: 'Sides', rating: 4.2, votes: 50 }
];

const DEFAULT_DETAILS = {
    story: "Experience the authentic flavors prepared with traditional methods passed down through generations.",
    menu: DEFAULT_MENU,
    reviews: [
        { id: 'rev1', userName: 'Foodie User', userBadge: 'Explorer', rating: 5, comment: 'Amazing food!', likes: 10 }
    ],
    activeOffers: []
};

// Generates detailed view for all restaurants, with specific overrides for r1.
export const RESTAURANT_DETAILS: Record<string, RestaurantDetails> = NEARBY_RESTAURANTS.reduce((acc, restaurant) => {
    acc[restaurant.id] = {
        ...restaurant,
        ...DEFAULT_DETAILS,
        // Override for r1
        ...(restaurant.id === 'r1' ? {
            story: "Since 1985, Nizam's Dum House has been the custodian of the Asaf Jahi culinary legacy. Our chefs use a secret potli masala passed down through generations, and every handi is sealed with dough to trap the 'Dum' - the very soul of Hyderabadi cuisine.",
            activeOffers: [{ title: 'Ramadan Special', code: 'RAMADAN20', desc: 'Flat 20% off on Haleem & Biryani combos' }],
            reviews: [
                { id: 'rev1', userName: 'Aditya R.', userBadge: 'Spice King', rating: 5, comment: 'The Mutton Dum is legendary. Meat falls off the bone.', likes: 45 },
                { id: 'rev2', userName: 'Sneha P.', userBadge: 'Foodie', rating: 4, comment: 'A bit oily but the flavor is unmatched.', likes: 12 },
                { id: 'rev3', userName: 'Karan M.', userBadge: 'Explorer', rating: 5, comment: 'Best double ka meetha in the city!', likes: 8 }
            ],
            menu: [
                { id: 'r1-m1', name: 'Nizam Special Mutton Dum', price: 450, description: 'Our signature dish. Marinated overnight.', sensoryDescription: 'Aromatic saffron meets tender mutton.', spiceLevel: 8, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop', category: 'Signature', rating: 4.9, votes: 1200, bestseller: true, recipeId: 'hyderabadi' },
                { id: 'r1-m2', name: 'Chicken Dum Biryani', price: 380, description: 'Classic Hyderabadi style chicken biryani.', sensoryDescription: 'Spicy, flavorful rice with juicy chicken.', spiceLevel: 7, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', category: 'Signature', rating: 4.7, votes: 900, recipeId: 'hyderabadi' },
                { id: 'r1-m3', name: 'Chicken 65', price: 290, description: 'Deep fried spicy chicken starter.', sensoryDescription: 'Crunchy, spicy, curry leaf aroma.', spiceLevel: 8, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91', category: 'Spicy Specials', rating: 4.8, votes: 500, recipeId: 'hyderabadi' },
                { id: 'r1-m4', name: 'Mirchi Ka Salan', price: 60, description: 'Peanut and chili curry.', sensoryDescription: 'Nutty and spicy.', spiceLevel: 6, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b', category: 'Sides', rating: 4.5, votes: 200 },
                { id: 'r1-m5', name: 'Double Ka Meetha', price: 120, description: 'Bread pudding dessert with saffron.', sensoryDescription: 'Sweet, rich, and creamy.', spiceLevel: 1, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969', category: 'Sides', rating: 4.9, votes: 300 },
                { id: 'r1-m6', name: 'Veg Dum Biryani', price: 280, description: 'Mixed vegetables cooked on dum.', sensoryDescription: 'Fresh veggies in aromatic rice.', spiceLevel: 5, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e93', category: 'Veg Biryanis', rating: 4.2, votes: 150, recipeId: 'tahari' },
                { id: 'r1-m7', name: 'Thums Up', price: 40, description: 'Strong cola.', sensoryDescription: 'Fizzy kick.', spiceLevel: 0, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97', category: 'Beverages', rating: 5, votes: 1000 },
                { id: 'r1-m8', name: 'Family Pack (Serves 4)', price: 1400, description: '2kg Biryani + Starters + Coke.', sensoryDescription: 'A feast for the whole family.', spiceLevel: 7, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', category: 'Signature', rating: 4.9, votes: 400, recipeId: 'hyderabadi' }
            ]
        } : {})
    };
    return acc;
}, {} as Record<string, RestaurantDetails>);
