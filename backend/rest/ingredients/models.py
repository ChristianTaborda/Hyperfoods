from django.db import models

# Models for ingredients:

class Ingredient(models.Model):

    codeIngredient = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    nameIngredient = models.CharField(max_length=255)
    priceIngredient = models.PositiveIntegerField()
    additionalIngredient = models.BooleanField()

