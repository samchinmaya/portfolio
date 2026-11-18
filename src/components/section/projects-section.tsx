import BoxReveal from "@/components/magicui/box-reveal";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-1">
                <p className="mb-4 max-w-xl text-sm leading-6 text-muted-foreground">A few systems I&apos;m building to learn the parts of software that matter in production.</p>
                <div className="grid grid-cols-1 gap-0">
                    {DATA.projects.map((project, id) => (
                        <BoxReveal
                            key={project.title}
                            index={id}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BoxReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

