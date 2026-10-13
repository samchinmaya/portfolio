import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function OpenSourceSection() {
    return (
        <section id="open-source">
            <div className="flex min-h-0 flex-col gap-y-6">
                <h2 className="text-xl font-bold">Open Source</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:-mx-24 xl:-mx-40">
                    {DATA.openSource.map((contribution, id) => (
                        <BlurFade
                            key={contribution.title}
                            delay={BLUR_FADE_DELAY * 7 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={contribution.href}
                                title={contribution.title}
                                description={contribution.description}
                                dates={contribution.dates}
                                tags={contribution.technologies}
                                links={contribution.links}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
