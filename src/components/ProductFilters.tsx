
import React from 'react';
import { Filter, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  priceRange: { min: number; max: number };
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-card card-custom p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Filtros
        </h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
        >
          <X className="w-4 h-4 mr-1" />
          Limpar
        </button>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <h4 className="font-medium mb-4 text-foreground">Categorias</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center ${
                selectedCategory === category.id
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-4 text-foreground">Faixa de Preço</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Preço mínimo</label>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange.min}
              onChange={(e) =>
                onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })
              }
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm font-medium text-primary mt-1">
              R$ {priceRange.min}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Preço máximo</label>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={priceRange.max}
              onChange={(e) =>
                onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })
              }
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm font-medium text-primary mt-1">
              R$ {priceRange.max}
            </div>
          </div>
        </div>
      </div>

      {/* Info Badge */}
      <div className="p-4 bg-accent/10 rounded-xl border border-accent/30">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
          <span className="text-sm font-medium text-foreground">
            Produtos Selecionados
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Todos os produtos passam por rigorosa curadoria de qualidade.
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;
