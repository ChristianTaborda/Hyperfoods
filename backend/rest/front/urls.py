# urls.py 
from django.urls import path
from django.views.generic.base import TemplateView

from .views import (
    Frontend
)

urlpatterns = [
path("", Frontend.as_view()),
path('custom-service-worker.js', TemplateView.as_view(template_name="custom-service-worker.js", 
    content_type='application/javascript'), name='custom-service-worker.js'),
]