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
    "Backend-focused developer who learns by building. Currently building VideoTube, a full-stack YouTube-style video platform.",
  summary:
    "I like working on what happens behind the screen. I take products millions of people use every day and rebuild their core from scratch — it's the best way I know to properly learn authentication, data modelling, file uploads and API design. Right now I'm growing [VideoTube](https://github.com/samchinmaya/video-tube) feature by feature, with a Node.js, Express and MongoDB API and a React + TypeScript frontend, and I'm looking for opportunities to learn from and contribute to a team.",
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
      title: "VideoTube",
      href: "https://samchinmaya.github.io/video-tube/",
      dates: "Sep 2026 - Present",
      active: true,
      description:
        "A full-stack YouTube-style video platform. The Express + MongoDB API handles registration with avatar and cover image uploads (Multer → Cloudinary), JWT access and refresh tokens in httpOnly cookies, profile and password updates, channel profiles with subscriber counts built from aggregation pipelines, and subscribe/unsubscribe. The React + TypeScript frontend has home, search, watch, channel, upload and settings pages, protected routes, and automatic token refresh on expired sessions. Next up: backend routes for video uploads, comments, likes and watch history (the frontend uses sample data for these for now).",
      technologies: [
        "Node.js",
        "Express 5",
        "MongoDB",
        "Mongoose",
        "JWT",
        "bcrypt",
        "Multer",
        "Cloudinary",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
      ],
      links: [
        {
          type: "Website",
          href: "https://samchinmaya.github.io/video-tube/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/samchinmaya/video-tube",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/videotube.jpg",
      video: "",
    },
  ],
} as const;
