'use client';

import dynamic from 'next/dynamic';

const Research = dynamic(() => import('@/sections/Research'), { ssr: false });

export default function ResearchPage() {
  return <Research />;
}
