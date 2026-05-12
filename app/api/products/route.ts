import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.shortDescription.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
  }

  return NextResponse.json({ products: filtered });
}
