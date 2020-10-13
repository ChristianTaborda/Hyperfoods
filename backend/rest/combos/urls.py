from django.urls import path

from .views import (
    DetailCombo,
    ListCombo,
    CreateCombo,
    UpdateCombo,
    DeleteCombo
)

# URLS for combos:
urlpatterns = [
    path('', ListCombo.as_view()),
    path('create/', CreateCombo.as_view()),
    path('<pk>/', DetailCombo.as_view()),
    path('update/<pk>/', UpdateCombo.as_view()),
    path('delete/<pk>/', DeleteCombo.as_view())
]