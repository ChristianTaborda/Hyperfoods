from rest_framework.views import View
from django.http import HttpResponse
from rest_framework.response import Response

from categories.models import Category
from combos.models import Combo
from ingredients.models import Ingredient
from invoiceDetails.models import InvoiceDetail
from invoices.models import Invoice
from products.models import Product
from users.models import CustomUser
from users.models import Client
from users.models import Worker
from products.serializers import ProductSerializer
from invoices.serializers import InvoiceSerializer
from users.serializers import ClientAllSerializer, WorkerSerializer, UserSerializer
import json
from rest_framework.views import APIView 

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

# View for Report 2:
class HoursWithMoreSales(View):
    def get(self, request):

        # Hour sales count:
        times = Invoice.objects.all().values('dateTimeInvoice')
        hours = []
        for i in times:
            hour = i['dateTimeInvoice'].strftime('%H')
            if (hour not in hours):
                hours.append(hour)

        dictionary = []
        for i in hours:
            sales = 0
            for j in times:
                if (i == j['dateTimeInvoice'].strftime('%H')):
                    sales = sales + 1

            data = {
                'time': i,
                'sales': sales                     
            }
            dictionary.append(data)

        # Hours with more Sales:
        response = {
            'report': sorted(dictionary, key = lambda x: x['sales'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))

# View for Report 3:
class ClientsWithMorePurchases(View):
    def get(self, request):

        # Client purchases count:
        clients = ClientAllSerializer(Client.objects.all(), many = True).data
        dictionary = []
        for i in range(len(clients)):
            client = clients[i]['id_user']

            invoices = Invoice.objects.filter(clientInvoice = client)
            
            data = {
                'client': clients[i],
                'purchases': len(invoices)                     
            }
            dictionary.append(data)

        # Most selled products:
        response = {
            'report': sorted(dictionary, key = lambda x: x['purchases'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))

# View for Report 4:
class ZonesWithMorePurchases(View):
    def get(self, request):

        # Zone purchases count:
        clients = Invoice.objects.all().values('clientInvoice')
        invoiceZones = []
        zones = []
        for i in clients:
            zone = Client.objects.get(id_user = i['clientInvoice']).user.address
            invoiceZones.append(zone)
            if (zone not in zones):
                zones.append(zone)

        dictionary = []
        for i in zones:
            purchases = 0
            for j in invoiceZones:
                if (i == j):
                    purchases = purchases + 1

            data = {
                'zone': i,
                'purchases': purchases                     
            }
            dictionary.append(data)

        # Hours with more Sales:
        response = {
            'report': sorted(dictionary, key = lambda x: x['purchases'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))

# View for Report 5:
class WorkersWithMoreSales(View):
    def get(self, request):

        # Worker sales count:
        workers = WorkerSerializer(Worker.objects.all(), many = True).data
        dictionary = []
        for i in range(len(workers)):
            worker = workers[i]['id_user']

            invoices = Invoice.objects.filter(workerInvoice = worker)
            
            data = {
                'worker': workers[i],
                'sales': len(invoices)                     
            }
            dictionary.append(data)

        # Most selled products:
        response = {
            'report': sorted(dictionary, key = lambda x: x['sales'], reverse = True)[:5]
        }

        return HttpResponse(json.dumps(response))


class Data(APIView):
    def get(self,request):
        users = UserSerializer(CustomUser.objects.defer("password"), many=True).data
        workers = Worker.objects.all().values()
        clients = Client.objects.all().values()
        categories = Category.objects.all().values()
        combos = Combo.objects.all().values()
        ingredients = Ingredient.objects.all().values()
        invoiceDetails = InvoiceDetail.objects.all().values()
        invoices = Invoice.objects.all().values()
        products = Product.objects.all().values()
        data = {
            'users': users,
            'worker': workers,
            'client': clients,
            'categories': categories,
            'combos': combos,
            'ingredients': ingredients,
            'products': products,
            'invoices': invoices,
            'invoiceDetails': invoiceDetails
        }
        return Response(data)


