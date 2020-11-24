from django.urls import path

from .views import (
    MostSelledProducts,
    HoursWithMoreSales,
    ClientsWithMorePurchases,
    ZonesWithMorePurchases
)

# URLS for reports:
urlpatterns = [
    path('1/', MostSelledProducts.as_view()),
    path('2/', HoursWithMoreSales.as_view()),
    path('3/', ClientsWithMorePurchases.as_view()),
    path('4/', ZonesWithMorePurchases.as_view())
]