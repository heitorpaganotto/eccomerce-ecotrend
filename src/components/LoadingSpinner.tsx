
import React from 'react';
import { Leaf } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Carregando produtos...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} spinner`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-primary animate-pulse-custom" />
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-center">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
