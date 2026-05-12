"use client";

import React from "react";
import { categories } from "@/lib/categories";
import { Button } from "@/components/ui/Button";

interface FiltersSidebarProps {
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  stockFilter: string;
  setStockFilter: (stock: string) => void;
}

export function FiltersSidebar({
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
  stockFilter,
  setStockFilter
}: FiltersSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="cat-all"
              name="category"
              className="mr-2 accent-brand-gold"
              checked={categoryFilter === ""}
              onChange={() => setCategoryFilter("")}
            />
            <label htmlFor="cat-all" className="text-sm font-medium cursor-pointer">All Categories</label>
          </div>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center">
              <input
                type="radio"
                id={`cat-${cat.id}`}
                name="category"
                className="mr-2 accent-brand-gold"
                checked={categoryFilter === cat.name}
                onChange={() => setCategoryFilter(cat.name)}
              />
              <label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer">{cat.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Price Range</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="50000" 
            step="100"
            className="w-full accent-brand-gold"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>€0</span>
            <span>€{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Availability</h3>
        <div className="space-y-2">
          {["All", "In Stock", "Pre-order"].map((status) => (
            <div key={status} className="flex items-center">
              <input
                type="radio"
                id={`stock-${status}`}
                name="stock"
                className="mr-2 accent-brand-gold"
                checked={stockFilter === (status === "All" ? "" : status)}
                onChange={() => setStockFilter(status === "All" ? "" : status)}
              />
              <label htmlFor={`stock-${status}`} className="text-sm cursor-pointer">{status}</label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setCategoryFilter("");
          setPriceRange([0, 50000]);
          setStockFilter("");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
