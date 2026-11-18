import { Icons } from "@/components/icons";
import { FileText, GitPullRequest, HomeIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiBun,
  SiCloudinary,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: IconType;
  // brand colour; monochrome logos follow the text colour so they work in light and dark mode
  color?: string;
};

const skills: Skill[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress },
  { name: "Bun", icon: SiBun },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Drizzle ORM", icon: SiDrizzle },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Mongoose", icon: SiMongoose },
  { name: "REST APIs", icon: SiOpenapiinitiative, color: "#6BA539" },
  { name: "JWT Auth", icon: SiJsonwebtokens },
  { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub },
];

export const DATA = {
  name: "Chinmaya Samantara",
  initials: "CS",
  url: "https://samchinmaya.vercel.app",
  location: "",
  locationLink: "",
  description:
    "Backend developer building toward quantitative development through C++, probability, and systems engineering. Currently building an n8n clone in TypeScript.",
  summary:
    "I build backend systems and I am working toward quantitative development through C++, probability, algorithms, and careful systems engineering. I learn by rebuilding real products from scratch, which has taught me authentication, data modelling, file uploads, and API design. Right now I am building an [n8n clone](https://github.com/samchinmaya/n8n) with Bun, Elysia, PostgreSQL, and Drizzle ORM, and I recently shipped [комп](https://samchinmaya.github.io/komp), a Rust CLI and MCP server that shrinks logs before Claude reads them. I also contribute to open source: I have had {{mergedPRs}} pull requests merged into [Mifos X](https://github.com/openMF/web-app), its new [React app](https://github.com/openMF/mifos-x-web-app-react), its [AI self-service server](https://github.com/openMF/mcp-mifosx-self-service) and [self-service plugin](https://github.com/openMF/selfservice-plugin), and [Apache Fineract](https://github.com/apache/fineract), the open-source core banking stack. I am looking for opportunities to learn from and contribute to a team.",
  // Used in the summary when GitHub can't be reached; normally the live count replaces it.
  mergedPRsFallback: 96,
  avatarUrl: "/me.webp",
  resumeUrl: "/Chinmaya_Samantara_Resume.pdf",
  skills,
  // Reviews and review comments on other contributors' pull requests.
  codeReviews: [
    {
      pullRequest: "Apache Fineract #6936",
      href: "https://github.com/apache/fineract/pull/6936#issuecomment-6902298534",
      status: "Open",
      summary: "Suggested the shared ObjectMapper. The author adopted it, and a maintainer credited the comment.",
    },
    {
      pullRequest: "Apache Fineract #6478",
      href: "https://github.com/apache/fineract/pull/6478#pullrequestreview-5562422574",
      status: "Merged",
      summary: "Restored the old query to prove the new PostgreSQL regression test catches the bug.",
    },
    {
      pullRequest: "Apache Fineract #6500",
      href: "https://github.com/apache/fineract/pull/6500#pullrequestreview-5562187053",
      status: "Merged",
      summary: "Compared develop and the pull request on PostgreSQL to verify a savings balance fix.",
    },
    {
      pullRequest: "p5.js Web Editor #4305",
      href: "https://github.com/processing/p5.js-web-editor/pull/4305#pullrequestreview-5333412612",
      status: "Open",
      summary: "Traced a dropdown bug to a reducer crash and suggested the regression test later added.",
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/open-source", icon: GitPullRequest, label: "Open Source" },
    { href: "/Chinmaya_Samantara_Resume.pdf", icon: FileText, label: "Resume" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/samchinmaya",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/chinmaya-samantara-313b56303/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/samchinmayf2",
        icon: Icons.x,
        navbar: true,
      },
    },
  },
  // Organizations on the open-source page, in display order. Keys are GitHub owners.
  orgs: [
    {
      key: "openMF",
      name: "Mifos Initiative",
      href: "https://mifos.org",
      summary: "Open-source core banking for microfinance and financial inclusion.",
    },
    {
      key: "apache",
      name: "Apache Software Foundation",
      href: "https://www.apache.org",
      summary: "Home of Apache Fineract, the core banking engine behind Mifos X.",
    },
    {
      key: "processing",
      name: "Processing Foundation",
      href: "https://processingfoundation.org",
      summary: "Creative coding tools, including p5.js and its web editor.",
    },
    {
      key: "zulip",
      name: "Zulip",
      href: "https://zulip.com",
      summary: "Open-source team chat organized into topics.",
    },
  ],
  openSource: [
    {
      title: "Mifos X Web App",
      repo: "openMF/web-app",
      org: "openMF",
      href: "https://github.com/openMF/web-app/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "Angular front end of Mifos X, an open-source core banking platform for microfinance. Fixed repayments not being recorded from the collection sheet, fixed deposits activating without debiting the linked savings account, group loan (GLIM) and group savings (GSIM) applications creating broken or duplicate accounts, loan product edits that silently changed how installments are rounded, standing instructions that could not be deleted, savings charges that could not be paid, loan charge-offs and recurring deposit premature closures that always failed, forms starting on the computer date instead of the business date, charges deleted when editing a savings application, duplicate loans and savings accounts on double-click, and dates breaking in Safari.",
      technologies: ["Angular", "TypeScript", "RxJS"],
    },
    {
      title: "Mifos X Web App (React)",
      repo: "openMF/mifos-x-web-app-react",
      org: "openMF",
      href: "https://github.com/openMF/mifos-x-web-app-react/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "The new React rewrite of the Mifos X web app. Wired up the loan and savings account actions so they actually submit to Fineract: approving, disbursing and undoing loans, repayments, prepay and foreclosure, write-offs, charge-offs and interest waivers, and savings deposits, withdrawals, approval and activation.",
      technologies: ["React", "TypeScript", "Redux Toolkit"],
    },
    {
      title: "Mifos X Self-Service MCP Server",
      repo: "openMF/mcp-mifosx-self-service",
      org: "openMF",
      href: "https://github.com/openMF/mcp-mifosx-self-service/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "Model Context Protocol server that lets an AI assistant act for a Mifos X self-service customer. Kept the login inside the server instead of passing passwords through tools, made transfers a two-step prepare-and-confirm, checked loan and savings applications against the bank's template with a confirmation step before submitting, added beneficiaries and loan guarantors with typed fields, returned readable bank errors instead of raw responses, and added tools for transfer fees and quotes, loan simulation, share accounts, security activity, branch locations and product details.",
      technologies: ["Python", "MCP", "Pytest"],
    },
    {
      title: "Mifos X Self-Service Plugin",
      repo: "openMF/selfservice-plugin",
      org: "openMF",
      href: "https://github.com/openMF/selfservice-plugin/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "Fineract plugin behind the Mifos X mobile and online banking apps. Added self-service endpoints for loan guarantors, stopped a customer from moving a savings application to another client or a group, kept a beneficiary's transfer limit when it is renamed, and fixed external beneficiaries that lost their IBAN or phone number or were saved where the customer could never see them. The maintainers have deployed these changes behind the live [Mifos online banking](https://online-banking.mifos.community) app.",
      technologies: ["Java", "Spring Boot", "Fineract"],
    },
    {
      title: "Apache Fineract",
      repo: "apache/fineract",
      org: "apache",
      href: "https://github.com/apache/fineract/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "Java back end behind Mifos X, an Apache Software Foundation project. Fixed collection sheet repayments that were silently not saved, withdrawal fees not reversing when a savings withdrawal is undone, recovery totals lagging a payment behind, attendance for center meetings, webhook creation, client collateral listing, client API responses, and a loan product external ID change that wiped the product's accounting mappings. Seven of these fixes ship in the Apache Fineract 1.16.0 release.",
      technologies: ["Java", "Spring Boot", "PostgreSQL"],
    },
  ],
  projects: [
    {
      title: "комп (komp)",
      href: "https://samchinmaya.github.io/komp",
      dates: "Nov 2026",
      active: true,
      description:
        "A Rust CLI and MCP server that compresses Kubernetes and application logs before Claude reads them. Engineers copy logs and ask Claude what's wrong; komp reads the clipboard on their machine and hands Claude a short summary, so a 2,001-line log costs ~344 tokens instead of ~75,958 and the raw logs never enter the conversation. Version 0.2.0 groups logs with Drain-style template mining and compresses that log in 27 ms with 15.8 MB of peak memory on an Apple M5 Mac. Across four test logs it kept all 14 facts I checked in ~1,177 tokens, while `tail -n 100` kept 10 in ~17,259. It also checks logs for secrets locally, and I tested it in a real Claude Code session with its networking blocked.\n\n" +
        "- **Compressor:** a five-step pipeline that parses plain text, JSON, logfmt, klog and syslog lines, mines templates with a Drain-style parse tree, turns differing tokens into slots, and merges repeats into one line with counts, time ranges and value ranges\n" +
        "- **Keeps what matters:** errors keep their values and stack traces (framework frames folded), exceptions join the error line they belong to, and values bunched in time, like 503s during an outage, get their own line\n" +
        "- **MCP server:** JSON-RPC 2.0 over stdio written by hand, with tools that read logs from the clipboard, a file or `kubectl logs`\n" +
        "- **Privacy check:** before compressing, komp refuses text that isn't logs, such as `.env` files and SSH keys, and redacts secrets and personal data on the user's machine\n" +
        "- **Results:** over 99% fewer tokens on each of the four test logs (Go, Spring Boot, Node.js, kubelet)\n" +
        "- **Benchmarks:** on an Apple M5 Mac with 16 GB of memory, the 2 MB v0.2.0 binary handles a 2,001-line log in 27 ms with 15.8 MB peak memory, and the same log repeated to 100,050 lines in 632 ms with 131.5 MB (0.80% of system memory)\n" +
        "- **Compared with shell tools:** across the four test logs, komp kept all 14 facts from its test suite in ~1,177 tokens, while `tail -n 100` kept 10 in ~17,259 and `grep` for errors and warnings kept 9 in ~35,083\n" +
        "- **Real run:** tested v0.1.0 in a Claude Code session on macOS with komp's networking blocked by the system sandbox; Claude found the cause of the outage from the 11-line summary\n" +
        "- **Website:** a Next.js site where scrolling plays the recorded Claude Code run, zooming between the terminal and the result, with a canvas animation of 2,001 blocks (one per log line) collapsing into the 11-line summary, plus interactive benchmark charts\n" +
        "- **Shipping:** 45 tests, CI on Linux, macOS and Windows, release binaries for 5 platforms and a checksum-verified one-line installer",
      technologies: ["Rust", "MCP", "JSON-RPC", "Regex", "Kubernetes", "GitHub Actions", "Next.js"],
      links: [
        {
          type: "Website",
          href: "https://samchinmaya.github.io/komp",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/samchinmaya/komp",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Download",
          href: "https://github.com/samchinmaya/komp/releases/latest",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "n8n Clone",
      href: "https://github.com/samchinmaya/n8n",
      dates: "In progress · Oct 2026",
      active: true,
      description:
        "A workflow automation tool inspired by n8n, built from scratch in TypeScript. Users chain nodes like HTTP Request and Set into a workflow and run it by hand, from a webhook or on a cron schedule. The backend API is nearly done; the visual editor is next.\n\n" +
        "- **Engine:** PostgreSQL schema with Drizzle ORM (users, workflows, credentials, executions), ArkType types, and a runner that finds the trigger, follows the edges and passes each node's output to the next (Manual Trigger, Schedule Trigger, HTTP Request and Set nodes). It stops a run if the workflow loops back on itself\n" +
        "- **API:** Elysia REST API with Swagger docs to create, list, get, update and run workflows. Every run is saved as an execution: running, then completed with its output or failed with the error\n" +
        "- **Triggers:** a POST to an active workflow's webhook URL runs it with the request body as input, and cron schedules run workflows automatically\n" +
        "- **Auth:** better-auth email/password sign-up, login and cookie sessions, with an Elysia plugin that protects routes; every workflow and execution route only returns the logged-in user's own data\n" +
        "- **Hardening:** a global error handler gives every error the same JSON shape and hides internal errors, and new workflows are checked before saving (known node types, exactly one trigger, valid cron, valid edges)\n" +
        "- **Next:** validation on updates, React Flow editor, encrypted credentials, deploy with Docker on AWS EC2, Caddy and GitHub Actions",
      technologies: [
        "TypeScript",
        "Bun",
        "Elysia",
        "PostgreSQL",
        "Drizzle ORM",
        "ArkType",
        "better-auth",
        "Swagger",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/samchinmaya/n8n",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
