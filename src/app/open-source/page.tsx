/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { getPRDetails, type PRDetail } from "@/lib/github";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Pull requests I've had merged into open-source projects.",
};

const BLUR_FADE_DELAY = 0.04;

// Issue trackers for the ticket keys in PR titles.
const JIRA: Record<string, string> = {
  WEB: "https://mifosforge.jira.com/browse/",
  MXWAR: "https://mifosforge.jira.com/browse/",
  FINERACT: "https://issues.apache.org/jira/browse/",
};

// Display names for repos that aren't listed in resume.tsx.
const REPO_TITLES: Record<string, string> = {
  "processing/p5.js-web-editor": "p5.js Web Editor",
  "zulip/zulip": "Zulip Server",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "WEB-1322: Show the charges table" -> ticket "WEB-1322", headline "Show the charges table".
function splitTitle(title: string) {
  const match = title.match(/^([A-Z][A-Z0-9]*)-(\d+):\s*(.+)$/);
  if (!match) return { ticket: null, ticketUrl: null, headline: title };
  const ticket = `${match[1]}-${match[2]}`;
  const base = JIRA[match[1]];
  return { ticket, ticketUrl: base ? base + ticket : null, headline: match[3] };
}

export default async function OpenSourcePage() {
  const prs = await getPRDetails();
  const merged = prs?.filter((pr) => pr.state === "merged") ?? [];
  const open = prs?.filter((pr) => pr.state === "open") ?? [];

  // Group by organization, then by repository. Orgs and projects keep the order they
  // are listed in resume.tsx; a repo that isn't listed gets its own project under its
  // owner, and an owner that isn't listed gets its own organization.
  const all = prs ?? [];
  const ownerOf = (repo: string) => repo.split("/")[0];
  const owners = [...new Set([...DATA.orgs.map((o) => o.key), ...all.map((pr) => ownerOf(pr.repo))])];
  const orgs = owners
    .map((key) => {
      const info = DATA.orgs.find((o) => o.key === key);
      const listed = DATA.openSource.filter((p) => p.org === key);
      const unlisted = [...new Set(all.map((pr) => pr.repo))]
        .filter((repo) => ownerOf(repo) === key && !listed.some((p) => p.repo === repo))
        .map((repo) => ({
          title: REPO_TITLES[repo] ?? repo.split("/")[1],
          repo,
          href: `https://github.com/${repo}/pulls?q=is%3Apr+author%3Asamchinmaya`,
          summary: null as string | null,
        }));
      const projects = [...listed, ...unlisted]
        .map((project) => ({ ...project, prs: all.filter((pr) => pr.repo === project.repo) }))
        .filter((project) => project.prs.length > 0 || prs === null);
      return {
        key,
        name: info?.name ?? key,
        href: info?.href ?? `https://github.com/${key}`,
        summary: info?.summary ?? null,
        projects,
        prs: projects.flatMap((project) => project.prs),
      };
    })
    .filter((org) => org.projects.length > 0);

  return (
    // Break out of the layout's narrow column so the list can spread across the screen,
    // and start below the animated grid at the top of the layout so the title stays readable.
    <main className="relative left-1/2 mt-52 sm:mt-40 flex w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 flex-col gap-14">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Open Source</h1>
          <p className="text-sm text-muted-foreground">
            {prs
              ? `${merged.length} pull requests merged and ${open.length} in review across ${new Set(prs.map((pr) => pr.repo)).size} projects in ${orgs.length} organizations. Pulled live from GitHub, with the original tickets, reviewers and screenshots.`
              : "Couldn't reach GitHub right now. Use the links below to see the pull requests there."}
          </p>
        </div>
      </BlurFade>

      {orgs.map((org, id) => (
        <BlurFade key={org.key} delay={BLUR_FADE_DELAY * (2 + id)}>
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-1 border-t-2 border-foreground pt-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight">
                  <Link href={org.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                    {org.name}
                  </Link>
                </h2>
                <Counts prs={org.prs} />
              </div>
              {org.summary && <p className="max-w-2xl text-sm text-muted-foreground">{org.summary}</p>}
            </div>

            {org.projects.map((project) => (
              <div key={project.repo} className="flex flex-col gap-4 sm:pl-4 sm:border-l border-border">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold tracking-tight">{project.title}</h3>
                    {project.summary && <p className="max-w-2xl text-sm text-muted-foreground">{project.summary}</p>}
                  </div>
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Counts prs={project.prs} />
                    <ArrowUpRight className="inline size-3.5 ml-0.5" aria-hidden />
                  </Link>
                </div>
                <PRList prs={project.prs} />
              </div>
            ))}
          </section>
        </BlurFade>
      ))}
    </main>
  );
}

function Counts({ prs }: { prs: PRDetail[] }) {
  const merged = prs.filter((pr) => pr.state === "merged").length;
  const open = prs.length - merged;
  const parts = [merged > 0 && `${merged} merged`, open > 0 && `${open} in review`].filter(Boolean);
  return <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{parts.join(" · ")}</span>;
}

function PRList({ prs, showRepo = false }: { prs: PRDetail[]; showRepo?: boolean }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {prs.map((pr) => (
        <PRItem key={pr.url} pr={pr} showRepo={showRepo} />
      ))}
    </ul>
  );
}

const linkClass = "hover:text-foreground hover:underline underline-offset-4 transition-colors";

function PRItem({ pr, showRepo }: { pr: PRDetail; showRepo: boolean }) {
  const { ticket, ticketUrl, headline } = splitTitle(pr.title);
  return (
    <li className="flex flex-col gap-2 border-t border-border py-4">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {ticket && ticketUrl ? (
          <Link href={ticketUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {ticket}
          </Link>
        ) : (
          <span>{ticket ?? (showRepo ? pr.repo : `#${pr.number}`)}</span>
        )}
        {pr.state === "open" && (
          <span className="rounded-full border border-border px-2 py-px normal-case tracking-normal text-foreground">
            In review
          </span>
        )}
      </div>

      <Link
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium leading-snug text-pretty hover:underline underline-offset-4"
      >
        {headline}
      </Link>

      {pr.screenshots.length > 0 && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          {pr.screenshots.map((shot) => (
            <a
              key={shot.url}
              href={shot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1"
            >
              <img
                src={shot.url}
                alt={`${shot.label || "Screenshot"} — ${headline}`}
                loading="lazy"
                className="aspect-video w-full rounded-md border border-border object-cover object-top transition-opacity group-hover:opacity-80"
              />
              <span className="text-[11px] capitalize text-muted-foreground">{shot.label || "Screenshot"}</span>
            </a>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-x-1.5 pt-1 text-xs text-muted-foreground tabular-nums">
        <Link href={pr.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          #{pr.number}
        </Link>
        {showRepo && ticket && <span>· {pr.repo}</span>}
        <span>
          · {pr.state === "merged" ? "Merged" : "Opened"} {formatDate(pr.date)}
        </span>
        {pr.mergedBy && (
          <span>
            · by{" "}
            <Link href={`https://github.com/${pr.mergedBy}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {pr.mergedBy}
            </Link>
          </span>
        )}
        {pr.additions !== null && pr.deletions !== null && (
          <span>
            · <span className="text-green-600 dark:text-green-500">+{pr.additions}</span>{" "}
            <span className="text-red-600 dark:text-red-500">−{pr.deletions}</span>
            {pr.changedFiles !== null && ` in ${pr.changedFiles} file${pr.changedFiles === 1 ? "" : "s"}`}
          </span>
        )}
      </div>
    </li>
  );
}
