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

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const [contributions, prs, openPRs, n8nCommits] = await Promise.all([
    getContributions(),
    getMergedPRs(),
    getOpenPRs(),
    getRecentCommits("samchinmaya/n8n"),
  ]);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-28 rounded-full border border-border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-semibold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
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
            <div className="flex min-h-0 flex-col gap-y-4">
              <h2 className="text-xl font-semibold">Right Now</h2>
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
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-semibold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={skill.name}
                      className="border bg-background border-border ring-2 ring-border/20 rounded-xl size-11 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
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
            <div className="flex min-h-0 flex-col gap-y-4">
              <h2 className="text-xl font-semibold">GitHub Activity</h2>
              <ContributionHeatmap data={contributions} />
            </div>
          </BlurFade>
        </section>
      )}
      <section id="open-source">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <OpenSourceSection prs={prs} />
        </BlurFade>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
