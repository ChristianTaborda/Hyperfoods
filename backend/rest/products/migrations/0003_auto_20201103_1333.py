# Generated by Django 3.1 on 2020-11-03 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0001_initial'),
        ('products', '0002_product_ingredientproduct'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='ingredientProduct',
            field=models.ManyToManyField(blank=True, to='ingredients.Ingredient'),
        ),
    ]
