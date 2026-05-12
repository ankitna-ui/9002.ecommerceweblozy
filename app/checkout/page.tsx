"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm, CheckoutFormData } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { toast } from "sonner";
import { EmptyState } from "@/components/common/EmptyState";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, clearCart, cartTotal, discount } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const shipping = subtotalAfterDiscount > 5000 ? 0 : 50;
  const taxRate = 0.22;
  const tax = subtotalAfterDiscount * taxRate;
  const total = subtotalAfterDiscount + shipping + tax;

  const handleSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const orderData = {
        customerName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        vatNumber: data.vatNumber,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        paymentMethod: data.paymentMethod,
        items: items,
        subtotal: subtotalAfterDiscount,
        shipping,
        tax,
        total,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Order placed successfully! ID: ${result.orderId}`);
        setOrderComplete(result.orderId);
        clearCart();
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="container py-24 max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for your purchase. Your order ID is <span className="font-bold text-foreground">{orderComplete}</span>.
        </p>
        <div className="p-6 bg-muted/30 border rounded-xl mb-8">
          <p className="mb-2">We've sent a confirmation email to the address provided.</p>
          <p className="text-sm text-muted-foreground">Our team will begin processing your order immediately. You will receive another notification once your items have shipped.</p>
        </div>
        <Link href="/">
          <Button variant="gold" size="lg">Return to Home</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-24">
        <EmptyState 
          title="Your cart is empty" 
          description="You cannot proceed to checkout with an empty cart." 
          actionLabel="Go to Shop" 
          href="/shop" 
        />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary shipping={shipping} taxRate={taxRate} />
        </div>
      </div>
    </div>
  );
}
