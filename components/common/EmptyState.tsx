"use client";

import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
}

export function EmptyState({ title, description, actionLabel, onAction, href }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-dashed rounded-xl bg-muted/20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      </div>
      {actionLabel && (
        <div className="pt-4">
          {href ? (
            <Link href={href}>
              <Button variant="gold">{actionLabel}</Button>
            </Link>
          ) : (
            <Button variant="gold" onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}
