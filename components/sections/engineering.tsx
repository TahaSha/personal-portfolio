import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { engineeringRoles, projects } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

export function Engineering() {
  return (
    <section id="engineering" className="scroll-mt-24 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            Systems that <em className="pb-1 text-eng">shipped</em>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Six years of production AI, from startup CTO to agentic LLM
            applications for security operations.
          </p>
        </Reveal>

        <div className="mt-16">
          {engineeringRoles.map((role) => {
            const highlights = (
              <ul className="mt-5 max-w-xl space-y-2.5 pl-4">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="list-disc text-sm leading-relaxed text-muted-foreground marker:text-eng/60"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            );
            return (
              <Reveal key={`${role.org}-${role.start}`}>
                <article className="grid gap-6 border-t py-10 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <h3 className="text-base font-medium">{role.org}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {role.start} to {role.end}
                    </p>
                    {role.current && (
                      <p className="mt-2 inline-block rounded-full border border-eng/30 bg-eng/5 px-2.5 py-0.5 font-mono text-[11px] text-eng">
                        Current
                      </p>
                    )}
                    {role.stack && (
                      <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        {role.stack.join(" / ")}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-8">
                    <h4 className="font-display text-2xl font-medium tracking-tight md:text-[1.75rem]">
                      {role.title}
                    </h4>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                    {role.current ? (
                      highlights
                    ) : (
                      <Disclosure label="Details" className="mt-4">
                        {highlights}
                      </Disclosure>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <h3 className="mt-14 font-display text-3xl font-medium tracking-tight">
            Selected work
          </h3>
        </Reveal>
        {/* Featured case study spans the row; the other four sit in a 2x2. */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => {
            const featured = i === 0;
            const muted = featured ? "text-paper/50" : "text-muted-foreground";
            const body = featured ? "text-paper/75" : "text-muted-foreground";
            const fieldLabel = "font-mono text-[10px] uppercase tracking-[0.18em]";
            return (
              <Reveal
                key={project.name}
                delay={featured ? 0 : ((i - 1) % 2) * 0.08}
                className={cn(featured && "md:col-span-2")}
              >
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-6 md:p-7",
                    featured &&
                      "border-ink bg-ink text-paper md:grid md:grid-cols-12 md:gap-x-10 md:p-10",
                    i === 1 && "bg-eng/5",
                    i === 4 && "bg-secondary"
                  )}
                >
                  <div className={cn("flex flex-1 flex-col", featured && "md:col-span-7")}>
                    <p className={cn("font-mono text-xs", muted)}>
                      {project.org}, {project.year}
                    </p>
                    <h4
                      className={cn(
                        "mt-3 font-display text-2xl font-medium leading-tight tracking-tight",
                        featured && "md:text-4xl"
                      )}
                    >
                      {project.name}
                    </h4>
                    <p className={cn("mt-4", fieldLabel, muted)}>Problem</p>
                    <p className={cn("mt-1.5 text-sm leading-relaxed", body)}>
                      {project.problem}
                    </p>
                    <p className={cn("mt-4", fieldLabel, muted)}>Approach</p>
                    <p className={cn("mt-1.5 text-sm leading-relaxed", body)}>
                      {project.approach}
                    </p>
                    {!featured &&
                      (project.metric ? (
                        <div className="mt-6">
                          <p className="font-display text-5xl font-medium tracking-tight text-eng">
                            <CountUp value={project.metric.value} />
                          </p>
                          <p className="mt-1 text-sm font-medium leading-relaxed">
                            {project.metric.label}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-4 border-l-2 border-eng/50 pl-3">
                          <span className={cn("block", fieldLabel, muted)}>
                            Outcome
                          </span>
                          <span className="mt-1 block text-sm font-medium leading-relaxed">
                            {project.outcome}
                          </span>
                        </p>
                      ))}
                    <p
                      className={cn(
                        "mt-auto pt-5 font-mono text-[11px]",
                        featured ? "text-paper/50" : "text-muted-foreground/80"
                      )}
                    >
                      {project.stack.join(" / ")}
                    </p>
                  </div>
                  {featured && (
                    <div className="mt-8 border-t border-paper/20 pt-6 md:col-span-5 md:mt-0 md:self-center md:border-t-0 md:border-l md:pt-0 md:pl-10">
                      <p className={cn(fieldLabel, muted)}>Outcome</p>
                      <p className="mt-3 font-display text-2xl font-medium italic leading-[1.3] md:text-3xl md:leading-[1.3]">
                        {project.outcome}
                      </p>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
