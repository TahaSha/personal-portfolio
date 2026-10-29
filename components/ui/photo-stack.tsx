"use client";

// Adapted from kedhareswer's Card Deck Carousel on 21st.dev: rebuilt on motion
// values (no re-render per pointer move), next/image, site tokens, no autoplay.
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  animate,
  motion,
  motionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Photo = { src: string; alt: string };

const EASE = [0.16, 1, 0.3, 1] as const;
const SETTLE = { type: "spring", stiffness: 260, damping: 30 } as const;

// Stable tilt per card in [-4, 4] degrees so the pile looks hand-stacked.
const tiltFor = (i: number) =>
  (((((i + 1) * 2654435761) >>> 0) / 4294967296) * 2 - 1) * 4;

export function PhotoStack({
  photos,
  caption,
  sizes,
}: {
  photos: Photo[];
  caption: string;
  sizes: string;
}) {
  const n = photos.length;
  const [top, setTop] = useState(0);
  const [xs] = useState(() => photos.map(() => motionValue(0)));
  const deck = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const reduce = useReducedMotion() ?? false;

  const width = () => deck.current?.offsetWidth ?? 400;
  const dur = (s: number) => (reduce ? 0 : s);

  // Throw the top card off to one side, then tuck it under the pile.
  async function next(side = 1) {
    if (busy.current || n < 2) return;
    busy.current = true;
    const x = xs[top];
    await animate(x, side * width() * 1.3, {
      duration: dur(0.35),
      ease: [0.3, 0.5, 0.3, 1],
    });
    setTop((top + 1) % n);
    animate(x, 0, { duration: dur(0.5), ease: EASE });
    busy.current = false;
  }

  // Pull the bottom card back onto the top from the left.
  async function prev() {
    if (busy.current || n < 2) return;
    busy.current = true;
    const i = (top - 1 + n) % n;
    xs[i].set(-width() * 1.3);
    setTop(i);
    await animate(xs[i], 0, { duration: dur(0.45), ease: EASE });
    busy.current = false;
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const thrown =
      Math.abs(info.offset.x) > width() * 0.28 ||
      Math.abs(info.velocity.x) > 500;
    if (thrown) void next(Math.sign(info.offset.x) || 1);
    else animate(xs[top], 0, SETTLE);
  }

  return (
    <figure
      role="region"
      aria-roledescription="carousel"
      aria-label="Teaching photos"
      className="pt-10"
    >
      <div ref={deck} className="relative aspect-4/5">
        {photos.map((photo, i) => (
          <Card
            key={photo.src}
            photo={photo}
            x={xs[i]}
            depth={(i - top + n) % n}
            tilt={tiltFor(i)}
            zIndex={n - ((i - top + n) % n)}
            reduce={reduce}
            sizes={sizes}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <figcaption className="flex-1 text-xs text-muted-foreground">
          {caption}
        </figcaption>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous photo"
          onClick={() => void prev()}
        >
          <ChevronLeft strokeWidth={1.5} />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next photo"
          onClick={() => void next()}
        >
          <ChevronRight strokeWidth={1.5} />
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        Photo {top + 1} of {n}: {photos[top].alt}
      </p>
    </figure>
  );
}

function Card({
  photo,
  x,
  depth,
  tilt,
  zIndex,
  reduce,
  sizes,
  onDragEnd,
}: {
  photo: Photo;
  x: MotionValue<number>;
  depth: number;
  tilt: number;
  zIndex: number;
  reduce: boolean;
  sizes: string;
  onDragEnd: (event: unknown, info: PanInfo) => void;
}) {
  const rotate = useTransform(x, [-400, 0, 400], reduce ? [0, 0, 0] : [-12, 0, 12]);
  const d = Math.min(depth, 3);
  const isTop = depth === 0;

  return (
    <motion.div
      aria-hidden={isTop ? undefined : true}
      className="absolute inset-0"
      style={{ zIndex }}
      initial={false}
      animate={{
        y: d * -22,
        scale: 1 - d * 0.04,
        rotate: isTop || reduce ? 0 : tilt,
        opacity: depth > 3 ? 0 : 1,
      }}
      transition={reduce ? { duration: 0 } : SETTLE}
    >
      <motion.div
        drag={isTop ? "x" : false}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        style={{ x, rotate, touchAction: "pan-y" }}
        className={cn(
          "h-full rounded-2xl border bg-card p-2.5 shadow-xl shadow-foreground/10",
          isTop && "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="relative h-full overflow-hidden rounded-xl bg-secondary">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            draggable={false}
            className="pointer-events-none select-none object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
