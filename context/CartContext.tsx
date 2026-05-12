"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  discount: number;
  applyCoupon: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>("pfdb-cart", []);
  const [discount, setDiscount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stockQuantity) {
          toast.error(`Cannot add more than available stock (${product.stockQuantity})`);
          return prevItems;
        }
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      const itemToUpdate = prevItems.find(item => item.product.id === productId);
      if (itemToUpdate && quantity > itemToUpdate.product.stockQuantity) {
        toast.error("Cannot exceed available stock");
        return prevItems;
      }
      if (quantity <= 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }
      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const applyCoupon = (code: string) => {
    if (code === "FIORENTINI10") {
      setDiscount(0.1);
      setAppliedCoupon(code);
      toast.success("10% discount applied!");
      return true;
    } else if (code === "HYDROGEN15" && cartTotal > 5000) {
      setDiscount(0.15);
      setAppliedCoupon(code);
      toast.success("15% discount applied!");
      return true;
    }
    toast.error("Invalid coupon code or conditions not met");
    return false;
  };

  useEffect(() => {
    if (appliedCoupon === "HYDROGEN15" && cartTotal <= 5000) {
      setDiscount(0);
      setAppliedCoupon(null);
      toast.error("Cart total fell below €5000. Coupon removed.");
    }
  }, [cartTotal, appliedCoupon]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        discount,
        applyCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
