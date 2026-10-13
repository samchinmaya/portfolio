import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { getMergedPRs, type MergedPR } from "@/lib/github";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Pull requests I've had merged into open-source projects.",
};

const BLUR_FADE_DELAY = 0.04;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function OpenSourcePage() {
  const prs = await getMergedPRs();

  // Group by repository, keeping the order the projects are listed in resume.tsx.
  const groups = DATA.openSource.map((project) => ({
    ...project,
    prs: (prs ?? []).filter((pr) => pr.repo === project.repo),
  }));
  const listed = new Set<string>(DATA.openSource.map((p) => p.repo));
  const other: MergedPR[] = (prs ?? []).filter((pr) => !listed.has(pr.repo));

  return (
    // Break out of the layout's narrow column so the list can spread across the screen,
    // and start below the animated grid at the top of the layout so the title stays readable.
    <main className="relative left-1/2 mt-52 sm:mt-40 flex w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 flex-col gap-14">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Open Source</h1>
          <p className="text-sm text-muted-foreground">
            {prs
              ? `${prs.length} pull requests merged across ${new Set(prs.map((pr) => pr.repo)).size} projects. Pulled live from GitHub.`
              : "Couldn't reach GitHub right now. Use the links below to see the pull requests there."}
          </p>
        </div>
      </BlurFade>

      {groups.map((group, id) => (
        <BlurFade key={group.repo} delay={BLUR_FADE_DELAY * (2 + id)}>
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4 border-t-2 border-foreground pt-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold tracking-tight">{group.title}</h2>
                <p className="max-w-2xl text-sm text-muted-foreground">{group.summary}</p>
              </div>
              <Link
                href={group.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-muted-foreground hover:text-foreground transition-colors tabular-nums"
              >
                {group.prs.length} merged
                <ArrowUpRight className="inline size-3.5 ml-0.5" aria-hidden />
              </Link>
            </div>
            <PRList prs={group.prs} />
          </section>
        </BlurFade>
      ))}

      {other.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * (2 + groups.length)}>
          <section className="flex flex-col gap-6">
            <h2 className="border-t-2 border-foreground pt-3 text-lg font-semibold tracking-tight">Other projects</h2>
            <PRList prs={other} showRepo />
          </section>
        </BlurFade>
      )}
    </main>
  );
}

// "WEB-1322: Show the charges table" -> kicker "WEB-1322", headline "Show the charges table".
function splitTitle(title: string) {
  const match = title.match(/^([A-Z][A-Z0-9]*-\d+):\s*(.+)$/);
  return match ? { kicker: match[1], headline: match[2] } : { kicker: null, headline: title };
}

function PRList({ prs, showRepo = false }: { prs: MergedPR[]; showRepo?: boolean }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {prs.map((pr) => {
        const { kicker, headline } = splitTitle(pr.title);
        return (
          <li key={pr.url} className="border-t border-border">
            <Link
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-1.5 py-4"
            >
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {kicker ?? (showRepo ? pr.repo : `#${pr.number}`)}
              </span>
              <span className="font-medium leading-snug text-pretty group-hover:underline underline-offset-4">
                {headline}
              </span>
              <span className="mt-auto pt-1 text-xs text-muted-foreground tabular-nums">
                #{pr.number}
                {showRepo && kicker ? ` · ${pr.repo}` : ""} · {formatDate(pr.mergedAt)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
