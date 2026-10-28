/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { getContributions, getMergedPRs, getOpenPRs, getRecentCommits } from "@/lib/github";
import { AutoSlider } from "@/components/auto-slider";
import ContactSection from "@/components/section/contact-section";
import OpenSourceSection from "@/components/section/open-source-section";
import ProjectsSection from "@/components/section/projects-section";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const [contributions, prs, openPRs, n8nCommits] = await Promise.all([
    getContributions(),
    getMergedPRs(),
    getOpenPRs(),
    getRecentCommits("samchinmaya/n8n"),
  ]);

  return (
    <main className="portfolio-blackbook min-h-dvh flex flex-col gap-20 pb-8 sm:gap-28">
      <section id="hero" className="min-h-[calc(100dvh-11rem)] flex items-center">
        <div className="w-full">
          <div className="flex items-center justify-between border-y border-border py-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Chinmaya Samantara</span>
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-700 dark:bg-[#39d353] animate-pulse" />Currently building</span>
          </div>
          <div className="py-16 sm:py-24">
            <div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <p className="mb-5 text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">Backend developer · Quant developer in progress</p>
                <h1 className="max-w-6xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.1em]">
                  Serious about<br />
                  <span className="text-muted-foreground">models, markets</span><br />
                  &amp; systems.
                </h1>
              </BlurFade>
              <div className="mt-12 grid gap-8 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <BlurFade delay={BLUR_FADE_DELAY * 2} className="max-w-xl">
                  <p className="text-pretty text-sm leading-7 text-muted-foreground sm:text-base">{DATA.description}</p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 3} className="flex shrink-0 items-end gap-5">
                  <div className="text-right text-[11px] uppercase leading-5 tracking-[0.13em] text-muted-foreground">Building toward<br />C++ + probability</div>
                  <div className="relative">
                    <div className="absolute -inset-2 -z-10 rounded-full border border-dashed border-border" />
                    <Avatar className="size-20 rounded-full border border-border bg-background sm:size-24">
                      <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                      <AvatarFallback>{DATA.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </BlurFade>
              </div>
              <BlurFade delay={BLUR_FADE_DELAY * 4} className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href="#projects" className="group inline-flex items-center gap-2 border-b border-foreground pb-1 font-medium hover:text-muted-foreground transition-colors">
                  Explore selected work <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  GitHub <ArrowUpRight className="size-3.5" />
                </a>
                <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </BlurFade>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-border pt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Selected notes, work and contributions</span><span className="h-px w-12 bg-border" />
          </div>
        </div>
      </section>
      <section id="about">
        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">01 · About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-2xl text-pretty font-sans text-sm leading-7 text-muted-foreground dark:prose-invert sm:text-base">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      {(!!openPRs?.length || !!n8nCommits?.length) && (
        <section id="now">
          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
              <h2 className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">02 · Research + building</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {openPRs && openPRs.length > 0 && (
                  <AutoSlider
                    title={`Open pull requests · ${openPRs.length}`}
                    slides={openPRs}
                    href="/open-source"
                    hrefLabel="All PRs"
                  />
                )}
                {n8nCommits && n8nCommits.length > 0 && (
                  <AutoSlider
                    title="Latest commits · n8n clone"
                    slides={n8nCommits}
                    href="https://github.com/samchinmaya/n8n/commits"
                    hrefLabel="All commits"
                  />
                )}
              </div>
            </div>
          </BlurFade>
        </section>
      )}
      <section id="skills">
        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">03 · Toolkit</h2>
          </BlurFade>
          <div className="flex max-w-2xl flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={skill.name}
                      className="border border-border bg-background size-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    >
                      <skill.icon
                        aria-hidden
                        className="size-5"
                        style={skill.color ? { color: skill.color } : undefined}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={6}
                    className="rounded-xl bg-primary text-primary-foreground px-3 py-1.5 text-xs"
                  >
                    <p>{skill.name}</p>
                    <TooltipArrow className="fill-primary" />
                  </TooltipContent>
                </Tooltip>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {contributions && (
        <section id="activity">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
              <h2 className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">04 · Activity</h2>
              <ContributionHeatmap data={contributions} />
            </div>
          </BlurFade>
        </section>
      )}
      <section id="open-source">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">05 · Open source</div>
            <OpenSourceSection prs={prs} />
          </div>
        </BlurFade>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">06 · Work</div>
            <ProjectsSection />
          </div>
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-[#39d353]">07 · Contact</div>
            <ContactSection />
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
