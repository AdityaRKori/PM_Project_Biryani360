
export type Screen = 
  | 'TERMS' 
  | 'AUTH' 
  | 'PROFILE' 
  | 'LANDING' 
  | 'MENU' 
  | 'CART' 
  | 'TRACKING' 
  | 'COMMUNITY'
  | 'NEAR_ME'
  | 'SEARCH'
  | 'RECIPES'
  | 'RESTAURANT_DETAIL'
  | 'PAST_ORDERS'
  | 'REWARDS'
  | 'FAVORITES'
  | 'SUPPORT'
  | 'ECO_WALK'
  | 'WALLET'
  | 'LEADERBOARD'
  | 'WORLD_FUSION'
  | 'INTERNAL_CHECKLIST'
  | 'ADMIN'
  | 'ABOUT'
  | 'SERVICES';

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  spicePreference: number;
  avatarUrl?: string;
  location?: string;
}

export interface Biryani {
  id: string;
  name: string;
  description: string;
  sensoryDescription: string;
  price: number;
  rating: number;
  spiceLevel: number; // 1-10
  imageUrl: string;
  hoverImageUrl: string;
  style: string;
  isVeg: boolean;
}

export interface CartItem extends Biryani {
  quantity: number;
  selectedSpiceLevel: number;
  selectedToppings: string[];
}

export interface Review {
  id: string;
  userName: string;
  userBadge: string;
  rating: number;
  comment: string;
  likes: number;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  distance: string; // display string
  time: string; // ETA
  walkable: boolean;
  delivery: boolean;
  isNew: boolean;
  offers?: boolean;
  tags: string[];
  imageUrl: string;
  coordinates: { lat: number; lng: number };
  desc: string;
  address: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  sensoryDescription: string;
  spiceLevel: number;
  isVeg: boolean;
  imageUrl: string;
  category: 'Signature' | 'Veg Biryanis' | 'Spicy Specials' | 'Sides' | 'Beverages';
  rating: number;
  votes: number;
  bestseller?: boolean;
  // Link to full recipe data
  recipeId?: string; 
}

export interface RestaurantDetails extends Restaurant {
  story: string;
  menu: Dish[];
  reviews: Review[];
  activeOffers: Array<{title: string; code: string; desc: string}>;
}

export interface RecipeDetail {
  id: string;
  name: string;
  origin: string; // e.g. "Hyderabad", "Fusion - USA"
  type: 'Meat' | 'Veg' | 'Seafood' | 'Fusion';
  description: string;
  sensoryDescription: string;
  imageUrl: string;
  hoverImageUrl?: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  serves: number;
  spiceLevel: number;
  calories: number;
  ingredients: Array<{ item: string; qty: string }>;
  steps: Array<{ title: string; desc: string }>;
  chefNotes: string;
  pairings: string[];
  style?: string;
  source?: string; // Cultural citation
}

export interface PastOrder {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'Delivered' | 'Cancelled';
  rating?: number;
}