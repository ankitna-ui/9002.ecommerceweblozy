"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/common/EmptyState";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, discount, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.toUpperCase());
      setCouponCode("");
    }
  };

  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  
  // Shipping calculation
  const shipping = subtotalAfterDiscount > 5000 ? 0 : 50;
  
  // VAT 22%
  const tax = subtotalAfterDiscount * 0.22;
  
  const total = subtotalAfterDiscount + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <EmptyState 
          title="Your shopping cart is empty" 
          description="You haven't added any items to your cart yet. Browse our catalog to find what you need."
          actionLabel="Continue Shopping"
          href="/shop"
        />
      </div>
    );
  }

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min((subtotalAfterDiscount / freeShippingThreshold) * 100, 100);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-xl overflow-hidden bg-card">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-semibold uppercase text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted shrink-0 border">
                      <Image
                        src={item.product.imageId}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href={`/product/${item.product.id}`} className="font-semibold text-lg hover:text-brand-gold transition-colors line-clamp-2">
                        {item.product.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">{item.product.model}</span>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sm text-destructive hover:underline self-start mt-2 md:hidden"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 text-left md:text-center font-medium md:font-normal">
                    <span className="md:hidden text-muted-foreground text-sm mr-2">Price:</span>
                    {formatPrice(item.product.price)}
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-muted-foreground text-sm mr-2">Total:</span>
                    <span className="font-bold text-brand-navy dark:text-brand-gold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-4 text-muted-foreground hover:text-destructive hidden md:flex" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Link href="/shop">
              <Button variant="outline"><ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-xl bg-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Coupon code" 
                  className="pl-9" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <Button type="submit" variant="secondary">Apply</Button>
            </form>

            <div className="space-y-4 text-sm mb-6 border-b pb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                  <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (22%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black text-brand-navy dark:text-brand-gold">{formatPrice(total)}</span>
            </div>

            <Link href="/checkout" className="block w-full mb-4">
              <Button size="lg" className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90 h-12 text-base font-bold">
                Proceed to Checkout
              </Button>
            </Link>
            
            <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium">Free Shipping Progress</span>
                <span>{progressPercent < 100 ? `${formatPrice(freeShippingThreshold - subtotalAfterDiscount)} to go` : 'Unlocked!'}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${progressPercent === 100 ? 'bg-green-500' : 'bg-brand-gold'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
