'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'left' }}
        className="section-label-band"
      >
        {children}
      </motion.div>
    </div>
  );
}
