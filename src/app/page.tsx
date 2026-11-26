import { Hero, Nav } from "@/components/Hero";
import { PromptIt, RefineIt, SeeItLive, ShipIt } from "@/components/Steps";
import { Closing, Details, Faq, Footer, LocalFirst } from "@/components/Rest";

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
        <LocalFirst />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
