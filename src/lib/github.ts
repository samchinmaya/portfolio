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

// Merged pull requests to other people's repositories (own repos are excluded).
export async function getMergedPRs(): Promise<MergedPR[] | null> {
  const query = `author:${USERNAME} is:pr is:merged -user:${USERNAME}`;
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: set GITHUB_TOKEN on Vercel to avoid the unauthenticated rate limit.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=100`,
      { headers, next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.items.map(
      (item: {
        title: string;
        number: number;
        html_url: string;
        repository_url: string;
        pull_request: { merged_at: string };
      }) => ({
        title: item.title,
        number: item.number,
        url: item.html_url,
        repo: item.repository_url.replace("https://api.github.com/repos/", ""),
        mergedAt: item.pull_request.merged_at,
      })
    );
  } catch {
    return null;
  }
}

export function countByRepo(prs: MergedPR[] | null, repo: string) {
  return prs?.filter((pr) => pr.repo === repo).length ?? 0;
}
