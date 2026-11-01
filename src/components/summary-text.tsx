import Markdown from "react-markdown";

// Card summaries are plain sentences that may contain [markdown links](https://...).
export function SummaryText({ text, className }: { text: string; className?: string }) {
    return (
        <Markdown
            components={{
                p: ({ children }) => <p className={className}>{children}</p>,
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground underline underline-offset-4 hover:text-emerald-700 dark:hover:text-[#39d353]"
                    >
                        {children}
                    </a>
                ),
            }}
        >
            {text}
        </Markdown>
    );
}
