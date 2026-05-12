"use client";

import React, { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";

const mockData = [
  { name: "Mon", revenue: 12000, customers: 120 },
  { name: "Tue", revenue: 18000, customers: 150 },
  { name: "Wed", revenue: 15000, customers: 140 },
  { name: "Thu", revenue: 22000, customers: 210 },
  { name: "Fri", revenue: 31000, customers: 280 },
  { name: "Sat", revenue: 28000, customers: 250 },
  { name: "Sun", revenue: 19000, customers: 190 },
];

export function RevenueChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[400px] bg-muted animate-pulse rounded-[2.5rem]" />;

  const isDark = theme === "dark";
  const primaryColor = "#C7A82F"; // Brand Gold
  const secondaryColor = "#1A3E60"; // Brand Navy

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            fontWeight="bold"
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            fontWeight="bold"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? "#0f172a" : "#fff", 
              borderRadius: "16px", 
              border: "none",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            itemStyle={{ fontWeight: "bold", fontSize: "12px" }}
            labelStyle={{ fontWeight: "black", marginBottom: "4px", color: primaryColor }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={primaryColor} 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            animationDuration={2000}
          />
          <Area 
            type="monotone" 
            dataKey="customers" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorCustomers)" 
            animationDuration={2500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
