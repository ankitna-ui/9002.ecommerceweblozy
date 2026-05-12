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
        scrolled ? "bg-background/80 backdrop-blur-2xl border-b py-3" : "bg-transparent py-6"
      )}>
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-16">
            <Link href="/" className="group relative z-10 block">
              <img 
                src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
                alt="Pietro Fiorentini DB" 
                className={cn(
                  "h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105",
                  !scrolled && !isAdminPage && !isLoginPage ? "brightness-0 invert" : ""
                )}
              />
              <div className="absolute -inset-3 bg-brand-gold/0 group-hover:bg-brand-gold/5 rounded-2xl transition-all -z-10" />
            </Link>

            <nav className="hidden lg:flex gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                >
                  <span className={cn(
                    "text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                    pathname === link.href 
                      ? "text-brand-gold" 
                      : scrolled || isAdminPage || isLoginPage ? "text-foreground/60 group-hover:text-foreground" : "text-white/60 group-hover:text-white"
                  )}>
                    {link.name}
                  </span>
                  {pathname === link.href && (
                    <motion.div 
                      layoutId="nav-underline" 
                      className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(199,168,47,0.5)]"
                    />
                  )}
                  <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 p-1 bg-muted/30 backdrop-blur-xl rounded-full border border-border/50">
               <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-9 w-9 hover:bg-background shadow-none transition-all">
                 <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                 <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               </Button>
               <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full h-9 w-9 hover:bg-background shadow-none transition-all" 
                onClick={() => setIsCartOpen(true)}
               >
                 <ShoppingCart className="h-4.5 w-4.5" />
                 <AnimatePresence>
                   {itemCount > 0 && (
                     <motion.span 
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       exit={{ scale: 0 }}
                       className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-gold text-[9px] font-black text-brand-navy ring-2 ring-background"
                     >
                       {itemCount}
                     </motion.span>
                   )}
                 </AnimatePresence>
               </Button>
            </div>
            
            <div className="hidden md:flex gap-3">
              {isAuthenticated ? (
                <Link href="/admin">
                  <Button className="bg-brand-navy text-white rounded-full px-8 font-black uppercase tracking-[0.2em] text-[10px] h-12 gap-3 shadow-xl shadow-brand-navy/20 border-none hover:scale-105 transition-all">
                    <User className="h-4 w-4" /> Management Portal
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className={cn(
                    "rounded-full px-10 font-black uppercase tracking-[0.2em] text-[10px] h-12 transition-all border-none shadow-2xl",
                    scrolled || isAdminPage || isLoginPage 
                      ? "bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy" 
                      : "bg-white text-brand-navy hover:bg-brand-gold"
                  )}>
                    Access System
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
