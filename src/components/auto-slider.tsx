"use client";

import type { Slide } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 4000;

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" });

// A card that shows one slide at a time and moves to the next on its own.
// Pauses while hovered or focused so a slide can be read and clicked.
export function AutoSlider({
  title,
  slides,
  href,
  hrefLabel,
}: {
  title: string;
  slides: Slide[];
  href: string;
  hrefLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 ring-2 ring-border/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Link
          href={href}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {hrefLabel}
        </Link>
      </div>
      <div className="relative h-20 overflow-hidden" aria-live={paused ? "polite" : "off"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.a
            key={slide.url}
            href={slide.url}
            target="_blank"
            rel="noreferrer"
            className="group absolute inset-0 flex flex-col gap-1"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
              <span className="truncate font-mono">{slide.label}</span>
              <span aria-hidden>·</span>
              <span className="shrink-0">{dateFormat.format(new Date(slide.date))}</span>
            </span>
            <span className="line-clamp-2 text-sm group-hover:underline underline-offset-2">
              {slide.title}
              <ArrowUpRight className="ml-0.5 inline size-3.5 text-muted-foreground" aria-hidden />
            </span>
          </motion.a>
        </AnimatePresence>
      </div>
      {slides.length > 1 && (
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.url}
              type="button"
              aria-label={`Show ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-4 bg-foreground" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
