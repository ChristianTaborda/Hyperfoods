from django.urls import path

from .views import (
    DetailIngredient,
    ListIngredient,
    ListIngredient_Additional,
    ListIngredient_Basic,
    CreateIngredient,
    UpdateIngredient,
    DeleteIngredient
)

# URLS for ingredients:
urlpatterns = [
    path('', ListIngredient.as_view()),
    path('create/', CreateIngredient.as_view()),
    path('additional/', ListIngredient_Additional.as_view()),
    path('basic/', ListIngredient_Basic.as_view()),
    path('<pk>/', DetailIngredient.as_view()),
    path('update/<pk>/', UpdateIngredient.as_view()),
    path('delete/<pk>/', DeleteIngredient.as_view())
]