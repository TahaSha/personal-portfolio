import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  certifications,
  education,
  engineeringRoles,
  knowsAbout,
  profile,
  teachingRoles,
} from "@/lib/data/resume";
import { siteUrl } from "@/lib/site";
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

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

function buildJsonLd(portraitSrc: string | null) {
  const address = {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: profile.countryCode,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        alternateName: [profile.shortName, profile.arabicName],
        url: siteUrl,
        ...(portraitSrc ? { image: `${siteUrl}${portraitSrc}` } : {}),
        email: `mailto:${profile.email}`,
        jobTitle: profile.roles,
        description: profile.tagline,
        sameAs: [profile.github, profile.linkedin],
        worksFor: [...engineeringRoles, ...teachingRoles]
          .filter((role) => role.current)
          .map((role) => ({
            "@type": "Organization",
            name: role.org.split(",")[0],
          })),
        alumniOf: education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.school,
        })),
        hasCredential: certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert,
        })),
        knowsAbout,
        knowsLanguage: ["English", "Arabic"],
        nationality: { "@type": "Country", name: profile.nationality },
        address,
        homeLocation: { "@type": "Place", address },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: profile.shortName,
        description: profile.tagline,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/`,
        url: siteUrl,
        name: `${profile.shortName} | AI Engineer & Mathematics Teacher`,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}

export default function Home() {
  const portraitSrc = findPortrait();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(portraitSrc)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <Nav />
      <main>
        <Hero portraitSrc={portraitSrc} />
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
