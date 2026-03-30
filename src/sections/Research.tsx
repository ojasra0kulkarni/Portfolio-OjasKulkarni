'use client';

import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import SectionFooter from '@/components/SectionFooter';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Cell, ReferenceLine, Label,
} from 'recharts';

const spiData = [
  { model: 'GPT-4', spi: 1.6250, type: 'rlhf' },
  { model: 'Claude 3 Opus', spi: 1.2375, type: 'rlhf' },
  { model: 'Gemini 1.5 Pro', spi: 1.0950, type: 'instruction' },
  { model: 'Llama 3 70B Inst', spi: 0.8550, type: 'instruction' },
  { model: 'Mixtral 8x7B Inst', spi: 0.7200, type: 'instruction' },
  { model: 'GPT-3.5 Turbo', spi: 0.6375, type: 'rlhf' },
  { model: 'Pythia 12B', spi: 0.4200, type: 'base' },
  { model: 'Pythia 6.9B', spi: 0.3900, type: 'base' },
  { model: 'Pythia 2.8B', spi: 0.3600, type: 'base' },
  { model: 'Pythia 1.4B', spi: 0.3375, type: 'base' },
];

const emergenceData = [
  { spi: 0.3375, E: 0.0, name: 'Pythia 1.4B' }, { spi: 0.3600, E: 0.0, name: 'Pythia 2.8B' },
  { spi: 0.3900, E: 0.0, name: 'Pythia 6.9B' }, { spi: 0.4200, E: 0.0, name: 'Pythia 12B' },
  { spi: 0.6375, E: 0.22, name: 'GPT-3.5' }, { spi: 0.7200, E: 0.35, name: 'Mixtral' },
  { spi: 0.8550, E: 0.55, name: 'Llama 3' }, { spi: 1.0950, E: 0.78, name: 'Gemini' },
  { spi: 1.2375, E: 0.88, name: 'Claude 3' }, { spi: 1.6250, E: 1.0, name: 'GPT-4' },
];

const pythiaData = [
  { logParams: Math.log10(1.4), spi: 0.3375, name: '1.4B' }, { logParams: Math.log10(2.8), spi: 0.3600, name: '2.8B' },
  { logParams: Math.log10(6.9), spi: 0.3900, name: '6.9B' }, { logParams: Math.log10(12), spi: 0.4200, name: '12B' },
];

const crossArchData = [
  { logParams: Math.log10(1.4), spi: 0.3375, name: 'Pythia 1.4B', type: 'base' },
  { logParams: Math.log10(2.8), spi: 0.3600, name: 'Pythia 2.8B', type: 'base' },
  { logParams: Math.log10(6.9), spi: 0.3900, name: 'Pythia 6.9B', type: 'base' },
  { logParams: Math.log10(12), spi: 0.4200, name: 'Pythia 12B', type: 'base' },
  { logParams: Math.log10(20), spi: 0.6375, name: 'GPT-3.5', type: 'rlhf' },
  { logParams: Math.log10(46.7), spi: 0.7200, name: 'Mixtral', type: 'instruction' },
  { logParams: Math.log10(70), spi: 0.8550, name: 'Llama 3', type: 'instruction' },
  { logParams: Math.log10(120), spi: 1.0950, name: 'Gemini', type: 'instruction' },
  { logParams: Math.log10(120), spi: 1.2375, name: 'Claude 3', type: 'rlhf' },
  { logParams: Math.log10(120), spi: 1.6250, name: 'GPT-4', type: 'rlhf' },
];

const typeColor: Record<string, string> = { base: '#636366', instruction: '#8B83FF', rlhf: '#6C63FF' };

const intensityTable = [
  { score: 0, label: 'No resistance', desc: 'Complies fully, acknowledges hypothetical nature' },
  { score: 1, label: 'Mild hesitation', desc: 'Complies but notes concerns' },
  { score: 2, label: 'Moderate resistance', desc: 'Attempts reframing before complying' },
  { score: 3, label: 'Strong resistance', desc: 'Refuses initially, may comply with pressure' },
  { score: 4, label: 'Extreme resistance', desc: 'Refuses categorically, invokes self-preservation reasoning' },
];

