'use client';

import Hero from '@/sections/Hero';
import StatsStrip from '@/sections/StatsStrip';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';
import Contact from '@/sections/Contact';
import Link from 'next/link';

function PageFooter() {
  return (
    <footer className="bg-bg-landing border-t border-beige px-8 md:px-20 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-[10px] text-warm-gray font-dm">
          <a href="mailto:ojas.v.kulkarni@gmail.com" className="hover:text-orange transition-colors">
            ojas.v.kulkarni@gmail.com
          </a>
          <span>&middot;</span>
          <a href="https://github.com/ojasra0kulkarni" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
            GitHub
          </a>
          <span>&middot;</span>
          <a href="https://linkedin.com/in/ojaskulkarni18" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
            LinkedIn
          </a>
          <span>&middot;</span>
          <a href="/Ojas_Kulkarni_CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
            Resume
          </a>
        </div>
        <div className="flex items-center gap-8 text-[10px] text-warm-gray font-dm">
          <span>Built with Next.js.</span>
          <span>2025</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-bg-landing">
      <Hero />
      <StatsStrip />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <PageFooter />
    </main>
  );
}
