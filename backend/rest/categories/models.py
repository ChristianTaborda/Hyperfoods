from django.db import models

# Models for categories:

class Category(models.Model):

    codeCategory = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    nameCategory = models.CharField(max_length = 255)

