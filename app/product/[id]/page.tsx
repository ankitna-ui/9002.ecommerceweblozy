"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ShoppingCart, Star, ShieldCheck, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container py-24 text-center">Product not found.</div>;
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground">{product.category}</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.galleryImages} productName={product.name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold tracking-wider text-brand-gold uppercase">{product.category}</span>
            <Badge variant="outline" className="font-mono text-xs border-brand-navy/20 dark:border-white/20">{product.model}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-brand-gold fill-current' : 'text-muted'}`} />
              ))}
              <span className="ml-2 font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground underline cursor-pointer">{product.reviewCount} Reviews</span>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-black text-brand-navy dark:text-white mb-2">
              {formatPrice(product.price)}
            </div>
            <p className="text-sm text-muted-foreground">Excludes VAT. Shipping calculated at checkout.</p>
          </div>

          <p className="text-lg leading-relaxed mb-8">{product.longDescription}</p>

          <div className="space-y-4 mb-8 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="font-medium">Availability</span>
              <Badge variant={
                product.stockStatus === "In Stock" ? "success" : 
                product.stockStatus === "Low Stock" ? "warning" : "secondary"
              }>
                {product.stockStatus}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
              100% Genuine Certified Component
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border rounded-md h-12 w-full sm:w-auto">
              <Button variant="ghost" className="h-full rounded-none px-4" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              <div className="w-12 text-center font-medium">{quantity}</div>
              <Button variant="ghost" className="h-full rounded-none px-4" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>+</Button>
            </div>
            <Button 
              size="lg"
              className="flex-1 h-12 text-base font-bold bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90 w-full"
              onClick={() => addToCart(product, quantity)}
              disabled={product.stockStatus === "Out of Stock"}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specifications" className="w-full mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
          <TabsTrigger value="specifications" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-gold data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 text-base">
            Technical Specifications
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-gold data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 text-base">
            Features & Applications
          </TabsTrigger>
          <TabsTrigger value="downloads" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-gold data-[state=active]:shadow-none data-[state=active]:bg-transparent pb-3 text-base">
            Downloads
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-dashed">
                <span className="font-medium text-muted-foreground">{key}</span>
                <span className="font-semibold text-right">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-sm font-bold mr-3 mt-0.5 shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Primary Applications</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, i) => (
                  <Badge key={i} variant="outline" className="px-4 py-2 text-sm bg-muted/50 border-border">
                    {app}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="mt-0">
          {product.downloads.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.downloads.map((doc, i) => (
                <a key={i} href={doc.url} className="flex items-center p-4 border rounded-lg hover:border-brand-gold hover:shadow-sm transition-all group">
                  <div className="h-10 w-10 rounded bg-red-100 text-red-600 flex items-center justify-center mr-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-brand-gold transition-colors">{doc.name}</h4>
                    <span className="text-xs text-muted-foreground">{doc.size} - PDF</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No downloads available for this product.</p>
          )}
        </TabsContent>
      </Tabs>

      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
}
