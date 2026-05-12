"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Check, Shield } from "lucide-react";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.imageId}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm font-medium text-brand-gold uppercase tracking-widest mb-1">{product.category}</p>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">Model: {product.model}</p>
          
          <div className="text-3xl font-bold text-brand-navy dark:text-white mb-6">
            {formatPrice(product.price)}
          </div>
          
          <p className="text-sm mb-6 text-muted-foreground leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>{product.stockStatus} ({product.stockQuantity} units available)</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-2 text-brand-gold" />
              <span>Certified Industrial Grade</span>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="rounded-none h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <div className="w-12 text-center text-sm font-medium">{quantity}</div>
                <Button variant="ghost" size="icon" className="rounded-none h-10 w-10" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>+</Button>
              </div>
              <Button 
                className="flex-1 h-10 bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy"
                onClick={handleAddToCart}
                disabled={product.stockStatus === "Out of Stock"}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            <Link href={`/product/${product.id}`} className="block">
              <Button variant="outline" className="w-full h-10" onClick={onClose}>
                View Full Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
