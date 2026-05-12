"use client";

import React from "react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { ShoppingBag, ArrowRight, Clock, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <Card className="border-none shadow-2xl shadow-black/5 rounded-[2rem]">
        <CardContent className="p-16">
          <EmptyState 
            title="Operational Void" 
            description="No transaction protocols found in the master registry." 
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-2xl shadow-black/5 overflow-hidden rounded-[2rem]">
      <CardHeader className="bg-brand-navy p-8">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-brand-gold" />
            <span className="text-2xl font-black uppercase tracking-tighter">Transaction Registry</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-brand-gold">
            Live Stream Active
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Order Protocol</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Client Entity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Timestamp</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Settlement</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders.slice().reverse().map((order, i) => (
                <motion.tr 
                  key={order.id} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-muted/20 transition-all duration-300 cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <Link href={`/admin/orders/${order.id}`}>
                      <span className="font-black text-brand-navy dark:text-brand-gold uppercase tracking-tighter text-lg hover:underline decoration-2 underline-offset-4">
                        {order.id}
                      </span>
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-lg bg-brand-navy/5 flex items-center justify-center font-black text-brand-navy dark:text-white text-xs">
                          {order.email[0].toUpperCase()}
                       </div>
                       <div>
                          <p className="font-black text-sm uppercase tracking-tight leading-none mb-1">
                            {order.customerName || order.email.split('@')[0]}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
                            {order.email}
                          </p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-lg font-black tracking-tighter">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Secure Payment</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center gap-4">
                      <Badge variant={
                        order.status === "Delivered" ? "success" : 
                        order.status === "Processing" ? "warning" : 
                        order.status === "Shipped" ? "default" : "secondary"
                      } className="rounded-md font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-sm border-none">
                        {order.status === "Delivered" && <CheckCircle2 className="h-3 w-3 mr-1.5 inline" />}
                        {order.status === "Shipped" && <Truck className="h-3 w-3 mr-1.5 inline" />}
                        {order.status}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
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
