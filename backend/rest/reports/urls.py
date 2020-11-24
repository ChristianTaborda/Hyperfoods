from django.urls import path

from .views import (
    MostSelledProducts
)

# URLS for reports:
urlpatterns = [
    path('1/', MostSelledProducts.as_view())
]