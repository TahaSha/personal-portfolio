"use client";

import { useActionState, useEffect } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

export function Contact() {
  const [state, formAction, pending] = useActionState(
    sendContact,
    initialState
  );

  useEffect(() => {
    if (state.status === "fallback" && state.mailto) {
      const anchor = document.createElement("a");
      anchor.href = state.mailto;
      anchor.click();
    }
  }, [state.status, state.mailto]);

  const delivered = state.status === "sent" || state.status === "fallback";

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                Get in touch.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                Hiring for an AI engineering role, building out a maths or
                computing department, or something in between: I would like to
                hear about it.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-block font-display text-2xl font-medium tracking-tight underline decoration-1 underline-offset-4 transition-colors hover:text-eng md:text-3xl"
              >
                {profile.email}
              </a>
              <ul className="mt-8 space-y-3">
                {[
                  { label: `GitHub / ${profile.githubHandle}`, href: profile.github },
                  {
                    label: `LinkedIn / ${profile.linkedinHandle}`,
                    href: profile.linkedin,
                  },
                ].map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {social.label}
                      <ArrowUpRight
                        strokeWidth={1.5}
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
                {profile.cvs.map((cv) => (
                  <Button
                    key={cv.file}
                    asChild
                    variant="outline"
                    className="h-10 justify-start px-4 sm:justify-center"
                  >
                    <a href={cv.file} download>
                      <Download strokeWidth={1.5} data-icon="inline-start" />
                      {cv.label}
                      <span
                        aria-hidden
                        className={cn(
                          "ml-1 size-1.5",
                          cv.track === "engineering" ? "bg-eng" : "bg-teach"
                        )}
                      />
                    </a>
                  </Button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {delivered ? (
                <div className="flex min-h-80 flex-col items-start justify-center border bg-secondary/50 p-8 md:p-10">
                  <p className="font-display text-3xl font-medium tracking-tight">
                    {state.status === "sent"
                      ? "Message sent."
                      : "Your email draft is ready."}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {state.status === "sent"
                      ? "Thanks for reaching out. I read everything and will reply to your email soon."
                      : "Your message was placed in a new email draft. If nothing opened, use the button below."}
                  </p>
                  {state.status === "fallback" && state.mailto && (
                    <Button asChild className="mt-6 h-10 px-5">
                      <a href={state.mailto}>Open email draft</a>
                    </Button>
                  )}
                </div>
              ) : (
                <form action={formAction} className="border p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        disabled={pending}
                        className="h-10"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={pending}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <fieldset className="mt-5 grid gap-2" disabled={pending}>
                    <legend className="mb-2 text-sm font-medium">
                      I&apos;m reaching out about
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "Engineering role", label: "An engineering role" },
                        { value: "Teaching role", label: "A teaching role" },
                        { value: "Something else", label: "Something else" },
                      ].map((topic) => (
                        <label
                          key={topic.value}
                          className="cursor-pointer border px-3.5 py-2 text-sm text-muted-foreground transition-colors select-none hover:text-foreground has-checked:border-foreground has-checked:bg-foreground has-checked:text-background has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
                        >
                          <input
                            type="radio"
                            name="topic"
                            value={topic.value}
                            required
                            className="sr-only"
                          />
                          {topic.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="mt-5 grid gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      disabled={pending}
                      rows={5}
                      className="min-h-32 resize-y"
                    />
                  </div>
                  <div aria-hidden className="absolute -left-[9999px] top-auto">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button
                      type="submit"
                      disabled={pending}
                      className="h-11 px-7 text-sm"
                    >
                      {pending ? "Sending..." : "Send message"}
                    </Button>
                    {state.status === "error" && (
                      <p role="alert" className="text-sm text-destructive">
                        {state.error}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
