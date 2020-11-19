from django.db import models
from combos.models import Combo
from products.models import Product
from ingredients.models import Ingredient

# Models for invoice details:

class InvoiceDetail(models.Model):

    codeInvoiceDetail = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    quantityInvoiceDetail = models.PositiveIntegerField()
    subtotalInvoiceDetail = models.PositiveIntegerField()
    comboInvoiceDetail = models.ForeignKey(Combo, on_delete = models.CASCADE, null = True)
    productInvoiceDetail = models.ForeignKey(Product, on_delete = models.CASCADE, null = True)
    ingredientInvoiceDetail = models.ManyToManyField(Ingredient, blank = True)