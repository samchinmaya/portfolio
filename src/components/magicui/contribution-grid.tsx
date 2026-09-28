import { cn } from "@/lib/utils";

// GitHub's contribution palette, level 0 (empty) to 4 (busiest), light then dark.
// Bright greens used when a square "lights up".
const FLASH = [
  "fill-[#40c463] dark:fill-[#26a641]",
  "fill-[#30a14e] dark:fill-[#39d353]",
  "fill-[#9be9a8] dark:fill-[#006d32]",
];

const LEVELS = [
  "fill-[#ebedf0] dark:fill-[#161b22]",
  "fill-[#9be9a8] dark:fill-[#0e4429]",
  "fill-[#40c463] dark:fill-[#006d32]",
  "fill-[#30a14e] dark:fill-[#26a641]",
  "fill-[#216e39] dark:fill-[#39d353]",
];

// Small seeded PRNG so the server and client render the same grid.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Props {
  weeks?: number;
  days?: number;
  cellSize?: number;
  gap?: number;
  seed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ContributionGrid({
  weeks = 110,
  days = 18,
  cellSize = 11,
  gap = 3,
  seed = 7,
  className,
  style,
}: Props) {
  const rand = mulberry32(seed);
  const step = cellSize + gap;
  const cells: React.ReactNode[] = [];

  for (let w = 0; w < weeks; w++) {
    // Busier "weeks" come in streaks, like a real contribution graph.
    const weekActivity = rand();
    for (let d = 0; d < days; d++) {
      const r = rand() * (0.55 + weekActivity * 0.6);
      const level = r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.95 ? 3 : 4;
      const x = w * step;
      const y = d * step;
      const twinkle = level > 0 && rand() < 0.25;
      cells.push(
        <rect
          key={`${w}-${d}`}
          x={x}
          y={y}
          width={cellSize}
          height={cellSize}
          rx={2}
          className={cn(LEVELS[level], twinkle && "animate-contribution")}
          style={
            twinkle
              ? {
                  animationDelay: `${(rand() * 5).toFixed(2)}s`,
                  animationDuration: `${(2.5 + rand() * 3).toFixed(2)}s`,
                }
              : undefined
          }
        />
      );
      // Some squares (mostly empty ones) light up green and fade back out.
      if (rand() < (level === 0 ? 0.22 : 0.08)) {
        cells.push(
          <rect
            key={`${w}-${d}-flash`}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={2}
            className={cn(FLASH[Math.floor(rand() * FLASH.length)], "animate-contribution-flash")}
            style={{
              animationDelay: `${(rand() * 8).toFixed(2)}s`,
              animationDuration: `${(3 + rand() * 4).toFixed(2)}s`,
            }}
          />
        );
      }
    }
  }

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={style}
      width={weeks * step}
      height={days * step}
      viewBox={`0 0 ${weeks * step} ${days * step}`}
      preserveAspectRatio="xMidYMin slice"
    >
      {cells}
    </svg>
  );
}
