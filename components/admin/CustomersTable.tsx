"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { User, Mail, Calendar, MapPin, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  orders: number;
  location: string;
  ltv: number;
}

const mockCustomers: Customer[] = [
  { id: "C-001", name: "John Doe", email: "john@example.com", joinedAt: "2024-01-15", orders: 3, location: "Milan, Italy", ltv: 12450 },
  { id: "C-002", name: "Sarah Smith", email: "sarah@gasworks.com", joinedAt: "2024-02-20", orders: 1, location: "Berlin, Germany", ltv: 2300 },
  { id: "C-003", name: "Mario Rossi", email: "technical@energycorp.it", joinedAt: "2024-03-05", orders: 5, location: "Rome, Italy", ltv: 34200 },
  { id: "C-004", name: "Elena Petrova", email: "elena@vostok.ru", joinedAt: "2024-03-12", orders: 2, location: "Moscow, Russia", ltv: 8900 },
];

export function CustomersTable() {
  return (
    <Card className="border-none shadow-2xl shadow-black/5 overflow-hidden rounded-[2rem]">
      <CardHeader className="bg-brand-navy p-8">
        <CardTitle className="text-white flex items-center justify-between">
          <span className="text-2xl font-black uppercase tracking-tighter">Enterprise Accounts</span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-brand-gold">
            {mockCustomers.length} Total Users
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Account Profile</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operational Data</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Performance (LTV)</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockCustomers.map((customer, i) => (
                <motion.tr 
                  key={customer.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-muted/20 transition-all duration-300 cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">
                          {customer.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-background"></div>
                      </div>
                      <div>
                        <p className="font-black text-brand-navy dark:text-white uppercase tracking-tight text-base leading-tight">
                          {customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <MapPin className="h-3 w-3" /> {customer.location}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-brand-navy/60 dark:text-white/60 uppercase tracking-widest">
                        <Calendar className="h-3 w-3" /> Joined {customer.joinedAt}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">€{customer.ltv.toLocaleString()}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> {customer.orders} Projects Managed
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/admin/customers/${customer.id}`}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/50 bg-background hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all group/btn"
                    >
                      <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-0.5 transition-transform" />
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
