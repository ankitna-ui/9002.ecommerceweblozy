"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      <div className="flex h-full flex-col p-6 pt-0">
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <EmptyState 
                title="Your cart is empty" 
                description="Looks like you haven't added anything to your cart yet."
                actionLabel="Continue Shopping"
                onAction={onClose}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={item.product.imageId}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.product.model}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold text-brand-navy dark:text-brand-gold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1" onClick={onClose}>
                <Button variant="outline" className="w-full">View Cart</Button>
              </Link>
              <Link href="/checkout" className="flex-1" onClick={onClose}>
                <Button variant="gold" className="w-full">Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
