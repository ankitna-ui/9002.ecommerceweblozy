"use client";

import React, { useEffect, useState } from "react";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { Product } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      try {
        const res = await fetch("/api/admin/products", { headers: { "Authorization": token } });
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  if (loading) return <div className="p-8 text-center">Loading inventory...</div>;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Inventory</h1>
          <p className="text-muted-foreground">Manage your catalog, stock levels, and product visibility.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
