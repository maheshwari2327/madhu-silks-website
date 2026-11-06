import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  couponCode: string;
  discountRupees: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingCharges: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discountRupees: 0,

      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existing = currentItems.find(item => item.product.id === product.id);

        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, product.stock_quantity);
          set({
            items: currentItems.map(item =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: newQty,
                    total_price_in_rupees: newQty * item.unit_price_in_rupees,
                  }
                : item
            ),
          });
        } else {
          const itemQuantity = Math.min(quantity, product.stock_quantity);
          const newItem: CartItem = {
            id: `item-${product.id}-${Date.now()}`,
            product,
            quantity: itemQuantity,
            unit_price_in_rupees: product.final_price_in_rupees,
            total_price_in_rupees: itemQuantity * product.final_price_in_rupees,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item => {
            if (item.product.id === productId) {
              const safeQty = Math.min(quantity, item.product.stock_quantity);
              return {
                ...item,
                quantity: safeQty,
                total_price_in_rupees: safeQty * item.unit_price_in_rupees,
              };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [], couponCode: '', discountRupees: 0 }),

      applyCoupon: (code, discount) => set({ couponCode: code, discountRupees: discount }),

      removeCoupon: () => set({ couponCode: '', discountRupees: 0 }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.total_price_in_rupees, 0);
      },

      getShippingCharges: () => {
        const subtotal = get().getSubtotal();
        // Free shipping on orders above ₹3,000, else ₹150 express flat rate
        if (subtotal === 0 || subtotal >= 3000) return 0;
        return 150;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShippingCharges();
        const discount = get().discountRupees;
        return Math.max(0, subtotal + shipping - discount);
      },
    }),
    {
      name: 'madhu-silks-cart-storage',
    }
  )
);

