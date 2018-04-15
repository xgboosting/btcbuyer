from django.db import models
from knox.models import AuthToken
from django.contrib.auth.models import User
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
    sender = models.UUIDField()
    sendee = models.UUIDField()
    created = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=255, default='')

class Order(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_uuid = models.UUIDField()
    address_uuid = models.UUIDField()
    shipped = models.BooleanField(default=False)
    url = models.TextField()
    price = models.CharField(max_length=10, default='')
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
        ('SHIPPED', 'shipped'),
        ('DELIVERED', 'delivered'),

    )
    order_status = models.CharField(max_length=255, choices=STATUS)

class Validation_token(models.Model):
    token = models.CharField(max_length=255, default='')
    expires = models.DateTimeField()
    user_uuid = models.UUIDField()
