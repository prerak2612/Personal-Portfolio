"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 450, damping: 35 });
  const y = useSpring(cursorY, { stiffness: 450, damping: 35 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setVisible(true);
      cursorX.set(event.clientX - 14);
      cursorY.set(event.clientY - 14);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-7 w-7 rounded-full border border-cyan-200/70 mix-blend-difference md:block"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    />
  );
}
