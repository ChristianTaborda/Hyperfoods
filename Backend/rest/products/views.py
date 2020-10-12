from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from .serializers import (
    ProductSerializer,
    CreateProductSerializer,
    UpdateProductSerializer,
    DeleteProductSerializer
)

from .models import Product
from rest_framework.views import APIView
from rest_framework.response import Response

# Views for categories:
# --------------------------------CRUD --------------------------------#

# Retrieve operations view
class DetailProduct(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# List operations view
class ListProduct(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# List operations view by category
class ListProduct_Category(ListAPIView):

    def get_queryset(self):
        products = Product.objects.filter(
        categoryProduct = self.kwargs['categoryProduct']
        )
        return products

    serializer_class = ProductSerializer

# Create operations view
class CreateProduct(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = CreateProductSerializer

# Update operations view
class UpdateProduct(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = UpdateProductSerializer

# Delete operations view
class DeleteProduct(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = DeleteProductSerializer