import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";

type Skill = {
  name: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const skills: Skill[] = [
  { name: "JavaScript" },
  { name: "TypeScript", icon: Typescript },
  { name: "Node.js", icon: Nodejs },
  { name: "Express" },
  { name: "Bun" },
  { name: "PostgreSQL" },
  { name: "Drizzle ORM" },
  { name: "MongoDB" },
  { name: "Mongoose" },
  { name: "REST APIs" },
  { name: "JWT Auth" },
  { name: "Cloudinary" },
  { name: "React", icon: ReactLight },
  { name: "Tailwind CSS" },
  { name: "Git & GitHub" },
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
    "I like working on what happens behind the screen. I take products millions of people use every day and rebuild their core from scratch — it's the best way I know to properly learn authentication, data modelling, file uploads and API design. Right now I'm building an [n8n clone](https://github.com/samchinmaya/n8n) step by step with Bun, Elysia, PostgreSQL and Drizzle ORM, starting with the database schema and moving on to the workflow engine, queues and deployment. I'm looking for opportunities to learn from and contribute to a team.",
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
        "A workflow automation tool inspired by n8n, built from scratch in TypeScript. Users connect nodes like HTTP Request or Telegram on a canvas and run them by click, webhook or cron schedule. Done: the PostgreSQL schema with Drizzle ORM and ArkType validation. Next: the execution engine, REST API, Redis queue workers and AWS deployment.",
      technologies: ["TypeScript", "Bun", "Elysia", "PostgreSQL", "Drizzle ORM", "Redis", "AWS"],
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
        "Planned: a centralized crypto exchange that uses fake money. It will have an in-memory matching engine with price-time priority, limit and market orders, Redis queues between services, a live order book over WebSockets, crash recovery, and deployment on AWS with Kubernetes.",
      technologies: ["TypeScript", "Bun", "Redis", "WebSockets", "React", "AWS"],
      links: [],
      image: "",
      video: "",
    },
  ],
} as const;
