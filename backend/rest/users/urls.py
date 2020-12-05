from django.urls import path

from .views import (

    Login,
    RequestPasswordResetView,
    PasswordResetView,
    
    UserList, 
    UserCreate, 
    UserDetail,
    UserUpdate,

    ClientList, 
    ClientCreate,
    ClientDetail,
    ClientUpdate,
    
    ClientSingleList,
    ClientSingleCreate,
    ClientSingleDetail,
    ClientSingleUpdate,
    #CreateMultipleClient,
    WorkerList,
    WorkerCreate,
    WorkerDetail,
    WorkerUpdate,

    WorkerSingleList,
    WorkerSingleDetail,
    CreateSingleWorker,
    WorkerSingleUpdate,
    #DeleteClient,

)

urlpatterns = [

    path('', UserList.as_view()),
    path('create/', UserCreate.as_view()),
    path('get/<pk>/', UserDetail.as_view()),
    path('update/<pk>/', UserUpdate.as_view()),
    path('request-password-reset/', RequestPasswordResetView.as_view()),
    path('password-reset/', PasswordResetView.as_view()),


    path('client/', ClientList.as_view()),
    path('client/create/', ClientCreate.as_view()),
    path('client/get/<pk>/', ClientDetail.as_view()),
    path('client/update/<pk>/', ClientUpdate.as_view()),
    path('client-single/', ClientSingleList.as_view()),
    path('client-single/create/', ClientSingleCreate.as_view()),
    path('client-single/get/<pk>/', ClientSingleDetail.as_view()),
    path('client-single/update/<pk>/', ClientSingleUpdate.as_view()),
    path('client/login/', Login.as_view()),

    path('worker/', WorkerList.as_view()),
    path('worker/create/', WorkerCreate.as_view()),
    path('worker/get/<pk>/', WorkerDetail.as_view()),
    path('worker/update/<pk>/', WorkerUpdate.as_view()),
    path('worker-single/', WorkerSingleList.as_view()),
    path('worker-single/create/', CreateSingleWorker.as_view()),
    path('worker-single/get/<pk>/', WorkerSingleDetail.as_view()),
    path('worker-single/update/<pk>/', WorkerSingleUpdate.as_view()),
    path('worker/login/', Login.as_view()),



]
