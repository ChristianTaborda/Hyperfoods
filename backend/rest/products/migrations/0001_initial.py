# Generated by Django 3.1 on 2020-11-16 20:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
        ('ingredients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('codeProduct', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nameProduct', models.CharField(max_length=255)),
                ('descriptionProduct', models.CharField(max_length=255)),
                ('priceProduct', models.PositiveIntegerField()),
                ('imageProduct', models.CharField(max_length=255)),
                ('categoryProduct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.category')),
                ('ingredientProduct', models.ManyToManyField(blank=True, to='ingredients.Ingredient')),
            ],
        ),
    ]
