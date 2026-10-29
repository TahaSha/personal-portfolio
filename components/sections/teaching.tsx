import { Reveal } from "@/components/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { PhotoStack } from "@/components/ui/photo-stack";
import {
  certifications,
  teachingPhotos,
  teachingRoles,
  type Role,
} from "@/lib/data/resume";

const currentRoles = teachingRoles.filter((role) => role.current);
const earlierRoles = teachingRoles.filter((role) => !role.current);

function RoleHeader({ role }: { role: Role }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-base font-medium">{role.title}</h3>
        <p className="font-mono text-xs text-muted-foreground">
          {role.start} to {role.end}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-teach">{role.org}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {role.summary}
      </p>
    </>
  );
}

export function Teaching() {
  return (
    <section id="teaching" className="scroll-mt-24 overflow-x-clip border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal>
              <PhotoStack
                photos={teachingPhotos}
                caption="Cambridge Mathematics and Computing, Years 1 to 8."
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 border-t pt-6">
                <h3 className="text-sm font-medium">Credentials</h3>
                <ul className="mt-4 space-y-3">
                  {certifications.map((cert) => (
                    <li
                      key={cert}
                      className="border-l-2 border-teach/50 pl-4 text-sm leading-relaxed text-muted-foreground"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal>
              <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
                Seven years at the{" "}
                <em className="pb-1 text-teach">whiteboard</em>.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Cambridge International Mathematics and Computing across
                Cairo&apos;s international schools, currently at Wycombe Abbey
                Cairo East.
              </p>
            </Reveal>

            <div className="mt-12">
              {currentRoles.map((role) => (
                <Reveal key={`${role.org}-${role.start}`}>
                  <article className="border-t py-7">
                    <RoleHeader role={role} />
                    <ul className="mt-4 max-w-xl space-y-2 pl-4">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="list-disc text-sm leading-relaxed text-muted-foreground marker:text-teach/60"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <Disclosure label="Earlier roles" className="border-t pt-7">
                  <div className="space-y-8 pt-7">
                    {earlierRoles.map((role) => (
                      <article key={`${role.org}-${role.start}`}>
                        <RoleHeader role={role} />
                      </article>
                    ))}
                  </div>
                </Disclosure>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
