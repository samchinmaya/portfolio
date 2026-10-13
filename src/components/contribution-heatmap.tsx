import type { Contributions } from "@/lib/github";

// GitHub's contribution palette, level 0 (none) to 4 (busiest). One hue, light
// to dark; dark mode has its own steps so busy days stay brightest there too.
const LEVELS = [
  "fill-[#ebedf0] dark:fill-[#161b22]",
  "fill-[#9be9a8] dark:fill-[#0e4429]",
  "fill-[#40c463] dark:fill-[#006d32]",
  "fill-[#30a14e] dark:fill-[#26a641]",
  "fill-[#216e39] dark:fill-[#39d353]",
];

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 16; // room for month labels
const LEFT = 24; // room for weekday labels

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ContributionHeatmap({ data }: { data: Contributions }) {
  // Pad the start so the first column begins on a Sunday, like GitHub.
  const firstDay = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(firstDay).fill(null), ...data.days];
  const weeks = Math.ceil(cells.length / 7);

  // Label a column with its month when a new month starts in it.
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const day = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    if (!day) continue;
    const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth) {
      // Skip a label squeezed into the first partial column.
      if (w > 0 || firstDay < 4) monthLabels.push({ x: LEFT + w * STEP, label: MONTHS[month] });
      lastMonth = month;
    }
  }

  const width = LEFT + weeks * STEP;
  const height = TOP + 7 * STEP;

  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
          className="text-[9px] fill-muted-foreground"
        >
          {monthLabels.map(({ x, label }) => (
            <text key={`${label}-${x}`} x={x} y={10}>
              {label}
            </text>
          ))}
          {["Mon", "Wed", "Fri"].map((label, i) => (
            <text key={label} x={0} y={TOP + (1 + i * 2) * STEP + CELL - 2}>
              {label}
            </text>
          ))}
          {cells.map((day, i) =>
            day ? (
              <rect
                key={day.date}
                x={LEFT + Math.floor(i / 7) * STEP}
                y={TOP + (i % 7) * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                className={LEVELS[day.level]}
              >
                <title>
                  {`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                </title>
              </rect>
            ) : null
          )}
        </svg>
      </div>
      <figcaption className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{data.total} contributions in the last year</span>
        <span className="flex items-center gap-1">
          Less
          <svg width={5 * STEP} height={CELL} aria-hidden>
            {LEVELS.map((level, i) => (
              <rect key={level} x={i * STEP} width={CELL} height={CELL} rx={2} className={level} />
            ))}
          </svg>
          More
        </span>
      </figcaption>
    </figure>
  );
}
