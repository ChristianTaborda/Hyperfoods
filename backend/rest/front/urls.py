# urls.py
from django.urls import path

from .views import (
    Frontend
)

urlpatterns = [
path("", Frontend.as_view()),
]