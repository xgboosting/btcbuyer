from django.db import models
from knox.models import AuthToken
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=255, default='')
    dateCreated = models.DateTimeField(auto_now_add=True)
    email_validated = models.BooleanField(default=False)

class Address(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, default='')
    street_address = models.CharField(max_length=255, default='')
    apartment = models.CharField(max_length=255, default='')
    country = models.CharField(max_length=255, default='')
    zip_code = models.CharField(max_length=255, default='')
    is_default = models.BooleanField(default=False)


class Message(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.UUIDField()
    sendee = models.UUIDField()
    date = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=255, default='')

class Order(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    address_uuid = models.UUIDField()
    user_uuid = models.UUIDField()
    shipped = models.BooleanField(default=False)
    url = models.TextField()
    cost = models.CharField(max_length=10, default='')
    paid_for = models.BooleanField(default=False)
    screenshot_url = models.CharField(max_length=255, default='')
    priority = models.CharField(max_length=255, default='')
    order_status = models.CharField(max_length=255, default='')

class Validation_token(models.Model):
    token = models.CharField(max_length=255, default='')
    dateCreated = models.DateTimeField(auto_now_add=True)
    user_uuid = models.UUIDField()
