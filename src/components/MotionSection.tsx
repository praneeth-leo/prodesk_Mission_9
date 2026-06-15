"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

type MotionSectionProps = {
  children: React.ReactNode;
} & HTMLMotionProps<"section">;

export default function MotionSection({ children, className, ...props }: MotionSectionProps) {
  return (
    <motion.section
      {...props}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
