import AnimatedSection from '@/components/AnimatedSection';

const stats = [
  { label: 'B.Tech CSE', value: 'LPU', metric: 'CGPA 8.02' },
  { label: 'AI SDE Intern', value: 'Exemach International', metric: '95-98%' },
  { label: 'Researcher', value: 'SPI Framework', metric: null },
  { label: 'Co-Founder', value: 'E.O.T.G.', metric: null },
];

export default function StatsStrip() {
  return (
    <AnimatedSection>
      <div className="w-full bg-surface border-t border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`py-8 px-6 md:px-8 text-center ${i < stats.length - 1 ? 'md:border-r border-border' : ''} ${i < 2 ? 'border-b md:border-b-0 border-border' : ''}`}>
              <p className="text-muted text-[11px] tracking-[0.2em] uppercase mb-2">{stat.label}</p>
              <p className="font-heading text-primary-text text-lg md:text-xl">{stat.value}</p>
              {stat.metric && <p className="font-jetbrains text-accent text-sm mt-1">{stat.metric}</p>}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
