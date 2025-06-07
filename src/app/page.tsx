"use client";

import { Button, DlxParagraph } from "dlx-components";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen pt-10">
        <Image
          src="/images/portada.jpg"
          alt="Portada"
          fill
          style={{ objectFit: "cover", zIndex: 0, opacity: 0.5 }}
          priority
        />
        <div className="absolute inset-0 h-auto font-sans w-full flex flex-col items-center justify-center gap-24 z-10">
          <DlxParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</DlxParagraph>
          <Button variant="accent">Click me</Button>
          <h1 className="text-4xl font-sans">Hello World</h1>
        </div>
      </div>
      <div className="relative w-full flex items-center justify-center h-screen bg-jet pt-10">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-sans text-smoke">SERVICIOS</h1>
        </div>
      </div>
    </>
  );
}
