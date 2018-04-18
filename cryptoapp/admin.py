
from django.contrib import admin
from cryptoapp.models import Profile, Address, Message, Order, Validation_token


class AddressAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'country')
admin.site.register(Address, AddressAdmin)

class ProfileAdmin(admin.ModelAdmin):
    pass
admin.site.register(Profile, ProfileAdmin)

class MessageAdmin(admin.ModelAdmin):
    pass
admin.site.register(Message, MessageAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('priority', 'order_status')
admin.site.register(Order, OrderAdmin)
