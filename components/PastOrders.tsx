
import React from 'react';
import { PastOrder } from '../types';
import { ArrowLeft, RefreshCw, Star, ShoppingBag, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onRate: (orderId: string) => void;
}

// Mock Data
const MOCK_ORDERS: PastOrder[] = [
    { id: 'ORD-8821', date: 'Today, 2:30 PM', items: ['Royal Hyderabadi Dum', 'Extra Raita'], total: 490, status: 'Delivered' },
    { id: 'ORD-7742', date: 'Yesterday, 8:15 PM', items: ['Kolkata Special', 'Coke'], total: 420, status: 'Delivered', rating: 5 },
    { id: 'ORD-6612', date: '22 Oct, 1:00 PM', items: ['Ambur Star'], total: 390, status: 'Cancelled' },
];

export const PastOrders: React.FC<Props> = ({ onBack, onRate }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="p-4 space-y-4">
        {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-saffron-50 dark:bg-saffron-900/30 rounded-lg flex items-center justify-center text-saffron-600 dark:text-saffron-400">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Paradise Circle</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                        </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                        {order.status}
                    </span>
                </div>

                <div className="space-y-1 mb-4">
                    {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> {item}
                        </p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="font-bold">₹{order.total}</span>
                    
                    <div className="flex gap-2">
                        {order.status === 'Delivered' && !order.rating && (
                            <button 
                                onClick={() => onRate(order.id)}
                                className="px-3 py-1.5 border border-saffron-200 text-saffron-600 dark:border-saffron-700 dark:text-saffron-400 text-xs font-bold rounded-lg hover:bg-saffron-50 dark:hover:bg-saffron-900/30 transition-colors"
                            >
                                Rate Food
                            </button>
                        )}
                        {order.rating && (
                            <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1.5 rounded-lg">
                                {order.rating} <Star className="w-3 h-3 fill-current" />
                            </div>
                        )}
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-lg hover:opacity-90">
                            <RefreshCw className="w-3 h-3" /> Reorder
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
