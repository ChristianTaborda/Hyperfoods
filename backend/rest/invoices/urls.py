from django.urls import path

from .views import (
    DetailInvoice,
    ListInvoice,
    ListInvoice_Client,
    CreateInvoice,
    UpdateInvoice,
    DeleteInvoice,
)

# URLS for invoices:
urlpatterns = [
    path('', ListInvoice.as_view()),
    path('create/', CreateInvoice.as_view()),
    path('<pk>/', DetailInvoice.as_view()),
    path('update/<pk>/', UpdateInvoice.as_view()),
    path('delete/<pk>/', DeleteInvoice.as_view()),
    path('client/<clientInvoice>', ListInvoice_Client.as_view()),
]