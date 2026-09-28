import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { Nodejs } from "@/components/ui/svgs/nodejs";

type Skill = {
  name: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const skills: Skill[] = [
  { name: "JavaScript" },
  { name: "Node.js", icon: Nodejs },
  { name: "Express" },
  { name: "MongoDB" },
  { name: "Mongoose" },
  { name: "REST APIs" },
  { name: "JWT Auth" },
  { name: "Cloudinary" },
  { name: "Git & GitHub" },
];

export const DATA = {
  name: "Chinmaya Samantara",
  initials: "CS",
  url: "https://samchinmaya.github.io",
  location: "",
  locationLink: "",
  description:
    "Backend developer who learns by building. Currently building VideoTube, a YouTube-style video platform backend.",
  summary:
    "I like working on what happens behind the screen. I take products millions of people use every day and rebuild their core from scratch — it's the best way I know to properly learn authentication, data modelling, file uploads and API design. Right now I'm growing [VideoTube](https://github.com/samchinmaya/video-tube) feature by feature with Node.js, Express and MongoDB, and I'm looking for opportunities to learn from and contribute to a team.",
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
      href: "https://github.com/samchinmaya/video-tube",
      dates: "Sep 2026 - Present",
      active: true,
      description:
        "The backend of a YouTube-style video platform. User registration with avatar and cover image uploads (Multer → Cloudinary), login, logout and token refresh with JWT access and refresh tokens in httpOnly cookies, bcrypt password hashing, auth middleware for protected routes, and a video model with paginated feeds via aggregation. Next up: video uploads, comments, likes and subscriptions.",
      technologies: [
        "Node.js",
        "Express 5",
        "MongoDB",
        "Mongoose",
        "JWT",
        "bcrypt",
        "Multer",
        "Cloudinary",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/samchinmaya/video-tube",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
} as const;
