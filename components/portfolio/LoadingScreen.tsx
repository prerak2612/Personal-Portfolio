"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  const lines = [
    { prefix: "✓", text: "Loading experience..." },
    { prefix: "✓", text: "Preparing projects..." },
    { prefix: "✓", text: "Rendering portfolio..." },
    { prefix: ">", text: "Finalizing..." },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center bg-[#030303] px-8 md:px-28"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ delay: 2.1, duration: 0.75, ease: "easeOut" }}
    >
      <div className="terminal-loader relative w-full max-w-2xl font-mono text-lg leading-loose text-white md:text-2xl">
        {lines.map((line, index) => (
          <motion.div
            key={line.text}
            className="flex gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: index === lines.length - 1 ? 1 : 0.28, y: 0 }}
            transition={{ delay: 0.22 + index * 0.34, duration: 0.45 }}
          >
            <span className={index === lines.length - 1 ? "text-white" : "text-white/50"}>{line.prefix}</span>
            <span>{line.text}</span>
            {index === lines.length - 1 ? <span className="terminal-cursor" /> : null}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
