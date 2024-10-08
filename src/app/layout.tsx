import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Erratic Keys',
  description: 'Create your custom keyboard.',
  verification: {
    google: 'RPYpFPenHcpGmt5H9U1uwOzYmC4huRVtRHKJzrnybe4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
