"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Toaster } from "sonner";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const hideNav = isAdminPage || isLoginPage;

  return (
    <>
      {!hideNav && <Navbar />}
      <PageTransition>
        <main className="flex-1">
          {children}
        </main>
      </PageTransition>
      {!hideNav && <Footer />}
      <Toaster position="bottom-right" />
    </>
  );
}
