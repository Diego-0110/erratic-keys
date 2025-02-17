import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Keyboard } from '@/components/common/icons';

const roboto = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Erratic Keys',
  description: 'Create your custom keyboard layout changing the output of every key.',
  verification: {
    google: 'RPYpFPenHcpGmt5H9U1uwOzYmC4huRVtRHKJzrnybe4',
  },
  icons: [
    {
      url: '/icon?<generated>',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="min-h-[100dvh] text-slate-200 bg-slate-950">
        <header className="py-2 px-4 border-b-2 border-b-slate-800">
          <h1 className="font-bold text-lg">
            <a href="/" className="flex items-center gap-2 w-fit">
              <Keyboard className="text-blue-400 size-8" />
              Erratic Keys
            </a>
          </h1>
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
