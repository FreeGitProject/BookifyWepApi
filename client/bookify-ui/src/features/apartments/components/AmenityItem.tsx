// components/AmenityItem.tsx
import React from 'react';
import { Check, X } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface AmenityItemProps {
  name: string;
  icon: string;
  included: boolean;
}

const AmenityItem: React.FC<AmenityItemProps> = ({ name, icon, included }) => {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
        included
          ? 'border-green-500/30 bg-green-500/10'
          : 'border-gray-600 bg-gray-800/30'
      }`}
    >
      <DynamicIcon 
        iconName={icon} 
        className={`w-5 h-5 ${included ? 'text-green-400' : 'text-gray-400'}`}
      />
      <span className={included ? 'text-white' : 'text-gray-400'}>
        {name}
      </span>
      {included ? (
        <Check className="w-4 h-4 text-green-400 ml-auto" />
      ) : (
        <X className="w-4 h-4 text-gray-400 ml-auto" />
      )}
    </div>
  );
};

export default AmenityItem;