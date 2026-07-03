import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

export function Skills() {
  const engineering = skillGroups.filter((g) => g.track === "engineering");
  const teaching = skillGroups.filter((g) => g.track === "teaching");

  return (
    <section id="skills" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            The toolkit.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {[
            { heading: "As an engineer", groups: engineering, accent: "eng" },
            { heading: "As an educator", groups: teaching, accent: "teach" },
          ].map((column) => (
            <Reveal key={column.heading}>
              <h3
                className={cn(
                  "inline-block border-b-2 pb-2 font-display text-2xl font-medium tracking-tight",
                  column.accent === "eng" ? "border-eng" : "border-teach"
                )}
              >
                {column.heading}
              </h3>
              <div className="mt-8 space-y-8">
                {column.groups.map((group) => (
                  <div key={group.label}>
                    <h4 className="text-sm font-medium">{group.label}</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
