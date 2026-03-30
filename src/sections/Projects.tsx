'use client';

import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import { motion } from 'framer-motion';

const projects = [
  { title: 'Video Restoration with Deep Learning', date: 'March 2025', desc: 'Deep-learning system for blurred/noisy video restoration using attention-based architecture. ~85% PSNR improvement. Frame interpolation + resolution scaling, ~30% clarity boost over baseline.', stack: ['Python', 'PyTorch', 'NumPy', 'OpenCV'], github: '#' },
  { title: 'AI Fashion Wardrobe', date: 'April 2025', desc: 'AI wardrobe assistant with YOLOv8 + Roboflow pipeline. ~90% accuracy in clothing-type and color classification. Real-time outfit recommendation engine.', stack: ['Python', 'YOLOv8', 'Flask', 'PyTorch', 'OpenCV', 'JavaScript'], github: '#' },
  { title: 'Multi-VM System Context Chatbot', date: 'July 2025', desc: 'Centralized chatbot aggregating logs from multiple VMs. Unified AI-assisted monitoring for cybersecurity training with live attack-defense simulation guidance.', stack: ['Python', 'FastAPI', 'Linux VMs', 'JSON Log Parsing'], github: '#' },
];

export default function Projects() {
  return (
    <section id="work" className="bg-bg-landing">
      <SectionLabel>Selected Work</SectionLabel>
      <div className="section-padding max-w-5xl mx-auto">
        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }} className="bg-card border border-border group transition-all duration-150 hover:bg-accent/10 hover:border-accent/30 text-center">
              <div className="p-8 md:p-10 flex flex-col items-center justify-center">
                <div className="mb-6">
                  <h3 className="font-heading text-primary-text text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors duration-150">{project.title}</h3>
                  <p className="text-muted text-[11px] tracking-[0.1em] uppercase">{project.date}</p>
                </div>
                <div className="max-w-2xl mx-auto">
                  <p className="text-secondary text-[15px] leading-relaxed mb-6">{project.desc}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {project.stack.map((s) => <span key={s} className="text-[11px] text-muted border border-border px-3 py-1 group-hover:text-accent-light group-hover:border-accent/30 transition-colors duration-150">{s}</span>)}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-secondary group-hover:text-accent transition-colors duration-150">GitHub <span className="text-accent">&rarr;</span></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
