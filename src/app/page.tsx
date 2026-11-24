import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RoundTrip } from "@/components/RoundTrip";
import { AgentsDraw } from "@/components/AgentsDraw";
import { TokensModes } from "@/components/TokensModes";
import { Collaborate } from "@/components/Collaborate";
import { VerifyLoop } from "@/components/VerifyLoop";
import { NerdCorner } from "@/components/NerdCorner";
import { DesignToCode } from "@/components/DesignToCode";
import { Features } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { Closing } from "@/components/Closing";
import { Marquee } from "@/components/ui";

const WORDS_TOP = ["design tool", "for agents", "canvas", "mcp", "lakar", "draw"];
const WORDS_BOTTOM = ["tokens", "components", "comments", "checks", "export", "offline"];

export default function Page() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee words={WORDS_TOP} />
      <RoundTrip />
      <AgentsDraw />
      <TokensModes />
      <Collaborate />
      <VerifyLoop />
      <NerdCorner />
      <DesignToCode />
      <Features />
      <Faq />
      <Marquee words={WORDS_BOTTOM} className="mt-8" />
      <Closing />
    </main>
  );
}
