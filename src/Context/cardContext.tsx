import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./authContext";

interface CartItem {
  _id: string;
  foodName: string;
  price: string;
  imageUrl: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_STORAGE_KEY = "food_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const [previousUser, setPreviousUser] = useState<any>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Clear cart when user changes (login/logout)
  useEffect(() => {
    if (isLoaded) {
      // Check if user has actually changed
      const currentUserId = user?._id;
      const previousUserId = previousUser?._id;

      if (currentUserId !== previousUserId) {
        // User changed - clear the cart
        setCart([]);
        localStorage.removeItem(CART_STORAGE_KEY);
        setPreviousUser(user);
      }
    }
  }, [user, isLoaded, previousUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((x) => x._id === item._id);
      if (exists) {
        return prev.map((x) =>
          x._id === item._id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((x) => x._id !== _id));
  };

  const clearCart = () => setCart([]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return acc + cleanPrice * item.qty;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};