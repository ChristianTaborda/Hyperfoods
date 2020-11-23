# Generated by Django 3.1 on 2020-11-23 00:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_color'),
        ('invoices', '0002_invoice_detailinvoice'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='workerInvoice',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.worker'),
            preserve_default=False,
        ),
    ]
