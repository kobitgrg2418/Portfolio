from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=120)
    nav_name = models.CharField(max_length=120)
    status_line = models.CharField(max_length=120)
    watermark = models.CharField(max_length=40)
    watermark_sub = models.CharField(max_length=40)
    tagline = models.CharField(max_length=200)
    hero_title_rows = models.JSONField(default=list)
    currently_building_label = models.CharField(max_length=80)
    currently_building = models.TextField()
    open_to = models.CharField(max_length=80)
    about_eyebrow = models.CharField(max_length=80)
    about_title_html = models.CharField(max_length=255)
    about_paragraphs = models.JSONField(default=list)
    stats = models.JSONField(default=list)
    skills_eyebrow = models.CharField(max_length=80)
    skills_title_html = models.CharField(max_length=255)
    skills_sub = models.TextField()
    work_eyebrow = models.CharField(max_length=80)
    work_title_html = models.CharField(max_length=255)
    work_sub = models.TextField()
    journey_eyebrow = models.CharField(max_length=80)
    journey_title_html = models.CharField(max_length=255)
    journey_sub = models.TextField()
    contact_eyebrow = models.CharField(max_length=80)
    contact_title_html = models.CharField(max_length=255)
    contact_sub = models.TextField()
    footer_tagline = models.TextField()
    meta_title = models.CharField(max_length=200)
    meta_description = models.TextField()
    email = models.EmailField()
    github_url = models.URLField()
    linkedin_url = models.URLField()
    resume = models.FileField(upload_to="resume/", blank=True)
    robot = models.FileField(upload_to="robot/", blank=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name


class TechChip(models.Model):
    label = models.CharField(max_length=40)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class SkillCategory(models.Model):
    number = models.CharField(max_length=20)
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=40, help_text="aiml | frontend | backend | tools")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name_plural = "Skill categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.category.name}: {self.name}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tags = models.JSONField(default=list)
    url = models.CharField(max_length=500, blank=True)
    bar_url = models.CharField(max_length=200, blank=True)
    meta = models.CharField(max_length=80)
    link_label = models.CharField(max_length=80)
    badge = models.CharField(max_length=80, blank=True)
    badge_variant = models.CharField(max_length=20, blank=True, help_text="art | default")
    variant = models.CharField(max_length=20, blank=True, help_text="featured | dev")
    lines = models.JSONField(default=list, help_text='e.g. ["wide","med","block","short","med"]')
    hover = models.BooleanField(default=False)
    preview = models.ImageField(upload_to="previews/", blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class TimelineItem(models.Model):
    meta = models.CharField(max_length=80)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    body = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class ContactChannel(models.Model):
    kind = models.CharField(max_length=40, help_text="email | github | linkedin | resume")
    label = models.CharField(max_length=40)
    value = models.CharField(max_length=200)
    href = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"
