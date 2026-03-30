import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { ThemeProvider } from '@/components/ThemeProvider';
import Chatbot from '@/components/Chatbot';
import MatrixBackground from '@/components/MatrixBackground';

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ojas Kulkarni — Portfolio',
  description: 'B.Tech CSE student at LPU. AI/ML engineer, researcher, startup co-founder.',
  keywords: ['Ojas Kulkarni', 'AI', 'ML', 'Portfolio', 'Researcher', 'E.O.T.G.'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MatrixBackground />
          <ClientLayout>{children}</ClientLayout>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
