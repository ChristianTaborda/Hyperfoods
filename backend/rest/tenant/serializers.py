from rest_framework import serializers
from tenant.models import (
    Tenant,
    Domain
    )

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'

class CreateTenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = [
            'name',
            'paid_until',
            'on_trial'
        ]

class DomainSerializer(serializers.ModelSerializer):
    tenant = TenantSerializer()
    class Meta:
        model = Domain
        fields = [
            'id',
            'domain',
            'is_primary',
            'tenant'
        ]

    def create(self, validated_data):
        custom = validated_data.pop('tenant')
        custom = Tenant.objects.create(**custom)
        domain = Domain.objects.create(tenant=custom, **validated_data)
        return domain  
