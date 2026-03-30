'use client';

import { useState, FormEvent } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', subject: 'General Inquiry', message: '' }); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="bg-bg-landing">
      <SectionLabel>Contact</SectionLabel>
      <div className="section-padding">
        <AnimatedSection><h2 className="font-heading text-primary-text heading-sub mb-12">Get In Touch</h2></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              {[{ label: 'Email', value: 'ojas.v.kulkarni@gmail.com' }, { label: 'Phone', value: '+91-8897703434' }, { label: 'GitHub', value: 'ojasra0kulkarni' }, { label: 'LinkedIn', value: 'ojaskulkarni18' }].map((item) => (
                <div key={item.label}><p className="text-muted text-[11px] tracking-[0.2em] uppercase mb-1">{item.label}</p><p className="text-primary-text text-base">{item.value}</p></div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border bg-card px-4 py-3 text-primary-text text-sm placeholder:text-muted focus:border-accent transition-colors" />
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border bg-card px-4 py-3 text-primary-text text-sm placeholder:text-muted focus:border-accent transition-colors" />
              <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-border bg-card px-4 py-3 text-primary-text text-sm">
                <option>General Inquiry</option><option>Collaboration</option><option>Research</option><option>E.O.T.G. Project</option><option>Other</option>
              </select>
              <textarea placeholder="Message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-border bg-card px-4 py-3 text-primary-text text-sm placeholder:text-muted focus:border-accent transition-colors resize-none" />
              {status === 'sent' ? <p className="text-success text-sm tracking-[0.1em]">Message transmitted successfully.</p> : (
                <button type="submit" disabled={status === 'sending'} className="w-full bg-accent text-cream py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-accent-light disabled:opacity-60 font-heading glow">{status === 'sending' ? 'Transmitting...' : 'Transmit'}</button>
              )}
              {status === 'error' && <p className="text-warm text-[11px]">Something went wrong. Please try again.</p>}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
