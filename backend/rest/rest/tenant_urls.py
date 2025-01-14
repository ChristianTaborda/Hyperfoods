"""rest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

urlpatterns = [
    path('api/', include('rest_framework.urls')),
    path('api/users/', include('users.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/ingredients/', include('ingredients.urls')),
    path('api/products/', include('products.urls')),
    path('api/combos/', include('combos.urls')),
    path('api/invoices/', include('invoices.urls')),
    path('api/reports/', include('reports.urls')),
    url(r'^', include('front.urls'))
]
handler404 = 'front.views.handler404'

