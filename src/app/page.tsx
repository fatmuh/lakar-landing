import { Hero, Nav } from "@/components/Hero";
import { PromptIt, RefineIt, SeeItLive, ShipIt } from "@/components/Steps";
import { Closing, Cloud, Details, Faq, Footer } from "@/components/Rest";
import { DownloadProvider } from "@/components/Download";
import { getRelease, getStars } from "@/lib/release";

// Urutan section mengikuti frame "Lakar landing v2 — desktop" di lakar-meta/design/lakar-landing.pen.
// Feed rilis & star dibaca di server (ISR); kalau gagal, tombol jatuh ke halaman releases GitHub.
export default async function Page() {
  const [stable, nightly, stars] = await Promise.all([getRelease("stable"), getRelease("nightly"), getStars()]);
  return (
    <DownloadProvider stable={stable} nightly={nightly}>
      <Nav stars={stars} />
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
    </DownloadProvider>
  );
}
