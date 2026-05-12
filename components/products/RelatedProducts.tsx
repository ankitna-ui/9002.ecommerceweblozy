"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        const filtered = data.products
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, 4);
        setRelated(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [category, currentProductId]);

  if (loading || related.length === 0) return null;

  return (
    <div className="mt-24 border-t pt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
