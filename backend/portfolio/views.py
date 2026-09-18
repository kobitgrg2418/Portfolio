from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import ContactChannel, Profile, Project, SkillCategory, TechChip, TimelineItem
from .serializers import (
    ChannelSerializer,
    ContactMessageSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
    TimelineSerializer,
)


@api_view(["GET"])
@permission_classes([AllowAny])
def health(_request):
    return Response({"ok": True})


@api_view(["GET"])
@permission_classes([AllowAny])
def portfolio(request):
    profile = Profile.objects.first()
    if not profile:
        return Response({"detail": "Portfolio is not seeded yet."}, status=status.HTTP_404_NOT_FOUND)
    payload = {
        "profile": ProfileSerializer(profile, context={"request": request}).data,
        "tech_chips": list(TechChip.objects.values_list("label", flat=True)),
        "skill_categories": SkillCategorySerializer(
            SkillCategory.objects.prefetch_related("skills"), many=True
        ).data,
        "projects": ProjectSerializer(
            Project.objects.all(), many=True, context={"request": request}
        ).data,
        "timeline": TimelineSerializer(TimelineItem.objects.all(), many=True).data,
        "channels": ChannelSerializer(ContactChannel.objects.all(), many=True).data,
    }
    return Response(payload)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return Response({"success": True})
