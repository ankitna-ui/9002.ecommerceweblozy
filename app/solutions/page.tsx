import React from "react";
import { Cpu, Zap, Droplets, Gauge, ShieldCheck, Factory } from "lucide-react";

const solutions = [
  {
    title: "Gas Distribution",
    description: "End-to-end solutions for natural gas distribution networks, including pressure regulation, filtering, and measurement systems.",
    icon: <Zap className="h-10 w-10 text-brand-gold" />,
    features: ["Pressure Control", "District Regulators", "Smart Grid Solutions"]
  },
  {
    title: "Gas Transmission",
    description: "High-pressure transmission systems for long-distance gas transport with maximum safety and reliability.",
    icon: <Factory className="h-10 w-10 text-brand-gold" />,
    features: ["Gas Metering Stations", "Flow Control Valves", "Scraper Traps"]
  },
  {
    title: "Hydrogen Ready",
    description: "Innovative systems designed for hydrogen-natural gas blends and 100% hydrogen applications to support decarbonization.",
    icon: <Droplets className="h-10 w-10 text-brand-gold" />,
    features: ["H2 Blending Systems", "Hydrogen Analyzers", "Specialized Regulators"]
  },
  {
    title: "Smart Metering",
    description: "Next-generation smart gas meters and data management systems for remote monitoring and billing automation.",
    icon: <Gauge className="h-10 w-10 text-brand-gold" />,
    features: ["Remote Data Reading", "NB-IoT Connectivity", "Electronic Correctors"]
  },
  {
    title: "Oil & Gas Production",
    description: "Upstream solutions for extraction and primary treatment processes, ensuring operational excellence in harsh environments.",
    icon: <Cpu className="h-10 w-10 text-brand-gold" />,
    features: ["Multiphase Flow Meters", "Production Chokes", "Manifold Systems"]
  },
  {
    title: "Safety & Control",
    description: "Comprehensive safety devices and control systems to protect critical infrastructure and personnel.",
    icon: <ShieldCheck className="h-10 w-10 text-brand-gold" />,
    features: ["Slam-shut Valves", "Relief Valves", "Automation & SCADA"]
  }
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-brand-navy py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2023/10/services.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent"></div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Our <span className="text-brand-gold">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 leading-relaxed font-medium">
              Pietro Fiorentini provides high-tech solutions for the entire natural gas supply chain, 
              from production and transmission to distribution and end-use.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/themes/fiorentini/public/images/homepage/texture.png')] opacity-5"></div>
        <div className="container relative z-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="group p-10 rounded-[2rem] border bg-card hover:border-brand-gold/50 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500"
              >
                <div className="mb-8 p-4 rounded-2xl bg-brand-navy/5 group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-500 w-fit">
                  {solution.icon}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
                  {solution.description}
                </p>
                <ul className="space-y-4">
                  {solution.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
                      <div className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2024/01/Slide-2-mappa-mondo-Fiorentini-DB_1536x.803.png')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto mb-12 text-xl font-medium">
            Our engineering team is ready to help you design and implement the perfect 
            solution for your specific operational challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-brand-gold text-brand-navy px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-gold/20">
              Contact Sales Engineering
            </button>
            <button className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
              Download Full Catalog
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
