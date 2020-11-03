from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from .serializers import (
    IngredientSerializer,
    CreateIngredientSerializer,
    UpdateIngredientSerializer,
    DeleteIngredientSerializer
)

from .models import Ingredient
from rest_framework.views import APIView
from rest_framework.response import Response

# Views for ingredients:
# --------------------------------CRUD --------------------------------#

# Retrieve operations view
class DetailIngredient(RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

# List operations view
class ListIngredient(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

# List operations view for additional ingredients
class ListIngredient_Additional(ListAPIView):
    queryset = Ingredient.objects.filter(additionalIngredient = True)
    serializer_class = IngredientSerializer

# List operations view for basic ingredients
class ListIngredient_Basic(ListAPIView):
    queryset = Ingredient.objects.filter(additionalIngredient = False)
    serializer_class = IngredientSerializer

# Create operations view
class CreateIngredient(ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = CreateIngredientSerializer

# Update operations view
class UpdateIngredient(UpdateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = UpdateIngredientSerializer

# Delete operations view
class DeleteIngredient(DestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = DeleteIngredientSerializer