# urls.py 
from django.urls import path
from django.views.generic.base import TemplateView

from .views import (
    Frontend
)

urlpatterns = [
path("", Frontend.as_view()),
path('sw.js', TemplateView.as_view(template_name="sw.js", 
    content_type='application/javascript'), name='sw.js'),
]