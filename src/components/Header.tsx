
import React from 'react';
import { ShoppingCart, Search, Menu, Leaf } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartToggle: () => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartToggle, onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">EcoTrend</h1>
              <p className="text-xs text-muted-foreground">Loja Online</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={onCartToggle}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-custom">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
