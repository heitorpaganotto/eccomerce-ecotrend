
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  sustainable: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });

  // Load products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch('/products.json');
        const data = await response.json();
        
        setProducts(data.products);
        setCategories(data.categories);
        setFilteredProducts(data.products);
        
        toast.success('Produtos carregados com sucesso! 🛒');
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        toast.error('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('shop-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('shop-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange]);

  const handleAddToCart = async (product: Product) => {
    setLoadingProductId(product.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`${product.name} - quantidade atualizada no carrinho! 🛒`);
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      toast.success(`${product.name} adicionado ao carrinho! 🎉`);
    }
    
    setLoadingProductId(null);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(cartItems.filter(item => item.id !== id));
    
    if (item) {
      toast.success(`${item.name} removido do carrinho`);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart after successful checkout
      setCartItems([]);
      setIsCartOpen(false);
      
      toast.success('Compra realizada com sucesso! 🎉 Obrigado pela sua compra!');
    } catch (error) {
      toast.error('Erro ao processar compra. Tente novamente.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 500 });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onMenuToggle={() => {}}
      />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção cuidadosa de produtos de alta qualidade
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={setPriceRange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredProducts.length} produtos encontrados
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    Nenhum produto encontrado com os filtros aplicados
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="btn-secondary"
                  >
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      isLoading={loadingProductId === product.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
      />
    </div>
  );
};

export default Index;
