import { profile } from "@/lib/data/resume";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-medium tracking-tight">
            {profile.shortName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.footerTagline} {profile.location}.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground md:items-end">
          <nav className="flex gap-5" aria-label="Social links">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </nav>
          <p>
            {new Date().getFullYear()}. Designed and built by{" "}
            {profile.shortName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
