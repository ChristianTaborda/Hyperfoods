from .models import Combo
from products.models import Product
from rest_framework import serializers
from products.serializers import ProductSerializer
from firebase import *
import pyrebase

# Serializers for combos:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class ComboSerializer(serializers.ModelSerializer):

    productCombo = ProductSerializer(many = True)

    class Meta:
        model = Combo
        fields = '__all__'

# Create operations serializer:
class CreateComboSerializer(serializers.ModelSerializer):

    imageCombo = serializers.FileField()

    class Meta:
        model = Combo
        fields = [
            'imageCombo',
            'nameCombo',
            'descriptionCombo',
            'discountCombo',
            'productCombo'            
        ]
    
    def create(self, validated_data):
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("nombreTenant/images/nombreImagen.png").put(validated_data['imageCombo'])
        url = storage.child("nombreTenant/images/nombreImagen.png").get_url(None)

        combo = Combo.objects.create(
            nameCombo = validated_data['nameCombo'],
            descriptionCombo = validated_data['descriptionCombo'],
            discountCombo = validated_data['discountCombo'],
            priceCombo = 0,
            imageCombo = url
        )

        # Add Products to Combo:
        for i in validated_data['productCombo']:
            combo.productCombo.add(i)

        # Calculate Price for Combo:
        priceCombo = 0
        for i in validated_data['productCombo']:
            priceCombo = priceCombo + i.priceProduct
        priceCombo = priceCombo - (priceCombo * (combo.discountCombo/100)) 
        combo.priceCombo = priceCombo

        combo.save()
        return combo

# Update operations serializer:
class UpdateComboSerializer(serializers.ModelSerializer):

    imageCombo = serializers.FileField()
    
    class Meta:
        model = Combo
        fields = [
            'imageCombo',
            'nameCombo',
            'descriptionCombo',
            'discountCombo',
            'productCombo'
        ]

    def update(self, instance, validated_data):
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("nombreTenant/images/nombreImagen.png").put(validated_data['imageCombo'])
        url = storage.child("nombreTenant/images/nombreImagen.png").get_url(None)

        validated_data['imageCombo'] = url

        combo = super().update(instance, validated_data)

        # Calculate Price for Combo:
        priceCombo = 0
        for i in validated_data['productCombo']:
            priceCombo = priceCombo + i.priceProduct
        priceCombo = priceCombo - (priceCombo * (combo.discountCombo/100)) 
        combo.priceCombo = priceCombo

        combo.save()
        return combo

# Delete operations serializer:
class DeleteComboSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Combo
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()