import React from 'react';
import { CookingPot, Flame } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<Props> = ({ size = 'md', variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';
  
  const sizeClasses = {
    sm: { icon: 'w-5 h-5', text: 'text-xl', pot: 'w-3 h-3' },
    md: { icon: 'w-8 h-8', text: 'text-3xl', pot: 'w-5 h-5' },
    lg: { icon: 'w-12 h-12', text: 'text-5xl', pot: 'w-8 h-8' },
    xl: { icon: 'w-20 h-20', text: 'text-7xl', pot: 'w-12 h-12' },
  };

  const s = sizeClasses[size];
  const textColor = isLight ? 'text-white' : 'text-gray-900 dark:text-white';
  const subTextColor = 'text-saffron-500';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative">
        <CookingPot className={`${s.icon} ${isLight ? 'text-gray-200' : 'text-gray-800 dark:text-gray-200'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
             <Flame className={`${s.pot} text-saffron-500 fill-saffron-500 animate-pulse`} />
        </div>
      </div>
      <div className={`font-fancy tracking-wide ${s.text} ${textColor} flex items-baseline`}>
        Biryani
        <span className={`${subTextColor} font-sans font-bold not-italic ml-1 text-[0.6em]`}>360</span>
      </div>
    </div>
  );
};