import { Reveal } from "@/components/reveal";
import { engineeringRoles, projects } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

export function Engineering() {
  return (
    <section id="engineering" className="scroll-mt-24 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-eng">
            Engineering
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            Systems that shipped.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Six years of production AI, from startup CTO to agentic LLM
            applications for security operations.
          </p>
        </Reveal>

        <div className="mt-16">
          {engineeringRoles.map((role) => (
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-14 font-display text-3xl font-medium tracking-tight">
            Selected work
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-6">
          {projects.map((project, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={project.name}
                delay={(i % 3) * 0.08}
                className={cn(
                  "md:col-span-3",
                  featured ? "lg:col-span-4" : "lg:col-span-2"
                )}
              >
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-6 md:p-7",
                    featured && "border-ink bg-ink text-paper",
                    i === 1 && "bg-eng/5",
                    i === 3 && "bg-secondary"
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-xs",
                      featured ? "text-paper/60" : "text-muted-foreground"
                    )}
                  >
                    {project.org}, {project.year}
                  </p>
                  <h4 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">
                    {project.name}
                  </h4>
                  <p
                    className={cn(
                      "mt-4 font-mono text-[10px] uppercase tracking-[0.18em]",
                      featured ? "text-paper/50" : "text-muted-foreground"
                    )}
                  >
                    Problem
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed",
                      featured ? "text-paper/75" : "text-muted-foreground"
                    )}
                  >
                    {project.problem}
                  </p>
                  <p
                    className={cn(
                      "mt-4 font-mono text-[10px] uppercase tracking-[0.18em]",
                      featured ? "text-paper/50" : "text-muted-foreground"
                    )}
                  >
                    Approach
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed",
                      featured ? "text-paper/75" : "text-muted-foreground"
                    )}
                  >
                    {project.approach}
                  </p>
                  <p
                    className={cn(
                      "mt-4 border-l-2 pl-3",
                      featured ? "border-paper/40" : "border-eng/50"
                    )}
                  >
                    <span
                      className={cn(
                        "block font-mono text-[10px] uppercase tracking-[0.18em]",
                        featured ? "text-paper/50" : "text-muted-foreground"
                      )}
                    >
                      Outcome
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-relaxed">
                      {project.outcome}
                    </span>
                  </p>
                  <p
                    className={cn(
                      "mt-auto pt-5 font-mono text-[11px]",
                      featured ? "text-paper/50" : "text-muted-foreground/80"
                    )}
                  >
                    {project.stack.join(" / ")}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
