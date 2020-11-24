from .models import InvoiceDetail
from products.models import Product
from combos.models import Combo
from rest_framework import serializers
from combos.serializers import ComboSerializer
from products.serializers import ProductSerializer
from ingredients.serializers import IngredientSerializer

# Serializers for invoice details:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class InvoiceDetailSerializer(serializers.ModelSerializer):

    comboInvoiceDetail = ComboSerializer()
    productInvoiceDetail = ProductSerializer()
    ingredientInvoiceDetail = IngredientSerializer(many = True)

    class Meta:
        model = InvoiceDetail
        fields = '__all__'

# Create operations serializer:
class CreateInvoiceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InvoiceDetail
        fields = [
            'quantityInvoiceDetail',
            'comboInvoiceDetail',
            'productInvoiceDetail',
            'ingredientInvoiceDetail',
        ]
    

