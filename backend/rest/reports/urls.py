from django.urls import path

from .views import (
    MostSelledProducts,
    HoursWithMoreSales
)

# URLS for reports:
urlpatterns = [
    path('1/', MostSelledProducts.as_view()),
    path('2/', HoursWithMoreSales.as_view())
]