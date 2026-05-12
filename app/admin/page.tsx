"use client";

import React, { useEffect, useState } from "react";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { Order, Product } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { 
  Zap, 
  Activity, 
  Search, 
  Bell, 
  Calendar, 
  ArrowUpRight, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Database,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  Sparkles,
  Megaphone,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [powerMode, setPowerMode] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/admin/orders", { headers: { "Authorization": token } }),
          fetch("/api/admin/products", { headers: { "Authorization": token } })
        ]);
        
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        
        setOrders(ordersData.orders || []);
        setProducts(productsData.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [token]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const uniqueCustomers = new Set(orders.map(o => o.email)).size;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <div className="h-20 w-20 border-4 border-brand-navy/10 border-t-brand-gold rounded-full animate-spin"></div>
          <Zap className="absolute inset-0 m-auto h-8 w-8 text-brand-gold animate-pulse" />
        </div>
        <div className="text-center">
          <p className="font-black uppercase tracking-[0.4em] text-[10px] text-muted-foreground animate-pulse">Initializing Neural Interface</p>
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-gold mt-2">V2.4 Protocol Authorized</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-[1800px] mx-auto bg-muted/5 min-h-screen">
      {/* Universal Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-10 border-b border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest">Master Node: Active</span>
            </div>
            <div className="px-3 py-1 bg-brand-navy/5 text-brand-navy dark:text-brand-gold rounded-full flex items-center gap-2">
              <Database className="h-3 w-3" />
              <span className="text-[9px] font-black uppercase tracking-widest">Local Sync: 100%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85]">Strategic <br/><span className="text-brand-gold">Dashboard</span></h1>
            <p className="text-muted-foreground font-medium text-sm tracking-tight italic">Welcome back, Administrator. All systems are operating within optimal parameters.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text" 
              placeholder="GLOBAL COMMAND SEARCH..." 
              className="pl-11 pr-6 py-4 rounded-2xl bg-white dark:bg-white/5 border-none shadow-2xl shadow-black/5 focus:ring-2 focus:ring-brand-gold/50 transition-all w-full md:w-80 font-bold text-[10px] uppercase tracking-widest"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-4 rounded-2xl bg-white dark:bg-white/5 shadow-2xl shadow-black/5 hover:scale-110 transition-all border border-border/50 group relative">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-brand-navy dark:group-hover:text-brand-gold" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-rose-500 border-2 border-background"></span>
            </button>
            <button className="p-4 rounded-2xl bg-white dark:bg-white/5 shadow-2xl shadow-black/5 hover:scale-110 transition-all border border-border/50 group">
              <Cpu className="h-5 w-5 text-muted-foreground group-hover:text-brand-navy dark:group-hover:text-brand-gold" />
            </button>
          </div>
          <div className="h-10 w-px bg-border mx-2 hidden xl:block"></div>
          <button 
            onClick={() => setPowerMode(!powerMode)}
            className={`flex items-center gap-4 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 ${
              powerMode 
                ? 'bg-brand-gold text-brand-navy shadow-2xl shadow-brand-gold/40 scale-105' 
                : 'bg-brand-navy text-white shadow-2xl shadow-brand-navy/30 hover:bg-brand-navy/90'
            }`}
          >
            <Zap className={`h-4 w-4 transition-transform duration-500 ${powerMode ? 'fill-current rotate-12 scale-125' : ''}`} />
            {powerMode ? 'Protocol: Power On' : 'Protocol: Standard'}
          </button>
        </div>
      </div>

      <DashboardCards 
        totalRevenue={totalRevenue} 
        totalOrders={orders.length} 
        totalProducts={products.length} 
        totalCustomers={uniqueCustomers || 4} 
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <section className="bg-white dark:bg-white/5 rounded-[3rem] p-10 shadow-2xl shadow-black/[0.03] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
               <BarChart3 className="h-64 w-64" />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Growth Trajectory</h3>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 italic">Historical Revenue Analysis v4.2</p>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-2xl border border-border/50">
                {['24h', '7d', '30d', 'ALL'].map((time) => (
                  <button key={time} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${time === '7d' ? 'bg-white shadow-lg text-brand-navy' : 'text-muted-foreground hover:text-foreground'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[450px]">
              <RevenueChart />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-brand-gold" />
                <h3 className="text-xl font-black uppercase tracking-tighter">Transactional Stream</h3>
              </div>
              <Link href="/admin/orders">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold gap-2 hover:bg-brand-gold/10">
                  Full Registry <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="bg-white dark:bg-white/5 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/[0.03] border border-white/10">
              <OrdersTable orders={orders.slice(0, 8)} />
            </div>
          </section>
        </div>

        <div className="xl:col-span-4 space-y-10">
          {/* Neural Control Module */}
          <section className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/30 group">
            <div className="absolute top-0 right-0 p-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="h-16 w-16 text-brand-gold opacity-10" />
              </motion.div>
            </div>
            <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-gold">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Module v2.0</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Strategic Ops</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Predictive Stock", desc: "Auto-reorder enabled", icon: Zap, status: "Active", active: true },
                  { label: "Smart Marketing", desc: "Dynamic pricing logic", icon: Megaphone, status: "Standby", active: false },
                  { label: "Global Sync", desc: "Real-time ledger updates", icon: Globe, status: "Syncing", active: true },
                ].map((op, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${op.active ? 'bg-brand-gold/20 text-brand-gold' : 'bg-white/5 text-white/40'}`}>
                        <op.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight">{op.label}</p>
                        <p className="text-[10px] text-white/40 font-medium italic">{op.desc}</p>
                      </div>
                    </div>
                    <div className={`h-6 w-11 rounded-full p-1 transition-all ${op.active ? 'bg-brand-gold flex justify-end' : 'bg-white/10 flex justify-start'}`}>
                      <div className="h-4 w-4 bg-white rounded-full shadow-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/admin/marketing" className="block">
                <button className="w-full py-5 rounded-2xl bg-brand-gold text-brand-navy font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-gold/20">
                  Deploy Marketing Protocol
                </button>
              </Link>
            </div>
            
            {/* Decorative mesh */}
            <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/themes/fiorentini/public/images/homepage/texture.png')] opacity-10 pointer-events-none" />
          </section>

          {/* Real-time Telemetry Feed */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-6">
              <h3 className="text-xl font-black uppercase tracking-tighter">System Telemetry</h3>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'New Order: #PF-9482', time: '2M AGO', icon: CheckCircle2, color: 'text-emerald-500', desc: 'Aperflux 251 x 12 units' },
                { label: 'Inventory Alert: Low Level', time: '14M AGO', icon: AlertCircle, color: 'text-orange-500', desc: 'Reflux 819 stock below threshold' },
                { label: 'Security Handshake', time: '1H AGO', icon: ShieldCheck, color: 'text-blue-500', desc: 'Remote access verified from Region: EU' },
                { label: 'Marketing Campaign Init', time: '3H AGO', icon: Zap, color: 'text-brand-gold', desc: 'Summer Solstice protocol launched' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-white/5 shadow-2xl shadow-black/[0.02] group hover:translate-x-3 transition-all cursor-pointer">
                  <div className={`p-3 rounded-2xl bg-muted/50 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[11px] font-black uppercase tracking-tight truncate">{item.label}</p>
                      <span className="text-[8px] font-black text-muted-foreground whitespace-nowrap ml-2">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium italic truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/logs" className="block">
              <button className="w-full py-4 rounded-2xl border-2 border-dashed border-border/50 text-muted-foreground font-black uppercase tracking-[0.3em] text-[9px] hover:bg-muted/50 hover:text-foreground transition-all">
                Access Audit Logs
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

