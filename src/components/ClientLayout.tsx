'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as any },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as any },
  },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </SmoothScroll>
    </div>
  );
}
