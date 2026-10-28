import Link from "next/link";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="flex max-w-2xl flex-col gap-y-4 pb-16">
      <h2 className="text-2xl font-semibold tracking-[-0.06em] sm:text-3xl">Let&apos;s build something useful.</h2>
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">
        Open to opportunities, collaborations, or just a chat about backend
        development. Send me a message on{" "}
        <Link
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          LinkedIn
        </Link>{" "}
        or{" "}
        <Link
          href={DATA.contact.social.X.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          X
        </Link>
        .
      </p>
    </div>
  );
}
