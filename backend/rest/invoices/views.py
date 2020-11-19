from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from .serializers import (
    InvoiceSerializer,
    CreateInvoiceSerializer,
    UpdateInvoiceSerializer,
    DeleteInvoiceSerializer
)

from .models import Invoice
from rest_framework.views import APIView
from rest_framework.response import Response

# Views for invoices:
# --------------------------------CRUD --------------------------------#

# Retrieve operations view
class DetailInvoice(RetrieveAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# List operations view
class ListInvoice(ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# List operations view by client
class ListInvoice_Client(ListAPIView):

    def get_queryset(self):
        invoices = Invoice.objects.filter(
        clientInvoice = self.kwargs['clientInvoice']
        )
        return invoices

    serializer_class = InvoiceSerializer

# Create operations view
class CreateInvoice(ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = CreateInvoiceSerializer

# Update operations view
class UpdateInvoice(UpdateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = UpdateInvoiceSerializer

# Delete operations view
class DeleteInvoice(DestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = DeleteInvoiceSerializer


    