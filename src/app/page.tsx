import { Hero, Nav } from "@/components/Hero";
import { PromptIt, RefineIt, SeeItLive, ShipIt } from "@/components/Steps";
import { Closing, Cloud, Details, Faq, Footer } from "@/components/Rest";

// Urutan section mengikuti frame "Lakar landing v2 — desktop" di lakar-meta/design/lakar-landing.pen.
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PromptIt />
        <SeeItLive />
        <RefineIt />
        <ShipIt />
        <Details />
        <Cloud />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
