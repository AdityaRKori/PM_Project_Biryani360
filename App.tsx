
import React, { useState, useEffect } from 'react';
import { Terms } from './components/Terms';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { Landing } from './components/Landing';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { Tracking } from './components/Tracking';
import { Community } from './components/Community';
import { NearMe } from './components/NearMe';
import { Recipes } from './components/Recipes';
import { RestaurantDetail } from './components/RestaurantDetail';
import { SearchResults } from './components/SearchResults';
import { SideMenu } from './components/SideMenu';
import { PastOrders } from './components/PastOrders';
import { FeedbackModal } from './components/FeedbackModal';
import { Wallet } from './components/Wallet';
import { Support } from './components/Support';
import { EcoWalk } from './components/EcoWalk';
import { Leaderboard } from './components/Leaderboard';
import { WorldFusion } from './components/WorldFusion';
import { Footer } from './components/Footer';
import { InternalChecklist } from './components/InternalChecklist';
import { AdminDashboard } from './components/AdminDashboard';
import { ErrorState } from './components/ErrorState';
import { InfoPage } from './components/InfoPage';
import { FloatingCart } from './components/FloatingCart';
import { ConfirmModal } from './components/ConfirmModal';
import { Screen, Biryani, CartItem, Restaurant } from './types';
import { Menu as MenuIcon, AlertTriangle } from 'lucide-react';
import { NEARBY_RESTAURANTS, TOPPINGS } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('TERMS');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  // Menu & Dark Mode State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  // Navigation Safety & Error States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);
  const [errorState, setErrorState] = useState<{ id: string; msg: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false });

  // Crash Simulation for Error Boundary Testing
  if (shouldCrash) {
      throw new Error("Simulated Critical System Failure");
  }

  // Theme Management
  const setTheme = (t: 'light' | 'dark') => {
      const root = document.documentElement;
      if (t === 'dark') {
          root.classList.add('dark');
      } else {
          root.classList.remove('dark');
      }
      localStorage.setItem('biryani360_theme', t);
      setThemeState(t);
  };

  // --- HISTORY & NAVIGATION MANAGEMENT ---
  useEffect(() => {
      // Init Theme
      const saved = localStorage.getItem('biryani360_theme') as 'light' | 'dark';
      const pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(saved || pref);

      // Handle initial load based on URL or History
      const params = new URLSearchParams(window.location.search);
      const screenParam = params.get('screen') as Screen;
      const idParam = params.get('id');

      if (screenParam) {
          try {
              if (screenParam === 'RESTAURANT_DETAIL' && idParam) {
                  const r = NEARBY_RESTAURANTS.find(res => res.id === idParam);
                  if (r) {
                      setSelectedRestaurant(r);
                      setCurrentScreen('RESTAURANT_DETAIL');
                  } else {
                      setCurrentScreen('LANDING');
                  }
              } else {
                  setCurrentScreen(screenParam);
              }
          } catch (e) {
              console.error("Init Route Error", e);
              setCurrentScreen('LANDING');
          }
      }

      // Browser Back Button Listener
      const onPopState = (event: PopStateEvent) => {
          if (event.state && event.state.screen) {
              setCurrentScreen(event.state.screen);
          } else {
              // Fallback to URL parsing or Landing
              const s = new URLSearchParams(window.location.search).get('screen') as Screen;
              setCurrentScreen(s || 'LANDING');
          }
      };
      window.addEventListener('popstate', onPopState);
      return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (screen: Screen) => {
      if (!screen) {
          console.error("Target screen is undefined");
          return;
      }
      
      // Clear any previous errors
      setErrorState(null);
      
      // 1. Perform Navigation (React State)
      // We do this BEFORE history manipulation to ensure the UI updates 
      // even if the environment restricts History API (e.g. sandboxed iframes/blobs).
      setCurrentScreen(screen);
      window.scrollTo(0, 0);

      // 2. Attempt History Update (Graceful Degradation)
      try {
          const url = new URL(window.location.href);
          url.searchParams.set('screen', screen);
          window.history.pushState({ screen }, "", url.toString());
      } catch (e) {
          // In some sandboxed environments (blob: URLs), pushState is restricted.
          // We log this but do NOT block the app navigation.
          console.warn("History API restricted. Navigation proceeding without URL update.", e);
      }
  };

  const performBackNavigation = () => {
      try {
          // Check history length, but also catch errors if 'back' is restricted
          if (window.history.length > 1) {
              window.history.back();
          } else {
              // Fallback if history is empty (e.g. direct link or fresh reload in sandbox)
              handleNavigate('LANDING');
          }
      } catch (e) {
          console.warn("Back navigation failed, falling back to Landing.", e);
          handleNavigate('LANDING');
      }
  };

  const handleBack = () => {
      // INTERCEPTION: Check for dirty state (e.g., Unsaved Cart)
      if (currentScreen === 'CART' && cart.length > 0) {
          setShowConfirmModal(true);
          return;
      }
      performBackNavigation();
  };

  const handleConfirmBack = () => {
      setShowConfirmModal(false);
      performBackNavigation();
  };

  const toggleDarkMode = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Cart Calculations for Floating CTA
  const cartTotal = cart.reduce((sum, item) => {
      const toppingsCost = item.selectedToppings?.reduce((tSum, tId) => {
          const topping = TOPPINGS.find(t => t.id === tId);
          return tSum + (topping?.price || 0);
      }, 0) || 0;
      return sum + (item.price + toppingsCost) * item.quantity;
  }, 0);

  const showFloatingCart = cart.length > 0 && currentScreen !== 'CART' && currentScreen !== 'TRACKING' && currentScreen !== 'TERMS' && currentScreen !== 'AUTH' && currentScreen !== 'PROFILE';

  const showToast = (msg: string) => {
      setToast({ msg, visible: true });
      setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleErrorReset = () => {
      setErrorState(null);
      const current = currentScreen;
      setCurrentScreen('LANDING');
      setTimeout(() => setCurrentScreen(current), 10);
  };

  const addToCart = (item: Biryani) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, selectedSpiceLevel: item.spiceLevel, selectedToppings: [] }];
    });
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
      setCart(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
      setSelectedRestaurant(restaurant);
      handleNavigate('RESTAURANT_DETAIL');
  };

  const MenuTrigger = () => (
    <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-40 bg-white dark:bg-charcoal-900/80 backdrop-blur-md p-3 rounded-full shadow-glow border border-gray-200 dark:border-white/10 hover:scale-105 transition-transform group"
    >
        <MenuIcon className="w-6 h-6 text-gray-800 dark:text-cream-50 group-hover:text-saffron-500 transition-colors" />
    </button>
  );

  const renderScreen = () => {
    if (errorState) {
        return (
            <ErrorState 
                errorId={errorState.id}
                onRetry={handleErrorReset}
                onHome={() => {
                    setErrorState(null);
                    setCurrentScreen('LANDING');
                }}
            />
        );
    }

    switch (currentScreen) {
      case 'TERMS':
        return <Terms onAccept={() => handleNavigate('AUTH')} />;
      case 'AUTH':
        return <Auth onComplete={() => handleNavigate('PROFILE')} />;
      case 'PROFILE':
        return <Profile onComplete={() => handleNavigate('LANDING')} />;
      case 'INTERNAL_CHECKLIST':
        return <InternalChecklist onBack={handleBack} />;
      case 'ADMIN':
        return <AdminDashboard onBack={handleBack} />;
      case 'ABOUT':
        return <InfoPage type="ABOUT" onBack={handleBack} onError={(e) => setErrorState({ id: 'about_load_fail', msg: e.message })} />;
      case 'SERVICES':
        return <InfoPage type="SERVICES" onBack={handleBack} onError={(e) => setErrorState({ id: 'services_load_fail', msg: e.message })} />;
      case 'LANDING':
        return (
            <>
                <Landing 
                    onComplete={() => handleNavigate('MENU')} 
                    onGoToMap={() => handleNavigate('NEAR_ME')}
                    onGoToRecipes={() => handleNavigate('RECIPES')}
                    onSearch={() => handleNavigate('SEARCH')}
                    onOpenProfile={() => setIsMenuOpen(true)}
                    onError={showToast}
                />
                <Footer onNavigate={handleNavigate} />
            </>
        );
      case 'NEAR_ME':
        return (
          <>
            <NearMe 
                onBack={handleBack} 
                onRestaurantSelect={handleRestaurantSelect}
            />
          </>
        );
      case 'SEARCH':
        return (
            <>
                <SearchResults 
                    onBack={handleBack} 
                    onRestaurantSelect={handleRestaurantSelect} 
                />
                <Footer onNavigate={handleNavigate} />
            </>
        );
      case 'RESTAURANT_DETAIL':
        return selectedRestaurant ? (
           <div className="w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
              <RestaurantDetail 
                restaurant={selectedRestaurant} 
                onBack={handleBack}
                onAddToCart={addToCart}
                onShowToast={showToast}
              />
           </div>
        ) : <Landing onComplete={() => handleNavigate('MENU')} onGoToMap={() => handleNavigate('NEAR_ME')} onGoToRecipes={() => handleNavigate('RECIPES')} onSearch={() => handleNavigate('SEARCH')} />;
      case 'RECIPES':
        return (
            <>
                <Recipes onBack={handleBack} />
                <MenuTrigger />
                <Footer onNavigate={handleNavigate} />
            </>
        );
      case 'MENU':
        return (
          <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
            <Menu 
              onAddToCart={addToCart} 
              cartCount={cart.length} 
              onGoToCart={() => handleNavigate('CART')}
            />
            <MenuTrigger />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'CART':
        return (
          <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
            <Cart 
              items={cart} 
              onBack={handleBack}
              onRemove={removeFromCart}
              onUpdateItem={updateCartItem}
              onPlaceOrder={() => handleNavigate('TRACKING')}
            />
          </div>
        );
      case 'TRACKING':
        return (
          <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
            <Tracking 
                onComplete={() => setIsFeedbackOpen(true)} 
                onCancel={() => handleNavigate('MENU')}
                onContactSupport={() => handleNavigate('SUPPORT')}
            />
          </div>
        );
      case 'COMMUNITY':
        return (
          <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
            <Community onBackHome={() => {
                setCart([]);
                handleNavigate('MENU');
            }} />
             <MenuTrigger />
             <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'PAST_ORDERS':
        return (
           <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl">
             <PastOrders onBack={handleBack} onRate={() => setIsFeedbackOpen(true)} />
             <Footer onNavigate={handleNavigate} />
           </div>
        );
      case 'FAVORITES':
        return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><Menu onAddToCart={addToCart} cartCount={cart.length} onGoToCart={() => handleNavigate('CART')} /> <MenuTrigger /> <Footer onNavigate={handleNavigate} /></div>;
      case 'WALLET':
        return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><Wallet onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      case 'REWARDS':
        return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><Wallet onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      case 'ECO_WALK':
        return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><EcoWalk onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      case 'LEADERBOARD':
        return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><Leaderboard onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      case 'SUPPORT':
         return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><Support onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      case 'WORLD_FUSION':
         return <div className="max-w-lg mx-auto w-full bg-gray-50 dark:bg-charcoal-950 min-h-screen shadow-2xl"><WorldFusion onBack={handleBack} /> <Footer onNavigate={handleNavigate} /></div>;
      default:
        return <Terms onAccept={() => handleNavigate('AUTH')} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-lux-gradient text-gray-900 dark:text-cream-50 font-body antialiased selection:bg-saffron-500 selection:text-white transition-colors duration-200">
       {renderScreen()}
       
       <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={handleNavigate}
          onLogout={() => handleNavigate('TERMS')}
          darkMode={theme === 'dark'}
          toggleDarkMode={toggleDarkMode}
          onOpenFeedback={() => {
              setIsMenuOpen(false);
              setIsFeedbackOpen(true);
          }}
          onSimulateCrash={() => setShouldCrash(true)}
       />

       <FeedbackModal 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
       />

       {/* Floating Cart CTA */}
       {showFloatingCart && (
           <FloatingCart 
               count={cart.reduce((acc, item) => acc + item.quantity, 0)} 
               total={cartTotal} 
               onClick={() => handleNavigate('CART')}
           />
       )}

       {/* Navigation Safety Modal */}
       <ConfirmModal 
           isOpen={showConfirmModal}
           title="Unsaved Order"
           message="You have items in your cart. Going back might clear your selection. Are you sure?"
           confirmText="Leave Anyway"
           cancelText="Stay"
           isDestructive={true}
           onConfirm={handleConfirmBack}
           onCancel={() => setShowConfirmModal(false)}
       />

       {/* Toast Notification */}
       <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           <div className="bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm">
               <AlertTriangle className="w-4 h-4" />
               {toast.msg}
           </div>
       </div>
    </div>
  );
}
