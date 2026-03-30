'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] as any },
  }),
};

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const heroImage = mounted && resolvedTheme === 'light'
    ? '/images/1000090957.jpg'
    : '/images/1000091984.jpg';

  return (
    <section id="hero" className="min-h-screen flex flex-col lg:flex-row relative bg-bg-landing">
      <div className="w-full lg:w-[58%] flex flex-col items-center justify-center text-center section-padding pt-32 lg:pt-0">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-secondary text-[11px] tracking-[0.35em] uppercase mb-8">
          Portfolio — 2025
        </motion.p>
        <h1 className="font-heading leading-[0.92] mb-6">
          <motion.span custom={0} variants={wordVariants} initial="hidden" animate="visible" className="block heading-hero text-primary-text">OJAS</motion.span>
          <motion.span custom={1} variants={wordVariants} initial="hidden" animate="visible" className="block heading-hero text-accent">KULKARNI</motion.span>
        </h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.7, ease: [0.76, 0, 0.24, 1] as any }} className="h-px bg-accent origin-center w-full max-w-sm mb-6 mx-auto" />
        <motion.p initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} transition={{ duration: 0.5, delay: 0.9, ease: [0.76, 0, 0.24, 1] as any }} className="font-heading text-accent-light text-xl md:text-[22px] mb-6">
          &ldquo;I like Maths, Tech, and Perfumery&rdquo;
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }} className="text-secondary text-[16px] leading-[1.7] max-w-lg mb-8 mx-auto">
          B.Tech CSE student at LPU. AI/ML engineer, researcher, and startup co-founder. I build systems that think, scale, and occasionally smell good.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }} className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a href="#work" className="inline-block bg-accent text-cream px-8 py-3 text-[11px] tracking-[0.15em] uppercase transition-all duration-200 hover:bg-accent-light font-heading glow">View My Work</a>
          <a href="#contact" className="inline-block border border-border text-primary-text px-8 py-3 text-[11px] tracking-[0.15em] uppercase transition-all duration-200 hover:bg-accent hover:border-accent hover:text-cream font-heading">Get In Touch</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className="flex items-center justify-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/ojasra0kulkarni' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/ojaskulkarni18' },
            { label: 'Email', href: 'mailto:ojas.v.kulkarni@gmail.com' },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted text-[12px] tracking-[0.15em] uppercase hover:text-accent transition-colors duration-200 relative group">
              {s.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </div>
      {/* Right — Hero Image (theme-aware) */}
      <div className="hidden lg:block w-[42%] bg-surface pt-[80px] pb-12 px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] as any }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            key={heroImage}
            src={heroImage}
            alt="Ojas Kulkarni"
            className="w-full h-full object-contain transition-opacity duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
