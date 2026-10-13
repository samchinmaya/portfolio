import Link from "next/link";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-xl font-semibold">Contact</h2>
      <p className="text-muted-foreground">
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
