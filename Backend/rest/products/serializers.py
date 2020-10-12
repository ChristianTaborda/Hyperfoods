from .models import Product
from rest_framework import serializers

# Serializers for products:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

# Create operations serializer:
class CreateProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'nameProduct',
            'descriptionProduct',
            'priceProduct',
            'categoryProduct'
        ]
    
    def create(self, validated_data):
        product = Product.objects.create(
            nameProduct = validated_data['nameProduct'],
            descriptionProduct = validated_data['descriptionProduct'],
            priceProduct = validated_data['priceProduct'],
            categoryProduct = validated_data['categoryProduct']
        )
        product.save()
        return product

# Update operations serializer:
class UpdateProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = [
            'nameProduct',
            'descriptionProduct',
            'priceProduct',
            'categoryProduct'
        ]

    def update(self, instance, validated_data):
        product = super().update(instance, validated_data)
        return product

# Delete operations serializer:
class DeleteProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()