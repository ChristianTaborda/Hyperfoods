from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager,
    PermissionsMixin,
    AbstractUser
)
import datetime
from django.conf import settings


class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

"""
    def create_staffuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        user = self.create_user(email, password, **extra_fields)
        return user
"""
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(email, password, **extra_fields)
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):

    username = None
    first_name = None
    last_name = None
    phone_validate = RegexValidator(
        regex=r'^\+?1?\d{7,10}$', message="Numero incorrecto")

    id_user = models.CharField(
        validators=[phone_validate], max_length=10, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(
        max_length=70, blank=True, null=True, unique=True)
    phone = models.CharField(
        validators=[phone_validate], max_length=10, unique=True)
    address = models.CharField(max_length=50)
    neighborhood = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    date_of_birth = models.DateField(default=datetime.date.today)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['id_user', 'name', 'phone']

    objects = UserManager()

"""Class meta to define atributes tables"""
     class Meta:
        db_table = 'customusers'
        verbose_name = 'user'
        verbose_name_plural = 'users'
        
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return str(self.id_user)

# ========== Modelo del cliente que contiene un usuario ==========


class Client(models.Model):
    USER_TYPE_CHOICES = (
        (1, 'natural'),
        (2, 'juridica'),
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type_client = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)    
    
    #def __str__(self):
        #return 'The Client: {}'.format(
            #self.user)

# ==========  Modelo del trabajador que extiende de usuario basico ==========


class Worker(models.Model):
    USER_TYPE_CHOICES = (
        (1, 'admin'),
        (2, 'manager'),
        (3, 'operator'),
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)