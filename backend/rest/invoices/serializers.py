from .models import Invoice
from invoiceDetails.models import InvoiceDetail
from rest_framework import serializers
from users.serializers import ClientAllSerializer, WorkerSerializer
from invoiceDetails.serializers import InvoiceDetailSerializer, CreateInvoiceDetailSerializer

# Serializers for invoices:
# --------------------------------CRUD --------------------------------#

# Retrieve operations serializer:
class InvoiceSerializer(serializers.ModelSerializer):

    clientInvoice = ClientAllSerializer()
    workerInvoice = WorkerSerializer()
    detailInvoice = InvoiceDetailSerializer(many = True)

    class Meta:
        model = Invoice
        fields = '__all__'

# Create operations serializer:
class CreateInvoiceSerializer(serializers.ModelSerializer):
    
    detailInvoice = CreateInvoiceDetailSerializer(many = True)

    class Meta:
        model = Invoice
        fields = [
            'clientInvoice',
            'workerInvoice',
            'detailInvoice'
        ]
    
    def create(self, validated_data):        
        invoice = Invoice.objects.create(
            clientInvoice = validated_data['clientInvoice'],
            workerInvoice = validated_data['workerInvoice']
        )

        # InvoiceDetails creation:
        for i in validated_data['detailInvoice']:

            combo = i['comboInvoiceDetail']
            product = i['productInvoiceDetail']
            quantity = i['quantityInvoiceDetail']
            subtotal = 0

            # Validation for only one Combo or Product in InvoiceDetail: 
            if (combo == None and product == None) or (combo != None and product != None):
                raise serializers.ValidationError('Debe haber exactamente un producto o un combo por detalle')
            else:
                detail = InvoiceDetail.objects.create(
                    quantityInvoiceDetail = quantity,
                    comboInvoiceDetail = combo,
                    productInvoiceDetail = product,
                    subtotalInvoiceDetail = subtotal
                )

                # Calculate subtotal with the price of the Product or Combo:
                if (combo == None):
                    subtotal = product.priceProduct * quantity
                else:
                    subtotal = combo.priceCombo * quantity

                # - Add Ingredients to InvoiceDetail
                # - Calculate subtotal with the price of the additional Ingredients
                for j in i['ingredientInvoiceDetail']:
                    detail.ingredientInvoiceDetail.add(j)
                    if (j.additionalIngredient):
                        subtotal = subtotal + (j.priceIngredient * quantity)

                detail.subtotalInvoiceDetail = subtotal

                # Update Invoice total:
                invoice.totalInvoice = invoice.totalInvoice + subtotal
                detail.save()

                # Add InvoiceDetail to Invoice:
                invoice.detailInvoice.add(detail.codeInvoiceDetail)

        invoice.save()
        return invoice

# Update operations serializer:
class UpdateInvoiceSerializer(serializers.ModelSerializer):

    detailInvoice = CreateInvoiceDetailSerializer(many = True)
    
    class Meta:
        model = Invoice
        fields = [
            'clientInvoice',
            'workerInvoice',
            'detailInvoice'
        ]

    def update(self, instance, validated_data):     
        instance.clientInvoice = validated_data['clientInvoice']
        instance.workerInvoice = validated_data['workerInvoice']
        instance.totalInvoice = 0
        oldInvoiceDetails = Invoice.objects.get(codeInvoice = instance.codeInvoice).detailInvoice.all()
    
        # InvoiceDetails update:
        for i in range(len(validated_data['detailInvoice'])):

            combo = validated_data['detailInvoice'][i]['comboInvoiceDetail']
            product = validated_data['detailInvoice'][i]['productInvoiceDetail']
            quantity = validated_data['detailInvoice'][i]['quantityInvoiceDetail']
            subtotal = 0

            # Validation for only one Combo or Product in InvoiceDetail: 
            if (combo == None and product == None) or (combo != None and product != None):
                raise serializers.ValidationError('Debe haber exactamente un producto o un combo')
            else:
                if (i < len(oldInvoiceDetails)):
                    # Old InvoiceDetails update:
                    detail = oldInvoiceDetails[i]
                    detail.quantityInvoiceDetail = quantity
                    detail.comboInvoiceDetail = combo
                    detail.productInvoiceDetail = product
                    detail.subtotalInvoiceDetail = subtotal
                else:
                    # New InvoceDetail creation:
                    detail = InvoiceDetail.objects.create(
                        quantityInvoiceDetail = quantity,
                        comboInvoiceDetail = combo,
                        productInvoiceDetail = product,
                        subtotalInvoiceDetail = subtotal
                    )
                    # Add new InvoiceDetail to Invoice:
                    instance.detailInvoice.add(detail.codeInvoiceDetail)
                
                # Calculate subtotal with the price of the Product or Combo:
                if (combo == None):
                    subtotal = product.priceProduct * quantity
                else:
                    subtotal = combo.priceCombo * quantity

                # - Add Ingredients to InvoiceDetail
                # - Calculate subtotal with the price of the additional Ingredients
                detail.ingredientInvoiceDetail.set([])
                for j in validated_data['detailInvoice'][i]['ingredientInvoiceDetail']:
                    detail.ingredientInvoiceDetail.add(j)
                    if (j.additionalIngredient):
                        subtotal = subtotal + (j.priceIngredient * quantity)

                detail.subtotalInvoiceDetail = subtotal

                # Update Invoice total:
                instance.totalInvoice = instance.totalInvoice + subtotal
                detail.save()
        
        # Delete extra InvoiceDetail after update:
        if (len(validated_data['detailInvoice']) < len(oldInvoiceDetails)):
            for i in range(len(validated_data['detailInvoice']), len(oldInvoiceDetails)):
                detail = oldInvoiceDetails[i]
                detail.delete()

        instance.save()
        return instance

# Delete operations serializer:
class DeleteInvoiceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Invoice
        fields = '__all__'

    def perform_destroy(self, instance):
        instance.delete()