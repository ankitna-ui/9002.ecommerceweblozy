"use client";

import React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  MoreHorizontal,
  UserPlus,
  ShieldCheck,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Alessandro Rossi", email: "a.rossi@energy-tech.it", location: "Milan, IT", status: "Premium", spend: "€12,450", orders: 14 },
    { id: 2, name: "Sarah Jenkins", email: "s.jenkins@uk-gas.co.uk", location: "London, UK", status: "Standard", spend: "€4,200", orders: 6 },
    { id: 3, name: "Hiroshi Tanaka", email: "tanaka@osaka-industrial.jp", location: "Osaka, JP", status: "Premium", spend: "€28,900", orders: 32 },
    { id: 4, name: "Maria Garcia", email: "m.garcia@energy-spain.es", location: "Madrid, ES", status: "Enterprise", spend: "€85,000", orders: 58 },
    { id: 5, name: "John Smith", email: "j.smith@us-utilities.com", location: "Houston, US", status: "Standard", spend: "€2,100", orders: 3 },
  ];

  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <Users className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">CRM Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Corporate <span className="text-brand-gold">Network</span></h1>
        </div>
        <Button className="h-16 px-10 rounded-2xl bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-all font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-brand-navy/20">
          <UserPlus className="h-4 w-4" /> Expand Global Network
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Active Users", value: "4,821", change: "+42 New Today", icon: Users, color: "text-blue-500" },
          { label: "Elite Tier Ratio", value: "24%", change: "+3.1% YoY", icon: Star, color: "text-brand-gold" },
          { label: "Avg Customer LTV", value: "€14,200", change: "+12.4%", icon: ShieldCheck, color: "text-emerald-500" },
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
            <input type="text" placeholder="SEARCH NETWORK..." className="w-full pl-12 pr-4 h-12 rounded-xl bg-muted/30 border-none font-bold text-[10px] uppercase tracking-widest" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" /> Segment Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/20">
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Identity</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Location</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Tier</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">LTV Value</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Orders</th>
                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-brand-navy/5 flex items-center justify-center font-black text-brand-navy border border-brand-navy/10">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-tight">{customer.name}</p>
                        <p className="text-[9px] text-muted-foreground font-bold">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{customer.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      customer.status === 'Enterprise' ? 'bg-brand-navy text-white' : 
                      customer.status === 'Premium' ? 'bg-brand-gold/10 text-brand-gold' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-black">{customer.spend}</td>
                  <td className="px-8 py-6 text-[11px] font-black">{customer.orders}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/customers/${customer.id}`}>
                        <button className="p-2 hover:bg-brand-navy hover:text-white rounded-lg transition-all">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </Link>
                      <button className="p-2 hover:bg-muted rounded-lg transition-all text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
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
