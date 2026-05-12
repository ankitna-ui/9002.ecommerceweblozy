"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ShoppingCart, Moon, Sun, Menu, X, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/Badge";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "bg-background/70 backdrop-blur-2xl border-b py-2" : "bg-transparent py-4"
      )}>
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <Link href="/" className="group relative z-10">
              <img 
                src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
                alt="Pietro Fiorentini DB" 
                className="h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-brand-gold/0 group-hover:bg-brand-gold/5 rounded-2xl transition-all -z-10" />
            </Link>

            <nav className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300",
                    pathname === link.href ? "text-brand-gold" : "text-foreground/70 group-hover:text-foreground"
                  )}>
                    {link.name}
                  </span>
                  {pathname === link.href && (
                    <motion.div 
                      layoutId="nav-underline" 
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                    />
                  )}
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-full border">
               <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-8 w-8 hover:bg-background shadow-none">
                 <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                 <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               </Button>
               <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full h-8 w-8 hover:bg-background shadow-none" 
                onClick={() => setIsCartOpen(true)}
               >
                 <ShoppingCart className="h-4 w-4" />
                 <AnimatePresence>
                   {itemCount > 0 && (
                     <motion.span 
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       exit={{ scale: 0 }}
                       className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-navy text-[8px] font-black text-white ring-2 ring-background"
                     >
                       {itemCount}
                     </motion.span>
                   )}
                 </AnimatePresence>
               </Button>
            </div>
            
            <div className="hidden md:flex gap-2">
              {isAuthenticated ? (
                <Link href="/admin">
                  <Button className="bg-brand-navy text-white rounded-full px-6 font-black uppercase tracking-widest text-[10px] h-10 gap-2 shadow-xl shadow-brand-navy/20 border-none">
                    <User className="h-3.5 w-3.5" /> Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-foreground text-background rounded-full px-8 font-black uppercase tracking-widest text-[10px] h-10 hover:bg-brand-gold hover:text-brand-navy transition-all border-none">
                    Portal Access
                  </Button>
                </Link>
              )}
            </div>

            <Button
              className="lg:hidden rounded-full h-10 w-10 p-0"
              variant="outline"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b bg-background/95 backdrop-blur-3xl lg:hidden overflow-hidden"
            >
              <div className="container py-8 flex flex-col gap-6 px-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-black uppercase tracking-widest flex items-center justify-between group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    <ArrowRight className="h-5 w-5 text-brand-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-brand-navy text-white rounded-2xl py-6 font-black uppercase tracking-widest text-xs">
                      Sign In to Portal
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
