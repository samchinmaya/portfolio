"use client";

import { motion, MotionConfig } from "motion/react";

const STAGGER = 0.04;
const MAX_DELAY = 0.4;

interface BoxRevealProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

// Fades a box in and lifts it into place the first time it scrolls into view.
// Visitors who prefer reduced motion get the fade without the movement.
const BoxReveal = ({ children, className, index = 0 }: BoxRevealProps) => (
  <MotionConfig reducedMotion="user">
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index * STAGGER, MAX_DELAY),
        duration: 0.35,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  </MotionConfig>
);

export default BoxReveal;
