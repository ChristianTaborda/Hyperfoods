from django.urls import path

from .views import (
    DetailProduct,
    ListProduct,
    ListProduct_Category,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
)

# URLS for products:
urlpatterns = [
    path('', ListProduct.as_view()),
    path('create/', CreateProduct.as_view()),
    #path('image/', ImageProduct.as_view()),
    path('<pk>/', DetailProduct.as_view()),
    path('update/<pk>/', UpdateProduct.as_view()),
    path('delete/<pk>/', DeleteProduct.as_view()),
    path('category/<categoryProduct>', ListProduct_Category.as_view()),
]