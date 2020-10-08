from django.urls import path

from .views import (
    DetailCategory,
    ListCategory,
    CreateCategory,
    UpdateCategory,
    DeleteCategory
)

# URLS for categories:
urlpatterns = [
    path('', ListCategory.as_view()),
    path('create/', CreateCategory.as_view()),
    path('<pk>/', DetailCategory.as_view()),
    path('update/<pk>/', UpdateCategory.as_view()),
    path('delete/<pk>/', DeleteCategory.as_view())
]
