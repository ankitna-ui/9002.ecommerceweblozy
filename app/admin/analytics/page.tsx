"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Globe, 
  Clock, 
  ArrowUpRight,
  PieChart as PieChartIcon,
  Zap,
  MousePointer2,
  Calendar
} from "lucide-react";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function AnalyticsPage() {
  return (
    <div className="p-10 space-y-10 max-w-[1800px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <BarChart3 className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Intelligence Core</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Predictive <span className="text-brand-gold">Analytics</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-muted/30 p-1.5 rounded-2xl border border-border/50 flex gap-1">
             <button className="px-5 py-2 rounded-xl text-[9px] font-black uppercase bg-white shadow-lg text-brand-navy">Real-time</button>
             <button className="px-5 py-2 rounded-xl text-[9px] font-black uppercase text-muted-foreground">Historical</button>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-all font-black uppercase tracking-widest text-[10px]">
            Generate Insight Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", value: "1,284", change: "+12%", icon: Globe, color: "text-blue-500" },
          { label: "Neural Traffic", value: "48.2 GB/s", change: "+5.4%", icon: Activity, color: "text-emerald-500" },
          { label: "User Retention", value: "94.2%", change: "+2.1%", icon: Users, color: "text-purple-500" },
          { label: "System Uptime", value: "99.99%", change: "Stable", icon: Zap, color: "text-brand-gold" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black tracking-tighter">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white dark:bg-white/5 rounded-[3rem] p-10 border border-border/50 shadow-2xl shadow-black/[0.02]">
             <div className="flex items-center justify-between mb-12">
               <div>
                 <h3 className="text-2xl font-black uppercase tracking-tighter">Volume Intelligence</h3>
                 <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Cross-regional asset distribution</p>
               </div>
               <Calendar className="h-5 w-5 text-muted-foreground" />
             </div>
             <div className="h-[500px]">
               <RevenueChart />
             </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/30">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8 relative z-10">Regional Reach</h3>
            <div className="space-y-6 relative z-10">
              {[
                { country: "Europe", value: 65, color: "bg-blue-500" },
                { country: "Asia Pacific", value: 42, color: "bg-emerald-500" },
                { country: "North America", value: 88, color: "bg-brand-gold" },
                { country: "Middle East", value: 24, color: "bg-rose-500" },
              ].map((reg, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{reg.country}</span>
                    <span>{reg.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${reg.color}`} style={{ width: `${reg.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02]">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Interaction Log</h3>
            <div className="space-y-6">
              {[
                { event: "Asset Deployed", target: "Regional Hub EU-1", icon: MousePointer2 },
                { event: "Neural Sync", target: "Global Ledger", icon: Activity },
                { event: "Auth Handshake", target: "Admin Terminal", icon: Clock },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                    <log.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-tight">{log.event}</p>
                    <p className="text-[9px] text-muted-foreground font-bold">{log.target}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
