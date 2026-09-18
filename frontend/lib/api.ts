export type Stat = { num: string; label: string };

export type Profile = {
  name: string;
  nav_name: string;
  status_line: string;
  watermark: string;
  watermark_sub: string;
  tagline: string;
  hero_title_rows: string[][];
  currently_building_label: string;
  currently_building: string;
  open_to: string;
  about_eyebrow: string;
  about_title_html: string;
  about_paragraphs: string[];
  stats: Stat[];
  skills_eyebrow: string;
  skills_title_html: string;
  skills_sub: string;
  work_eyebrow: string;
  work_title_html: string;
  work_sub: string;
  journey_eyebrow: string;
  journey_title_html: string;
  journey_sub: string;
  contact_eyebrow: string;
  contact_title_html: string;
  contact_sub: string;
  footer_tagline: string;
  meta_title: string;
  meta_description: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  resume_url: string;
  robot_url: string;
};

export type SkillCategory = {
  number: string;
  name: string;
  icon: string;
  skills: string[];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  url: string;
  bar_url: string;
  meta: string;
  link_label: string;
  badge: string;
  badge_variant: string;
  variant: string;
  lines: string[];
  hover: boolean;
  preview_url: string;
};

export type TimelineItem = {
  meta: string;
  title: string;
  subtitle: string;
  body: string;
};

export type Channel = {
  kind: string;
  label: string;
  value: string;
  href: string;
};

export type PortfolioPayload = {
  profile: Profile;
  tech_chips: string[];
  skill_categories: SkillCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  channels: Channel[];
};

