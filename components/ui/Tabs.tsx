"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
}>({
  value: "",
  onChange: () => {},
});

export function Tabs({ defaultValue, className, children, onValueChange }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value, onChange: handleValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: selectedValue, onChange } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
        isSelected ? "text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
        className
      )}
    >
      {isSelected && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 bg-background rounded-sm z-0"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (selectedValue !== value) return null;

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}
