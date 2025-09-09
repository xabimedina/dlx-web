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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`${montserrat.variable} ${kanit.variable} antialiased `}>
        <ViewTransition name='page'>{children}</ViewTransition>
      </body>
    </html>
  );
}
