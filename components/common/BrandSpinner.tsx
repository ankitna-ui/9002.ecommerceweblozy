"use client";

import { motion } from "framer-motion";

export const BrandSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }[size];

  return (
    <div className={`relative ${dimensions}`}>
      <motion.div
        className="absolute inset-0 bg-[#069782]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full p-2"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M260 160V400"
          stroke="white"
          strokeWidth="32"
          strokeLinecap="square"
        />
        <path
          d="M260 160H360"
          stroke="white"
          strokeWidth="32"
          strokeLinecap="square"
        />
        <path
          d="M260 270H340"
          stroke="white"
          strokeWidth="32"
          strokeLinecap="square"
        />
        <path
          d="M260 160H180V270H260"
          stroke="white"
          strokeWidth="32"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};
