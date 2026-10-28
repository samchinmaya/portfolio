/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const summary = description.split("\n\n")[0];
  const visibleTags = tags.slice(0, 5);

  return (
    <article
      className={cn(
        "group grid gap-5 border-t border-border py-7 first:border-t-0 sm:grid-cols-[8.5rem_1fr_auto] sm:gap-8",
        className
      )}
    >
      <time className="text-[11px] uppercase leading-5 tracking-[0.12em] text-muted-foreground">{dates}</time>
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-[-0.06em] sm:text-2xl">{title}</h3>
          {href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="size-5" aria-hidden />
            </Link>
          )}
        </div>
        <div className="max-w-xl text-sm leading-6 text-muted-foreground">
          <Markdown>{summary}</Markdown>
        </div>
        <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <Badge
                key={tag}
                className="h-6 w-fit border-border px-2 text-[10px] font-medium uppercase tracking-[0.08em]"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > visibleTags.length && (
              <span className="flex h-6 items-center px-1 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">+{tags.length - visibleTags.length}</span>
            )}
          </div>
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-1 text-xs">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.icon}
                {link.type}
              </Link>
            ))}
          </div>
        )}
      </div>
      {(video || image) && (
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="order-first overflow-hidden border border-border bg-muted sm:order-none sm:w-40"
        >
          {video ? (
            <video src={video} autoPlay loop muted playsInline className="h-44 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:h-full" />
          ) : (
            <ProjectImage src={image ?? ""} alt={title} />
          )}
        </Link>
      )}
    </article>
  );
}
