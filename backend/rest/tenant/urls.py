from django.urls import path

from .views import (
    ListTenant,
    ListDomain,
    CreateTenant
)

urlpatterns = [

    path('', ListTenant.as_view()),
    path('domain/', ListDomain.as_view()),
    path("create/", CreateTenant.as_view())

]
