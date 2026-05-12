import Link from "next/link";
import { Linkedin, Youtube, Twitter, Facebook, ArrowUpRight, Globe, ShieldCheck, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A1A2F] text-white pt-40 pb-20 border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/5 rounded-full blur-[300px] -mr-[500px] -mt-[500px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#069782]/10 rounded-full blur-[200px] -ml-[300px] -mb-[300px]" />

      <div className="container px-10 relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          {/* Brand & Vision */}
          <div className="lg:col-span-5 space-y-16">
            <Link href="/" className="inline-block group">
              <img 
                src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
                alt="Pietro Fiorentini DB" 
                className="h-24 w-auto brightness-0 invert opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            </Link>
            
            <p className="text-blue-100/50 text-2xl font-medium leading-[1.6] max-w-xl border-l-4 border-brand-gold/40 pl-10 italic">
              "Pioneering technological solutions for the global energy system. An Italian legacy leading the transition towards a sustainable, carbon-neutral future."
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                { icon: <Linkedin className="h-7 w-7" />, href: "https://www.linkedin.com/company/pietro-fiorentini-s-p-a-/", label: "LinkedIn" },
                { icon: <Youtube className="h-7 w-7" />, href: "https://www.youtube.com/user/PietroFiorentiniSpa", label: "YouTube" },
                { icon: <Twitter className="h-7 w-7" />, href: "#", label: "Twitter" },
                { icon: <Facebook className="h-7 w-7" />, href: "#", label: "Facebook" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-16 w-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-500 hover:-translate-y-3 group shadow-2xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                title: "Organization", 
                links: [
                  { name: "Global Home", href: "/" },
                  { name: "Divisions", href: "/solutions" },
                  { name: "Market Insights", href: "/resources" },
                  { name: "ESG Strategy", href: "#" },
                  { name: "Careers", href: "#" }
                ] 
              },
              { 
                title: "Industrial Assets", 
                links: [
                  { name: "Pressure Control", href: "/shop?category=pressure-regulators" },
                  { name: "Measurement", href: "/shop?category=gas-meters" },
                  { name: "Safety Systems", href: "/shop?category=safety-valves" },
                  { name: "H2 Infrastructure", href: "/shop?category=hydrogen-systems" },
                  { name: "Digital Solutions", href: "#" }
                ] 
              },
              { 
                title: "Governance", 
                links: [
                  { name: "Privacy Protocol", href: "#" },
                  { name: "Terms of Access", href: "#" },
                  { name: "Data Ethics", href: "#" },
                  { name: "Certifications", href: "#" },
                  { name: "Global Contact", href: "#" }
                ] 
              }
            ].map((section) => (
              <div key={section.title} className="space-y-12">
                <h4 className="text-[13px] font-black uppercase tracking-[0.5em] text-brand-gold flex items-center gap-4">
                  <div className="w-8 h-px bg-brand-gold/30" />
                  {section.title}
                </h4>
                <ul className="space-y-6">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-blue-100/40 hover:text-brand-gold transition-all text-[14px] font-black uppercase tracking-[0.2em] flex items-center gap-3 group"
                      >
                        <span className="w-0 group-hover:w-4 h-px bg-brand-gold transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Institutional Footer */}
        <div className="pt-20 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-12">
          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="flex items-center gap-4 group cursor-help">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-100/30">Headquarters: Italy</span>
            </div>
            
            <div className="flex items-center gap-4 group cursor-help">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-100/30">Certified Enterprise</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-100/40">Status: Master Node Active</span>
            </div>
          </div>

          <div className="flex flex-col items-center xl:items-end gap-3">
            <p className="text-blue-100/30 text-[11px] font-black uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} Pietro Fiorentini S.p.A. <span className="text-brand-gold/40 mx-4">|</span> All Institutional Rights Reserved.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/10">
              <Zap className="h-3 w-3" /> Built with Next.js 16 & Advanced Neural UI Framework
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
