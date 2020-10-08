from .models import Category
from rest_framework import serializers

# Serializers for categories:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

# Create operations serializer:
class CreateCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            'nameCategory'
        ]
    
    def create(self, validated_data):
        category = Category.objects.create(
            nameCategory = validated_data['nameCategory']
        )
        category.save()
        return category

# Update operations serializer:
class UpdateCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = [
            'nameCategory'
        ]

    def update(self, instance, validated_data):
        category = super().update(instance, validated_data)
        return category

# Delete operations serializer:
class DeleteCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()



        


