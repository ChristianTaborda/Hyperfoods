from .models import Ingredient
from rest_framework import serializers

# Serializers for ingredients:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = '__all__'

# Create operations serializer:
class CreateIngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = [
            'nameIngredient',
            'priceIngredient',
            'additionalIngredient'
        ]
    
    def create(self, validated_data):
        ingredient = Ingredient.objects.create(
            nameIngredient = validated_data['nameIngredient'],
            priceIngredient = validated_data['priceIngredient'],
            additionalIngredient = validated_data['additionalIngredient']
        )
        ingredient.save()
        return ingredient

# Update operations serializer:
class UpdateIngredientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = [
            'nameIngredient',
            'priceIngredient',
            'additionalIngredient'
        ]

    def update(self, instance, validated_data):
        ingredient = super().update(instance, validated_data)
        return ingredient

# Delete operations serializer:
class DeleteIngredientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()