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
      <section className="relative h-[95vh] flex items-center overflow-hidden bg-brand-navy pt-20">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2024/01/Slide-3.jpg')] bg-cover bg-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(199,168,47,0.15),transparent_50%)]" />
        
        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] border border-brand-gold/20 backdrop-blur-md">
                Industry Leader Since 1940
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white"
            >
              The Master <br/>
              <span className="text-brand-gold drop-shadow-2xl">Evolution</span> <br/>
              of Energy
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed"
            >
              Pioneering technological solutions for the global energy transition. Engineering the future with Hydrogen-ready infrastructure and intelligent gas systems.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5 pt-4">
              <Link href="/shop">
                <Button className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] bg-brand-gold text-brand-navy rounded-full hover:scale-105 transition-all shadow-2xl shadow-brand-gold/20">
                  Access Inventory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="h-16 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-full border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                  Explore Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-px h-12 bg-white" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Scroll</span>
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

      {/* Expertise & Categories */}
      <section className="py-32 bg-muted/20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl space-y-4">
              <Badge variant="outline" className="border-brand-gold text-brand-gold uppercase tracking-[0.3em] font-black text-[10px]">Division Expertise</Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">Technological <br/><span className="text-brand-gold">Superiority</span></h2>
            </div>
            <p className="max-w-md text-muted-foreground font-medium text-base border-l-2 border-brand-gold pl-6 py-2">
              Our engineering prowess spans across the entire natural gas and hydrogen value chain, ensuring high-performance results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/shop?category=${cat.name}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-[450px] overflow-hidden rounded-[2.5rem] bg-card border hover:border-brand-gold transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-navy/90 group-hover:to-brand-navy transition-all duration-700" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                    <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-500">
                      {i % 2 === 0 ? <Zap className="h-8 w-8" /> : <Globe className="h-8 w-8" />}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter uppercase mb-4 text-white">{cat.name}</h3>
                      <p className="text-blue-100/60 font-medium line-clamp-3 group-hover:text-white transition-colors text-sm">{cat.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                        <span className="text-[10px] font-black uppercase tracking-widest">Explore Category</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-all duration-700" />
                </motion.div>
              </Link>
            ))}
          </div>
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

      {/* Corporate Communications */}
      <section className="py-32 bg-muted/10">
        <div className="container max-w-5xl">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold" />
            <Award className="h-16 w-16 text-brand-gold mx-auto" />
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Engineering <br/>Bulletin</h2>
              <p className="text-muted-foreground text-lg font-medium max-w-xl mx-auto">Subscribe to our technical briefing for insights on energy innovation and product releases.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-6" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Enter Corporate Email" 
                 className="flex-1 h-16 rounded-full px-8 bg-background border-2 border-border focus:border-brand-gold outline-none font-bold transition-all"
               />
               <Button className="h-16 px-10 rounded-full bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy font-black uppercase tracking-widest hover:scale-105 transition-all">
                 Join Protocol
               </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
