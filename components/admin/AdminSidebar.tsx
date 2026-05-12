"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Activity, 
  Zap,
  TrendingUp,
  Globe,
  Warehouse,
  Megaphone,
  FileBarChart,
  ShieldAlert,
  Bell
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { group: "Operations", items: [
    { icon: LayoutDashboard, label: "Overview", href: "/admin", color: "text-blue-500" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders", color: "text-emerald-500" },
    { icon: Package, label: "Products", href: "/admin/products", color: "text-orange-500" },
    { icon: Warehouse, label: "Inventory", href: "/admin/inventory", color: "text-amber-500" },
  ]},
  { group: "Intelligence", items: [
    { icon: Users, label: "Customers", href: "/admin/customers", color: "text-purple-500" },
    { icon: TrendingUp, label: "Analytics", href: "/admin/analytics", color: "text-rose-500" },
    { icon: Megaphone, label: "Marketing", href: "/admin/marketing", color: "text-cyan-500" },
    { icon: FileBarChart, label: "Reports", href: "/admin/reports", color: "text-indigo-500" },
  ]},
  { group: "System", items: [
    { icon: Settings, label: "Settings", href: "/admin/settings", color: "text-slate-500" },
    { icon: ShieldAlert, label: "Audit Logs", href: "/admin/logs", color: "text-rose-600" },
  ]},
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 border-r bg-background/50 backdrop-blur-3xl h-screen flex flex-col sticky top-0 hidden lg:flex z-50">
      <div className="p-6 space-y-6">
        <Link href="/" className="block">
          <img 
            src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
            alt="Logo" 
            className="h-8 w-auto opacity-100 dark:brightness-100 dark:invert-0 hover:scale-105 transition-transform"
          />
        </Link>
        <div className="flex items-center gap-3 p-3 bg-brand-navy rounded-2xl shadow-xl shadow-brand-navy/20">
          <div className="h-8 w-8 rounded-lg bg-brand-gold flex items-center justify-center">
            <Zap className="h-4 w-4 text-brand-navy fill-current" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tighter uppercase leading-none text-white">Command Center</h2>
            <p className="text-[8px] font-bold text-white/40 tracking-[0.2em] uppercase">V2.4 Protocol</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto custom-scrollbar">
        {menuItems.map((group) => (
          <div key={group.group} className="space-y-2">
            <p className="px-3 text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-50">{group.group}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 group relative",
                      isActive 
                        ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/10" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", !isActive && item.color)} />
                    {item.label}
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active-v2"
                        className="absolute left-0 w-1 h-4 bg-brand-gold rounded-r-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-border/50 bg-muted/20">
        <div className="flex items-center gap-3 p-2">
          <div className="h-8 w-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-black text-[10px] border border-brand-gold/20">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black truncate">ADMINISTRATOR</p>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              <p className="text-[8px] font-bold text-muted-foreground uppercase">Authorized Session</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors group">
            <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
