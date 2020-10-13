from .models import Combo
from products.models import Product
from rest_framework import serializers
from products.serializers import ProductSerializer

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

    class Meta:
        model = Combo
        fields = [
            'nameCombo',
            'descriptionCombo',
            'discountCombo',
            'productCombo'            
        ]
    
    def create(self, validated_data):
        combo = Combo.objects.create(
            nameCombo = validated_data['nameCombo'],
            descriptionCombo = validated_data['descriptionCombo'],
            discountCombo = validated_data['discountCombo'],
            priceCombo = 0
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
    
    class Meta:
        model = Combo
        fields = [
            'nameCombo',
            'descriptionCombo',
            'discountCombo',
            'productCombo'
        ]

    def update(self, instance, validated_data):
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