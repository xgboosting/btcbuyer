from django.db import models
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.utils.html import format_html
import uuid

class SiteName(models.Model):
    site_name = models.CharField(max_length=255, default='')

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=255, default='')
    created = models.DateTimeField(auto_now_add=True)
    email_validated = models.BooleanField(default=False)
    is_guest = models.BooleanField(default=False)

class Address(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_uuid = models.UUIDField(blank=True)
    name = models.CharField(max_length=255, default='')
    address = models.CharField(max_length=255, default='')
    apartment = models.CharField(max_length=255, default='')
    country = models.CharField(max_length=255, default='')
    zip_code = models.CharField(max_length=255, default='')
    is_default = models.BooleanField(default=False)
    additional_info = models.CharField(max_length=255, default='')
    phone_number = models.CharField(max_length=20, default='')
    created = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_uuid = models.UUIDField()
    by_user = models.CharField(max_length=255, default='admin')
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

class PaymentAddress(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    charge_id =  models.CharField(max_length=20, default='')
    order_uuid = models.UUIDField()
    created = models.DateTimeField()
    expires = models.DateTimeField()
    btc = models.CharField(max_length=255, default='')
    eth = models.CharField(max_length=255, default='')
    ltc = models.CharField(max_length=255, default='')
    cash = models.CharField(max_length=255, default='')
    address_type = models.CharField(max_length=10, default='')

class Order(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_uuid = models.UUIDField()
    address_uuid = models.UUIDField()
    shipped = models.BooleanField(default=False)
    url = models.TextField()
    price = models.FloatField(null=True, blank=True, default=None)
    quantity = models.CharField(max_length=20, default='')
    paid_for = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    screenshot_uuid = models.CharField(max_length=255, default='')
    PRIORITY_CHOICES = (
        ('HIGH', 'high'),
        ('MEDIUM', 'medium'),
        ('LOW', 'low'),
    )
    priority = models.CharField(max_length=255, choices=PRIORITY_CHOICES)
    STATUS = (
        ('UNPAID', 'unpaid'),
        ('PAID', 'paid'),
        ('COMPLETED', 'completed')

    )
    order_status = models.CharField(max_length=255, choices=STATUS)

    def return_messages(self):
        try:
            messages = Message.objects.filter(order_uuid=self.uuid).exclude(by_user='admin').order_by('created')[0]
            return messages.content
        except:
            return 'no message'

    def return_address(self):
        try:
            address = Address.objects.get(uuid=self.address_uuid)
            return address.address
        except:
            return 'nothing'

    def return_user(self):
        try:
            profile = Profile.objects.get(uuid=self.user_uuid)
            return profile.user
        except:
            return 'nothing'

class Validation_token(models.Model):
    token = models.CharField(max_length=255, default='')
    expires = models.DateTimeField()
    user_uuid = models.UUIDField()
