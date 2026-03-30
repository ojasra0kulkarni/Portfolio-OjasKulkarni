import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function Experience() {
  return (
    <section className="bg-bg-landing">
      <SectionLabel>Experience</SectionLabel>
      <div className="section-padding max-w-4xl mx-auto">
        <AnimatedSection delay={0.1}>
          <div className="glass-card relative transition-all duration-150 group hover:bg-accent/10 hover:border-accent/30 text-center">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent hidden md:block" />
            <div className="p-8 md:p-10 flex flex-col items-center justify-center">
              <div className="mb-8">
                <h3 className="font-heading text-primary-text text-2xl mb-2 group-hover:text-accent transition-colors duration-150">AI SDE Intern</h3>
                <p className="text-secondary text-sm mb-1">Exemach International (OPC) Pvt. Ltd.</p>
                <p className="text-muted text-[11px] tracking-[0.1em]">September 2025 &mdash; November 2025</p>
              </div>
              <div className="max-w-2xl mx-auto">
                <ul className="space-y-3 text-secondary text-[15px] leading-relaxed mb-8">
                  <li>Real-time surveillance AI: 95&ndash;98% detection accuracy, 40&ndash;60ms inference latency, stable across 10+ lighting conditions.</li>
                  <li>Spoof-proof RGB + IR 3D facial recognition pipeline with &gt;99% anti-spoof reliability.</li>
                </ul>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Python', 'PyTorch', 'OpenCV', 'IR Depth Mapping', 'Scikit-Learn'].map((t) => (
                    <span key={t} className="text-[11px] text-muted border border-border px-3 py-1 group-hover:text-accent-light group-hover:border-accent/30 transition-colors duration-150">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
