"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Eye, Star, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { QuickViewModal } from "./QuickViewModal";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const getStockBadge = () => {
    switch (product.stockStatus) {
      case "In Stock": return <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] uppercase tracking-widest">Available</Badge>;
      case "Low Stock": return <Badge className="bg-amber-500/10 text-amber-500 border-none font-black text-[9px] uppercase tracking-widest">Limited Supply</Badge>;
      case "Pre-order": return <Badge className="bg-blue-500/10 text-blue-500 border-none font-black text-[9px] uppercase tracking-widest">Reservation</Badge>;
      default: return <Badge className="bg-rose-500/10 text-rose-500 border-none font-black text-[9px] uppercase tracking-widest">Sold Out</Badge>;
    }
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative flex flex-col rounded-[2.5rem] border bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-brand-navy/5 overflow-hidden border-border/50"
      >
        <div className="relative aspect-[5/4] overflow-hidden bg-muted/30">
          <Image
            src={product.imageId}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute left-6 top-6 z-10 flex flex-col gap-2">
            {getStockBadge()}
          </div>
          <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-12 w-12 rounded-full shadow-2xl bg-white text-brand-navy hover:bg-brand-gold hover:text-brand-navy border-none"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full shadow-2xl bg-brand-gold text-brand-navy hover:scale-110 transition-transform border-none"
              onClick={() => addToCart(product)}
              disabled={product.stockStatus === "Out of Stock"}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{product.category}</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-gold/10">
              <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
              <span className="text-[10px] font-black text-brand-navy dark:text-brand-gold">{product.rating}</span>
            </div>
          </div>
          
          <Link href={`/product/${product.id}`} className="block mb-3">
            <h3 className="font-black text-xl uppercase tracking-tighter leading-tight group-hover:text-brand-gold transition-colors">{product.name}</h3>
          </Link>
          <p className="text-xs font-medium text-muted-foreground mb-6 line-clamp-2 leading-relaxed italic">
            "{product.shortDescription}"
          </p>
          
          <div className="mt-auto pt-6 flex items-center justify-between border-t border-dashed border-border/50">
            <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Mkt Value</p>
              <span className="font-black text-2xl tracking-tighter text-brand-navy dark:text-brand-gold">{formatPrice(product.price)}</span>
            </div>
            <Link href={`/product/${product.id}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 px-4 rounded-xl font-black uppercase tracking-widest text-[9px] gap-2 border border-border/50 hover:bg-brand-navy hover:text-white transition-all"
              >
                Inspect
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}
