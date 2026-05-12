import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="space-y-6">
            <img 
              src="https://fiorentinidb.com/wp-content/uploads/2023/04/cropped-LOGO-Fio-India_CMYK_COLOR-1.png" 
              alt="Pietro Fiorentini DB" 
              className="h-12 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0"
            />
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Technological solutions for the multi-gas system. An Italian success story leading the global energy transition with innovation and sustainability.
            </p>
            <div className="flex space-x-6 pt-2">
              <Link href="https://www.linkedin.com/company/pietro-fiorentini-s-p-a-/" target="_blank" className="hover:opacity-80 transition-opacity">
                <img src="https://fiorentinidb.com/wp-content/uploads/2020/11/linkedin-gray.svg" alt="LinkedIn" className="h-6 w-6 dark:brightness-200" />
              </Link>
              <Link href="https://www.youtube.com/user/PietroFiorentiniSpa" target="_blank" className="hover:opacity-80 transition-opacity">
                <img src="https://fiorentinidb.com/wp-content/uploads/2021/04/YT-icon-1.svg" alt="YouTube" className="h-6 w-6 dark:brightness-200" />
              </Link>
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
