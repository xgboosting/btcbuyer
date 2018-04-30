
from django.contrib import admin
from cryptoapp.models import Profile, Address, Message, Order, Validation_token, PaymentAddress


class AddressAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'country', 'created')
admin.site.register(Address, AddressAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created')
admin.site.register(Profile, ProfileAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('by_user', 'order_uuid','created', 'content')
admin.site.register(Message, MessageAdmin)

class OrderAdmin(admin.ModelAdmin):
#   pass
    list_display = ('return_user', 'return_address', 'price', 'quantity', 'created', 'priority', 'order_status', 'return_messages')
admin.site.register(Order, OrderAdmin)

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order_uuid', 'created', 'expires', 'btc')
admin.site.register(PaymentAddress, PaymentAdmin)
