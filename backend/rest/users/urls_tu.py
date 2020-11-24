from django.urls import path

from .views import (
    Login,
    UserList, 
    UserCreate, 
    UserDetail,
    UserUpdate,
)

urlpatterns = [
    path('', UserList.as_view()),
    path('create/', UserCreate.as_view()),
    path('get/<pk>/', UserDetail.as_view()),
    path('update/<pk>/', UserUpdate.as_view()),

]
