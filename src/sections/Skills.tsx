'use client';

import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import { motion } from 'framer-motion';

const languages = ['Python', 'C++', 'Django', 'PyTorch', 'Scikit-Learn', 'Next.js', 'FastAPI', 'Flask', 'OpenCV', 'YOLOv8'];
const tools = ['Kaggle', 'GitHub', 'Linux VMs', 'Roboflow', 'BitsAndBytes', 'Groq API', 'IR Depth Mapping'];

function Tag({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }} className="inline-block bg-card border border-border text-secondary px-4 py-2 text-sm transition-all duration-150 hover:bg-accent hover:text-cream hover:border-accent">
      {label}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <section className="bg-bg-landing">
      <SectionLabel>Technical Arsenal</SectionLabel>
      <div className="section-padding max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-primary-text heading-sub mb-12 text-center">Languages, Frameworks & Tools</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <AnimatedSection><p className="text-muted text-[11px] tracking-[0.15em] uppercase mb-6 text-center">Languages & Frameworks</p></AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3">{languages.map((l, i) => <Tag key={l} label={l} delay={i * 0.04} />)}</div>
          </div>
          <div>
            <AnimatedSection><p className="text-muted text-[11px] tracking-[0.15em] uppercase mb-6 text-center">Tools & Platforms</p></AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3">{tools.map((t, i) => <Tag key={t} label={t} delay={i * 0.04} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
