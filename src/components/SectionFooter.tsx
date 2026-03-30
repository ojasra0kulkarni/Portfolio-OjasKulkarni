'use client';

import Link from 'next/link';

export default function SectionFooter() {
  return (
    <div className="w-full bg-surface border-t border-border px-8 md:px-20 py-4 flex items-center justify-between">
      <span className="font-heading text-primary-text text-[11px] tracking-[0.3em] uppercase">Ojas Kulkarni</span>
      <Link href="/#contact" className="text-[11px] tracking-[0.1em] uppercase text-secondary hover:text-accent transition-colors duration-200">
        Contact <span className="text-accent">&rarr;</span>
      </Link>
    </div>
  );
}
