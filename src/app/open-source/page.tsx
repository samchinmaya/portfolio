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
    <main className="flex flex-col gap-12">
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
          <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="font-medium">{group.title}</h2>
                <p className="text-sm text-muted-foreground">{group.summary}</p>
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
          <section className="flex flex-col gap-4">
            <h2 className="font-medium">Other projects</h2>
            <PRList prs={other} showRepo />
          </section>
        </BlurFade>
      )}
    </main>
  );
}

function PRList({ prs, showRepo = false }: { prs: MergedPR[]; showRepo?: boolean }) {
  return (
    <ul className="flex flex-col divide-y divide-border border-y border-border">
      {prs.map((pr) => (
        <li key={pr.url}>
          <Link
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-baseline gap-4 py-2.5 text-sm"
          >
            <span className="w-14 shrink-0 text-muted-foreground tabular-nums">#{pr.number}</span>
            <span className="flex-1 group-hover:underline underline-offset-4">
              {pr.title}
              {showRepo && <span className="text-muted-foreground"> · {pr.repo}</span>}
            </span>
            <time className="hidden sm:block shrink-0 text-xs text-muted-foreground tabular-nums">
              {formatDate(pr.mergedAt)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
