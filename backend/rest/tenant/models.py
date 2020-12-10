from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from django.core.validators import RegexValidator
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractUser
)

class Tenant(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until =  models.DateField()
    on_trial = models.BooleanField()
    created_on = models.DateField(auto_now_add=True)
    TYPE_CHOICES = ((1, 'basic'), (2, 'medium'), (3, 'full'))
    type_plan =  models.PositiveSmallIntegerField(choices=TYPE_CHOICES)
    logo = models.CharField(max_length=255, null=True) 
    description =  models.CharField(max_length=255, null=True) 

    # default true, schema will be automatically created and synced when it is saved
    auto_create_schema = True

class Domain(DomainMixin):
    pass


