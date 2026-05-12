"use client";

import React from "react";
import { 
  Warehouse, 
  Search, 
  Filter, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCcw,
  ArrowDownLeft,
  ArrowUpRight as ArrowUpRightIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function InventoryPage() {
  const stockItems = [
    { id: "PF-001", name: "Aperflux 251", category: "Regulators", stock: 124, status: "Healthy", value: "€45,200" },
    { id: "PF-002", name: "Reflux 819", category: "Regulators", stock: 12, status: "Low Stock", value: "€8,400" },
    { id: "PF-003", name: "Dival 600", category: "Regulators", stock: 89, status: "Healthy", value: "€32,100" },
    { id: "PF-004", name: "Norval", category: "Regulators", stock: 0, status: "Out of Stock", value: "€0" },
    { id: "PF-005", name: "Fio 100", category: "Smart Meters", stock: 450, status: "Healthy", value: "€112,000" },
  ];

  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <Warehouse className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Logistics Module</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Inventory <span className="text-brand-gold">Assets</span></h1>
        </div>
        <div className="flex gap-4">
          <Button className="h-14 px-8 rounded-2xl bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-all font-black uppercase tracking-widest text-[10px]">
            Scan New Shipment
          </Button>
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px]">
            Export Manifest
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Asset Value", value: "€1.2M", change: "+12%", icon: RefreshCcw, color: "text-blue-500" },
          { label: "Pending Shipments", value: "24", change: "6 Incoming", icon: ArrowDownLeft, color: "text-emerald-500" },
          { label: "Critical Stock Alerts", value: "03", change: "Action Required", icon: AlertTriangle, color: "text-rose-500" },
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

      <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02] overflow-hidden">
        <div className="p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="FILTER INVENTORY..." className="w-full pl-12 pr-4 h-12 rounded-xl bg-muted/30 border-none font-bold text-[10px] uppercase tracking-widest" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" /> Filter By Status
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Asset ID</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Product Name</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Stock Level</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Market Value</th>
                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {stockItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-8 py-5 text-[11px] font-black tracking-widest">{item.id}</td>
                  <td className="px-8 py-5">
                    <p className="text-[11px] font-black uppercase tracking-tight">{item.name}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[9px] font-black uppercase px-2 py-1 bg-muted rounded-md">{item.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black">{item.stock}</span>
                      <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.stock > 100 ? 'bg-emerald-500 w-full' : item.stock > 20 ? 'bg-amber-500 w-1/2' : 'bg-rose-500 w-1/5'}`}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {item.status === "Healthy" ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <AlertTriangle className="h-3 w-3 text-amber-500" />}
                      <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === "Healthy" ? 'text-emerald-500' : 'text-amber-500'}`}>{item.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[11px] font-black">{item.value}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-brand-navy hover:text-white rounded-lg transition-all">
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
