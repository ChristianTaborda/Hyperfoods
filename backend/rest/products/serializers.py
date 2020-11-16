from .models import Product
from rest_framework import serializers
from categories.serializers import CategorySerializer
from ingredients.serializers import IngredientSerializer
from firebase import *
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
    image = serializers.FileField()
    class Meta:
        model = Product
        fields = [
            'nameProduct',
            'descriptionProduct',
            'priceProduct',
            'categoryProduct',
            'image',
            'ingredientProduct'
        ]
    
    def create(self, validated_data):
        import pyrebase
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("tenant1/images/2.png").put(validated_data['image'])
        url = storage.child("tenant1/images/2.png").get_url(None)

        product = Product.objects.create(
            nameProduct = validated_data['nameProduct'],
            descriptionProduct = validated_data['descriptionProduct'],
            priceProduct = validated_data['priceProduct'],
            imageProduct = url,
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

"""
class ImageProductSerializer(serializers.ModelSerializer):
    
    image = serializers.FileField()
    class Meta:
        model = Image
        fields = [
            'image',
            'product'
        ]
    def create(self, validated_data):
        import pyrebase
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("tenant1/images/2.png").put(validated_data['image'])
        url = storage.child("tenant1/images/2.png").get_url(None)

        print(url)
       
"""