import type { Metadata } from 'next';
import { montserrat, kanit } from '@/assets/fonts';
import { unstable_ViewTransition as ViewTransition } from 'react';
import '@/assets/styles/globals.css';

export const metadata: Metadata = {
  title: 'DLX',
  description: 'DLX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${montserrat.variable} ${kanit.variable} antialiased `}>
        <ViewTransition name='page'>{children}</ViewTransition>
      </body>
    </html>
  );
}
