import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

const timeline = [
  { period: '2023 – Present', institution: 'Lovely Professional University, Phagwara', degree: 'B.Tech — Computer Science & Engineering', result: 'CGPA: 8.02' },
  { period: '2021 – 2023', institution: 'Narayana Junior College, Hyderabad', degree: 'Intermediate', result: '89%' },
  { period: '2016 – 2021', institution: 'Narayana Olympiad School, Hyderabad', degree: 'Matriculation', result: '95%' },
];

const certifications = [
  'Computer Communications Specialization — University of Colorado (Coursera) — Nov 2024',
  'Software Engineering: Implementation & Testing — HKUST — Apr 2024',
];

export default function Education() {
  return (
    <section className="bg-bg-landing">
      <SectionLabel>Education</SectionLabel>
      <div className="section-padding">
        <div className="max-w-4xl mx-auto space-y-8">
          {timeline.map((item, i) => (
            <AnimatedSection key={item.period} delay={i * 0.1}>
              <div className="glass-card p-6 md:p-8 text-center flex flex-col items-center justify-center transition-all duration-150 group hover:bg-accent/10 hover:border-accent/30">
                <p className="text-accent text-sm font-jetbrains mb-3">{item.period}</p>
                <h3 className="font-heading text-primary-text text-lg mb-1">{item.institution}</h3>
                <p className="text-secondary text-sm mb-1">{item.degree}</p>
                <p className="text-muted text-sm">{item.result}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.3}>
          <div className="mt-12 max-w-3xl mx-auto space-y-3 text-center">
            {certifications.map((cert) => <p key={cert} className="text-secondary text-[13px] leading-relaxed bg-surface/50 py-3 border border-border/50">{cert}</p>)}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
