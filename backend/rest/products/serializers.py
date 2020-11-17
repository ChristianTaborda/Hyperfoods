from .models import Product
from rest_framework import serializers
from categories.serializers import CategorySerializer
from ingredients.serializers import IngredientSerializer
from firebase import *
import pyrebase

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

    imageProduct = serializers.FileField()
    
    class Meta:
        model = Product
        fields = [
            'imageProduct',
            'nameProduct',
            'descriptionProduct',
            'priceProduct',
            'categoryProduct',
            'ingredientProduct'
        ]
    
    def create(self, validated_data):
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("nombreTenant/images/nombreImagen.png").put(validated_data['imageProduct'])
        url = storage.child("nombreTenant/images/nombreImagen.png").get_url(None)
       
        product = Product.objects.create(
            nameProduct = validated_data['nameProduct'],
            descriptionProduct = validated_data['descriptionProduct'],
            priceProduct = validated_data['priceProduct'],
            categoryProduct = validated_data['categoryProduct'],
            imageProduct = url
        )
        
        # Add ingredients to product:
        for i in validated_data['ingredientProduct']:
            product.ingredientProduct.add(i)

        product.save()
        return product

# Update operations serializer:
class UpdateProductSerializer(serializers.ModelSerializer):

    imageProduct = serializers.FileField()
    
    class Meta:
        model = Product
        fields = [
            'imageProduct',
            'nameProduct',
            'descriptionProduct',
            'priceProduct',
            'categoryProduct',
            'ingredientProduct'
        ]

    def update(self, instance, validated_data):
        firebase = pyrebase.initialize_app(config)
        storage = firebase.storage()
        storage.child("nombreTenant/images/nombreImagen.png").put(validated_data['imageProduct'])
        url = storage.child("nombreTenant/images/nombreImagen.png").get_url(None)

        validated_data['imageProduct'] = url

        product = super().update(instance, validated_data)
        
        # Add ingredients to product:
        for i in validated_data['ingredientProduct']:
            product.ingredientProduct.add(i)

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