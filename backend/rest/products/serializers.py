from .models import Product, Image
from rest_framework import serializers
from categories.serializers import CategorySerializer
from ingredients.serializers import IngredientSerializer

# Serializers for products:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class ProductSerializer(serializers.ModelSerializer):

    categoryProduct = CategorySerializer()
    ingredientProduct = IngredientSerializer(many = True)

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
            'categoryProduct',
            'ingredientProduct'
        ]
    
    def create(self, validated_data):
        product = Product.objects.create(
            nameProduct = validated_data['nameProduct'],
            descriptionProduct = validated_data['descriptionProduct'],
            priceProduct = validated_data['priceProduct'],
            categoryProduct = validated_data['categoryProduct']
        )

        # Add ingredients to product:
        for i in validated_data['ingredientProduct']:
            product.ingredientProduct.add(i)

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


class ImageProductSerializer(serializers.ModelSerializer):
    image = serializers.FileField()
    class Meta:
        model = Image
        fields = [
            'image',
            'product'
        ]
