import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Bell, Shield, CreditCard, Globe, Database } from "lucide-react";

export function SettingsPanel() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar-like Nav */}
      <div className="md:col-span-1 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-navy text-white font-medium text-left">
          <Settings className="h-4 w-4" /> General Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground font-medium text-left transition-colors">
          <Bell className="h-4 w-4" /> Notifications
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground font-medium text-left transition-colors">
          <Shield className="h-4 w-4" /> Security
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground font-medium text-left transition-colors">
          <CreditCard className="h-4 w-4" /> Payments
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground font-medium text-left transition-colors">
          <Database className="h-4 w-4" /> Backup & Data
        </button>
      </div>

      {/* Main Form */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Configuration</CardTitle>
            <CardDescription>Manage your e-commerce platform identity and global variables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Store Name</label>
                <input 
                  type="text" 
                  defaultValue="Pietro Fiorentini DB" 
                  className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@fiorentinidb.com" 
                  className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Currency</label>
                <select className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-gold outline-none transition-all">
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tax Rate (%)</label>
                <input 
                  type="number" 
                  defaultValue="22" 
                  className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Timezone</label>
                <select className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-gold outline-none transition-all">
                  <option value="UTC+1">Europe/Rome (UTC+1)</option>
                  <option value="UTC+5:30">Asia/Kolkata (UTC+5:30)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Danger Zone
            </CardTitle>
            <CardDescription>Actions that cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">Take the store offline for updates.</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors">
                Enable
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
