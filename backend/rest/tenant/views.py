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