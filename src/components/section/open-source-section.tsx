import { DATA } from "@/data/resume";
import { countByRepo, type MergedPR } from "@/lib/github";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OpenSourceSection({ prs }: { prs: MergedPR[] | null }) {
    return (
        <div className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-xl font-semibold">Open Source</h2>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
                {DATA.openSource.map((project) => {
                    const count = countByRepo(prs, project.repo);
                    return (
                        <li key={project.repo} className="flex flex-col gap-1 py-4">
                            <div className="flex items-baseline justify-between gap-4">
                                <h3 className="font-medium">{project.title}</h3>
                                {count > 0 && (
                                    <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                                        {count} merged PRs
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">{project.summary}</p>
                        </li>
                    );
                })}
            </ul>
            <Link
                href="/open-source"
                className="group flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                See every pull request
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
        </div>
    );
}
