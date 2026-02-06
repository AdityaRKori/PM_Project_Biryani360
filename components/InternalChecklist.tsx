import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Monitor, Zap, Eye, WifiOff, ArrowLeft, Database, Server, Code, Image as LucideImage, FileJson, Layers } from 'lucide-react';

interface Props {
  onBack: () => void;
}

interface CheckItemProps {
  title: string;
  desc: string;
  status: 'PASS' | 'PENDING' | 'FAIL';
}

interface StackCardProps {
  title: string;
  items: string[];
}

interface PhaseItemProps {
  phase: string;
  desc: string;
  status: string;
}

interface CodeBlockProps {
  title: string;
  code: string;
}

export const InternalChecklist: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'QA' | 'ASSETS' | 'PRODUCTION'>('PRODUCTION');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    Developer Console <span className="bg-red-100 text-red-800 text-[10px] font-mono px-2 py-0.5 rounded border border-red-200 uppercase">Internal</span>
                </h1>
                <p className="text-xs text-gray-500">Migration Guide & Asset Registry</p>
            </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            {['QA', 'ASSETS', 'PRODUCTION'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeTab === tab ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    {tab === 'QA' ? 'QA Checklist' : tab === 'ASSETS' ? 'Asset Registry' : 'Production Guide'}
                </button>
            ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">
        
        {/* --- QA CHECKLIST TAB --- */}
        {activeTab === 'QA' && (
            <div className="space-y-6 animate-fade-in">
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-600">
                        <Eye className="w-5 h-5" /> Accessibility (WCAG AA)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <CheckItem title="Color Contrast" desc="Ensure text contrast ratio is at least 4.5:1." status="PASS" />
                        <CheckItem title="Alt Text" desc="All food images have descriptive alt attributes." status="PASS" />
                        <CheckItem title="Reduced Motion" desc="Respects 'prefers-reduced-motion' media query." status="PASS" />
                        <CheckItem title="Keyboard Nav" desc="Interactive elements are focusable." status="PASS" />
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-600">
                        <Zap className="w-5 h-5" /> Performance
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <CheckItem title="Page Load Budget" desc="Target < 2s FCP on 4G." status="PASS" />
                        <CheckItem title="Responsive Images" desc="Use `srcset` for different viewports." status="PASS" />
                        <CheckItem title="Lazy Loading" desc="Native `loading='lazy'` on list images." status="PASS" />
                        <CheckItem title="LQIP Strategy" desc="Low-Quality Image Placeholders." status="PENDING" />
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-600">
                        <WifiOff className="w-5 h-5" /> Offline & Caching
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <CheckItem title="Local Storage" desc="Persist cart and preferences." status="PASS" />
                        <CheckItem title="Service Worker" desc="Cache static assets." status="PASS" />
                        <CheckItem title="Stale-While-Revalidate" desc="Cached menu data with background update." status="PASS" />
                    </div>
                </section>
            </div>
        )}

        {/* --- ASSET REGISTRY TAB --- */}
        {activeTab === 'ASSETS' && (
            <div className="space-y-6 animate-fade-in">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 mb-6">
                    <strong>Note for Design Team:</strong> Please upload assets with the exact filenames below to the CDN before triggering the production build.
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Asset Name</th>
                                <th className="px-6 py-4">Description / Alt Text</th>
                                <th className="px-6 py-4">Source Tags</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { name: 'biryani360_logo.png', desc: 'Biryani360 Brand Logo', tags: 'pot, flame, vector, minimal' },
                                { name: 'hero1.jpg', desc: 'Hero Slide 1: Clay pot cooking', tags: 'biryani, clay pot, fire, dark' },
                                { name: 'hero2.jpg', desc: 'Hero Slide 2: Plated feast', tags: 'feast, royal, dining, overhead' },
                                { name: 'hero3.jpg', desc: 'Hero Slide 3: Ingredients', tags: 'spices, saffron, rice grains, macro' },
                                { name: 'handi_pin.png', desc: 'Map Marker Custom Icon', tags: 'pin, location, pot, orange' },
                                { name: 'spice_texture.jpg', desc: 'Dark background texture', tags: 'dark texture, granite, spices' },
                                { name: 'hyderabadi_static.jpg', desc: 'Hyderabadi Biryani Plate', tags: 'mutton, saffron, basmati' },
                                { name: 'hyderabadi_steam.jpg', desc: 'Hyderabadi Steam Overlay', tags: 'smoke, steam, white on black' },
                                { name: 'lucknow_static.jpg', desc: 'Lucknowi Biryani Plate', tags: 'light rice, kewra, floral' },
                                { name: 'kolkata_static.jpg', desc: 'Kolkata Biryani w/ Egg', tags: 'potato, egg, yellow rice' },
                                { name: 'malabar_static.jpg', desc: 'Malabar Fish Biryani', tags: 'short grain, fish, ghee' },
                                { name: 'ambur_static.jpg', desc: 'Ambur Star Biryani', tags: 'red rice, spicy, jeera samba' }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3 font-mono text-xs text-indigo-600 font-medium">{row.name}</td>
                                    <td className="px-6 py-3 text-gray-700">{row.desc}</td>
                                    <td className="px-6 py-3 text-gray-500 italic">{row.tags}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- PRODUCTION GUIDE TAB --- */}
        {activeTab === 'PRODUCTION' && (
            <div className="space-y-8 animate-fade-in">
                
                {/* Tech Stack */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Server className="w-5 h-5 text-gray-700" /> Recommended Tech Stack</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StackCard title="Frontend" items={['React 18', 'Next.js 14 (App Router)', 'Tailwind CSS', 'Framer Motion']} />
                        <StackCard title="Backend & DB" items={['Node.js / Express', 'PostgreSQL (Supabase)', 'Redis (Caching)', 'Prisma ORM']} />
                        <StackCard title="Services" items={['Firebase Auth', 'MapLibre GL JS', 'Stripe / Razorpay', 'Cloudinary (CDN)']} />
                    </div>
                </section>

                {/* Migration Phases */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-gray-700" /> Migration Strategy</h3>
                    <div className="space-y-3">
                        <PhaseItem 
                            phase="Phase 1: Foundation" 
                            desc="Replace simulated Auth with Firebase. Setup PostgreSQL schema for Users and Restaurants." 
                            status="Next"
                        />
                        <PhaseItem 
                            phase="Phase 2: Geospatial" 
                            desc="Replace Leaflet mock with MapLibre/Google Maps API. Implement real Haversine distance calculation on backend." 
                            status="Pending"
                        />
                        <PhaseItem 
                            phase="Phase 3: Commerce" 
                            desc="Integrate Payment Gateway (Razorpay). Build Order Management System (OMS) webhooks." 
                            status="Pending"
                        />
                        <PhaseItem 
                            phase="Phase 4: Real-time" 
                            desc="Implement WebSocket connection for Rider Tracking. Connect to Rider App GPS stream." 
                            status="Future"
                        />
                    </div>
                </section>

                {/* API Contracts */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FileJson className="w-5 h-5 text-gray-700" /> API Contracts</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <CodeBlock title="POST /api/v1/orders" code={`
{
  "restaurantId": "r1",
  "items": [
    { "id": "m1", "qty": 2, "addons": ["raita"] }
  ],
  "paymentMethod": "UPI",
  "coordinates": { "lat": 17.385, "lng": 78.486 }
}`} />
                        <CodeBlock title="WS /rider-location (Payload)" code={`
{
  "riderId": "rider_007",
  "orderId": "ord_8821",
  "lat": 17.3921,
  "lng": 78.4910,
  "bearing": 120,
  "status": "MOVING",
  "eta_seconds": 450
}`} />
                    </div>
                </section>

                {/* Data Model */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Database className="w-5 h-5 text-gray-700" /> Data Model Skeleton</h3>
                    <div className="bg-gray-900 rounded-xl p-6 text-gray-300 font-mono text-xs overflow-x-auto">
                        <p><span className="text-purple-400">User</span> &#123; id, phone, name, savedAddresses[], walletBalance &#125;</p>
                        <p className="mt-2"><span className="text-blue-400">Restaurant</span> &#123; id, name, geo_location, is_servicable, operating_hours &#125;</p>
                        <p className="mt-2"><span className="text-green-400">Menu</span> &#123; id, restaurant_id, items: [ &#123; name, price, is_stock, spice_level &#125; ] &#125;</p>
                        <p className="mt-2"><span className="text-yellow-400">Order</span> &#123; id, user_id, status (PLACED|COOKING|OUT|DELIVERED), rider_id, timeline[] &#125;</p>
                    </div>
                </section>

            </div>
        )}

      </div>
    </div>
  );
};

const CheckItem: React.FC<CheckItemProps> = ({ title, desc, status }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
            ${status === 'PASS' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}
        `}>
            {status === 'PASS' ? <CheckCircle2 className="w-3 h-3" /> : '!'}
        </div>
        <div>
            <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-gray-900">{title}</h4>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    status === 'PASS' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                }`}>{status}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
    </div>
);

const StackCard: React.FC<StackCardProps> = ({ title, items }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-sm text-gray-800 mb-3 border-b border-gray-100 pb-2">{title}</h4>
        <ul className="space-y-1">
            {items.map((item, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> {item}
                </li>
            ))}
        </ul>
    </div>
);

const PhaseItem: React.FC<PhaseItemProps> = ({ phase, desc, status }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <div>
            <h4 className="font-bold text-sm text-gray-900">{phase}</h4>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded border
            ${status === 'Next' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-500 border-gray-100'}
        `}>{status}</span>
    </div>
);

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => (
    <div className="bg-charcoal-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="bg-charcoal-800 px-4 py-2 text-xs font-mono text-gray-400 border-b border-gray-700 flex items-center gap-2">
            <Code className="w-3 h-3" /> {title}
        </div>
        <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto">
            {code}
        </pre>
    </div>
);