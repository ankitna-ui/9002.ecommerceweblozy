"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function OrderSummary({
  shipping,
  taxRate,
}: {
  shipping: number;
  taxRate: number;
}) {
  const { items, cartTotal, discount } = useCart();
  
  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const tax = subtotalAfterDiscount * taxRate;
  const total = subtotalAfterDiscount + shipping + tax;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted shrink-0">
                <Image
                  src={item.product.imageId}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between text-sm">
                <div className="flex justify-between">
                  <span className="font-medium line-clamp-1 pr-2">{item.product.name}</span>
                  <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
                <div className="text-muted-foreground">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount ({(discount * 100).toFixed(0)}%)</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT ({(taxRate * 100).toFixed(0)}%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-xl text-brand-navy dark:text-brand-gold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
