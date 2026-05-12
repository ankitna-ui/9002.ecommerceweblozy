"use client";

import React, { useEffect, useState } from "react";

interface StatsCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function StatsCounter({ end, suffix = "", prefix = "", duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="tabular-nums font-bold">
      {prefix}{count}{suffix}
    </span>
  );
}
