// components/DynamicIcon.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DynamicIconProps {
  iconName: string;
  className?: string;
  fallback?: React.ReactNode;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  iconName, 
  className = '', 
  fallback = <div className="w-5 h-5 bg-gray-300 rounded"></div>
}) => {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
  
  if (!IconComponent) {
    return <>{fallback}</>;
  }
  
  return React.createElement(IconComponent, { className });
};

export default DynamicIcon;