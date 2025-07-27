import type { Metadata } from 'next';
import { montserrat, kanit } from '@/assets/fonts';
import '../assets/styles/globals.css';
import '@xabimedina/dlx-components/style.css';
import { unstable_ViewTransition as ViewTransition } from 'react';

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
