import React from "react";
import { FileText, Download, BookOpen, Shield, Video, HelpCircle } from "lucide-react";

const resourceCategories = [
  {
    title: "Technical Documentation",
    icon: <FileText className="h-6 w-6 text-brand-gold" />,
    items: [
      { name: "Gas Regulators Catalog 2024", size: "12.4 MB", type: "PDF" },
      { name: "Smart Metering System Manual", size: "8.1 MB", type: "PDF" },
      { name: "Installation Guide: Norval Series", size: "4.2 MB", type: "PDF" },
      { name: "Filtering & Pre-heating Specs", size: "3.7 MB", type: "PDF" }
    ]
  },
  {
    title: "Case Studies",
    icon: <BookOpen className="h-6 w-6 text-brand-gold" />,
    items: [
      { name: "Hydrogen Blending in UK Networks", size: "2.1 MB", type: "PDF" },
      { name: "Smart City Implementation - Milan", size: "5.4 MB", type: "PDF" },
      { name: "Offshore Platform Modernization", size: "3.9 MB", type: "PDF" }
    ]
  },
  {
    title: "Certifications",
    icon: <Shield className="h-6 w-6 text-brand-gold" />,
    items: [
      { name: "ISO 9001:2015 Certificate", size: "1.2 MB", type: "PDF" },
      { name: "Environmental ISO 14001", size: "1.1 MB", type: "PDF" },
      { name: "Hydrogen Compatibility Report", size: "2.8 MB", type: "PDF" }
    ]
  },
  {
    title: "Video Tutorials",
    icon: <Video className="h-6 w-6 text-brand-gold" />,
    items: [
      { name: "Maintenance of Pilot Regulators", size: "45:12", type: "VIDEO" },
      { name: "Setting up NB-IoT Gas Meters", size: "12:30", type: "VIDEO" },
      { name: "Safety Valve Calibration", size: "28:45", type: "VIDEO" }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative bg-brand-navy py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2021/04/bg-company-2.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent"></div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 text-white">
            Technical <span className="text-brand-gold">Resources</span>
          </h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Access catalogs, technical manuals, case studies, and certifications to help 
            you make the most of Pietro Fiorentini technologies.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {resourceCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="p-2 rounded-lg bg-brand-navy/5 text-brand-gold">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy dark:text-white">
                    {category.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, iIndex) => (
                    <div 
                      key={iIndex}
                      className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground group-hover:text-brand-gold">
                          <Download className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            {item.type} • {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Support Section */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest">
                Support Hub
              </div>
              <h2 className="text-3xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
              <p className="text-slate-300 text-lg">
                Our support team and technical documentation library are constantly growing. 
                If you need a specific manual or CAD drawing, please reach out to us.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-brand-gold text-brand-navy px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                  Contact Support
                </button>
                <button className="border border-white/20 hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" /> Help Center
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <FileText className="h-10 w-10 text-brand-gold mb-4" />
                <p className="font-bold text-sm">CAD Library</p>
              </div>
              <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <Shield className="h-10 w-10 text-brand-gold mb-4" />
                <p className="font-bold text-sm">Approvals</p>
              </div>
              <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <BookOpen className="h-10 w-10 text-brand-gold mb-4" />
                <p className="font-bold text-sm">Academy</p>
              </div>
              <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <Video className="h-10 w-10 text-brand-gold mb-4" />
                <p className="font-bold text-sm">Webinars</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
