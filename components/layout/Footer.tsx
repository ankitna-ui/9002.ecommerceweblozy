import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#0A1A2F] text-white pt-32 pb-20 overflow-hidden border-t border-white/5">
      {/* Decorative Background */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-navy/50 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-12 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <Link href="/" className="inline-block group">
              <img 
                src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
                alt="Pietro Fiorentini DB" 
                className="h-14 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <p className="text-blue-100/60 text-lg leading-relaxed font-medium max-w-md border-l-2 border-brand-gold/30 pl-8">
              Pioneering technological solutions for the global energy system. 
              An Italian legacy leading the transition towards a sustainable, carbon-neutral future.
            </p>
            <div className="flex gap-6 pt-4">
              {[
                { name: 'LinkedIn', icon: 'https://fiorentinidb.com/wp-content/uploads/2020/11/linkedin-gray.svg', url: 'https://www.linkedin.com/company/pietro-fiorentini-s-p-a-/' },
                { name: 'YouTube', icon: 'https://fiorentinidb.com/wp-content/uploads/2021/04/YT-icon-1.svg', url: 'https://www.youtube.com/user/PietroFiorentiniSpa' }
              ].map((social) => (
                <Link key={social.name} href={social.url} target="_blank" className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all group">
                  <img src={social.icon} alt={social.name} className="h-5 w-5 brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link href="/solutions" className="hover:text-brand-gold transition-colors">Solutions</Link></li>
              <li><Link href="/resources" className="hover:text-brand-gold transition-colors">Resources</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop?category=pressure-regulators" className="hover:text-brand-gold transition-colors">Pressure Regulators</Link></li>
              <li><Link href="/shop?category=gas-meters" className="hover:text-brand-gold transition-colors">Gas Meters</Link></li>
              <li><Link href="/shop?category=safety-valves" className="hover:text-brand-gold transition-colors">Safety Valves</Link></li>
              <li><Link href="/shop?category=hydrogen-systems" className="hover:text-brand-gold transition-colors">Hydrogen Systems</Link></li>
              <li><Link href="/shop?category=filters-strainers" className="hover:text-brand-gold transition-colors">Filters & Strainers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors">ISO Certifications</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Pietro Fiorentini S.p.A. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with Next.js & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
