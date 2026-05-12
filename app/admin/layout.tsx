"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated && mounted) {
      router.push("/login");
    }
  }, [isAuthenticated, router, mounted]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-muted/10">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
