"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export type YearItem = { title: string; detail: string; href?: string };
export type YearProject = {
  title: string;
  href: string;
  summary: string;
  tags: readonly string[];
  links: readonly { type: string; href: string; icon: ReactNode }[];
};
export type YearMonth = { key: string; name: string; short: string; projects: YearProject[]; items: YearItem[] };

const CENTER_X = -20;
const CENTER_Y = 320;
const RADIUS = 300;
const MONTH_ANGLE = 16;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const MONTHS = Array.from({ length: 12 }, (_, month) => month);
const TICKS = Array.from({ length: 12 * 4 }, (_, tick) => tick);

const subscribeToMotion = (change: () => void) => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
};

const monthIndex = (month: YearMonth) => Number(month.key.slice(5)) - 1;

function nodeStyle(month: number, focus: number) {
  const degrees = (month - focus) * MONTH_ANGLE;
  const radians = (degrees * Math.PI) / 180;
  const near = Math.max(0, 1 - Math.abs(degrees) / MONTH_ANGLE);
  return {
    transform: `translate(${(CENTER_X + RADIUS * Math.cos(radians)).toFixed(2)} ${(CENTER_Y + RADIUS * Math.sin(radians)).toFixed(2)}) scale(${(0.62 + 0.38 * near).toFixed(3)})`,
    opacity: Math.max(0, 1 - Math.max(0, Math.abs(degrees) - 42) / 34).toFixed(3),
  };
}

const ticksTransform = (focus: number) => `rotate(${(-focus * MONTH_ANGLE).toFixed(2)} ${CENTER_X} ${CENTER_Y})`;

