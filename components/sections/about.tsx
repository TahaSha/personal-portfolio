import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/data/resume";

export function About({ portraitSrc }: { portraitSrc: string | null }) {
  return (
    <section id="about" className="scroll-mt-24 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {profile.shortName}
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                Two careers, one feedback loop.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-foreground">
                {profile.about[0]}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                {profile.about[1]}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="my-12 max-w-xl border-l-2 border-teach pl-6 font-display text-2xl font-medium italic leading-[1.3] md:text-3xl md:leading-[1.3]">
                My students learn computing from someone who deployed a model
                to production the night before.
              </blockquote>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {profile.about[2]}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <figure className="mx-auto max-w-sm lg:sticky lg:top-24 lg:max-w-none">
                <div className="rounded-2xl border bg-card p-2.5">
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-secondary">
                    {portraitSrc ? (
                      <Image
                        src={portraitSrc}
                        alt={`Portrait of ${profile.shortName}`}
                        fill
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3">
                        <span className="pb-1 font-display text-8xl font-medium italic leading-[1.1] text-foreground/70">
                          {profile.monogram}
                        </span>
                        <span className="text-xs tracking-wide text-muted-foreground">
                          {profile.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  {profile.shortName}. {profile.location}. {profile.citizenship}.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
