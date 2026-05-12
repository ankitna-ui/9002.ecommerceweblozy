"use client";

import { motion } from "framer-motion";

export const BrandLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative w-24 h-24">
        {/* Animated Background Square */}
        <motion.div
          className="absolute inset-0 bg-[#069782]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: 1,
            borderRadius: ["20%", "0%", "0%"]
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* SVG Logo Animation */}
        <svg
          className="absolute inset-0 w-full h-full p-4"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M260 160V400"
            stroke="white"
            strokeWidth="32"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.path
            d="M260 160H360"
            stroke="white"
            strokeWidth="32"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.path
            d="M260 270H340"
            stroke="white"
            strokeWidth="32"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.path
            d="M260 160H180V270H260"
            stroke="white"
            strokeWidth="32"
            strokeLinejoin="miter"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />
        </svg>
      </div>

      {/* Loading Text */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-foreground/60">
          Pietro Fiorentini
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#069782]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
