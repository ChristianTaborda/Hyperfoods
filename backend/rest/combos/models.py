from django.db import models
from products.models import Product

# Models for combos:

class Combo(models.Model):

    codeCombo = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    nameCombo = models.CharField(max_length=255)
    descriptionCombo = models.CharField(max_length=255)
    discountCombo = models.PositiveIntegerField()
    priceCombo = models.PositiveIntegerField()

    productCombo = models.ManyToManyField(Product)
