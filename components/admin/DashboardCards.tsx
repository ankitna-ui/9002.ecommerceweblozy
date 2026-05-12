"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { CreditCard, Euro, Package, Users, TrendingUp, TrendingDown } from "lucide-react";
import { StatsCounter } from "@/components/common/StatsCounter";
import { motion } from "framer-motion";

interface DashboardCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export function DashboardCards({ totalRevenue, totalOrders, totalProducts, totalCustomers }: DashboardCardsProps) {
  const stats = [
    {
      label: "Total Revenue",
      value: totalRevenue,
      prefix: "€",
      icon: Euro,
      trend: "+12.5%",
      isPositive: true,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-500/10"
    },
    {
      label: "Gross Orders",
      value: totalOrders,
      icon: CreditCard,
      trend: "+8.2%",
      isPositive: true,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500/10"
    },
    {
      label: "Active Inventory",
      value: totalProducts,
      icon: Package,
      trend: "-2.1%",
      isPositive: false,
      color: "from-orange-500 to-amber-600",
      bg: "bg-orange-500/10"
    },
    {
      label: "New Customers",
      value: totalCustomers,
      icon: Users,
      trend: "+24.3%",
      isPositive: true,
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="min-w-[220px]"
        >
          <Card className="relative overflow-hidden group border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white dark:bg-white/5 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${stat.color} opacity-80`}></div>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className={`p-3.5 rounded-2xl ${stat.bg} backdrop-blur-xl border border-white/20`}>
                  <stat.icon className="h-6 w-6 text-foreground" />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {stat.isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {stat.trend}
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2 opacity-60">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter leading-none">
                  <StatsCounter end={stat.value} prefix={stat.prefix} />
                </h3>
              </div>
              
              {/* Decorative Background Icon */}
              <stat.icon className="absolute -right-6 -bottom-6 h-32 w-32 opacity-[0.04] group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />
              
              {/* Subtle mesh background */}
              <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/themes/fiorentini/public/images/homepage/texture.png')] opacity-5 pointer-events-none" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
