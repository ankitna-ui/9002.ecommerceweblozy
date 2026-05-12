"use client";

import React from "react";
import { 
  Megaphone, 
  Plus, 
  Target, 
  MousePointer2, 
  BarChart2, 
  Clock, 
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function MarketingPage() {
  const campaigns = [
    { id: 1, name: "Hydrogen Future Expo", status: "Active", reach: "45K", conversion: "12%", budget: "€15,000" },
    { id: 2, name: "Seasonal Utility Rebate", status: "Scheduled", reach: "120K", conversion: "0%", budget: "€45,000" },
    { id: 3, name: "Industry Leaders Summit", status: "Completed", reach: "8K", conversion: "24%", budget: "€8,000" },
  ];

  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <Megaphone className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Growth Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Marketing <span className="text-brand-gold">Campaigns</span></h1>
        </div>
        <Button className="h-16 px-10 rounded-2xl bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-all font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-brand-navy/20">
          <Plus className="h-4 w-4" /> Initialize New Protocol
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Reach", value: "173.5K", icon: Target, color: "text-blue-500" },
              { label: "Avg Conversion", value: "8.4%", icon: MousePointer2, color: "text-emerald-500" },
              { label: "ROI Analytics", value: "4.2x", icon: BarChart2, color: "text-brand-gold" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/[0.02] flex flex-col items-center text-center">
                <div className={`p-4 rounded-2xl bg-muted/50 ${stat.color} mb-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-3xl font-black tracking-tighter">{stat.value}</h4>
              </div>
            ))}
          </div>

          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter px-2">Active Protocols</h3>
            <div className="space-y-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/[0.02] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-brand-gold/30 transition-all">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="h-16 w-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-black text-xl shadow-xl shadow-brand-navy/10">
                      {camp.name[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tighter mb-1">{camp.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                          {camp.status}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground italic">ID: PROTOCOL-00{camp.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-12 px-8 border-x border-border/50">
                    <div className="text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Reach</p>
                      <p className="text-sm font-black">{camp.reach}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Conv.</p>
                      <p className="text-sm font-black">{camp.conversion}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Budget</p>
                      <p className="text-sm font-black">{camp.budget}</p>
                    </div>
                  </div>
                  <button className="p-4 rounded-full bg-muted/50 hover:bg-brand-gold hover:text-brand-navy transition-all group">
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/30">
            <Sparkles className="absolute top-0 right-0 p-10 h-32 w-32 text-brand-gold opacity-10" />
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">AI Optimization</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Neural Marketing v2.0</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-brand-gold" />
                  <p className="text-xs font-bold">Suggested optimization for "Hydrogen Expo"</p>
                </div>
                <p className="text-xs text-white/60 leading-relaxed italic">
                  "Increase budget by 15% in Nordic regions. Predictive conversion shows 2.4x growth in B2B engagement."
                </p>
                <button className="w-full py-3 rounded-xl bg-brand-gold text-brand-navy font-black uppercase tracking-widest text-[9px] shadow-lg shadow-brand-gold/20">
                  Execute Intelligence
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02]">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Performance History</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-brand-gold"></div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase tracking-tight">Q{i} Growth Cycle</p>
                    <div className="h-1 w-full bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-brand-navy rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground">84%</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
