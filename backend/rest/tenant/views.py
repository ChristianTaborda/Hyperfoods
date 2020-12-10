from rest_framework.generics import (
    ListAPIView, 
    RetrieveAPIView, 
    ListCreateAPIView, 
    RetrieveAPIView, 
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework import viewsets

from tenant.models import Tenant, Domain


from tenant.serializers import (
    TenantSerializer,
    CreateTenantSerializer,
    DomainSerializer
)
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

class ListTenant(ListAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    #spermission_classes = (AllowOperator,)

"""
class CreateTenant(ListCreateAPIView):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    def post(self,request):

        serializer = CreateTenantSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'succes?'
        }
        return Response(data)
"""
class ListDomain(ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    #spermission_classes = (AllowOperator,)

#Crear un usuario
class CreateTenant(ListCreateAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


class TenantInfo(APIView):
    def post(self,request):

        query = Tenant.objects.filter(schema_name=request.data['schema_name'])
        if query.exists():
            return Response(query.values())
        else:
            return Response({'error': 'this domain does not exists'})