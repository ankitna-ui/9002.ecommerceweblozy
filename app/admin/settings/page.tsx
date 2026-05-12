"use client";

import React from "react";
import { SettingsPanel } from "@/components/admin/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure your store identity, localization, and operational parameters.</p>
      </div>
      <SettingsPanel />
    </div>
  );
}
