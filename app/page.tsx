import { existsSync } from "node:fs";
import { join } from "node:path";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Engineering } from "@/components/sections/engineering";
import { Teaching } from "@/components/sections/teaching";
import { Timeline } from "@/components/sections/timeline";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const PORTRAIT_CANDIDATES = [
  "portrait.jpg",
  "portrait.jpeg",
  "portrait.png",
  "portrait.webp",
];

function findPortrait(): string | null {
  for (const file of PORTRAIT_CANDIDATES) {
    if (existsSync(join(process.cwd(), "public", "images", file))) {
      return `/images/${file}`;
    }
  }
  return null;
}

export default function Home() {
  const portraitSrc = findPortrait();

  return (
    <>
      <Nav />
      <main>
        <Hero portraitSrc={portraitSrc} />
        <Stats />
        <About />
        <Engineering />
        <Teaching />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
