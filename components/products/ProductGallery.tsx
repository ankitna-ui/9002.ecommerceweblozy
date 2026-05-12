"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted border">
        <Image
          src={activeImage}
          alt={productName}
          fill
          className="object-cover transition-all duration-500 hover:scale-110 cursor-zoom-in"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition-all",
              activeImage === img ? "border-brand-gold ring-2 ring-brand-gold ring-offset-2 ring-offset-background" : "border-transparent hover:border-brand-gold/50"
            )}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
