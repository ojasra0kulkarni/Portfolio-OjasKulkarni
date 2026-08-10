# Ojas Kulkarni — Portfolio

Personal portfolio site, built with Next.js (App Router) and a Gemini-powered AI chat that can answer questions about Ojas.

## Sections

- **Hero**
- **Experience**
- **Education**
- **Skills**
- **Projects**
- **Research**
- **Perfumery**
- **EOTG**
- **Stats strip**
- **Contact** — sends messages via [Resend](https://resend.com)
- **AI chat** — ask questions about Ojas, answered by Gemini via the [Vercel AI SDK](https://sdk.vercel.ai/)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Recharts · Lenis (smooth scroll) · Vercel AI SDK (`@ai-sdk/google`) · Resend

## Getting started

```bash
npm install
```

Set environment variables (`.env.local`):

```
GOOGLE_GENERATIVE_AI_API_KEY=your_key   # powers the AI chat
RESEND_API_KEY=your_key                 # powers the contact form
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed on [Vercel](https://vercel.com).
