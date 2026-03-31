'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'E.O.T.G.', href: '/eotg' },
  { label: 'Perfumery', href: '/perfumery' },
  { label: 'Contact', href: '/#contact' },
  { label: 'CV', href: '/Ojas_Kulkarni_CV.pdf' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/#contact') return false;
    return pathname === href;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] h-14 flex items-center justify-between px-8 md:px-20 transition-all duration-300 ${scrolled ? 'bg-midnight/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="hidden md:flex items-center justify-start gap-8 flex-1">
          {NAV_LINKS.map((link) => {
            const isExternal = link.href.endsWith('.pdf');
            return (
              <a
                key={link.href}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 group font-heading ${isActive(link.href) ? 'text-accent' : 'text-secondary hover:text-primary-text'}`}
              >
                {link.label}
                {isActive(link.href) ? (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-accent" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                ) : (
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </div>
        <Link href="/" className="font-heading text-primary-text text-sm tracking-[0.2em] uppercase ml-auto">Ojas Kulkarni</Link>
        {mounted && (
          <button
            ref={toggleRef}
            onClick={(e) => {
              const btn = toggleRef.current;
              const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
              if (!btn || !(document as any).startViewTransition) {
                setTheme(nextTheme);
                return;
              }
              const rect = btn.getBoundingClientRect();
              const x = rect.left + rect.width / 2;
              const y = rect.top + rect.height / 2;
              const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
              );
              const root = document.documentElement;
              root.style.setProperty('--ripple-x', `${x}px`);
              root.style.setProperty('--ripple-y', `${y}px`);
              root.style.setProperty('--ripple-r', `${endRadius}px`);
              root.setAttribute('data-ripple-theme', nextTheme);
              (document as any).startViewTransition(() => {
                setTheme(nextTheme);
              });
            }}
            className="relative flex items-center justify-center w-8 h-8 ml-4 md:ml-6 text-primary-text hover:text-accent transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        )}
        <button className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 ml-4" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <motion.span animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-primary-text" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-primary-text" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-primary-text" />
        </button>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[999] bg-midnight flex flex-col items-center justify-center gap-10">
            {NAV_LINKS.map((link, i) => {
              const isExternal = link.href.endsWith('.pdf');
              return (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <a
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`font-heading text-3xl tracking-wider ${isActive(link.href) ? 'text-accent' : 'text-primary-text'}`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
