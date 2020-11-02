from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from .serializers import (
    CategorySerializer,
    CreateCategorySerializer,
    UpdateCategorySerializer,
    DeleteCategorySerializer
)

from .models import Category
from rest_framework.views import APIView
from rest_framework.response import Response

# Views for categories:
# --------------------------------CRUD --------------------------------#

# Retrieve operations view
class DetailCategory(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# List operations view
class ListCategory(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Create operations view
class CreateCategory(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CreateCategorySerializer

# Update operations view
class UpdateCategory(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = UpdateCategorySerializer

# Delete operations view
class DeleteCategory(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = DeleteCategorySerializer
