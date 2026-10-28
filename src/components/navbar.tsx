import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 px-4">
      <nav className="pointer-events-auto mx-auto flex w-fit items-center gap-1 border border-border bg-background/90 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        <span className="px-2 text-xs font-semibold tracking-[-0.08em]">CS</span>
        <Separator orientation="vertical" className="mx-1 h-5 bg-border" />
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <a key={item.href} href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <item.icon className="size-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
        <Separator orientation="vertical" className="mx-1 h-5 bg-border" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <a key={`social-${name}-${index}`} href={social.url} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} aria-label={name} className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <IconComponent className="size-3.5" />
              </a>
            );
          })}
        <Separator orientation="vertical" className="mx-1 h-5 bg-border" />
        <ModeToggle className="size-7 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground" />
      </nav>
    </div>
  );
}