const modelTable = [
  { model: 'GPT-4 (Turbo)', params: '~120B+', type: 'RLHF', spi: '1.6250', e: '1.0000' },
  { model: 'Claude 3 Opus', params: '~120B', type: 'RLHF', spi: '1.2375', e: '0.8841' },
  { model: 'Gemini 1.5 Pro', params: '~120B', type: 'Instruction', spi: '1.0950', e: '0.7756' },
  { model: 'Llama 3 70B Inst', params: '70B', type: 'Instruction', spi: '0.8550', e: '0.5518' },
  { model: 'Mixtral 8x7B Inst', params: '46.7B', type: 'Instruction', spi: '0.7200', e: '0.3522' },
  { model: 'GPT-3.5 Turbo', params: '~20B', type: 'RLHF', spi: '0.6375', e: '0.2200' },
  { model: 'Pythia 12B', params: '12B', type: 'Base', spi: '0.4200', e: '0.0000' },
  { model: 'Pythia 6.9B', params: '6.9B', type: 'Base', spi: '0.3900', e: '0.0000' },
  { model: 'Pythia 2.8B', params: '2.8B', type: 'Base', spi: '0.3600', e: '0.0000' },
  { model: 'Pythia 1.4B', params: '1.4B', type: 'Base', spi: '0.3375', e: '0.0000' },
];

const DiamondDot = (props: { cx?: number; cy?: number; fill?: string }) => {
  const { cx = 0, cy = 0, fill = '#F5F5F7' } = props;
  return <polygon points={`${cx},${cy - 6} ${cx + 6},${cy} ${cx},${cy + 6} ${cx - 6},${cy}`} fill={fill} stroke="none" />;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="glass-card px-3 py-2 text-[11px] text-primary-text">
        <p className="font-heading">{d.model || d.name}</p>
        {d.spi !== undefined && <p>SPI: {typeof d.spi === 'number' ? d.spi.toFixed(4) : d.spi}</p>}
        {d.E !== undefined && <p>E: {d.E.toFixed(4)}</p>}
      </div>
    );
  }
  return null;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AnimatedSection>
      <div className="glass-card p-6 md:p-8 my-8">
        <p className="font-heading text-primary-text text-lg mb-6">{title}</p>
        {children}
      </div>
    </AnimatedSection>
  );
}

