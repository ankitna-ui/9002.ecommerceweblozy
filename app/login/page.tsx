"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("admin@fiorentini.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.token, data.user);
        toast.success("Identity Verified. Access Granted.");
        router.push("/admin");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Security handshake failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Brand Side - Visual Context */}
      <div className="relative hidden lg:flex md:w-1/2 lg:w-[55%] bg-brand-navy items-center justify-center p-12 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/uploads/2020/11/bg-company.jpg')] bg-cover bg-center opacity-25 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/80 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/themes/fiorentini/public/images/homepage/texture.png')] opacity-10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg"
        >
          <div className="space-y-8">
            <div className="h-14 w-14 rounded-2xl bg-brand-gold flex items-center justify-center shadow-2xl shadow-brand-gold/40">
              <ShieldCheck className="h-7 w-7 text-brand-navy" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                Integrated <br/>
                <span className="text-brand-gold">Administrative</span> <br/>
                Network
              </h1>
              <p className="text-base text-blue-100/60 font-medium leading-relaxed max-w-sm">
                Propelling the energy transition through digital intelligence and synchronized resource management.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1">Status</p>
                <p className="text-white font-bold text-sm">System Online</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1">Nodes</p>
                <p className="text-white font-bold text-sm">Global Sync Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative mask for transition to login card area */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Login Card Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-muted/5 relative">
        <div className="absolute inset-0 bg-[url('https://fiorentinidb.com/wp-content/themes/fiorentini/public/images/homepage/texture.png')] opacity-5 pointer-events-none lg:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-gold transition-colors mb-6 group ml-2">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Exit to Core</span>
          </Link>

          <div className="bg-card rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
            
            <div className="flex flex-col items-center text-center mb-10 space-y-4">
              <img 
                src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
                alt="Logo" 
                className="h-8 w-auto mb-2"
              />
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Portal Access</h2>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mt-1">Identity Verification</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand-gold transition-colors" />
                  <Input 
                    type="email" 
                    required 
                    placeholder="IDENTIFIER"
                    className="pl-12 h-14 bg-muted/20 border-border/50 focus:border-brand-gold transition-all rounded-2xl font-bold uppercase tracking-widest text-[10px]" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand-gold transition-colors" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="ACCESS TOKEN"
                    className="pl-12 pr-12 h-14 bg-muted/20 border-border/50 focus:border-brand-gold transition-all rounded-2xl font-bold uppercase tracking-widest text-[10px]" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-brand-navy/10 transition-all border-none" 
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Authorize Access"}
              </Button>
              
              <div className="pt-6 border-t border-border/50">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] text-center mb-2">Protocol Credentials</p>
                <div className="flex justify-between items-center px-4 py-2 bg-muted/30 rounded-xl border border-border/50">
                  <span className="text-[10px] font-bold text-muted-foreground">admin@fiorentini.com</span>
                  <span className="text-[10px] font-bold text-muted-foreground">admin123</span>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
