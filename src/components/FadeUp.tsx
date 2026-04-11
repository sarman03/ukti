"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Vertical offset (px) the element starts from. Default 40. */
  distance?: number;
}

/**
 * Wraps any content and fades it up from below when it enters the viewport.
 * Uses framer-motion's `whileInView` so it works reliably even inside sticky
 * stacked sections.
 *
 * Usage:
 *   <FadeUp className="text-center">
 *     <h2 className="text-4xl">Title</h2>
 *   </FadeUp>
 */
export default function FadeUp({
  delay = 0,
  distance = 40,
  children,
  ...rest
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
