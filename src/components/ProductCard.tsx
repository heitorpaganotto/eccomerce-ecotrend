
import React from 'react';
import { Star, ShoppingCart, Heart, Truck } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  sustainable: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isLoading }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.inStock && !isLoading) {
      onAddToCart(product);
    }
  };

  return (
    <div className="card-custom group overflow-hidden bg-gradient-to-br from-white to-muted/30 animate-fade-in-up">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-muted flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.sustainable && (
            <span className="badge-custom">
              ⭐ Destacado
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:text-primary">
          <Heart className="w-4 h-4" />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-foreground px-4 py-2 rounded-full font-medium">
              Fora de Estoque
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="price-tag">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        {/* Free Shipping */}
        <div className="flex items-center text-primary text-sm mb-4">
          <Truck className="w-4 h-4 mr-1" />
          <span>Frete grátis</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className={`w-full btn-primary flex items-center justify-center space-x-2 ${
            !product.inStock || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105'
          } transition-transform duration-200`}
        >
          {isLoading ? (
            <div className="spinner w-5 h-5"></div>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
