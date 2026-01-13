import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Container from '@/components/global/Container';
import Footer from '@/components/global/Footer';
import Providers from './providers';
import { ClerkProvider } from '@clerk/nextjs';
const playfair = Playfair_Display({ subsets: ['latin'] });

// Presence-only debug logs for server-side rendering (do NOT log secret values)
console.log(`[env:layout] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY present? ${Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)}`);
console.log(`[env:layout] CLERK_SECRET_KEY present? ${Boolean(process.env.CLERK_SECRET_KEY)}`);

export const metadata: Metadata = {
  title: 'Next Storefront',
  description: 'A nifty store built with Next.js',
};

// Force dynamic rendering because ClerkProvider uses headers()
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // #region agent log
  if (typeof window === 'undefined') { fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/layout.tsx:27', message: 'RootLayout rendering started', data: { hasClerkPublishable: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY), hasClerkSecret: Boolean(process.env.CLERK_SECRET_KEY) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'E' }) }).catch(() => { }); }
  // #endregion

  try {
    return (
      <ClerkProvider>
        <html lang='en' suppressHydrationWarning>
          <body className={playfair.className}>
            <Providers>
              <Navbar />
              <Container className='py-20 flex-1'>{children}</Container>
              <Footer />
            </Providers>
          </body>
        </html>
      </ClerkProvider>
    );
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'app/layout.tsx:42', message: 'RootLayout error caught', data: { errorMessage: error instanceof Error ? error.message : String(error) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'D' }) }).catch(() => { });
    // #endregion
    throw error;
  }
}
