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
      title: "n8n Clone (Workflow Automation)",
      href: "https://github.com/samchinmaya/n8n",
      dates: "Oct 2026 - Present",
      active: true,
      description:
        "A workflow automation tool inspired by n8n, built from scratch in TypeScript on Bun. Users connect nodes (HTTP Request, Telegram, If...) on a canvas, and a trigger (manual, webhook or cron) runs them in order, passing each node's output to the next. Done so far: the PostgreSQL schema with Drizzle ORM (users, workflows, encrypted credentials, execution history with status and trigger enums, cascading deletes), workflow graphs stored as typed JSONB, and node/edge validation with ArkType, which provides both runtime checks and TypeScript types. In progress: the execution engine, an Elysia REST API with Swagger docs, BullMQ + Redis background workers, better-auth login, a React Flow editor, and deployment on AWS EC2 with Docker and GitHub Actions.",
      technologies: [
        "TypeScript",
        "Bun",
        "Elysia",
        "PostgreSQL",
        "Neon",
        "Drizzle ORM",
        "ArkType",
        "BullMQ",
        "Redis",
        "better-auth",
        "Docker",
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
  ],
} as const;
