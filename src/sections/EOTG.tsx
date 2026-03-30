'use client';

import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import SectionFooter from '@/components/SectionFooter';
import { motion } from 'framer-motion';

const steps = [
  { num: 'I', title: 'BOOK', desc: 'Submit your brief.' },
  { num: 'II', title: 'WE DEPLOY', desc: 'An engineer arrives. Scoped. Executed.' },
  { num: 'III', title: 'LIVE. SAME DAY.', desc: 'Built, deployed, handed over.' },
];

const services = [
  { name: 'AI Integrations', desc: 'RAG systems and automated pipelines for institutional knowledge retrieval and workflow.' },
  { name: 'Educational Systems', desc: 'Curriculum delivery, performance tracking, and administration in one framework.' },
  { name: 'Custom Dashboards', desc: 'Administrative panels rendering complex analytics into clear, actionable data views.' },
  { name: 'NGO Digital Presence', desc: 'High-reliability deployments, donation routing, and digital enablement for ethical non-profits.' },
  { name: 'Event & Analytics', desc: 'Scalable backend event handling with integrated real-time structured telemetry.' },
  { name: 'Custom Portfolios', desc: 'Precision-engineered personal portfolio systems. Lightning-fast. Flawlessly designed.' },
];

export default function EOTG() {
  return (
    <div className="bg-bg-eotg min-h-screen pt-14">
      <SectionLabel>Venture</SectionLabel>
      <div className="section-padding flex flex-col items-center text-center mx-auto">
        <AnimatedSection delay={0.1}>
          <h2 className="font-heading text-primary-text heading-section leading-[0.95] mb-2">Engineer on the Go</h2>
          <p className="font-jetbrains text-muted text-lg tracking-wider mb-8">E.O.T.G.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="font-heading text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center mb-10">&ldquo;Agile engineering systems for modern institutions. We work the way UrbanClap does — but for your technology stack. Book us, we deploy an engineer, your solution is built and live the same day.&rdquo;</p>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <a href="https://eotg-website.onrender.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-cream px-12 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-accent-light mb-16 font-heading glow">Visit E.O.T.G. &rarr;</a>
        </AnimatedSection>
      </div>

      <div className="bg-surface border-t border-b border-border">
        <div className="px-8 md:px-20 py-4"><p className="text-muted text-[10px] tracking-[0.3em] uppercase">The Model</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }} className={`py-10 px-8 md:px-10 text-center ${i < steps.length - 1 ? 'md:border-r border-border' : ''} ${i < 2 ? 'border-b md:border-b-0 border-border' : ''}`}>
              <p className="font-jetbrains text-muted text-[11px] mb-3">{step.num}.</p>
              <h3 className="font-heading text-primary-text text-xl mb-3">{step.title}</h3>
              <p className="text-secondary text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="px-8 md:px-20 py-4"><p className="text-muted text-[11px] italic">For larger builds, the project escalates from rapid deployment engineers to senior programmers seamlessly.</p></div>
      </div>

      <SectionLabel>Core Services</SectionLabel>
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((service, i) => (
            <motion.div key={service.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }} className="py-6 border-b border-border md:flex gap-8 transition-all duration-150 group hover:bg-accent/10 hover:px-6">
              <h3 className="font-heading text-primary-text text-lg md:text-xl md:w-1/3 mb-2 md:mb-0 group-hover:text-accent transition-colors duration-150">{service.name}</h3>
              <p className="text-secondary text-[15px] leading-relaxed md:w-2/3">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-surface border-t border-b border-border px-8 md:px-20 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-secondary">
            <span>contact@eotg.in</span><span className="hidden md:inline text-muted">&middot;</span><span>Base: India</span>
          </div>
          <a href="https://eotg-website.onrender.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-cream px-8 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-accent-light font-heading glow">Start A Project &rarr;</a>
        </div>
      </div>
      <SectionFooter />
    </div>
  );
}
