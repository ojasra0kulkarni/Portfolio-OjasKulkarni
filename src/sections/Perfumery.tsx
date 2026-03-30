'use client';

import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import SectionFooter from '@/components/SectionFooter';
import Image from 'next/image';

type Note = { name: string; color: string };

const scentOne = {
  top: [{ name: 'Mandarin Orange', color: 'text-orange-500' }],
  middle: [{ name: 'Orange Blossom', color: 'text-orange-400' }],
  base: [
    { name: 'Sandalwood', color: 'text-[#D2B48C]' },
    { name: 'Vanilla', color: 'text-[#F3E5AB]' },
    { name: 'Oud', color: 'text-[#8B5A2B]' }
  ]
};

const scentTwo = {
  top: [
    { name: 'Bergamot', color: 'text-[#DEE831]' },
    { name: 'Mint Leaves', color: 'text-green-300' }
  ],
  middle: [
    { name: 'Watermelon', color: 'text-red-400' },
    { name: 'Seaweed', color: 'text-teal-600' }
  ],
  base: [
    { name: 'Sea Salt', color: 'text-blue-100' },
    { name: 'Musk', color: 'text-neutral-400' }
  ]
};

const recommendations = [
  { season: 'Winter', picks: ['Parfums de Marly Althair', 'Stronger With You Intensely', 'Tom Ford Tobacco Vanille'] },
  { season: 'Summer', picks: ['D&G Light Blue', 'God of Fire', 'Creed Aventus'] },
  { season: 'Special Occasions', picks: ['Tom Ford Ombre Leather', 'Azzaro The Most Wanted', 'Bleu de Chanel'] },
];

function ScentCard({ scent, variant }: { scent: { top: Note[]; middle: Note[]; base: Note[] }; variant: 'warm' | 'cool' }) {
  const baseBg = variant === 'cool' ? 'bg-elevated' : 'bg-card';
  
  const renderNotes = (notes: Note[]) => {
    return notes.map((note, index) => (
      <span key={note.name}>
        <span className={note.color}>{note.name}</span>
        {index < notes.length - 1 && <span className="text-secondary mx-2">·</span>}
      </span>
    ));
  };

  return (
    <div className="border border-border text-center">
      <div className="bg-surface p-6 border-b border-border"><p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Top Notes</p><p className="font-heading text-lg">{renderNotes(scent.top)}</p></div>
      <div className="bg-card p-6 border-b border-border"><p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Middle Notes</p><p className="font-heading text-lg">{renderNotes(scent.middle)}</p></div>
      <div className={`${baseBg} p-6`}><p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Base Notes</p><p className="font-heading text-lg">{renderNotes(scent.base)}</p></div>
    </div>
  );
}

export default function Perfumery() {
  return (
    <div className="bg-bg-perfumery min-h-screen pt-14">
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden">
        <Image src="/images/perfumery-hero.jpg" alt="Perfumery collection" width={1920} height={1080} className="w-full h-auto block" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-perfumery" />
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center text-center z-10 px-4">
          <AnimatedSection>
            <h2 className="font-heading text-primary-text heading-section mb-4 drop-shadow-lg">The Art of Scent</h2>
            <div className="w-32 h-px bg-accent mx-auto mb-4" />
            <p className="text-cream text-base drop-shadow-md">Where chemistry meets memory.</p>
          </AnimatedSection>
        </div>
      </div>

      <SectionLabel>The Collection</SectionLabel>
      <div className="section-padding">
        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto space-y-6 text-secondary text-[17px] leading-[1.75] mb-12 text-center flex flex-col items-center">
            <p className="text-center">I began collecting perfumes in 2015, growing up in Hyderabad — a city where fragrance is woven into the fabric of daily life. The strong influence of Islamic tradition, with its deep reverence for attars and perfume oils, made scent a natural part of every room, every occasion, every memory. What started as curiosity became a decade-long obsession.</p>
            <p className="text-center">Over the years I have spent time with people who live inside this world: Yusuf Bhai&apos;s store, Adil Qadri, Ajmal, and many others — each one deepening my understanding of how a scent is structured, what makes it linger, and why it matters.</p>
          </div>
        </AnimatedSection>

        <div className="h-px bg-accent w-full mb-12" />

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
            <div className="md:col-span-8 h-[300px] md:h-[450px] border border-border overflow-hidden relative group">
              <Image src="/images/pexels-alexvrv-34143829.jpg" alt="Perfume Details" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-[300px] md:h-[450px] border border-border overflow-hidden relative group">
              <Image src="/images/pexels-ani-coloca-1105433412-31847824.jpg" alt="Perfume Setup" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-4 h-[300px] md:h-[500px] border border-border overflow-hidden relative group">
              <Image src="/images/pexels-hamza01nsr-12562775.jpg" alt="Dior Sauvage" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-3 h-[300px] md:h-[500px] border border-border overflow-hidden relative group">
              <Image src="/images/pexels-cerenvisuals-35488879.jpg" alt="Cologne" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-5 h-[300px] md:h-[500px] border border-border overflow-hidden relative group">
              <Image src="/images/pexels-isidor-bobinec-94539949-9202848.jpg" alt="In Love With You" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </AnimatedSection>

        <SectionLabel>Signature Scents</SectionLabel>
        <div className="py-12">
          <AnimatedSection><h2 className="font-heading text-primary-text heading-sub mb-10">My Signatures</h2></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection delay={0.1}><ScentCard scent={scentOne} variant="warm" /></AnimatedSection>
            <AnimatedSection delay={0.2}><ScentCard scent={scentTwo} variant="cool" /></AnimatedSection>
          </div>
        </div>

        <SectionLabel>Recommendations</SectionLabel>
        <div className="py-12">
          <AnimatedSection><h2 className="font-heading text-primary-text heading-sub mb-10">The Collection — Curated Picks</h2></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {recommendations.map((rec, i) => (
              <AnimatedSection key={rec.season} delay={i * 0.1}>
                <div className={`p-6 ${i < recommendations.length - 1 ? 'md:border-r border-border' : ''}`}>
                  <h3 className="font-heading text-accent text-xl mb-2">{rec.season}</h3>
                  <div className="h-px bg-accent w-12 mb-6" />
                  <ul className="space-y-3">{rec.picks.map((pick) => <li key={pick} className="text-secondary text-[15px]">{pick}</li>)}</ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
      <SectionFooter />
    </div>
  );
}
