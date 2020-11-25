from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractUser
)
from django.conf import settings

#Extendemos la creacion del usuario abstracto de django
class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(email, password, **extra_fields)
        user.save(using=self._db)
        return user

#Creamos nuestro modelo custom en base al abstracto
class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None
    phone_validate = RegexValidator(regex=r'^\+?1?\d{7,10}$', message="Numero incorrecto")

    id_user = models.AutoField(primary_key=True)
    is_active = models.BooleanField(default=True)
    DOCUMENT_TYPE_CHOICES = ((1, 'CC'),(2, 'TI')    )
    type_document = models.CharField(choices=DOCUMENT_TYPE_CHOICES, max_length=1)
    document = models.CharField(unique=True, max_length=12)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    phone = models.CharField(validators=[phone_validate], max_length=10, unique=True)
    address = models.CharField(max_length=50)
    email = models.EmailField(max_length=70, blank=True, null=True, unique=True)
    color = models. CharField(max_length=70, null=True)
    #is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'document'
    REQUIRED_FIELDS = [ 'name', 'surname', 'email']
    objects = UserManager()

    class Meta:
        db_table = 'customusers'
        verbose_name = 'user'
        verbose_name_plural = 'users'
        
    def get_full_name(self):
        return self.name

    def __str__(self):
        return str(self.id_user)

# ========== Modelo del cliente que contiene un usuario ==========
class Client(models.Model):
    id_user = models.AutoField(primary_key=True)
    credit_card = models.CharField(max_length=16)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    

# ==========  Modelo del trabajador que extiende de usuario basico ==========
class Worker(models.Model):
    id_user = models.AutoField(primary_key=True)
    USER_TYPE_CHOICES = ((1, 'manager'), (2, 'digitizer'))
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)