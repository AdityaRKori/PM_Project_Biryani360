
import React from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<Props> = ({ 
    isOpen, 
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>
        
        <div className="bg-charcoal-900 border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-slide-up">
            <div className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isDestructive ? 'bg-red-900/30 text-red-500' : 'bg-saffron-900/30 text-saffron-500'}`}>
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
            </div>

            <div className="flex border-t border-white/10 bg-black/20">
                <button 
                    onClick={onCancel}
                    className="flex-1 py-4 text-gray-400 font-bold text-sm hover:bg-white/5 transition-colors"
                >
                    {cancelText}
                </button>
                <div className="w-[1px] bg-white/10"></div>
                <button 
                    onClick={onConfirm}
                    className={`flex-1 py-4 font-bold text-sm transition-colors ${isDestructive ? 'text-red-500 hover:bg-red-900/20' : 'text-saffron-500 hover:bg-saffron-900/20'}`}
                >
                    {confirmText}
                </button>
            </div>
        </div>
    </div>
  );
};
