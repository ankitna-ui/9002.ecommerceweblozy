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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="relative overflow-hidden group border-none shadow-xl shadow-black/5">
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`}></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black tracking-tighter">
                  <StatsCounter end={stat.value} prefix={stat.prefix} />
                </h3>
              </div>
              
              {/* Decorative Background Icon */}
              <stat.icon className="absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
