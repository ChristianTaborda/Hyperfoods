# Generated by Django 3.1 on 2020-11-18 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0001_initial'),
        ('invoiceDetails', '0003_invoicedetail_ingredientinvoicedetail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoicedetail',
            name='ingredientInvoiceDetail',
            field=models.ManyToManyField(blank=True, to='ingredients.Ingredient'),
        ),
    ]