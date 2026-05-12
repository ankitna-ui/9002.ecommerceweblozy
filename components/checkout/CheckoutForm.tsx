"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(5, "Phone number is required"),
  company: z.string().optional(),
  vatNumber: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["credit_card", "bank_transfer", "cod"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useReactHookForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit_card"
    }
  });

  const paymentMethod = watch("paymentMethod");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email Address *</label>
            <Input {...register("email")} placeholder="you@company.com" className={errors.email ? "border-destructive" : ""} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name *</label>
              <Input {...register("fullName")} placeholder="John Doe" className={errors.fullName ? "border-destructive" : ""} />
              {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone *</label>
              <Input {...register("phone")} placeholder="+1 234 567 890" className={errors.phone ? "border-destructive" : ""} />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Company (Optional)</label>
              <Input {...register("company")} placeholder="Company Ltd." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">VAT Number (Optional)</label>
              <Input {...register("vatNumber")} placeholder="IT12345678901" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Address *</label>
            <Input {...register("address")} placeholder="123 Industrial Way" className={errors.address ? "border-destructive" : ""} />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="text-sm font-medium mb-1 block">City *</label>
              <Input {...register("city")} placeholder="Milan" className={errors.city ? "border-destructive" : ""} />
              {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
            </div>
            <div className="md:col-span-1">
              <label className="text-sm font-medium mb-1 block">Postal Code *</label>
              <Input {...register("postalCode")} placeholder="20100" className={errors.postalCode ? "border-destructive" : ""} />
              {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>}
            </div>
            <div className="md:col-span-1">
              <label className="text-sm font-medium mb-1 block">Country *</label>
              <select 
                {...register("country")} 
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.country ? "border-destructive" : ""}`}
              >
                <option value="">Select Country</option>
                <option value="Italy">Italy</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === "credit_card" ? "border-brand-gold bg-brand-gold/5" : "hover:border-brand-gold/50"}`}>
              <label className="flex items-center cursor-pointer">
                <input type="radio" value="credit_card" {...register("paymentMethod")} className="mr-3 accent-brand-gold h-4 w-4" />
                <span className="font-medium">Credit Card</span>
              </label>
              {paymentMethod === "credit_card" && (
                <div className="mt-4 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                  <div className="col-span-2">
                    <Input placeholder="Card Number (Mock)" defaultValue="**** **** **** 4242" />
                  </div>
                  <div>
                    <Input placeholder="MM/YY" defaultValue="12/26" />
                  </div>
                  <div>
                    <Input placeholder="CVC" defaultValue="***" />
                  </div>
                </div>
              )}
            </div>
            
            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === "bank_transfer" ? "border-brand-gold bg-brand-gold/5" : "hover:border-brand-gold/50"}`}>
              <label className="flex items-center cursor-pointer">
                <input type="radio" value="bank_transfer" {...register("paymentMethod")} className="mr-3 accent-brand-gold h-4 w-4" />
                <span className="font-medium">Bank Transfer</span>
              </label>
              {paymentMethod === "bank_transfer" && (
                <p className="mt-2 text-sm text-muted-foreground ml-7">
                  You will receive instructions to complete the bank transfer after placing the order. Order will be processed once payment is received.
                </p>
              )}
            </div>

            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-brand-gold bg-brand-gold/5" : "hover:border-brand-gold/50"}`}>
              <label className="flex items-center cursor-pointer">
                <input type="radio" value="cod" {...register("paymentMethod")} className="mr-3 accent-brand-gold h-4 w-4" />
                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90 h-14 text-lg" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}
