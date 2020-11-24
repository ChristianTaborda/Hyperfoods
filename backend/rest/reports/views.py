from rest_framework.views import View
from django.http import HttpResponse
from invoiceDetails.models import InvoiceDetail
from products.models import Product
from products.serializers import ProductSerializer
import json

# View for Report 1:
class MostSelledProducts(View):
    def get(self, request):

        # Product sales count:
        products = ProductSerializer(Product.objects.all(), many = True).data
        dictionary = []
        for i in range(len(products)):
            product = products[i]['codeProduct']

            invoiceDetails = InvoiceDetail.objects.filter(productInvoiceDetail = product)
            sales = 0
            for j in invoiceDetails:
                sales = sales + j.quantityInvoiceDetail

            data = {
                'product': products[i],
                'sales': sales                     
            }
            dictionary.append(data)

        # Most selled products:
        response = {
            'report': sorted(dictionary, key = lambda x: x['sales'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))

"""
# View for Report 2:
class HoursWithMoreSales(View):
    def get(self, request):

        # Hour sales count:
        hours = 
        dictionary = []
        for i in range(len(products)):
            product = products[i]['codeProduct']

            invoiceDetails = InvoiceDetail.objects.filter(productInvoiceDetail = product)
            sales = 0
            for j in invoiceDetails:
                sales = sales + j.quantityInvoiceDetail

            data = {
                'product': products[i],
                'sales': sales                     
            }
            dictionary.append(data)

        # Most selled products:
        response = {
            'report': sorted(dictionary, key = lambda x: x['sales'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))
"""


