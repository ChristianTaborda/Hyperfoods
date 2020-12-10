from rest_framework import serializers
from users.models import (
    CustomUser,
    Client,
    Worker,
    ChangePassword
    )
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import password_validation, authenticate
from rest_framework.authtoken.models import Token
import time
import random


#========== Serializador completo para el usuario basico ========== 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id_user',
            'is_active',
            'type_document',
            'document',
            'name', 
            'surname', 
            'phone', 
            'address', 
            'email',
            'password', 
            'color'
        ]

    def create(self, validated_data):
        validated_data['password']=make_password(validated_data['password'])
        user = CustomUser.objects.create(**validated_data)
        user.save()
        return user  

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        user = super().update(instance, validated_data)
        return user

           
#========== Serializador para el cliente single (asignacion) ========== 
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'credit_card',
            'id_user',
            'user'
        ]

#========== Serializador para el cliente completo (incluye user basico) ========== 
class ClientAllSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Client
        fields = [
            'credit_card',
            'id_user',
            'user'
        ]

    def create(self, validated_data):
        usuario = validated_data.pop('user')
        usuario['password'] = make_password(usuario['password'])
        custom = CustomUser.objects.create(**usuario)
        cliente = Client.objects.create(user=custom, **validated_data)
        return cliente    

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer()
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        super(UserSerializer,user).update(instance.user,user_data)
        super().update(instance, validated_data)
        return instance  

#========== Serializador para crear el cliente ========== 
class CreateClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = [
            'user', 
        ]

#========== Serializador para el trabajador single (asignacion) ========== 
class WorkerSingleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = [
            'id_user', 'user_type', 'user'
        ]



#========== Serializador: crea trabajador con usuario al tiempo ========== 
class WorkerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Worker
        fields = ['id_user', 'user_type', 'user']

    def create(self, validated_data):
        usuario = validated_data.pop('user')
        usuario['password'] = make_password(usuario['password'])
        custom = CustomUser.objects.create(**usuario)
        worker = Worker.objects.create(user=custom, **validated_data)
        return worker  

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer()
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        super(UserSerializer,user).update(instance.user,user_data)
        super().update(instance, validated_data)
        return instance  


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=12)

    def validate(self, data):
        queryset = CustomUser.objects.filter(email=data['email'])
        if not queryset.exists():
            raise serializers.ValidationError('Este correo no esta registrado')
        user = queryset.values()[0]

        if (self.initial_data.get('social')==None):
            if(not check_password(data['password'], user['password'])):
                raise serializers.ValidationError('Contraseña incorrecta')

        if self.initial_data['type']=='worker':
            queryset2 = Worker.objects.filter(user=user['id_user'])
            if not queryset2.exists():
                raise serializers.ValidationError('El trabajador no existe')
            self.context['type'] = queryset2[0]
        else:
            queryset2 = Client.objects.filter(user=user['id_user'])
            if not queryset2.exists():
                raise serializers.ValidationError('El cliente no existe')
            self.context['type'] = queryset2[0]
            
        self.context['user'] = queryset[0]
        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['type'], token.key


class SuperLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=12)

    def validate(self, data):
        queryset = CustomUser.objects.filter(email=data['email'])
        if not queryset.exists():
            raise serializers.ValidationError('Este correo no esta registrado')
        user = queryset.values()[0]

        if(not check_password(data['password'], user['password'])):
            raise serializers.ValidationError('Contraseña incorrecta')
            
        self.context['user'] = queryset[0]
        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class RequestPasswordReset(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        queryset = CustomUser.objects.filter(email=data['email'])
        if not queryset.exists():
            raise serializers.ValidationError('Este correo no esta registrado')
        self.context['user'] = queryset[0]
        return data

    def create(self, data):
        hora = time.strftime("%Y%m%d%H%M%S")
        idlink = hora + str(random.randint(100000, 999999))     
        query = ChangePassword.objects.create(
            idlink=idlink,
            user=self.context['user']
        )
        return query.idlink

class PasswordReset(serializers.Serializer):
    idlink = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        change_pass = ChangePassword.objects.filter(idlink=data['idlink'])
        if not change_pass.exists():
            raise serializers.ValidationError('Este enlace no existe')
        if change_pass.values()[0]['used']==True:
            raise serializers.ValidationError('Este enlace ya no es valido')

        new_password = make_password(data['password'])
       
        user = CustomUser.objects.filter(id_user=change_pass.values()[0]['user_id'])
        user.update(password = new_password)
        change_pass.update(used=True)
        #user.save
        #user = super().update(instance, validated_data)
        return user
