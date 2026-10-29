import { EraPanels, type EraView } from "@/components/era-panels";
import { Reveal } from "@/components/reveal";
import { eras, timeline } from "@/lib/data/resume";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

// shortcut: "Present" resolves to the build date, fine while it only bounds the last era.
const today = new Date();
const NOW = today.getFullYear() + today.getMonth() / 12;

// "Sept 2018" -> 2018.67, a bare "2014" -> mid-2014, "Present" -> build date.
function toYear(date: string): number {
  if (date === "Present") return NOW;
  const [month, year] = date.split(" ");
  if (!year) return Number(month) + 0.5;
  const index = MONTHS.indexOf(month);
  if (index === -1) throw new Error(`Unknown month in timeline date "${date}"`);
  return Number(year) + index / 12;
}

const label = (date: string) => (date === "Present" ? "now" : date.split(" ").at(-1));

const eraViews: EraView[] = eras.map((era) => {
  const from = toYear(era.from);
  const to = toYear(era.to);
  return {
    range: `${label(era.from)} to ${label(era.to)}`,
    title: era.title,
    summary: era.summary,
    roles: timeline
      .filter((entry) => toYear(entry.start) < to && toYear(entry.end) > from)
      .map((entry) => ({
        track: entry.track,
        title: entry.title,
        org: entry.org,
        dates: `${entry.start} to ${entry.end}`,
      })),
  };
});

export function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-24 border-b">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            Two tracks, one decade.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Teaching since 2017, shipping AI since 2019, and for most of it,
            both at once.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <EraPanels eras={eraViews} />
        </Reveal>
      </div>
    </section>
  );
}
