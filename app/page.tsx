"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe, Award, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatsCounter } from "@/components/common/StatsCounter";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setFeaturedProducts(data.products.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#0A1A2F] pt-20">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2024/01/Slide-3.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/90 via-[#0A1A2F]/60 to-[#0A1A2F]" />
        
        {/* Animated Background Element */}
        <div className="absolute top-1/4 -right-20 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#069782]/15 rounded-full blur-[150px]" />

        <div className="container relative z-10 px-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-6xl"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge className="px-6 py-2 rounded-full bg-brand-gold/15 text-brand-gold text-[11px] font-black uppercase tracking-[0.5em] border border-brand-gold/40 backdrop-blur-3xl shadow-2xl">
                Global Energy Benchmark
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white mb-10"
            >
              Mastering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold to-white/80 drop-shadow-2xl">Evolution</span> <br/>
              of Energy
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100/70 max-w-3xl font-medium leading-relaxed mb-16 border-l-4 border-brand-gold/60 pl-10"
            >
              Engineering sustainable solutions for the global energy transition. 
              Hydrogen-ready infrastructure and intelligent gas management systems designed for the next century.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8">
              <Link href="/shop">
                <Button className="h-20 px-16 text-xs font-black uppercase tracking-[0.3em] bg-brand-gold text-brand-navy rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_25px_60px_rgba(199,168,47,0.4)] group">
                  Access Inventory
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="h-20 px-16 text-xs font-black uppercase tracking-[0.3em] rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-2xl hover:border-white/50 transition-all">
                  Our Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/50 vertical-text">Explore System</span>
          <div className="w-px h-24 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent" />
        </motion.div>
      </section>

      {/* Corporate Ledger Stats */}
      <section className="bg-white dark:bg-black py-20 border-b relative">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Engineering Legacy", value: 80, suffix: "+" },
              { label: "Global Workforce", value: 2800, suffix: "+" },
              { label: "Strategic Markets", value: 100, suffix: "+" },
              { label: "H2 Readiness", value: 100, suffix: "%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2 text-center md:text-left"
              >
                <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-navy dark:text-brand-gold">
                  <StatsCounter end={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-48 container px-10 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-32 max-w-4xl mx-auto space-y-8">
          <Badge variant="outline" className="border-brand-gold/50 text-brand-gold uppercase tracking-[0.6em] font-black text-[11px] px-10 py-3.5 rounded-full bg-brand-gold/10 shadow-2xl backdrop-blur-md">
            Division Mastery
          </Badge>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-brand-navy dark:text-white">
            Technological <br/><span className="text-brand-gold">Superiority</span>
          </h2>
          <div className="w-40 h-2 bg-brand-gold/30 rounded-full" />
          <p className="text-muted-foreground font-medium text-2xl max-w-2xl leading-relaxed opacity-70 italic">
            "Engineering the global energy transition through precision, innovation, and unwavering sustainability."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/shop?category=${cat.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[700px] overflow-hidden rounded-[4rem] bg-brand-navy transition-all duration-1000 hover:shadow-[0_60px_100px_rgba(26,62,96,0.2)]"
              >
                {/* Background Image Overlay (Using high-quality industrial placeholders) */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/0 via-brand-navy/40 to-brand-navy group-hover:via-brand-navy/60 transition-all duration-1000" />
                
                <div className="absolute inset-0 p-20 flex flex-col justify-end z-10">
                  <motion.div 
                    className="h-24 w-24 rounded-[2rem] bg-brand-gold text-brand-navy shadow-2xl flex items-center justify-center mb-12 group-hover:rotate-[360deg] transition-all duration-1000"
                  >
                    {i % 2 === 0 ? <Zap className="h-12 w-12 fill-current" /> : <Globe className="h-12 w-12" />}
                  </motion.div>
                  <div className="space-y-10">
                    <h3 className="text-5xl font-black tracking-tighter uppercase text-white leading-[0.9] group-hover:text-brand-gold transition-colors duration-500">{cat.name}</h3>
                    <p className="text-blue-100/60 font-medium text-lg leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 transition-all duration-700">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-8 text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-y-16 group-hover:translate-y-0 duration-700 delay-200">
                      <span className="text-[12px] font-black uppercase tracking-[0.5em]">Explore Division</span>
                      <div className="flex-1 h-px bg-brand-gold/50" />
                      <div className="h-14 w-14 rounded-full border-2 border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:border-brand-gold transition-all duration-500">
                        <ChevronRight className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Visual Glow */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-gold/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Hardware */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
            <div className="text-center md:text-left">
              <Badge className="bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy font-black text-[10px] uppercase tracking-widest mb-4">The Selection</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Industrial <span className="text-brand-gold">Assets</span></h2>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-full h-14 px-10 font-black uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all border-2">
                Full Systems Catalog <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[500px] bg-muted animate-pulse rounded-[2.5rem]"></div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* H2 Vision Section */}
      <section className="relative py-40 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2024/01/Slide-2-mappa-mondo-Fiorentini-DB_1536x.803.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-transparent" />
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Badge className="bg-brand-gold text-brand-navy font-black text-[10px] uppercase tracking-[0.3em]">Vision 2050</Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">Hydrogen <br/><span className="text-brand-gold">Frontier</span></h2>
            <p className="text-lg text-blue-100/70 leading-relaxed font-medium">
              We are leading the decarbonization race with 100% Hydrogen-certified solutions. From high-pressure regulators to precision blending systems, we are engineering a greener tomorrow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 "H2 Blending Expertise",
                 "Certified Asset Performance",
                 "Sustainable Engineering",
                 "Digital Infrastructure"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                   <span className="text-sm font-black uppercase tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
            <Link href="/solutions">
              <Button className="h-16 px-10 bg-brand-gold text-brand-navy rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
                The Hydrogen Roadmap
              </Button>
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
             <div className="absolute inset-0 bg-brand-gold/20 blur-[120px] rounded-full" />
             <img 
               src="https://fiorentinidb.com/wp-content/uploads/2024/02/flowatch-3i.png" 
               alt="Innovation" 
               className="relative z-10 w-full drop-shadow-[0_0_50px_rgba(199,168,47,0.3)] animate-float"
             />
          </motion.div>
        </div>
      </section>

      {/* Global Ledger / Partners */}
      <section className="py-24 border-b overflow-hidden">
        <div className="container">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground text-center mb-16">Integrated with World Class Entities</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
             {['SNAM', 'Eni', 'Baker Hughes', 'Siemens', 'TotalEnergies'].map((name, i) => (
               <span key={i} className="text-3xl font-black uppercase tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0">
                 {name}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* Corporate Bulletin */}
      <section className="py-40 bg-background px-6">
        <div className="container max-w-6xl">
          <div className="relative glass-card rounded-[4rem] p-16 md:p-24 text-center overflow-hidden border-none shadow-[0_50px_100px_rgba(0,0,0,0.08)]">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-gold via-brand-gold/50 to-brand-gold" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl" />
            
            <Award className="h-20 w-20 text-brand-gold mx-auto mb-12" />
            <div className="space-y-6 mb-16">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Engineering <br/><span className="text-brand-gold">Bulletin</span></h2>
              <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Join our elite technical circle. Receive master-level briefings on energy innovation, infrastructure safety, and digital industrial protocols.
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-5 max-w-3xl mx-auto" onSubmit={(e) => e.preventDefault()}>
               <div className="relative flex-1">
                 <input 
                   type="email" 
                   placeholder="Corporate Identity / Email" 
                   className="w-full h-20 rounded-full px-12 bg-muted/50 border-2 border-transparent focus:border-brand-gold/50 focus:bg-background outline-none font-bold transition-all text-sm placeholder:text-muted-foreground/50 placeholder:uppercase placeholder:tracking-widest"
                 />
               </div>
               <Button className="h-20 px-16 rounded-full bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy font-black uppercase tracking-[0.3em] hover:scale-105 transition-all text-xs shadow-2xl shadow-brand-navy/20">
                 Join Protocol
               </Button>
            </form>
          </div>
        </div>
      </section>
    </div>

  );
}
