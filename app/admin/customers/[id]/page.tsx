"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Package, 
  TrendingUp, 
  MessageSquare,
  ShieldCheck,
  Download,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomerProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  // Mock data for "data inside data"
  const customer = {
    id,
    name: "Mario Rossi",
    email: "technical@energycorp.it",
    location: "Rome, Italy",
    joinedAt: "March 05, 2024",
    status: "Premium Account",
    avatar: "MR",
    metrics: {
      totalSpent: 34200,
      totalOrders: 5,
      avgOrderValue: 6840,
      lastOrder: "2 days ago"
    },
    orders: [
      { id: "ORD-9921", date: "2024-05-10", total: 4500, status: "Delivered" },
      { id: "ORD-8812", date: "2024-04-22", total: 12800, status: "Delivered" },
      { id: "ORD-7756", date: "2024-03-30", total: 8900, status: "Delivered" },
      { id: "ORD-6643", date: "2024-03-15", total: 5500, status: "Delivered" },
      { id: "ORD-5521", date: "2024-03-05", total: 2500, status: "Delivered" },
    ],
    interactions: [
      { type: "Support", subject: "Regulator Calibration", status: "Resolved", date: "2024-05-08" },
      { type: "Sales", subject: "Volume Discount Request", status: "Closed", date: "2024-04-20" },
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-12 w-12 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin"></div>
        <p className="font-black uppercase tracking-widest text-sm text-muted-foreground">Syncing Enterprise Account Data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-12 w-12 bg-white dark:bg-white/5 shadow-xl">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Authenticated Enterprise Profile</p>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">{customer.name}</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="bg-brand-navy text-white rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-2">
            <MessageSquare className="h-4 w-4" /> Message Client
          </Button>
          <Button variant="outline" className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-xs gap-2">
            <Download className="h-4 w-4" /> Export Ledger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Profile Info */}
        <div className="xl:col-span-1 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <div className="h-32 bg-brand-navy relative">
               <div className="absolute -bottom-10 left-8">
                 <div className="h-20 w-20 rounded-2xl bg-brand-gold flex items-center justify-center text-3xl font-black text-brand-navy border-4 border-background shadow-xl">
                    {customer.avatar}
                 </div>
               </div>
            </div>
            <CardContent className="pt-14 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{customer.name}</h3>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{customer.status}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <Mail className="h-4 w-4" /> {customer.email}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {customer.location}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" /> Partner since {customer.joinedAt}
                </div>
              </div>
              <div className="pt-6 border-t">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Account Security</p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                   <span className="text-xs font-bold text-emerald-600">KYC Verified</span>
                   <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs Area */}
        <div className="xl:col-span-3 space-y-10">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-border/50 shadow-xl shadow-black/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Lifetime Value</p>
              <h4 className="text-3xl font-black tracking-tighter text-emerald-600">€{customer.metrics.totalSpent.toLocaleString()}</h4>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                <TrendingUp className="h-3 w-3" /> +15% Year-over-year
              </div>
            </div>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-border/50 shadow-xl shadow-black/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Order Frequency</p>
              <h4 className="text-3xl font-black tracking-tighter">{customer.metrics.totalOrders} Projects</h4>
              <p className="mt-4 text-[10px] font-black text-muted-foreground uppercase">Last order: {customer.metrics.lastOrder}</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-border/50 shadow-xl shadow-black/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Avg Deal Size</p>
              <h4 className="text-3xl font-black tracking-tighter">€{customer.metrics.avgOrderValue.toLocaleString()}</h4>
              <p className="mt-4 text-[10px] font-black text-blue-500 uppercase">Tier 1 Enterprise Buyer</p>
            </div>
          </div>

          {/* Order History - DATA INSIDE DATA */}
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="p-8 border-b">
               <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center justify-between">
                 Order History Protocol
                 <button className="text-[10px] font-black uppercase tracking-widest text-brand-gold">View Ledger</button>
               </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y">
                 {customer.orders.map((order, i) => (
                   <Link 
                     key={order.id} 
                     href={`/admin/orders/${order.id}`}
                     className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all group"
                   >
                     <div className="flex items-center gap-6">
                        <div className="h-12 w-12 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy dark:text-white">
                          <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-black text-base uppercase tracking-tight">{order.id}</p>
                          <p className="text-xs text-muted-foreground font-bold">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black tracking-tighter">€{order.total.toLocaleString()}</p>
                        <div className="flex items-center justify-end gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{order.status}</span>
                        </div>
                     </div>
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                        <ArrowUpRight className="h-5 w-5 text-brand-gold" />
                     </div>
                   </Link>
                 ))}
               </div>
            </CardContent>
          </Card>

          {/* Service Interactions */}
          <section className="space-y-6">
             <h3 className="text-xl font-black uppercase tracking-tight px-4">Support & Service Logs</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {customer.interactions.map((interaction, i) => (
                 <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-border/50 shadow-xl shadow-black/5 flex items-center gap-4 group hover:border-brand-gold transition-all cursor-pointer">
                    <div className="h-12 w-12 rounded-xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                      <MessageSquare className="h-6 w-6 group-hover:text-brand-navy transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{interaction.type}</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">• {interaction.status}</span>
                      </div>
                      <p className="font-black text-sm uppercase tracking-tight">{interaction.subject}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{interaction.date}</p>
                    </div>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
