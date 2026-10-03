import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
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
    "I like working on what happens behind the screen. I take products millions of people use every day and rebuild their core from scratch — it's the best way I know to properly learn authentication, data modelling, file uploads and API design. Right now I'm building an [n8n clone](https://github.com/samchinmaya/n8n) step by step with Bun, Elysia, PostgreSQL and Drizzle ORM, with the database schema and workflow engine done, and the API, queues and deployment next. I'm looking for opportunities to learn from and contribute to a team.",
  avatarUrl: "/me.webp",
  skills,
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
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
  projects: [
    {
      title: "n8n Clone",
      href: "https://github.com/samchinmaya/n8n",
      dates: "In progress · Oct 2026",
      active: true,
      description:
        "A workflow automation tool inspired by n8n, built from scratch in TypeScript. Users connect nodes like HTTP Request or Telegram on a canvas and run them by click, webhook or cron schedule.\n\n" +
        "- **Done:** PostgreSQL schema with Drizzle ORM (users, workflows, credentials, executions), ArkType validation, and a workflow engine that finds the trigger, follows the edges and passes each node's output to the next (Manual Trigger, HTTP Request and Set nodes)\n" +
        "- **Next:** Elysia REST API with Swagger docs, BullMQ + Redis workers, better-auth login, React Flow editor\n" +
        "- **Deploy:** Docker on AWS EC2 with GitHub Actions CI/CD",
      technologies: [
        "TypeScript",
        "Bun",
        "Elysia",
        "PostgreSQL",
        "Drizzle ORM",
        "ArkType",
        "Redis",
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
      title: "Crypto Exchange",
      href: "",
      dates: "Upcoming · Oct 2026",
      active: false,
      description:
        "Planned, not started yet: a centralized crypto exchange that uses fake money, built after the n8n clone.\n\n" +
        "- **V1:** in-memory matching engine with price-time priority, limit and market orders, locked/available balances, Redis queues, live order book over WebSockets\n" +
        "- **V2:** multiple markets, maker/taker fees, candles and tickers, crash recovery, signed API keys for trading bots\n" +
        "- **Infra:** Docker, Kubernetes and CI/CD on AWS",
      technologies: [
        "TypeScript",
        "Bun",
        "Redis",
        "WebSockets",
        "React",
        "Docker",
        "Kubernetes",
        "AWS",
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
} as const;