export const fallbackPortfolio: PortfolioPayload = {
  profile: {
    name: "Kobit Gurung",
    nav_name: "kobit gurung",
    status_line: "Available for work · 2026",
    watermark: "KOBIT",
    watermark_sub: "FULL STACK",
    tagline: "Full Stack Developer",
    hero_title_rows: [
      ["Hello,", "I'm"],
      ["Kobit."],
    ],
    currently_building_label: "// currently building",
    currently_building:
      "VivaPrep AI — a study OS that turns lecture PDFs into quizzes, flashcards & RAG-powered chat.",
    open_to: "Open to opportunities",
    about_eyebrow: "About · 01",
    about_title_html: "A student-builder turning <em>curiosity</em> into shipped software.",
    about_paragraphs: [
      "I'm passionate about software development, AI/ML, and building technology that creates real impact. I enjoy exploring how modern systems are designed — from crafting responsive full-stack apps to developing intelligent AI-driven solutions.",
      "What excites me most is the ability to adapt and learn across different areas of technology — frontend, backend architecture, UI/UX, or machine learning. I solve problems by combining creativity with technical thinking.",
      "Driven by curiosity, I aim to build digital experiences that are not only functional but also smart, intuitive, and meaningful.",
    ],
    stats: [
      { num: "1", label: "AI product in beta" },
      { num: "15+", label: "Tools & frameworks" },
      { num: "∞", label: "Curiosity loops" },
    ],
    skills_eyebrow: "Toolkit · 02",
    skills_title_html: "Tools & technologies <em>I build with.</em>",
    skills_sub: "A focused stack across the four disciplines I work in most.",
    work_eyebrow: "Selected work · 03",
    work_title_html: "Things I've <em>shipped</em> & what's next.",
    work_sub: "A focused look at what I'm building right now — and the projects forming on the bench.",
    journey_eyebrow: "Journey · 04",
    journey_title_html: "A timeline of <em>curiosity</em> &rarr; craft.",
    journey_sub: "Where I've been, what I'm learning, and where I'm taking things next.",
    contact_eyebrow: "Contact · 05",
    contact_title_html: "Let's <em>work together.</em>",
    contact_sub:
      "I'm always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out — the inbox is always on.",
    footer_tagline:
      "AI/ML student & full-stack developer building intelligent, useful, beautiful software. Currently open to opportunities.",
    meta_title: "Kobit Gurung — AI / ML + Full Stack Developer",
    meta_description:
      "Kobit Gurung — AI/ML + Full Stack Developer. Computer vision, deep learning and intelligent systems.",
    email: "kobitgrg22@gmail.com",
    github_url: "https://github.com/kobitgrg2418",
    linkedin_url: "https://linkedin.com/in/",
    resume_url: "/Kobit_Gurung_CV.pdf",
    robot_url: "/assets/robot.fbx",
  },
  tech_chips: [
    "Python",
    "PyTorch",
    "TensorFlow",
    "OpenCV",
    "React",
    "Tailwind",
    "JavaScript",
    "Java",
    "JSP / Servlets",
    "Git",
  ],
  skill_categories: [
    {
      number: "// 01",
      name: "AI / ML",
      icon: "aiml",
      skills: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NumPy", "Scikit-learn"],
    },
    {
      number: "// 02",
      name: "Frontend",
      icon: "frontend",
      skills: ["React", "JavaScript", "Tailwind CSS", "HTML / CSS"],
    },
    {
      number: "// 03",
      name: "Backend",
      icon: "backend",
      skills: ["Java", "JSP / Servlets", "REST APIs", "RAG pipelines"],
    },
    {
      number: "// 04",
      name: "Tools",
      icon: "tools",
      skills: ["Git / GitHub", "VS Code", "IntelliJ IDEA", "Vercel"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Duluwa Art — Watercolor & Sketch Portfolio",
      description:
        "A personal art portfolio built entirely from scratch — showcasing original watercolor paintings and sketch work. Every element hand-designed to reflect the organic, textured feel of traditional art.",
      tags: ["Watercolor", "Sketch Art", "Handcrafted"],
      url: "https://duluwa-art.vercel.app/",
      bar_url: "duluwa-art.vercel.app",
      meta: "Live · 2026",
      link_label: "Visit live →",
      badge: "Built from Scratch",
      badge_variant: "art",
      variant: "featured",
      lines: ["wide", "med", "block", "short", "med"],
      hover: false,
      preview_url: "/assets/previews/duluwa.webp",
    },
    {
      id: 2,
      title: "Gokyo Bistro — Restaurant Ordering Platform",
      description:
        "A full-stack ordering and reservation platform for a Nepali bistro — online menu, cart & checkout, table booking, order tracking and reviews, with JWT auth and a complete admin dashboard for managing the menu, orders and reservations. Built as an npm-workspaces monorepo.",
      tags: ["React", "TypeScript", "Express"],
      url: "https://github.com/kobitgrg2418/Retro",
      bar_url: "github.com/kobitgrg2418/Retro",
      meta: "Source · 2026",
      link_label: "View source →",
      badge: "",
      badge_variant: "",
      variant: "",
      lines: ["wide", "med", "block", "short", "med"],
      hover: false,
      preview_url: "",
    },
    {
      id: 3,
      title: "VivaPrep AI — Smart Study Platform",
      description:
        "An AI-powered study tool that turns lecture PDFs into interactive quizzes, flashcards, viva questions and interview prep — grounded in your source material with RAG-powered chat and study analytics.",
      tags: ["AI / ML", "Full Stack", "EdTech"],
      url: "https://quiz-three-cyan.vercel.app/",
      bar_url: "vivaprep.ai · /study",
      meta: "Public beta · 2026",
      link_label: "Visit live →",
      badge: "",
      badge_variant: "",
      variant: "",
      lines: ["wide", "med", "block", "short", "med"],
      hover: false,
      preview_url: "/assets/previews/vivaprep.webp",
    },
    {
      id: 4,
      title: "UML — Unified Management Layer",
      description:
        "A full-stack web application built with Next.js, Prisma ORM and Tailwind CSS — currently in active development. TypeScript-first architecture with a database-backed backend.",
      tags: ["Next.js", "TypeScript", "Prisma"],
      url: "https://github.com/kobitgrg2418/UML",
      bar_url: "github.com/kobitgrg2418/UML",
      meta: "In development · 2026",
      link_label: "View source →",
      badge: "In Development",
      badge_variant: "",
      variant: "dev",
      lines: ["med", "block", "wide", "short", "med"],
      hover: false,
      preview_url: "",
    },
    {
      id: 5,
      title: "Vision Lab — image & object pipelines",
      description:
        "A growing collection of computer-vision experiments — segmentation, 3D reconstruction prototypes and OpenCV-driven preprocessing notebooks.",
      tags: ["Computer Vision", "PyTorch"],
      url: "#",
      bar_url: "notebook · cv-pipeline.ipynb",
      meta: "Ongoing · 2025–26",
      link_label: "Case study soon →",
      badge: "",
      badge_variant: "",
      variant: "",
      lines: ["short", "block", "wide", "med", "short"],
      hover: true,
      preview_url: "",
    },
    {
      id: 6,
      title: "Coursework & full-stack experiments",
      description:
        "A working archive of the apps I build while learning — React frontends, Java/JSP backends, REST endpoints, and small UI systems. Open source on GitHub.",
      tags: ["React", "Java", "JSP"],
      url: "https://github.com/kobitgrg2418",
      bar_url: "github.com/kobitgrg2418",
      meta: "Public · GitHub",
      link_label: "Browse repos →",
      badge: "",
      badge_variant: "",
      variant: "",
      lines: ["med", "wide", "block", "short"],
      hover: false,
      preview_url: "",
    },
    {
      id: 7,
      title: "Your project, here.",
      description:
        "Got an AI / web idea you're trying to ship? I'm open to internships and freelance collaborations. Let's build something that matters.",
      tags: ["Collab", "Open"],
      url: "#contact",
      bar_url: "// next.idea",
      meta: "Available · 2026",
      link_label: "Start a chat →",
      badge: "",
      badge_variant: "",
      variant: "",
      lines: ["wide", "med", "short", "block"],
      hover: false,
      preview_url: "",
    },
  ],
  timeline: [
    {
      meta: "2026 · NOW",
      title: "VivaPrep AI — public beta",
      subtitle: "AI study OS · RAG · React + Python",
      body: "Building a study platform that turns any lecture PDF into quizzes, flashcards, viva questions and a chat grounded in the source — with analytics that track topic mastery over time.",
    },
    {
      meta: "Late 2025",
      title: "Computer Vision & deep learning",
      subtitle: "PyTorch · OpenCV · 3D Reconstruction",
      body: "Deep-diving into computer vision, model training and 3D reconstruction — the work behind the AI / ML pipelines powering my current projects.",
    },
    {
      meta: "Mid 2025",
      title: "Full-stack foundations",
      subtitle: "React · Java · JSP / Servlets",
      body: "Built responsive frontends with React & Tailwind and server-side apps in Java — learning to design end-to-end systems instead of isolated screens.",
    },
    {
      meta: "Early 2025",
      title: "First lines of code",
      subtitle: "Python · JavaScript · HTML & CSS",
      body: "Started as a student fascinated by how interfaces and intelligence are designed. Fell in love with the loop of idea → prototype → ship, and never really stopped.",
    },
  ],
  channels: [
    {
      kind: "email",
      label: "// email",
      value: "kobitgrg22@gmail.com",
      href: "mailto:kobitgrg22@gmail.com",
    },
    {
      kind: "github",
      label: "// github",
      value: "github.com/kobitgrg2418",
      href: "https://github.com/kobitgrg2418",
    },
    {
      kind: "linkedin",
      label: "// linkedin",
      value: "Let's connect",
      href: "https://linkedin.com/in/",
    },
    { kind: "resume", label: "// resume", value: "Download CV", href: "" },
  ],
};

export function apiBase() {
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
}

export async function getPortfolio(): Promise<PortfolioPayload> {
  try {
    const res = await fetch(`${apiBase()}/api/portfolio/`, { cache: "no-store" });
    if (!res.ok) throw new Error("bad status");
    return (await res.json()) as PortfolioPayload;
  } catch {
    return fallbackPortfolio;
  }
}
