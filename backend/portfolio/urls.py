from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health),
    path("portfolio/", views.portfolio),
    path("contact/", views.contact),
]
