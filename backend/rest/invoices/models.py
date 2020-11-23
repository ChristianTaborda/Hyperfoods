from django.db import models
from users.models import Client, Worker
from invoiceDetails.models import InvoiceDetail

# Models for invoices:

class Invoice(models.Model):

    codeInvoice = models.AutoField(
        auto_created = True,
        primary_key = True,
        serialize = False,
        verbose_name = 'ID'
    )

    dateTimeInvoice = models.DateTimeField(auto_now_add = True)
    totalInvoice = models.PositiveIntegerField(default = 0)
    clientInvoice = models.ForeignKey(Client, on_delete = models.CASCADE)
    workerInvoice = models.ForeignKey(Worker, on_delete = models.CASCADE)
    detailInvoice = models.ManyToManyField(InvoiceDetail)