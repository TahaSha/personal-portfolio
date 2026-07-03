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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taha-Yassen Shalaby",
  alternateName: "Taha Shalaby",
  email: "mailto:tahashalaby93@gmail.com",
  jobTitle: ["Full-Stack AI Engineer", "Mathematics & Computing Educator"],
  sameAs: [
    "https://github.com/TahaSha",
    "https://www.linkedin.com/in/tahashalaby",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
};

export default function Home() {
  const portraitSrc = findPortrait();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About portraitSrc={portraitSrc} />
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
