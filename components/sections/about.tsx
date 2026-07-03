import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/data/resume";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              Two careers, one feedback loop.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-foreground">
              {profile.about[0]}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {profile.about[1]}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="my-12 border-l-2 border-teach pl-6 font-display text-2xl font-medium italic leading-[1.3] md:text-3xl md:leading-[1.3]">
              My students learn computing from someone who deployed a model to
              production the night before.
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {profile.about[2]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
