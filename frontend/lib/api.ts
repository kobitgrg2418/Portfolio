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
    currently_building: "Duluwa art a self made website and paintings from scratch.",
    open_to: "Open to opportunities",
    about_eyebrow: "About · 01",
    about_title_html: "A student-builder turning <em>curiosity</em> into shipped software.",
    about_paragraphs: [
      "I'm a passionate Full-Stack Developer specializing in Django and Next.js, building modern, scalable, and high-performance web applications.",
      "I enjoy working across the entire stack, from designing robust backend systems and REST APIs with Django to creating fast, responsive, and intuitive interfaces with Next.js.",
      "What excites me most is turning ideas into complete digital products. I focus on clean architecture, reusable components, efficient APIs, database design, and seamless frontend-backend integration while continuously exploring better ways to build and ship software.",
      "Driven by curiosity and a strong problem-solving mindset, I aim to create web applications that are reliable, maintainable, performant, and enjoyable to use.",
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
      "full-stack developer building intelligent, useful, beautiful software. Currently open to opportunities.",
    meta_title: "Kobit Gurung — Full Stack Developer",
    meta_description:
      "Kobit Gurung — Full Stack Developer. Computer vision, deep learning and intelligent systems.",
    email: "kobitgrg22@gmail.com",
    github_url: "https://github.com/kobitgrg2418",
    linkedin_url: "https://linkedin.com/in/",
    resume_url: "/Kobit_Gurung_CV.pdf",
    robot_url: "/assets/robot.fbx",
  },
  tech_chips: ["Python", "django", "next.js", "React", "Tailwind", "JavaScript", "Java", "JSP / Servlets", "Git"],
  skill_categories: [
    {
      number: "// 02",
      name: "Frontend",
      icon: "frontend",
      skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML / CSS"],
    },
    {
      number: "// 03",
      name: "Backend",
      icon: "backend",
      skills: ["Java", "JSP / Servlets", "REST APIs", "Django"],
    },
    {
      number: "// 04",
      name: "Tools",
      icon: "tools",
      skills: ["Git / GitHub", "antigravity", "VS Code", "IntelliJ IDEA", "Vercel"],
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
      meta: "2026",
      title: "Duluwa_art",
      subtitle: "self made art gallery",
      body: "demo web from scratch",
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
    const res = await fetch(`${apiBase()}/api/portfolio/`);
    if (!res.ok) throw new Error("bad status");
    return (await res.json()) as PortfolioPayload;
  } catch {
    return fallbackPortfolio;
  }
}
