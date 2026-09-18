from rest_framework import serializers

from .models import ContactMessage, Profile, Project, SkillCategory, TimelineItem, ContactChannel


class ProfileSerializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()
    robot_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "name",
            "nav_name",
            "status_line",
            "watermark",
            "watermark_sub",
            "tagline",
            "hero_title_rows",
            "currently_building_label",
            "currently_building",
            "open_to",
            "about_eyebrow",
            "about_title_html",
            "about_paragraphs",
            "stats",
            "skills_eyebrow",
            "skills_title_html",
            "skills_sub",
            "work_eyebrow",
            "work_title_html",
            "work_sub",
            "journey_eyebrow",
            "journey_title_html",
            "journey_sub",
            "contact_eyebrow",
            "contact_title_html",
            "contact_sub",
            "footer_tagline",
            "meta_title",
            "meta_description",
            "email",
            "github_url",
            "linkedin_url",
            "resume_url",
            "robot_url",
        )

    def get_resume_url(self, obj):
        return self._abs(obj.resume)

    def get_robot_url(self, obj):
        return self._abs(obj.robot)

    def _abs(self, field):
        if not field:
            return ""
        request = self.context.get("request")
        url = field.url
        return request.build_absolute_uri(url) if request else url


class ProjectSerializer(serializers.ModelSerializer):
    preview_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "description",
            "tags",
            "url",
            "bar_url",
            "meta",
            "link_label",
            "badge",
            "badge_variant",
            "variant",
            "lines",
            "hover",
            "preview_url",
        )

    def get_preview_url(self, obj):
        if not obj.preview:
            return ""
        request = self.context.get("request")
        url = obj.preview.url
        return request.build_absolute_uri(url) if request else url


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = ("number", "name", "icon", "skills")

    def get_skills(self, instance):
        return [s.name for s in instance.skills.all()]


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineItem
        fields = ("meta", "title", "subtitle", "body")


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactChannel
        fields = ("kind", "label", "value", "href")


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("name", "email", "subject", "message")
