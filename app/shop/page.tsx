"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/Input";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FiltersSidebar } from "@/components/products/FiltersSidebar";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get("category") || "";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = `/api/products?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        if (debouncedSearch) url += `&search=${encodeURIComponent(debouncedSearch)}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        let filtered = data.products;
        
        if (stockFilter === "In Stock") {
          filtered = filtered.filter((p: Product) => p.stockStatus === "In Stock" || p.stockStatus === "Low Stock");
        } else if (stockFilter === "Pre-order") {
          filtered = filtered.filter((p: Product) => p.stockStatus === "Pre-order");
        }

        // Sorting
        filtered.sort((a: Product, b: Product) => {
          if (sortBy === "price-asc") return a.price - b.price;
          if (sortBy === "price-desc") return b.price - a.price;
          if (sortBy === "rating") return b.rating - a.rating;
          return a.name.localeCompare(b.name);
        });

        setProducts(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [category, debouncedSearch, priceRange, stockFilter, sortBy]);

  // Update URL on category change without hard reload
  useEffect(() => {
    if (category) {
      router.push(`/shop?category=${encodeURIComponent(category)}`, { scroll: false });
    } else {
      router.push(`/shop`, { scroll: false });
    }
  }, [category, router]);

  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Industrial Catalog</h1>
          <p className="text-muted-foreground">Browse our complete range of certified equipment.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 bg-muted/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden shrink-0"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 shrink-0 ${showMobileFilters ? "block" : "hidden md:block"}`}>
          <div className="sticky top-24">
            <FiltersSidebar 
              categoryFilter={category}
              setCategoryFilter={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
            />
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">Showing {products.length} results</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Sort by:</span>
              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-brand-gold"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  );
}
