from .models import Product
from combos.models import Combo
from rest_framework import serializers
from categories.serializers import CategorySerializer
from ingredients.serializers import IngredientSerializer
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
        
        url = saveImageFirebase(self.context['request'].get_host(), validated_data['imageProduct'])
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
        if 'imageProduct' in validated_data:
            url = saveImageFirebase(self.context['request'].get_host(), validated_data['imageProduct'])
            validated_data['imageProduct'] = url

        product = super().update(instance, validated_data)

        # Update Combos with this product:
        combos = Combo.objects.all()
        for i in combos:
            for j in i.productCombo.all():
                if (j.codeProduct == product.codeProduct):
                    # Calculate Price for Combo:
                    priceCombo = 0
                    for k in i.productCombo.all():
                        priceCombo = priceCombo + k.priceProduct
                    priceCombo = priceCombo - (priceCombo * (i.discountCombo/100)) 
                    i.priceCombo = priceCombo
                    i.save()

        return product

# Delete operations serializer:
class DeleteProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()

