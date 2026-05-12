"use client";

import React from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Terminal, 
  ShieldCheck, 
  AlertCircle, 
  Lock, 
  Globe, 
  Cpu,
  Trash2,
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LogsPage() {
  const logs = [
    { id: 1, event: "Auth Success", user: "ADMIN-01", location: "IP: 192.168.1.45", time: "2 mins ago", severity: "Low", module: "AUTH" },
    { id: 2, event: "Inventory Wipe", user: "SYSTEM", location: "CRON_JOB", time: "14 mins ago", severity: "High", module: "LOGISTICS" },
    { id: 3, event: "API Secret Rotated", user: "ADMIN-01", location: "Terminal", time: "1 hour ago", severity: "Medium", module: "SECURITY" },
    { id: 4, event: "Bulk Export Init", user: "ADMIN-02", location: "Region: EU", time: "3 hours ago", severity: "Low", module: "REPORTS" },
    { id: 5, event: "Unauthorized Access Blocked", user: "GUEST", location: "IP: 45.2.14.88", time: "5 hours ago", severity: "Critical", module: "FIREWALL" },
  ];

  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Audit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Audit <span className="text-brand-gold">Ledger</span></h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] gap-2">
            <RefreshCcw className="h-4 w-4" /> Refresh Stream
          </Button>
          <Button className="h-14 px-8 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 transition-all font-black uppercase tracking-widest text-[10px] gap-2">
            <Trash2 className="h-4 w-4" /> Clear All Logs
          </Button>
        </div>
      </div>

      <div className="bg-brand-navy rounded-[3rem] p-10 text-white shadow-2xl shadow-brand-navy/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-brand-gold" />
            </div>
            <div>
              <p className="text-xl font-black uppercase tracking-tighter">System Integrity: 100%</p>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Global security protocols active</p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Threats Blocked</p>
              <p className="text-2xl font-black">1,482</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Active Sessions</p>
              <p className="text-2xl font-black">24</p>
            </div>
          </div>
        </div>
        <Lock className="absolute -right-8 -bottom-8 h-40 w-40 text-white/5" />
      </div>

      <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02] overflow-hidden">
        <div className="p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 bg-muted/10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="FILTER SYSTEM LOGS..." className="w-full pl-12 pr-4 h-12 rounded-xl bg-white dark:bg-white/5 border-none font-bold text-[10px] uppercase tracking-widest" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
              <Filter className="h-4 w-4" /> Filter By Severity
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Timestamp</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Module</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Event Description</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Initiator</th>
                <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Severity</th>
                <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase">{log.time}</td>
                  <td className="px-8 py-6">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-muted rounded-md border border-border/50">{log.module}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-black uppercase tracking-tight">{log.event}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-[8px] font-black text-brand-navy">ID</div>
                      <span className="text-[10px] font-bold text-muted-foreground">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        log.severity === 'Critical' ? 'bg-rose-600 animate-pulse' : 
                        log.severity === 'High' ? 'bg-rose-500' : 
                        log.severity === 'Medium' ? 'bg-amber-500' : 
                        'bg-emerald-500'
                      }`}></div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        log.severity === 'Critical' || log.severity === 'High' ? 'text-rose-500' : 
                        log.severity === 'Medium' ? 'text-amber-500' : 
                        'text-emerald-500'
                      }`}>{log.severity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-[9px] font-mono text-muted-foreground">{log.location}</span>
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
