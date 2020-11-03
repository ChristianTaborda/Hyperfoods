from django.db import models
from categories.models import Category
from ingredients.models import Ingredient

# Models for products:

class Product(models.Model):

    codeProduct = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    nameProduct = models.CharField(max_length=255)
    descriptionProduct = models.CharField(max_length=255)
    priceProduct = models.PositiveIntegerField()

    categoryProduct = models.ForeignKey(Category, on_delete = models.CASCADE)
    ingredientProduct = models.ManyToManyField(Ingredient, blank = True)
