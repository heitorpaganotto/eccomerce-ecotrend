
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isCheckingOut,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Seu Carrinho</h2>
            {itemCount > 0 && (
              <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Carrinho vazio
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione produtos ao seu carrinho
              </p>
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Info Message */}
            <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
              <p className="text-sm text-foreground flex items-center">
                <span className="text-lg mr-2">⭐</span>
                Obrigado por escolher nossa loja! Esperamos que tenha uma ótima experiência.
              </p>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full btn-hero flex items-center justify-center"
            >
              {isCheckingOut ? (
                <div className="spinner w-5 h-5"></div>
              ) : (
                'Finalizar Compra'
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Frete grátis para todo o Brasil • Entrega em até 5 dias úteis
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
