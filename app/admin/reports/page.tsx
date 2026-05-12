"use client";

import React from "react";
import { 
  FileBarChart, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  PieChart as PieChartIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  const reports = [
    { name: "Monthly Sales Manifest", type: "PDF", size: "2.4 MB", date: "May 12, 2026", status: "Generated" },
    { name: "Inventory Audit Q2", type: "XLSX", size: "1.1 MB", date: "May 10, 2026", status: "In Progress" },
    { name: "Customer Behavioral Analysis", type: "PDF", size: "4.8 MB", date: "May 08, 2026", status: "Generated" },
    { name: "Global Supply Chain Ledger", type: "CSV", size: "12.2 MB", date: "May 05, 2026", status: "Archived" },
  ];

  return (
    <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-gold">
            <FileBarChart className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Documentation Module</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Strategic <span className="text-brand-gold">Reports</span></h1>
        </div>
        <Button className="h-16 px-10 rounded-2xl bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-all font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-brand-navy/20">
          <FileText className="h-4 w-4" /> Initialize New Compilation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02] overflow-hidden">
            <div className="p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="FILTER ARCHIVES..." className="w-full pl-12 pr-4 h-12 rounded-xl bg-muted/30 border-none font-bold text-[10px] uppercase tracking-widest" />
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
                  <Filter className="h-4 w-4" /> Advanced Sort
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/20">
                    <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Document Name</th>
                    <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Format</th>
                    <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Size</th>
                    <th className="px-8 py-5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                    <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {reports.map((report, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${report.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {report.type === 'PDF' ? <FileText className="h-4 w-4" /> : <FileSpreadsheet className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-tight">{report.name}</p>
                            <p className="text-[9px] text-muted-foreground font-bold">{report.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[10px] font-black text-muted-foreground">{report.type}</td>
                      <td className="px-8 py-6 text-[10px] font-black text-muted-foreground">{report.size}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           {report.status === 'Generated' ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : report.status === 'In Progress' ? <Clock className="h-3 w-3 text-amber-500" /> : <AlertCircle className="h-3 w-3 text-muted-foreground" />}
                           <span className={`text-[9px] font-black uppercase tracking-widest ${report.status === 'Generated' ? 'text-emerald-500' : report.status === 'In Progress' ? 'text-amber-500' : 'text-muted-foreground'}`}>{report.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-3 rounded-xl bg-muted group-hover:bg-brand-navy group-hover:text-white transition-all shadow-sm">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <section className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-border/50 shadow-2xl shadow-black/[0.02]">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Data Synthesis</h3>
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-border/50 rounded-[2rem]">
                 <PieChartIcon className="h-16 w-16 text-muted-foreground/20 mb-4" />
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Interactive Visualization <br/>Engine Initializing...</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest">Financial Accuracy</span>
                  <span className="text-[10px] font-black text-emerald-500">100% Verified</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/30">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 relative z-10">Compliance Status</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] font-black uppercase tracking-widest">GDPR COMPLIANT</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] font-black uppercase tracking-widest">ISO 27001 SECURED</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] font-black uppercase tracking-widest">SOC2 AUDITED</p>
              </div>
            </div>
            <Download className="absolute -right-8 -bottom-8 h-40 w-40 text-white/5" />
          </section>
        </div>
      </div>
    </div>
  );
}
