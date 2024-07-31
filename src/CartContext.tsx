"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "./app/components/Interface";

// Define the type for the context value
interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  clearCart: () => void;
  setInitialCart: (items: Item[]) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  setInitialCart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Item[]>([]);

  const setInitialCart = (items: Item[]) => {
    setCart(items);
  };

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItem) {
        if (existingItem.quantity <= item.quantity) {
          return prevCart.filter((cartItem) => cartItem.name !== item.name);
        }
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - item.quantity }
            : cartItem
        );
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, setInitialCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
