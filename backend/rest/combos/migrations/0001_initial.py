# Generated by Django 3.1 on 2020-11-16 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Combo',
            fields=[
                ('codeCombo', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nameCombo', models.CharField(max_length=255)),
                ('descriptionCombo', models.CharField(max_length=255)),
                ('discountCombo', models.PositiveIntegerField()),
                ('priceCombo', models.PositiveIntegerField()),
                ('productCombo', models.ManyToManyField(to='products.Product')),
            ],
        ),
    ]
