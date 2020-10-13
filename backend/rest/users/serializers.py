from rest_framework import serializers
from users.models import (
    CustomUser,
    Client,
    Worker
    )
from django.contrib.auth.hashers import make_password
from django.contrib.auth import password_validation, authenticate
from rest_framework.authtoken.models import Token

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
        ]

    def create(self, validated_data):
        validated_data['password']=make_password(validated_data['password'])
        user = CustomUser.objects.create(**validated_data)
        user.save()
        return user  

    def update(self, instance, validated_data):
        print(validated_data['surname'])
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
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        cliente = super().update(instance, validated_data)
        return cliente  

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
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        worker = super().update(instance, validated_data)
        return worker


class UserLoginSerializer(serializers.Serializer):

    # Campos que vamos a requerir
    email = serializers.EmailField()
    password = serializers.CharField(max_length=12)

    # Primero validamos los datos
    def validate(self, data):
        # authenticate recibe las credenciales, si son válidas devuelve el objeto del usuario
        print("==================================0")
        print(data.items())
        for key, value in data.items(): 
            print(key, value) 
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')

        # Guardamos el usuario en el contexto para posteriormente en create recuperar el token
        self.context['user'] = user
        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key
"""
#========== Serializador para crear cliente con usuario ========== 
class CreateNewClientSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Client
        fields = [            
            'type_client', 
            'user', 
        ]

    def create(self, validated_data):
        usuario = validated_data.pop('user')
        usuario['password'] = make_password(usuario['password'])
        custom = CustomUser.objects.create(**usuario)
        #cliente['user'] = custom
        cliente = Client.objects.create(user=custom, **validated_data)
        return cliente        

#========== Serializador para actualizar el cliente ========== 
class UpdateClientSerializer(serializers.ModelSerializer):

    #usuario = UserSerializer()
    class Meta:
        model = Client
        fields = [
            'type_client', 
            'category',
        ]

    def update(self, instance, validated_data):
        print("===============IMPORMIENDO================")
        print(validated_data)
        #validated_data['password'] = make_password(validated_data['password'])
        user = super().update(instance, validated_data)
        return user
"""

"""



"""