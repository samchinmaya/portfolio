import { Icons } from "@/components/icons";
import { GitPullRequest, HomeIcon } from "lucide-react";
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
    "Backend-focused developer who learns by building. Currently building an n8n clone, a workflow automation tool written in TypeScript.",
  summary:
    "I like working on what happens behind the screen. I take products millions of people use every day and rebuild their core from scratch — it's the best way I know to properly learn authentication, data modelling, file uploads and API design. Right now I'm building an [n8n clone](https://github.com/samchinmaya/n8n) step by step with Bun, Elysia, PostgreSQL and Drizzle ORM, with the database schema, workflow engine, REST API, webhook and cron triggers done, and login, the editor and deployment next. I'm also building [MergeRoom](#projects), a React Native app that lets me run and approve my laptop's coding agent from my phone. I also contribute to open source: I've had 53 pull requests merged into [Mifos X](https://github.com/openMF/web-app), its new [React app](https://github.com/openMF/mifos-x-web-app-react) and [Apache Fineract](https://github.com/apache/fineract), the open-source core banking stack. I'm looking for opportunities to learn from and contribute to a team.",
  avatarUrl: "/me.webp",
  skills,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/open-source", icon: GitPullRequest, label: "Open Source" },
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
        "Angular front end of Mifos X, an open-source core banking platform for microfinance. Fixed repayments not being recorded from the collection sheet, loan charge-offs and recurring deposit premature closures that always failed, recurring deposits opening with the amount due, savings interest posting, charges deleted when editing a savings application, duplicate loans and savings accounts on double-click, and dates breaking in Safari.",
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
      title: "Apache Fineract",
      repo: "apache/fineract",
      org: "apache",
      href: "https://github.com/apache/fineract/pulls?q=is%3Apr+author%3Asamchinmaya+is%3Amerged",
      summary:
        "Java back end behind Mifos X, an Apache Software Foundation project. Fixed collection sheet repayments that were silently not saved, withdrawal fees not reversing when a savings withdrawal is undone, recovery totals lagging a payment behind, attendance for center meetings, webhook creation, client collateral listing and client API responses.",
      technologies: ["Java", "Spring Boot", "PostgreSQL"],
    },
  ],
  projects: [
    {
      title: "MergeRoom",
      href: "",
      dates: "In progress · Oct 2026",
      active: true,
      description:
        "A React Native app that puts my laptop's coding agent in my pocket: watch my repos, chat with Claude Code running on the laptop, and approve pushes and pull requests from anywhere. Free to run, end-to-end encrypted.\n\n" +
        "- **App:** Expo / React Native with a 3D glass UI: a GPU-drawn agent orb (Skia shader) that shows what the agent is doing, cards that tilt with the phone, swipe-to-approve for pushes, haptics, dark and light themes, and a demo mode\n" +
        "- **Relay:** Cloudflare Worker + Durable Objects, so the phone reaches the laptop from any network with no open ports. Pairing by QR code, messages encrypted end to end (XSalsa20-Poly1305), the relay only forwards ciphertext\n" +
        "- **Laptop agent:** Node service that runs Claude Code headless; pushing and opening PRs stay blocked until approved on the phone, force-push and rm -rf are always blocked\n" +
        "- **Tested:** end-to-end and security tests, and a 30-user, 30-minute load test with 23,669 requests and 0 errors\n" +
        "- **Next:** deploy the relay, GitHub login with a pull request tracker, push notifications, Android release",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Skia",
        "Reanimated",
        "Cloudflare Workers",
        "WebSockets",
        "Node.js",
      ],
      links: [],
      image: "/mergeroom.jpg",
      video: "",
    },
    {
      title: "n8n Clone",
      href: "https://github.com/samchinmaya/n8n",
      dates: "In progress · Oct 2026",
      active: true,
      description:
        "A workflow automation tool inspired by n8n, built from scratch in TypeScript. Users connect nodes like HTTP Request or Telegram on a canvas and run them by click, webhook or cron schedule.\n\n" +
        "- **Done:** PostgreSQL schema with Drizzle ORM (users, workflows, credentials, executions), ArkType validation, and a workflow engine that finds the trigger, follows the edges and passes each node's output to the next (Manual Trigger, HTTP Request and Set nodes)\n" +
        "- **Done:** Elysia REST API with Swagger docs to create, list, get and update workflows, plus a run endpoint that executes the workflow and saves each execution as running, then completed with its output or failed with the error\n" +
        "- **Done:** webhook trigger: a POST to an active workflow's webhook URL runs it with the request body as input, and execution history endpoints list past runs\n" +
        "- **Done:** cron trigger: schedule workflows to run automatically, with a dedicated schedule node and execution manager\n" +
        "- **Next:** better-auth login with encrypted credentials, React Flow editor\n" +
        "- **Deploy:** Docker on AWS EC2 with Caddy and GitHub Actions CI/CD",
      technologies: [
        "TypeScript",
        "Bun",
        "Elysia",
        "PostgreSQL",
        "Drizzle ORM",
        "ArkType",
        "Swagger",
        "AWS",
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
    {
      title: "Fomo Perps Clone",
      href: "",
      dates: "Upcoming · Oct 2026",
      active: false,
      description:
        "Planned, not started yet: a perpetual futures exchange inspired by [fomo](https://defillama.com/protocol/fomo-perps), with fake money, built after the n8n clone. Traders go long or short with leverage on BTC, ETH and SOL without owning the coin.\n\n" +
        "- **V1:** order book matching engine with limit and market orders, isolated margin with up to 20x leverage, positions with live PnL, a mark price from real exchange prices, and liquidations when margin runs out\n" +
        "- **V2:** funding payments every hour between longs and shorts, take-profit and stop-loss orders, cross margin, candles and a live order book over WebSockets\n" +
        "- **Infra:** Redis queues between the API and the engine, PostgreSQL for trade history, Docker and CI/CD on AWS",
      technologies: [
        "TypeScript",
        "Bun",
        "Redis",
        "PostgreSQL",
        "WebSockets",
        "React",
        "Docker",
        "AWS",
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
} as const;
