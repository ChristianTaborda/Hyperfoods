from .models import Combo
from products.models import Product
from rest_framework import serializers
from products.serializers import ProductSerializer
from firebase import *
import pyrebase
import time

def saveImageFirebase(host, image):
    hora = time.strftime("%Y%m%d-%H%M%S")
    tenant = host.partition('.')[0]
    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()
    storage.child(tenant+"/images/"+hora).put(image)
    url = storage.child(tenant+"/images/"+hora).get_url(None)
    return url

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

        priceCombo = 0

        url = saveImageFirebase(self.context['request'].get_host(), validated_data['imageCombo'])
        combo = Combo.objects.create(
            nameCombo = validated_data['nameCombo'],
            descriptionCombo = validated_data['descriptionCombo'],
            discountCombo = validated_data['discountCombo'],
            priceCombo = priceCombo,
            imageCombo = url
        )

        # - Add Products to Combo
        # - Calculate Price for Combo
        for i in validated_data['productCombo']:
            combo.productCombo.add(i)
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

        if 'imageCombo' in validated_data:
            url = saveImageFirebase(self.context['request'].get_host(), validated_data['imageCombo'])
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