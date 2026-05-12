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
  Globe,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
    <div className="p-8 md:p-16 space-y-16 max-w-[1920px] mx-auto bg-[#F8FAFC] dark:bg-[#020617] min-h-screen">
      {/* Universal Control Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12 pb-16 border-b-2 border-border/10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge className="px-5 py-2 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center gap-3 border border-emerald-500/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Node: Active</span>
            </Badge>
            <Badge className="px-5 py-2 bg-brand-navy/5 dark:bg-white/5 text-brand-navy dark:text-brand-gold rounded-full flex items-center gap-3 border border-border/50">
              <Database className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Sync: 100%</span>
            </Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-brand-navy dark:text-white">Strategic <br/><span className="text-brand-gold">Intelligence</span></h1>
            <p className="text-muted-foreground font-medium text-lg tracking-tight max-w-xl opacity-60">System Administrator authorized. Monitoring global asset distribution and real-time transactional telemetry.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text" 
              placeholder="QUERY SYSTEM CORE..." 
              className="pl-14 pr-8 py-6 rounded-3xl bg-white dark:bg-white/5 border-2 border-transparent shadow-xl focus:border-brand-gold/30 focus:ring-0 transition-all w-full md:w-[400px] font-black text-[11px] uppercase tracking-[0.2em]"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {[Bell, Cpu, Settings].map((Icon, i) => (
              <button key={i} className="p-5 rounded-3xl bg-white dark:bg-white/5 shadow-xl hover:bg-brand-gold hover:text-brand-navy transition-all border border-border/10 relative group">
                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-inherit" />
                {i === 0 && <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-rose-500 border-2 border-background animate-bounce shadow-lg shadow-rose-500/20"></span>}
              </button>
            ))}
          </div>

          <div className="h-14 w-px bg-border/50 mx-4 hidden xl:block"></div>
          
          <button 
            onClick={() => setPowerMode(!powerMode)}
            className={`flex items-center gap-6 px-10 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 shadow-2xl ${
              powerMode 
                ? 'bg-brand-gold text-brand-navy shadow-brand-gold/40 scale-105' 
                : 'bg-brand-navy text-white shadow-brand-navy/30 hover:bg-brand-navy/90'
            }`}
          >
            <Zap className={`h-5 w-5 transition-transform duration-700 ${powerMode ? 'fill-current rotate-[360deg] scale-125' : ''}`} />
            {powerMode ? 'CORE: OVERDRIVE' : 'CORE: STANDARD'}
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

        <div className="xl:col-span-4 space-y-12">
          {/* Neural Control Module */}
          <section className="bg-brand-navy rounded-[4rem] p-12 text-white relative overflow-hidden shadow-[0_60px_100px_rgba(26,62,96,0.3)] group">
            <div className="absolute top-0 right-0 p-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="h-24 w-24 text-brand-gold opacity-10" />
              </motion.div>
            </div>
            
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-gold">
                  <Sparkles className="h-6 w-6" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em]">AI Core v3.1</span>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Strategic <br/>Protocols</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Predictive Stock", desc: "Auto-reorder enabled", icon: Zap, status: "Active", active: true },
                  { label: "Smart Marketing", desc: "Dynamic pricing logic", icon: Megaphone, status: "Standby", active: false },
                  { label: "Global Sync", desc: "Real-time ledger updates", icon: Globe, status: "Syncing", active: true },
                ].map((op, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-2xl ${op.active ? 'bg-brand-gold text-brand-navy' : 'bg-white/10 text-white/40'} shadow-lg`}>
                        <op.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest">{op.label}</p>
                        <p className="text-[11px] text-white/40 font-medium italic mt-1">{op.desc}</p>
                      </div>
                    </div>
                    <div className={`h-8 w-14 rounded-full p-1.5 transition-all duration-500 ${op.active ? 'bg-brand-gold flex justify-end shadow-[0_0_15px_rgba(199,168,47,0.5)]' : 'bg-white/10 flex justify-start'}`}>
                      <div className="h-5 w-5 bg-white rounded-full shadow-2xl"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link href="/admin/marketing" className="block pt-6">
                <button className="w-full py-7 rounded-[2rem] bg-brand-gold text-brand-navy font-black uppercase tracking-[0.4em] text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_25px_60px_rgba(199,168,47,0.3)]">
                  Execute Marketing Matrix
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