/** A year on a dial: scrolling turns it to each month with real work in it. */
export function YearDial({ months }: { months: YearMonth[] }) {
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(REDUCED_QUERY).matches, () => false);
  const track = useRef<HTMLDivElement>(null);
  const ticks = useRef<SVGGElement>(null);
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const panels = useRef<(HTMLLIElement | null)[]>([]);
  const stops = months.map(monthIndex);
  const activeMonth = stops[active];

  useEffect(() => {
    const section = track.current;
    if (!section) return;
    const area = section;
    const positions = months.map(monthIndex);
    const still = window.matchMedia(REDUCED_QUERY).matches;
    let frame = 0;

    function paint() {
      frame = 0;
      const box = area.getBoundingClientRect();
      const travel = Math.max(1, box.height - window.innerHeight);
      const progress = still ? 1 : Math.min(1, Math.max(0, -box.top / travel));
      const position = progress * (positions.length - 1);
      const from = Math.floor(position);
      const to = Math.min(positions.length - 1, from + 1);
      const part = position - from;
      const eased = part * part * (3 - 2 * part);
      const focus = positions[from] + (positions[to] - positions[from]) * eased;

      ticks.current?.setAttribute("transform", ticksTransform(focus));
      nodes.current.forEach((node, month) => {
        if (!node) return;
        const style = nodeStyle(month, focus);
        node.setAttribute("transform", style.transform);
        node.style.opacity = style.opacity;
      });
      if (!still) setActive(Math.round(position));
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const watcher = new IntersectionObserver(
      ([entry]) => {
        window.removeEventListener("scroll", request);
        if (entry.isIntersecting) window.addEventListener("scroll", request, { passive: true });
        request();
      },
      { rootMargin: "20% 0px" },
    );

    watcher.observe(area);
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      watcher.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [months]);

  function goTo(index: number) {
    const section = track.current;
    if (!section) return;
    if (reduced) {
      panels.current[index]?.scrollIntoView({ block: "center" });
      return;
    }
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * index) / Math.max(1, months.length - 1) });
  }

  return (
    <div ref={track} className="min-w-0 motion-safe:h-[300svh]">
      <div className="grid grid-cols-[minmax(0,1fr)] content-center gap-5 pb-20 motion-safe:sticky motion-safe:top-0 motion-safe:h-svh md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center md:gap-10 md:pb-0">
        <div className="h-[18svh] overflow-hidden [mask-image:linear-gradient(transparent,#000_16%,#000_84%,transparent)] md:h-[min(78svh,680px)]">
          <svg viewBox="0 0 460 640" preserveAspectRatio="xMinYMid meet" aria-hidden="true" className="size-full text-muted-foreground">
            <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS} fill="none" stroke="currentColor" strokeOpacity="0.35" />
            <g ref={ticks} transform={ticksTransform(stops[0])}>
              {TICKS.map((tick) => {
                const major = tick % 4 === 0;
                const radians = (tick * (MONTH_ANGLE / 4) * Math.PI) / 180;
                const inner = RADIUS + 12;
                const outer = inner + (major ? 16 : 7);
                return (
                  <line
                    key={tick}
                    x1={(CENTER_X + inner * Math.cos(radians)).toFixed(2)}
                    y1={(CENTER_Y + inner * Math.sin(radians)).toFixed(2)}
                    x2={(CENTER_X + outer * Math.cos(radians)).toFixed(2)}
                    y2={(CENTER_Y + outer * Math.sin(radians)).toFixed(2)}
                    stroke="currentColor"
                    strokeOpacity={major ? 0.75 : 0.35}
                  />
                );
              })}
            </g>
            {MONTHS.map((month) => {
              const start = nodeStyle(month, stops[0]);
              const hasWork = stops.includes(month);
              const current = month === activeMonth;
              return (
                <g
                  key={month}
                  ref={(node) => {
                    nodes.current[month] = node;
                  }}
                  transform={start.transform}
                  style={{ opacity: start.opacity }}
                >
                  {hasWork && (
                    <circle
                      r="46"
                      className={`stroke-border transition-colors duration-300 ${current ? "fill-emerald-700 dark:fill-[#39d353]" : "fill-background"}`}
                    />
                  )}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={hasWork ? 30 : 17}
                    fontWeight={hasWork ? 600 : 400}
                    className={`transition-colors duration-300 ${current ? "fill-white dark:fill-[#06130a]" : hasWork ? "fill-foreground" : "fill-muted-foreground"}`}
                  >
                    {String(month + 1).padStart(2, "0")}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">2026</p>
          <ol className="mt-2 motion-safe:grid">
            {months.map((month, index) => {
              const shown = reduced || index === active;
              return (
                <li
                  key={month.key}
                  ref={(panel) => {
                    panels.current[index] = panel;
                  }}
                  aria-hidden={!shown}
                  inert={!shown}
                  className={`min-w-0 transition-[opacity,translate] duration-300 motion-safe:[grid-area:1/1] motion-reduce:mb-8 ${shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{month.name}</h3>
                  {month.projects.map((project) => (
                    <article key={project.title} className="mt-4 md:mt-6">
                      <Link href={project.href} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold tracking-tight underline-offset-4 hover:underline md:text-2xl">
                        {project.title}
                      </Link>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{project.summary}</p>
                      <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {project.links.map((link) => (
                          <Link key={link.type} href={link.href} target="_blank" rel="noopener noreferrer" className="flex min-h-6 items-center gap-1.5 transition-colors hover:text-foreground">
                            {link.icon}
                            {link.type}
                          </Link>
                        ))}
                      </div>
                    </article>
                  ))}
                  <ul className="mt-4 divide-y divide-border border-y border-border md:mt-6">
                    {month.items.map((item) => (
                      <li key={item.title} className="py-3">
                        {item.href ? (
                          <Link href={item.href} className="text-sm font-medium underline-offset-4 hover:underline md:text-base">
                            {item.title}
                          </Link>
                        ) : (
                          <p className="text-sm font-medium md:text-base">{item.title}</p>
                        )}
                        <p className={`mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm ${month.projects.length ? "hidden sm:block" : ""}`}>{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
          <nav aria-label="Months" className="mt-4 flex flex-wrap gap-1.5">
            {months.map((month, index) => (
              <button
                key={month.key}
                type="button"
                aria-label={month.name}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`min-h-9 rounded-full border px-3 text-xs transition-colors ${index === active ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {month.short}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
