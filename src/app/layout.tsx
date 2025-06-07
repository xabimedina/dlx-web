import type { Metadata } from "next"
import { montserrat, kanit } from "@/assets/fonts";
import "../assets/styles/globals.css";
import "dlx-components/style.css";



export const metadata: Metadata = {
  title: "DLX",
  description: "DLX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${kanit.variable} antialiased `}>
        {children}
      </body>
    </html>
  );
}
