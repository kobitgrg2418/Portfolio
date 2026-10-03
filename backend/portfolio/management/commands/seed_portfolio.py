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
            watermark_sub="Full Stack",
            tagline="Full Stack Developer",
            hero_title_rows=[["Hello,", "I'm"], ["Kobit."]],
            currently_building_label="// currently building",
            currently_building="Duluwa art a self made website and paintings from scratch.",
            open_to="Open to opportunities",
            about_eyebrow="About · 01",
            about_title_html="A student-builder turning curiosity into shipped software.",
            about_paragraphs=[
                "I'm a passionate Full-Stack Developer specializing in Django and Next.js, building modern, scalable, and high-performance web applications.",
                "I enjoy working across the entire stack, from designing robust backend systems and REST APIs with Django to creating fast, responsive, and intuitive interfaces with Next.js.",
                "What excites me most is turning ideas into complete digital products. I focus on clean architecture, reusable components, efficient APIs, database design, and seamless frontend-backend integration while continuously exploring better ways to build and ship software.",
                "Driven by curiosity and a strong problem-solving mindset, I aim to create web applications that are reliable, maintainable, performant, and enjoyable to use.",
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
            footer_tagline="Kobit Gurung. full-stack developer building intelligent, useful, beautiful software. Currently open to opportunities.",
            meta_title="Kobit Gurung",
            meta_description="Full Stack Developer",
            email="kobitgrg22@gmail.com",
            github_url="https://github.com/kobitgrg2418",
            linkedin_url="https://linkedin.com/in/",
        )

        self._attach_if_exists(profile, "resume", REPO_ROOT / "Kobit_Gurung_CV.pdf")
        self._attach_if_exists(profile, "robot", REPO_ROOT / "assets" / "robot.fbx")
        profile.save()

        chips = [
            "Python",
            "django",
            "next.js",
            "React",
            "Tailwind",
            "JavaScript",
            "Java",
            "JSP / Servlets",
            "Git",
        ]
        TechChip.objects.bulk_create([TechChip(label=c, order=i) for i, c in enumerate(chips)])

        categories = [
            ("// 02", "Frontend", "frontend", ["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML / CSS"]),
            ("// 03", "Backend", "backend", ["Java", "JSP / Servlets", "REST APIs", "Django"]),
            ("// 04", "Tools", "tools", ["Git / GitHub", "antigravity", "VS Code", "IntelliJ IDEA", "Vercel"]),
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
                    meta="Sep 22, 2025 - Present",
                    title="Everacy",
                    subtitle="Full Stack Developer",
                    body="Currently working as a full stack developer at Everacy, building and maintaining web applications using modern technologies.",
                ),
                TimelineItem(
                    order=1,
                    meta="2026",
                    title="Duluwa_art",
                    subtitle="self made art gallery",
                    body="demo web from scratch",
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
