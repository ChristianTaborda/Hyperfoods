from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from .serializers import (
    ComboSerializer,
    CreateComboSerializer,
    UpdateComboSerializer,
    DeleteComboSerializer
)

from .models import Combo
from rest_framework.views import APIView
from rest_framework.response import Response

# Views for combos:
# --------------------------------CRUD --------------------------------#

# Retrieve operations view
class DetailCombo(RetrieveAPIView):
    queryset = Combo.objects.all()
    serializer_class = ComboSerializer

# List operations view
class ListCombo(ListAPIView):
    queryset = Combo.objects.all()
    serializer_class = ComboSerializer

# Create operations view
class CreateCombo(ListCreateAPIView):
    queryset = Combo.objects.all()
    serializer_class = CreateComboSerializer

# Update operations view
class UpdateCombo(UpdateAPIView):
    queryset = Combo.objects.all()
    serializer_class = UpdateComboSerializer

# Delete operations view
class DeleteCombo(DestroyAPIView):
    queryset = Combo.objects.all()
    serializer_class = DeleteComboSerializer
