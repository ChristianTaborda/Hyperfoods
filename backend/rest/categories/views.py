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

#--------------------------------EMAIL--------------------------------#

from django.template.loader import get_template
from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.core.mail import EmailMessage

class SendEmail(APIView):
    def post(self, request):
        try:
            information = request.data
            messageEmail = "Ha llegado un nuevo cliente, realiza su registro,\nSus datos son: \n" + "Nombre de empresa: " + information['Company'] + "\n" + "Nombre: " + information['Name'] + "\n" + "Ciudad: " + information['City'] + "\n" + "Correo: " + information['Email'] + "\n" + "Dirección: " + information['Address']
            email = EmailMessage(
                'Nuevo cliente',        #Title
                messageEmail,               #Message
                settings.EMAIL_HOST_USER,    #Email-corp
                ['roothyperfoods@gmail.com']     #Email-client
            )   
            email.send()
            message = "Mensaje enviado exitosamente"
            return Response({"error": False, "find": True, "message": message})
        except Exception as e:
            message = "Error"
            return Response({"error": False, "find": False, "message": str(e)})

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
