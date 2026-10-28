/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
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
    <main className="min-h-dvh flex flex-col gap-20 pb-8 sm:gap-28">
      <section id="hero" className="min-h-[calc(100dvh-11rem)] flex items-center">
        <div className="w-full">
          <div className="flex items-center justify-between border-y border-border py-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Portfolio · 2026</span>
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />Available to build</span>
          </div>
          <div className="grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end sm:py-14">
            <div>
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="max-w-3xl text-[clamp(2.6rem,9vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.085em]"
                yOffset={10}
                text={DATA.name}
              />
              <BlurFadeText
                className="mt-7 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base"
                delay={BLUR_FADE_DELAY * 2}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 3} className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href="#projects" className="group inline-flex items-center gap-2 border-b border-foreground pb-1 font-medium hover:text-muted-foreground transition-colors">
                  Selected work <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  GitHub <ArrowUpRight className="size-3.5" />
                </a>
                <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 2} className="justify-self-start sm:justify-self-end">
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-full border border-dashed border-border" />
                <Avatar className="size-28 rounded-full border border-border bg-background sm:size-36">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>Scroll to explore</span><span className="h-px w-12 bg-border" />
          </div>
        </div>
      </section>
      <section id="about">
        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">01 · About</h2>
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
              <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">02 · Right now</h2>
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
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">03 · Stack</h2>
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
              <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">04 · Activity</h2>
              <ContributionHeatmap data={contributions} />
            </div>
          </BlurFade>
        </section>
      )}
      <section id="open-source">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">05 · Open source</div>
            <OpenSourceSection prs={prs} />
          </div>
        </BlurFade>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">06 · Work</div>
            <ProjectsSection />
          </div>
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-[9rem_1fr]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">07 · Contact</div>
            <ContactSection />
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
