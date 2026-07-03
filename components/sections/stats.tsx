import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/data/resume";

export function Stats() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07}>
            <p className="font-display text-5xl font-medium tracking-tight md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-2 max-w-44 text-sm leading-snug text-muted-foreground">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
