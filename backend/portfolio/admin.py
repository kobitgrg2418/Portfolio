from django.contrib import admin

from .models import (
    ContactChannel,
    ContactMessage,
    Profile,
    Project,
    Skill,
    SkillCategory,
    TechChip,
    TimelineItem,
)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


from django import forms


class ProfileAdminForm(forms.ModelForm):
    about_paragraphs = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 10, "cols": 80}),
        help_text="Enter one paragraph per line. Each line will become a separate paragraph on the site.",
        required=False,
    )
    stats = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5, "cols": 80}),
        help_text="Enter one stat per line in format: 'number|label'. Example: '7+|Tools & frameworks'",
        required=False,
    )

    class Meta:
        model = Profile
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Pre-fill textarea: join the list into one-paragraph-per-line
        if self.instance and isinstance(self.instance.about_paragraphs, list):
            self.fields["about_paragraphs"].initial = "\n\n".join(
                self.instance.about_paragraphs
            )
        if self.instance and isinstance(self.instance.stats, list):
            # Convert list of dicts to "num|label" format
            stats_text = []
            for stat in self.instance.stats:
                if isinstance(stat, dict):
                    num = stat.get("num", "")
                    label = stat.get("label", "")
                    stats_text.append(f"{num}|{label}")
            self.fields["stats"].initial = "\n".join(stats_text)

    def clean_about_paragraphs(self):
        raw = self.cleaned_data.get("about_paragraphs", "")
        # Split on blank lines so users can separate paragraphs with an empty line
        import re
        paragraphs = [p.strip() for p in re.split(r"\n\s*\n", raw) if p.strip()]
        return paragraphs

    def clean_stats(self):
        raw = self.cleaned_data.get("stats", "")
        # Convert "num|label" format to list of dicts
        stats = []
        for line in raw.split("\n"):
            line = line.strip()
            if line and "|" in line:
                parts = line.split("|", 1)
                stats.append({"num": parts[0].strip(), "label": parts[1].strip()})
        return stats


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    form = ProfileAdminForm
    list_display = ("name", "email", "status_line")



@admin.register(TechChip)
class TechChipAdmin(admin.ModelAdmin):
    list_display = ("label", "order")


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("number", "name", "icon", "order")
    inlines = [SkillInline]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "variant", "badge", "order")


@admin.register(TimelineItem)
class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ("meta", "title", "order")


@admin.register(ContactChannel)
class ContactChannelAdmin(admin.ModelAdmin):
    list_display = ("kind", "label", "value", "order")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    readonly_fields = ("name", "email", "subject", "message", "created_at")
