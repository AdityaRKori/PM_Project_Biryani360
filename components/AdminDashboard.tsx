import React, { useState } from 'react';
import { ArrowLeft, BarChart2, Search, PlayCircle, FileText, TrendingUp, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  subtext?: string;
}

interface FunnelBarProps {
  label: string;
  count: string;
  percent: number;
  color: string;
}

interface SEORowProps {
  route: string;
  title: string;
  desc: string;
}

interface DemoStepProps {
  step: number;
  title: string;
  action: string;
  points: string;
}

interface StrategyCardProps {
  title: string;
  items: string[];
}

export const AdminDashboard: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'SEO' | 'DEMO' | 'STRATEGY'>('ANALYTICS');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    Admin & Strategy <span className="bg-gray-900 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">Confidential</span>
                </h1>
                <p className="text-xs text-gray-500">Business Intelligence & Grading Resources</p>
            </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            {[
                { id: 'ANALYTICS', label: 'Analytics', icon: BarChart2 },
                { id: 'SEO', label: 'SEO & Meta', icon: Search },
                { id: 'DEMO', label: 'Demo Script', icon: PlayCircle },
                { id: 'STRATEGY', label: 'Pitch & PM', icon: FileText }
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <tab.icon className="w-3 h-3" /> {tab.label}
                </button>
            ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
        
        {/* --- ANALYTICS TAB --- */}
        {activeTab === 'ANALYTICS' && (
            <div className="space-y-6 animate-fade-in">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <KPICard title="Daily Active Users" value="12,540" change="+12%" icon={Users} color="blue" />
                    <KPICard title="Weekly Orders" value="4,820" change="+8.5%" icon={ShoppingCart} color="green" />
                    <KPICard title="Avg Order Value" value="₹425" change="+2%" icon={DollarSign} color="yellow" />
                    <KPICard title="Walk Pickup Rate" value="18.2%" change="+5%" icon={Activity} color="purple" subtext="Eco-Walk Adoption" />
                </div>

                {/* Charts Area */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-6 flex justify-between">
                            Revenue Trend (Weekly)
                            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Last 30 Days</span>
                        </h3>
                        <div className="h-48 flex items-end justify-between gap-2 px-2">
                            {[45, 60, 55, 70, 85, 80, 95].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-50 rounded-t-lg relative group">
                                    <div 
                                        className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-600" 
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded transition-opacity">
                                        ₹{h * 1000}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">Funnel Conversion</h3>
                        <p className="text-xs text-gray-500 mb-6">User Journey: Landing to Payment</p>
                        
                        <div className="space-y-4">
                            <FunnelBar label="App Open / Landing" count="12,540" percent={100} color="bg-gray-200" />
                            <FunnelBar label="Menu Browsing" count="8,420" percent={67} color="bg-blue-200" />
                            <FunnelBar label="Add to Cart" count="3,200" percent={25} color="bg-indigo-300" />
                            <FunnelBar label="Checkout Initiated" count="1,800" percent={14} color="bg-indigo-500" />
                            <FunnelBar label="Order Placed" count="1,540" percent={12.2} color="bg-green-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
                    <strong>Interpretation:</strong> 
                    <ul className="list-disc ml-5 mt-2 space-y-1 text-xs">
                        <li><strong>High AOV (₹425):</strong> Indicates premium positioning success compared to industry avg (~₹250).</li>
                        <li><strong>18% Walk Rate:</strong> The Eco-Walk gamification is working, significantly reducing last-mile logistics costs.</li>
                        <li><strong>Conversion (12%):</strong> Above average. The cinematic product presentation keeps users engaged.</li>
                    </ul>
                </div>
            </div>
        )}

        {/* --- SEO TAB --- */}
        {activeTab === 'SEO' && (
            <div className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Page Route</th>
                                <th className="px-6 py-4">Meta Title (&lt; 60 chars)</th>
                                <th className="px-6 py-4">Meta Description (&lt; 160 chars)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <SEORow 
                                route="/" 
                                title="Biryani360 | Premium Food Discovery & Delivery" 
                                desc="Discover legendary Hyderabadi, Lucknowi, and Kolkata biryanis. Order online from curated heritage kitchens near you." 
                            />
                            <SEORow 
                                route="/menu" 
                                title="Order Authentic Biryani Online | Biryani360 Menu" 
                                desc="Browse our exclusive menu of Dum Pukht biryanis. Filter by spice level, region, and vegetarian options. Fast delivery." 
                            />
                            <SEORow 
                                route="/recipes" 
                                title="Masterclass Recipes | Biryani360 Global Fusion" 
                                desc="Unlock secret recipes from Nizam's kitchen to Korean Fusion biryanis. Step-by-step guides for the home chef." 
                            />
                            <SEORow 
                                route="/eco-walk" 
                                title="Eco Walk Rewards | Save Fuel, Earn Points" 
                                desc="Walk to pick up your order and earn rewards. Join the sustainable food movement with Biryani360." 
                            />
                            <SEORow 
                                route="/community" 
                                title="Spice Master Community | Reviews & Leaderboard" 
                                desc="Join the Biryani360 community. Share reviews, climb the leaderboard, and become a certified Spice Master." 
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- DEMO SCRIPT TAB --- */}
        {activeTab === 'DEMO' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Demo Walkthrough Script</h2>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">Duration: 3-5 Mins</span>
                </div>

                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                    <DemoStep 
                        step={1} 
                        title="The Hook: Cinematic Intro" 
                        action="Reload App -> Wait for Intro -> Click 'Explore Collection'"
                        points="Highlight the immersive, non-transactional first impression. 'Hungry? There's a biryani calling you...' sets the mood."
                    />
                    <DemoStep 
                        step={2} 
                        title="Discovery & Sensory Menu" 
                        action="Scroll Landing -> Click 'View All' on Trending -> Click a Dish Card"
                        points="Show off the 'Steam Animation' on card hover. Explain the 'Sensory Description' (e.g., 'Rich aroma of saffron...'). Use the Veg/Non-Veg toggle."
                    />
                    <DemoStep 
                        step={3} 
                        title="Commerce & Gamification" 
                        action="Add to Cart -> Adjust Spice Level -> Open Cart"
                        points="Demonstrate the 'Rice Grain Slider' for spice adjustment. In Cart, point out the 'Reward Progress Bar' (Add ₹X for free Salan). This drives AOV."
                    />
                    <DemoStep 
                        step={4} 
                        title="The Eco-Walk Differentiator" 
                        action="In Cart, toggle 'Walk & Earn Pickup' -> Show Discount/Points"
                        points="Explain how this feature solves the high logistics cost problem and appeals to health/eco-conscious users."
                    />
                    <DemoStep 
                        step={5} 
                        title="Tracking Simulation" 
                        action="Place Order -> Watch Map Animation -> Scroll Timeline"
                        points="Show the real-time map simulation. Mention the detailed timeline steps (Cooking -> Dum -> Rider)."
                    />
                    <DemoStep 
                        step={6} 
                        title="Retention: Community & Recipes" 
                        action="Go to Dashboard -> Open 'Community' -> Open 'World Fusion'"
                        points="Show the Leaderboard (Social Proof). Open a Fusion Recipe to show 'Content-as-Product' strategy."
                    />
                </div>
            </div>
        )}

        {/* --- STRATEGY TAB --- */}
        {activeTab === 'STRATEGY' && (
            <div className="space-y-8 animate-fade-in">
                
                {/* Elevator Pitch */}
                <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-yellow-400" /> Elevator Pitch</h2>
                    <p className="text-lg font-light leading-relaxed text-gray-200 italic">
                        "Biryani360 is a hyper-vertical food discovery platform dedicated to the art of Dum Pukht. Unlike generic aggregators that commoditize food, we elevate the experience through sensory-rich UI, gamified 'Eco-Walk' logistics that reduce delivery costs, and deep content integration via masterclasses. Our go-to-market strategy anchors on onboarding heritage kitchens first to build credibility, followed by community seeding through exclusive tasting events, ensuring high retention among high-LTV connoisseurs."
                    </p>
                </section>

                {/* PM Talking Points */}
                <div className="grid md:grid-cols-2 gap-6">
                    <StrategyCard 
                        title="MVP Choices & Trade-offs"
                        items={[
                            "Focus on Vibe over Utility: We chose a dark, cinematic UI to signal 'Premium' even if it sacrifices some information density.",
                            "Single Vertical: Restricted to Biryani to simplify supply chain and marketing message.",
                            "Simulated Logistics: Map and Tracking are mocked to demonstrate UX vision without backend complexity."
                        ]}
                    />
                    <StrategyCard 
                        title="Risks & Mitigation"
                        items={[
                            "Risk: Niche Market Size. Mitigation: High AOV target (₹400+) and high frequency (weekly habit).",
                            "Risk: Logistics Cost. Mitigation: 'Eco-Walk' feature incentivizes pickup, reducing fleet dependency by ~20%.",
                            "Risk: Kitchen Quality. Mitigation: 'Invite-only' onboarding for the first 50 kitchens."
                        ]}
                    />
                    <StrategyCard 
                        title="Go-to-Market (GTM)"
                        items={[
                            "Phase 1: 'Secret Supper Club' - Invite top 100 Yelp/Zomato reviewers for beta access.",
                            "Phase 2: Heritage Partnerships - Exclusive delivery partner for 5 legendary old-city kitchens.",
                            "Phase 3: Corporate Catering - 'Biryani Fridays' for tech parks to drive bulk volume."
                        ]}
                    />
                    <StrategyCard 
                        title="Next Milestones"
                        items={[
                            "Q1: Integrate Razorpay & Firebase Auth (Move off mocks).",
                            "Q2: Launch 'Biryani Pass' subscription (Free delivery + Priority).",
                            "Q3: Expand to 'Kebabs & Curries' adjacent vertical."
                        ]}
                    />
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, color, subtext }) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600'
    };
    const theme = colors[color] || colors.blue;

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${theme}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{change}</span>
            </div>
            <h4 className="text-gray-500 text-xs uppercase font-bold tracking-wider">{title}</h4>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtext && <p className="text-[10px] text-gray-400 mt-1">{subtext}</p>}
        </div>
    );
};

const FunnelBar: React.FC<FunnelBarProps> = ({ label, count, percent, color }) => (
    <div className="relative">
        <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-gray-700">{label}</span>
            <span className="text-gray-500">{count} ({percent}%)</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

const SEORow: React.FC<SEORowProps> = ({ route, title, desc }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">{route}</td>
        <td className="px-6 py-4 text-xs text-gray-800 font-medium">{title}</td>
        <td className="px-6 py-4 text-xs text-gray-500">{desc}</td>
    </tr>
);

const DemoStep: React.FC<DemoStepProps> = ({ step, title, action, points }) => (
    <div className="relative pl-10">
        <div className="absolute left-0 top-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 border-4 border-white shadow-sm">
            {step}
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
            <div className="flex items-start gap-2 mb-2">
                <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Action</span>
                <p className="text-sm font-mono text-indigo-700">{action}</p>
            </div>
            <p className="text-sm text-gray-600">{points}</p>
        </div>
    </div>
);

const StrategyCard: React.FC<StrategyCardProps> = ({ title, items }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">{title}</h3>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);