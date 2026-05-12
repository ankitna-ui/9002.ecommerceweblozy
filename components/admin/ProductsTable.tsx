"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Box, ArrowUpRight, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Card className="border-none shadow-2xl shadow-black/5 overflow-hidden rounded-[2rem]">
      <CardHeader className="bg-brand-navy p-8">
        <CardTitle className="text-white flex items-center justify-between">
          <span className="text-2xl font-black uppercase tracking-tighter">Global Inventory</span>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-[10px] font-black uppercase tracking-widest text-orange-500">
               <AlertTriangle className="h-3 w-3" /> 2 Low Stock Alerts
             </div>
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-brand-gold">
               {products.length} SKU Total
             </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Product Detail</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Classification</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Unit Value</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Stock Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product, i) => (
                <motion.tr 
                  key={product.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-muted/20 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-white border border-border/50 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform p-1">
                        <img 
                          src={product.imageId} 
                          alt={product.name} 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-black text-brand-navy dark:text-white uppercase tracking-tight text-base leading-tight">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                          Model: {product.model}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-[10px] font-black uppercase tracking-widest">
                      <Box className="h-3 w-3" /> {product.category}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-lg font-black text-brand-navy dark:text-brand-gold">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">MSRP Base</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <Badge variant={
                        product.stockStatus === "In Stock" ? "success" : 
                        product.stockStatus === "Out of Stock" ? "destructive" : 
                        product.stockStatus === "Low Stock" ? "warning" : "secondary"
                      } className="rounded-md font-black text-[10px] uppercase tracking-widest">
                        {product.stockStatus}
                      </Badge>
                      <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            product.stockQuantity > 50 ? "bg-emerald-500 w-[80%]" : 
                            product.stockQuantity > 20 ? "bg-orange-500 w-[40%]" : "bg-rose-500 w-[15%]"
                          )}
                        />
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{product.stockQuantity} Units available</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-brand-navy hover:text-white transition-all">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Link 
                        href={`/admin/products/${product.id}`}
                        className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-all"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
