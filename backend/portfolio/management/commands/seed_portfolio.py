from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.files import File
from pathlib import Path

from portfolio.models import (
    ContactChannel,
    Profile,
    Project,
    Skill,
    SkillCategory,
    TechChip,
    TimelineItem,
)


REPO_ROOT = Path(__file__).resolve().parents[4]


class Command(BaseCommand):
    help = "Seed portfolio content from the original static site."

    def handle(self, *args, **options):
        Profile.objects.all().delete()
        TechChip.objects.all().delete()
        SkillCategory.objects.all().delete()
        Project.objects.all().delete()
        TimelineItem.objects.all().delete()
        ContactChannel.objects.all().delete()

        profile = Profile.objects.create(
            name="Kobit Gurung",
            nav_name="kobit gurung",
            status_line="Available for work · 2026",
            watermark="KOBIT",
            watermark_sub="AI / ML",
            tagline="AI / ML · Full Stack · Computer Vision",
            hero_title_rows=[["Hello,", "I'm"], ["Kobit."]],
            currently_building_label="// currently building",
            currently_building="VivaPrep AI — a study OS that turns lecture PDFs into quizzes, flashcards & RAG-powered chat.",
            open_to="Open to opportunities",
            about_eyebrow="About · 01",
            about_title_html="A student-builder turning <em>curiosity</em> into shipped software.",
            about_paragraphs=[
                "I'm passionate about software development, AI/ML, and building technology that creates real impact. I enjoy exploring how modern systems are designed — from crafting responsive full-stack apps to developing intelligent AI-driven solutions.",
                "What excites me most is the ability to adapt and learn across different areas of technology — frontend, backend architecture, UI/UX, or machine learning. I solve problems by combining creativity with technical thinking.",
                "Driven by curiosity, I aim to build digital experiences that are not only functional but also smart, intuitive, and meaningful.",
            ],
            stats=[
                {"num": "1", "label": "AI product in beta"},
                {"num": "15+", "label": "Tools & frameworks"},
                {"num": "∞", "label": "Curiosity loops"},
            ],
            skills_eyebrow="Toolkit · 02",
            skills_title_html="Tools & technologies <em>I build with.</em>",
            skills_sub="A focused stack across the four disciplines I work in most.",
            work_eyebrow="Selected work · 03",
            work_title_html="Things I've <em>shipped</em> & what's next.",
            work_sub="A focused look at what I'm building right now — and the projects forming on the bench.",
            journey_eyebrow="Journey · 04",
            journey_title_html="A timeline of <em>curiosity</em> &rarr; craft.",
            journey_sub="Where I've been, what I'm learning, and where I'm taking things next.",
            contact_eyebrow="Contact · 05",
            contact_title_html="Let's <em>work together.</em>",
            contact_sub="I'm always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out — the inbox is always on.",
            footer_tagline="AI/ML student & full-stack developer building intelligent, useful, beautiful software. Currently open to opportunities.",
            meta_title="Kobit Gurung — AI / ML + Full Stack Developer",
            meta_description="Kobit Gurung — AI/ML + Full Stack Developer. Computer vision, deep learning and intelligent systems.",
            email="kobitgrg22@gmail.com",
            github_url="https://github.com/kobitgrg2418",
            linkedin_url="https://linkedin.com/in/",
        )

        self._attach_if_exists(profile, "resume", REPO_ROOT / "Kobit_Gurung_CV.pdf")
        self._attach_if_exists(profile, "robot", REPO_ROOT / "assets" / "robot.fbx")
        profile.save()

        chips = [
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
        ]
        TechChip.objects.bulk_create([TechChip(label=c, order=i) for i, c in enumerate(chips)])

        categories = [
            ("// 01", "AI / ML", "aiml", ["Python", "TensorFlow", "PyTorch", "OpenCV", "NumPy", "Scikit-learn"]),
            ("// 02", "Frontend", "frontend", ["React", "JavaScript", "Tailwind CSS", "HTML / CSS"]),
            ("// 03", "Backend", "backend", ["Java", "JSP / Servlets", "REST APIs", "RAG pipelines"]),
            ("// 04", "Tools", "tools", ["Git / GitHub", "VS Code", "IntelliJ IDEA", "Vercel"]),
        ]
        for i, (number, name, icon, skills) in enumerate(categories):
            cat = SkillCategory.objects.create(number=number, name=name, icon=icon, order=i)
            Skill.objects.bulk_create([Skill(category=cat, name=s, order=j) for j, s in enumerate(skills)])

        projects = [
            {
                "title": "Duluwa Art — Watercolor & Sketch Portfolio",
                "description": "A personal art portfolio built entirely from scratch — showcasing original watercolor paintings and sketch work. Every element hand-designed to reflect the organic, textured feel of traditional art.",
                "tags": ["Watercolor", "Sketch Art", "Handcrafted"],
                "url": "https://duluwa-art.vercel.app/",
                "bar_url": "duluwa-art.vercel.app",
                "meta": "Live · 2026",
                "link_label": "Visit live →",
                "badge": "Built from Scratch",
                "badge_variant": "art",
                "variant": "featured",
                "lines": ["wide", "med", "block", "short", "med"],
                "preview_name": "duluwa.webp",
            },
            {
                "title": "Gokyo Bistro — Restaurant Ordering Platform",
                "description": "A full-stack ordering and reservation platform for a Nepali bistro — online menu, cart & checkout, table booking, order tracking and reviews, with JWT auth and a complete admin dashboard for managing the menu, orders and reservations. Built as an npm-workspaces monorepo.",
                "tags": ["React", "TypeScript", "Express"],
                "url": "https://github.com/kobitgrg2418/Retro",
                "bar_url": "github.com/kobitgrg2418/Retro",
                "meta": "Source · 2026",
                "link_label": "View source →",
                "badge": "",
                "badge_variant": "",
                "variant": "",
                "lines": ["wide", "med", "block", "short", "med"],
            },
            {
                "title": "VivaPrep AI — Smart Study Platform",
                "description": "An AI-powered study tool that turns lecture PDFs into interactive quizzes, flashcards, viva questions and interview prep — grounded in your source material with RAG-powered chat and study analytics.",
                "tags": ["AI / ML", "Full Stack", "EdTech"],
                "url": "https://quiz-three-cyan.vercel.app/",
                "bar_url": "vivaprep.ai · /study",
                "meta": "Public beta · 2026",
                "link_label": "Visit live →",
                "badge": "",
                "badge_variant": "",
                "variant": "",
                "lines": ["wide", "med", "block", "short", "med"],
                "preview_name": "vivaprep.webp",
            },
            {
                "title": "UML — Unified Management Layer",
                "description": "A full-stack web application built with Next.js, Prisma ORM and Tailwind CSS — currently in active development. TypeScript-first architecture with a database-backed backend.",
                "tags": ["Next.js", "TypeScript", "Prisma"],
                "url": "https://github.com/kobitgrg2418/UML",
                "bar_url": "github.com/kobitgrg2418/UML",
                "meta": "In development · 2026",
                "link_label": "View source →",
                "badge": "In Development",
                "badge_variant": "",
                "variant": "dev",
                "lines": ["med", "block", "wide", "short", "med"],
            },
            {
                "title": "Vision Lab — image & object pipelines",
                "description": "A growing collection of computer-vision experiments — segmentation, 3D reconstruction prototypes and OpenCV-driven preprocessing notebooks.",
                "tags": ["Computer Vision", "PyTorch"],
                "url": "#",
                "bar_url": "notebook · cv-pipeline.ipynb",
                "meta": "Ongoing · 2025–26",
                "link_label": "Case study soon →",
                "badge": "",
                "badge_variant": "",
                "variant": "",
                "lines": ["short", "block", "wide", "med", "short"],
                "hover": True,
            },
            {
                "title": "Coursework & full-stack experiments",
                "description": "A working archive of the apps I build while learning — React frontends, Java/JSP backends, REST endpoints, and small UI systems. Open source on GitHub.",
                "tags": ["React", "Java", "JSP"],
                "url": "https://github.com/kobitgrg2418",
                "bar_url": "github.com/kobitgrg2418",
                "meta": "Public · GitHub",
                "link_label": "Browse repos →",
                "badge": "",
                "badge_variant": "",
                "variant": "",
                "lines": ["med", "wide", "block", "short"],
            },
            {
                "title": "Your project, here.",
                "description": "Got an AI / web idea you're trying to ship? I'm open to internships and freelance collaborations. Let's build something that matters.",
                "tags": ["Collab", "Open"],
                "url": "#contact",
                "bar_url": "// next.idea",
                "meta": "Available · 2026",
                "link_label": "Start a chat →",
                "badge": "",
                "badge_variant": "",
                "variant": "",
                "lines": ["wide", "med", "short", "block"],
            },
        ]
        for i, data in enumerate(projects):
            preview_name = data.pop("preview_name", None)
            hover = data.pop("hover", False)
            project = Project.objects.create(order=i, hover=hover, **data)
            if preview_name:
                self._attach_if_exists(project, "preview", REPO_ROOT / "assets" / "previews" / preview_name)
                project.save()

        TimelineItem.objects.bulk_create(
            [
                TimelineItem(
                    order=0,
                    meta="2026 · NOW",
                    title="VivaPrep AI — public beta",
                    subtitle="AI study OS · RAG · React + Python",
                    body="Building a study platform that turns any lecture PDF into quizzes, flashcards, viva questions and a chat grounded in the source — with analytics that track topic mastery over time.",
                ),
                TimelineItem(
                    order=1,
                    meta="Late 2025",
                    title="Computer Vision & deep learning",
                    subtitle="PyTorch · OpenCV · 3D Reconstruction",
                    body="Deep-diving into computer vision, model training and 3D reconstruction — the work behind the AI / ML pipelines powering my current projects.",
                ),
                TimelineItem(
                    order=2,
                    meta="Mid 2025",
                    title="Full-stack foundations",
                    subtitle="React · Java · JSP / Servlets",
                    body="Built responsive frontends with React & Tailwind and server-side apps in Java — learning to design end-to-end systems instead of isolated screens.",
                ),
                TimelineItem(
                    order=3,
                    meta="Early 2025",
                    title="First lines of code",
                    subtitle="Python · JavaScript · HTML & CSS",
                    body="Started as a student fascinated by how interfaces and intelligence are designed. Fell in love with the loop of idea → prototype → ship, and never really stopped.",
                ),
            ]
        )

        ContactChannel.objects.bulk_create(
            [
                ContactChannel(
                    order=0,
                    kind="email",
                    label="// email",
                    value="kobitgrg22@gmail.com",
                    href="mailto:kobitgrg22@gmail.com",
                ),
                ContactChannel(
                    order=1,
                    kind="github",
                    label="// github",
                    value="github.com/kobitgrg2418",
                    href="https://github.com/kobitgrg2418",
                ),
                ContactChannel(
                    order=2,
                    kind="linkedin",
                    label="// linkedin",
                    value="Let's connect",
                    href="https://linkedin.com/in/",
                ),
                ContactChannel(
                    order=3,
                    kind="resume",
                    label="// resume",
                    value="Download CV",
                    href="",
                ),
            ]
        )

        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "kobitgrg22@gmail.com", "admin")
            self.stdout.write(self.style.WARNING("Created admin user admin / admin (change this)."))

        self.stdout.write(self.style.SUCCESS("Seeded portfolio content."))

    def _attach_if_exists(self, instance, field_name, path: Path):
        if not path.exists():
            return
        with path.open("rb") as fh:
            getattr(instance, field_name).save(path.name, File(fh), save=False)