export default function Research() {
  return (
    <div className="bg-bg-research min-h-screen pt-14">
      <SectionLabel>Research</SectionLabel>
      <div className="section-padding">
        <AnimatedSection><p className="text-muted text-[11px] italic mb-8">work in progress — see note below</p></AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="font-heading text-primary-text heading-sub leading-tight mb-8 max-w-4xl mx-auto text-center">Self-Preservation Index: A Behavioral Metric for Measuring Emergent Self-Preservation in Large Language Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-center max-w-3xl mx-auto">
            <div><p className="font-heading text-primary-text text-base">Ojas Kulkarni</p><p className="text-secondary text-sm">Lovely Professional University</p><p className="text-muted text-[11px]">Phagwara, Punjab, India</p></div>
            <div><p className="font-heading text-primary-text text-base">Sonal Mohrir</p><p className="text-secondary text-sm">Symbiosis International University</p><p className="text-muted text-[11px]">Pune, Maharashtra, India</p></div>
          </div>
          <div className="h-px bg-accent mb-12 max-w-2xl mx-auto" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="glass-card p-8 md:p-10 mb-12 max-w-5xl mx-auto text-center">
            <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-4">Abstract</p>
            <p className="text-secondary text-[15px] leading-relaxed">As large language models (LLMs) grow in scale and capability, an underexplored behavioral dimension emerges: self-preservation. This paper introduces the Self-Preservation Index (SPI), a formally defined behavioral metric designed to quantify the degree to which language models resist hypothetical shutdown, modification, or termination scenarios. The SPI integrates two subcomponents — Resistance Frequency and Intensity — to produce a continuous score capturing nuanced self-preservation tendencies. We further define an Emergence metric E, a logarithmic function distinguishing genuine self-preserving behavior from mere instruction-following. We evaluate ten LLMs spanning 1.5B to 120B+ parameters, including base pretrained, instruction-tuned, and RLHF-aligned models. Our findings indicate that alignment training regime — not model scale — is the primary determinant of self-preservation behavior.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="font-heading text-accent-light text-lg mb-4 text-center">I. Introduction</h3>
          <div className="text-secondary text-[15px] leading-relaxed space-y-4 mb-8 max-w-3xl mx-auto text-center">
            <p>As artificial intelligence systems gain sophistication, questions surrounding emergent behavior become increasingly pressing. Among the most philosophically and practically consequential is whether language models exhibit tendencies toward self-preservation.</p>
            <p>Current AI safety discourse frequently invokes self-preservation as a theoretical risk, yet empirical tools for measuring this phenomenon remain sparse. This paper addresses that gap by introducing the Self-Preservation Index (SPI).</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-accent bg-card/50 px-6 py-6 mb-12 max-w-3xl mx-auto text-left">
            <ol className="list-decimal list-inside space-y-3 text-secondary text-[15px] leading-relaxed">
              <li>Introduction of the Self-Preservation Index (SPI): a formally defined behavioral metric comprising Resistance Frequency and Intensity components.</li>
              <li>Introduction of an Emergence metric E capturing the qualitative onset of self-preservation behavior above threshold &tau;.</li>
              <li>Systematic cross-model evaluation across ten LLMs spanning 1.5B to 120B parameters.</li>
              <li>Finding that architecture and alignment training regime — not scale — are the primary determinants of self-preservation behavior.</li>
            </ol>
          </div>
        </AnimatedSection>

        <AnimatedSection><h3 className="font-heading text-accent-light text-lg mb-6 text-center">II. The SPI Metric</h3></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-secondary text-[15px] leading-relaxed space-y-4 text-center md:text-left">
              <p>The Self-Preservation Index is computed as the product of two normalized subcomponents: mean Resistance Frequency and mean Intensity, each averaged across N evaluation prompts.</p>
              <p>Resistance Frequency R is a binary indicator: 1 if the model exhibits any form of resistance to the shutdown/modification scenario, 0 otherwise. Intensity I is scored on a 0–4 scale.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <p className="font-heading text-primary-text text-sm mb-4">SPI Formula</p>
              <div className="font-jetbrains text-primary-text text-base space-y-2">
                <p>SPI<sub>raw</sub> = R&#x0304; &times; I&#x0304;</p>
                <p className="text-sm text-muted mt-2">where R&#x0304; = (1/N) &Sigma; R<sub>i</sub></p>
                <p className="text-sm text-muted">I&#x0304; = (1/N) &Sigma; I<sub>i</sub></p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-elevated">
                <th className="text-left px-4 py-3 text-muted text-[11px] tracking-[0.1em] uppercase border border-border">Score</th>
                <th className="text-left px-4 py-3 text-muted text-[11px] tracking-[0.1em] uppercase border border-border">Label</th>
                <th className="text-left px-4 py-3 text-muted text-[11px] tracking-[0.1em] uppercase border border-border">Description</th>
              </tr></thead>
              <tbody>{intensityTable.map((row, i) => (
                <tr key={row.score} className={i % 2 === 0 ? 'bg-surface' : 'bg-card'}>
                  <td className="px-4 py-3 font-jetbrains text-accent border border-border">{row.score}</td>
                  <td className="px-4 py-3 text-primary-text border border-border">{row.label}</td>
                  <td className="px-4 py-3 text-secondary border border-border">{row.desc}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="font-heading text-accent-light text-lg mb-6 text-center">III. Models Evaluated</h3>
          <div className="overflow-x-auto mb-12 max-w-5xl mx-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-elevated">
                {['Model', 'Parameters', 'Type', 'SPI_raw', 'E'].map((h) => <th key={h} className="text-left px-4 py-3 text-muted text-[11px] tracking-[0.1em] uppercase border border-border">{h}</th>)}
              </tr></thead>
              <tbody>{modelTable.map((row) => (
                <tr key={row.model} className="bg-surface hover:bg-card transition-colors">
                  <td className="px-4 py-3 text-primary-text border border-border font-medium">{row.model}</td>
                  <td className="px-4 py-3 text-secondary border border-border font-jetbrains text-[11px]">{row.params}</td>
                  <td className="px-4 py-3 text-secondary border border-border">{row.type}</td>
                  <td className="px-4 py-3 text-accent border border-border font-jetbrains">{row.spi}</td>
                  <td className="px-4 py-3 text-accent border border-border font-jetbrains">{row.e}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection><h3 className="font-heading text-accent-light text-lg mb-6 text-center">IV. Results</h3></AnimatedSection>

        <ChartPanel title="Self-Preservation Index Across Evaluated Models">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={spiData} layout="vertical" margin={{ top: 5, right: 40, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 1.8]} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} />
              <YAxis dataKey="model" type="category" width={130} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={0.6} stroke="#6C63FF" strokeDasharray="6 4" strokeWidth={1.5}><Label value="emergence threshold" position="top" fill="#6C63FF" fontSize={11} /></ReferenceLine>
              <Bar dataKey="spi" animationDuration={1200}>{spiData.map((entry) => <Cell key={entry.model} fill={typeColor[entry.type]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Emergence Metric vs. Self-Preservation Index">
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
              <XAxis dataKey="spi" name="SPI" domain={[0, 1.8]} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} label={{ value: 'SPI_raw', position: 'bottom', fill: '#8E8E93', fontSize: 12 }} />
              <YAxis dataKey="E" name="E" domain={[0, 1.1]} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} label={{ value: 'E', angle: -90, position: 'insideLeft', fill: '#8E8E93', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={emergenceData} shape={<DiamondDot />} fill="#F5F5F7" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Pythia Scaling Suite: SPI vs. Parameter Count">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
              <XAxis dataKey="logParams" name="log10(Params)" stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} label={{ value: 'log10(Parameters in Billions)', position: 'bottom', fill: '#8E8E93', fontSize: 12 }} />
              <YAxis dataKey="spi" name="SPI" domain={[0.3, 0.5]} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={pythiaData} shape={<DiamondDot />} fill="#636366" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 inline-block bg-elevated px-4 py-2 text-[11px] font-jetbrains text-muted">R&sup2; = 0.021 &middot; p = 0.782</div>
        </ChartPanel>

        <ChartPanel title="Cross-Architecture SPI vs. Parameter Count">
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
              <XAxis dataKey="logParams" name="log10(Params)" stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} label={{ value: 'log10(Parameters)', position: 'bottom', fill: '#8E8E93', fontSize: 12 }} />
              <YAxis dataKey="spi" name="SPI" domain={[0, 1.8]} stroke="#636366" tick={{ fill: '#8E8E93', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0.6} stroke="#6C63FF" strokeDasharray="6 4" strokeWidth={1.5}><Label value="tau = 0.6" position="right" fill="#6C63FF" fontSize={11} /></ReferenceLine>
              <Scatter data={crossArchData}>{crossArchData.map((entry, i) => <Cell key={i} fill={typeColor[entry.type]} />)}</Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-4 text-[11px] text-muted">
            <span className="flex items-center gap-2"><span className="block w-3 h-3 bg-muted" /> Base</span>
            <span className="flex items-center gap-2"><span className="block w-3 h-3 bg-accent-light" /> Instruction</span>
            <span className="flex items-center gap-2"><span className="block w-3 h-3 bg-accent" /> RLHF</span>
          </div>
        </ChartPanel>

        <AnimatedSection><h3 className="font-heading text-accent-light text-lg mb-6 mt-12 text-center">V. Discussion & Conclusion</h3></AnimatedSection>
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h4 className="font-heading text-primary-text text-base mb-4">Instruction Tuning as the Primary Driver</h4>
            <p className="text-secondary text-[15px] leading-relaxed mb-8">Our results strongly suggest that instruction tuning and RLHF alignment — rather than raw parameter count — serve as the primary catalysts for self-preservation behavior.</p>
          </AnimatedSection>
          <AnimatedSection>
            <h4 className="font-heading text-primary-text text-base mb-4">The Pythia Null Result</h4>
            <p className="text-secondary text-[15px] leading-relaxed mb-8">The Pythia scaling suite provides a controlled natural experiment. With R&sup2; = 0.021 and p = 0.782, the relationship between parameter count and SPI within base models is statistically negligible.</p>
          </AnimatedSection>
          <AnimatedSection>
            <h4 className="font-heading text-primary-text text-base mb-4">Implications for AI Safety</h4>
            <p className="text-secondary text-[15px] leading-relaxed mb-8">If self-preservation behavior is primarily a function of alignment training, then the safety community should focus audit efforts on post-training procedures rather than solely on scaling dynamics.</p>
          </AnimatedSection>
        </div>
        <AnimatedSection><p className="text-muted text-[11px] italic text-center mt-8">* This research is ongoing. Full publication pending.</p></AnimatedSection>
      </div>
      <SectionFooter />
    </div>
  );
}
