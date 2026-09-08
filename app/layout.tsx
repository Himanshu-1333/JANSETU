import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { PerspectiveDock } from '@/components/layout/PerspectiveDock';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/layout/Toast';
import { RouteGuard } from '@/components/layout/RouteGuard';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif', 'Arial']
});

export const metadata: Metadata = {
  title: 'JanSetu | AI-Powered Civic Innovation Platform',
  description: 'Convert community problems into verified, prioritized innovation challenges and connect them with universities, industry partners, and government stakeholders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-slate-900`}>
        <AppProvider>
          <RouteGuard>
            <Navbar />
            <PerspectiveDock />
            <main className="flex-1">
              {children}
            </main>
            <Toast />
            <Footer />
          </RouteGuard>
        </AppProvider>
      </body>
    </html>
  );
}
