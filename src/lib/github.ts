const USERNAME = "samchinmaya";

// Refresh GitHub data at most once an hour (Next.js incremental regeneration).
const REVALIDATE_SECONDS = 3600;

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

// GitHub has no public endpoint for the contribution calendar without a token,
// so this uses the free github-contributions-api, which reads the profile page.
export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

export type MergedPR = {
  title: string;
  number: number;
  url: string;
  repo: string;
  mergedAt: string;
};

type SearchItem = {
  title: string;
  number: number;
  html_url: string;
  repository_url: string;
  body: string | null;
  created_at: string;
  pull_request: { merged_at: string | null };
};

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: set GITHUB_TOKEN on Vercel to avoid the unauthenticated rate limit.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// Pull requests to other people's repositories (own repos are excluded).
async function searchPRs(state: "is:merged" | "is:open"): Promise<SearchItem[] | null> {
  const query = `author:${USERNAME} is:pr ${state} -user:${USERNAME}`;
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=100`,
      { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items;
  } catch {
    return null;
  }
}

function repoOf(item: SearchItem) {
  return item.repository_url.replace("https://api.github.com/repos/", "");
}

export async function getMergedPRs(): Promise<MergedPR[] | null> {
  const items = await searchPRs("is:merged");
  return (
    items?.map((item) => ({
      title: item.title,
      number: item.number,
      url: item.html_url,
      repo: repoOf(item),
      mergedAt: item.pull_request.merged_at ?? item.created_at,
    })) ?? null
  );
}

export type Screenshot = { url: string; label: string };

export type PRDetail = {
  title: string;
  number: number;
  url: string;
  repo: string;
  state: "merged" | "open";
  // merge date for merged PRs, opening date for open ones
  date: string;
  mergedBy: string | null;
  additions: number | null;
  deletions: number | null;
  changedFiles: number | null;
  screenshots: Screenshot[];
};

// Screenshots from the PR description, e.g. ![before date](https://...png).
// Returns the first "before" and first "after" image, or the first two if unlabelled.
function extractScreenshots(body: string | null): Screenshot[] {
  if (!body) return [];
  const images: Screenshot[] = [];
  for (const m of body.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g)) {
    images.push({ label: m[1].trim(), url: m[2] });
  }
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const src = m[0].match(/src="([^"]+)"/)?.[1];
    if (src) images.push({ label: m[0].match(/alt="([^"]*)"/)?.[1] ?? "", url: src });
  }
  const before = images.find((img) => /^before/i.test(img.label));
  const after = images.find((img) => /^after/i.test(img.label));
  if (before || after) return [before, after].filter((img): img is Screenshot => !!img);
  return images.slice(0, 2);
}

// Who merged it and how big the change was. A merged PR never changes, so it's
// cached for a day; open PRs refresh with everything else.
async function getPRStats(repo: string, number: number, merged: boolean) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/pulls/${number}`, {
      headers: githubHeaders(),
      next: { revalidate: merged ? 86400 : REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const pr = await res.json();
    return {
      mergedBy: (pr.merged_by?.login as string) ?? null,
      additions: pr.additions as number,
      deletions: pr.deletions as number,
      changedFiles: pr.changed_files as number,
    };
  } catch {
    return null;
  }
}

// Merged and open PRs with screenshots and change stats. Null if GitHub search failed.
export async function getPRDetails(): Promise<PRDetail[] | null> {
  const [merged, open] = await Promise.all([searchPRs("is:merged"), searchPRs("is:open")]);
  if (!merged) return null;
  const items = [
    ...(open ?? []).map((item) => ({ item, state: "open" as const })),
    ...merged.map((item) => ({ item, state: "merged" as const })),
  ];
  return Promise.all(
    items.map(async ({ item, state }) => {
      const repo = repoOf(item);
      const stats = await getPRStats(repo, item.number, state === "merged");
      return {
        title: item.title,
        number: item.number,
        url: item.html_url,
        repo,
        state,
        date: item.pull_request.merged_at ?? item.created_at,
        mergedBy: stats?.mergedBy ?? null,
        additions: stats?.additions ?? null,
        deletions: stats?.deletions ?? null,
        changedFiles: stats?.changedFiles ?? null,
        screenshots: extractScreenshots(item.body),
      };
    })
  );
}

export function countByRepo(prs: MergedPR[] | null, repo: string) {
  return prs?.filter((pr) => pr.repo === repo).length ?? 0;
}

export type Slide = {
  title: string;
  url: string;
  // repo for a PR, short sha for a commit
  label: string;
  date: string;
};

// Open PRs to other people's repositories, newest first.
export async function getOpenPRs(): Promise<Slide[] | null> {
  const items = await searchPRs("is:open");
  return (
    items?.map((item) => ({
      title: item.title,
      url: item.html_url,
      label: `${repoOf(item)} #${item.number}`,
      date: item.created_at,
    })) ?? null
  );
}

type CommitItem = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } };
};

// Latest commits pushed to one of my own repos.
export async function getRecentCommits(repo: string, count = 8): Promise<Slide[] | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=${count}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const commits: CommitItem[] = await res.json();
    return commits.map((c) => ({
      title: c.commit.message.split("\n")[0],
      url: c.html_url,
      label: c.sha.slice(0, 7),
      date: c.commit.author.date,
    }));
  } catch {
    return null;
  }
}
