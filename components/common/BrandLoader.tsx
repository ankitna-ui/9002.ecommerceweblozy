"use client";

import { motion } from "framer-motion";

export const BrandLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Pulsing Aura */}
        <motion.div
          className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Favicon Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
          className="relative z-10"
        >
          <img 
            src="/favicon.ico" 
            alt="Loading" 
            className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(199,168,47,0.4)]"
          />
          
          {/* Scanning Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-gold/30 to-transparent h-1/2 w-full -top-full"
            animate={{ top: ["100%", "-100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
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
