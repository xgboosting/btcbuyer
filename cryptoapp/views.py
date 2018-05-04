from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from cryptoapp.models import Profile, Address, Message, Order, Validation_token, PaymentAddress
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from knox.models import AuthToken
from knox.auth import TokenAuthentication
import hashlib, random, string, uuid, json, datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import requests

#
#place order
#dashboard
#send message
#
#
#
def main(request):
    with open('/home/connlloc/btcbuyer/local_lens/build/index.html') as f:
        return HttpResponse(f.read())

class contactMe(APIView):

    def post(self, request, format=None):
        try:
            subject = "from: %s, subject: %s" % (request.data['from'], request.data['subject'])
            send_mail(subject, request.data['message'], 'gonnellcough@gmail.com', ['gonnellcough@gmail.com'], fail_silently=False)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
        except Exception as e:
            print(e)
            return Response({'message':'failed to send mail'}, status=status.HTTP_400_BAD_REQUEST)


class returnPaymentAddress(APIView):
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             Misc.get_payment_address(self, request.data['orderUUID'])
             return_data = Misc.get_orders(self, 'unpaid', profile.uuid)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except Exception as e:
             print(e)
             return Response({'message':'failed to retrieve payment address'}, status=status.HTTP_400_BAD_REQUEST)


class createMessage(APIView):
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             Message.objects.create(order_uuid=request.data['orderUUID'], by_user=user, content=request.data['content'])
             return_data = Misc.get_orders(self, request.data['option'], profile.uuid)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except:
             return Response({'message':'create message'}, status=status.HTTP_400_BAD_REQUEST)


class orders(APIView):
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             return_data = Misc.create_order(self, request, profile.uuid)
             print('right? %s' % return_data)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except:
             return Response({'message':'make order error'}, status=status.HTTP_400_BAD_REQUEST)

class getOrders(APIView):

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             print(request.data['option'])
             return_data = Misc.get_orders(self, request.data['option'], profile.uuid)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except Exception as e:
             print(e)
             return

class addresses(APIView):
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             return_data = Misc.new_address(self, request, profile.uuid)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except:
             return Response({'message':'problem saving address'}, status=status.HTTP_400_BAD_REQUEST)

     def get(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             return_data = Misc.get_addresses(self, profile.uuid)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except Exception as e:
             print('addresses get %s' % e)


class createOrder(APIView):

    def post(self, request, format=None):
        try:
            shipTo = request.data['shipTo']
            streetAddress = request.data['address']
            try:
                apartment = request.data['apartmentNumber']
            except:
                apartment = ''
            country = request.data['country']
            zip_code = request.data['zipCode']
            makeDefault = request.data['makeDefault']
            try:
                additionalInfo = request.data['additionalInfo']
            except:
                additionalInfo = ''
            Address.objects.create(name=shipTo,street_address=streetAddress,apartment=apartment,country=country,zip_code=zipCode,is_default=makeDefault,additional_info=additionalInfo)
            return
        except Exception as e:
            print('createOrder post %s' % e)

class getScreenCap(APIView):

    def post(self, request, format=None):
        try:
            if request.data['token'] == 'notavalidtoken':
                guest_uu = uuid.uuid4()
                user = User.objects.create_user(str(guest_uu), email=str(guest_uu),  password=str(guest_uu), last_name=str(guest_uu), first_name=str(guest_uu))
                token = AuthToken.objects.create(user)
            else:
                token = request.data['token']
            url = request.data['url']
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            DRIVER = 'chromedriver'
            #driver = webdriver.Chrome('/home/conlloc/btcbuy/venv/selenium/webdriver/chrome/chromedriver', chrome_options=chrome_options)
            driver = webdriver.Chrome('/home/connlloc/chromedriver', chrome_options=chrome_options)

            driver.get(url)
            uu = uuid.uuid4()
            #location = '/home/conlloc/btcbuy/btcbuyer/photos/%s.png' % uu
            location = '/home/connlloc/btcbuyer/photos/%s.png' % uu
            screenshot = driver.save_screenshot(location)
            driver.quit()
            return_data = {'screenshot_uuid': str(uu), 'screenshot_url': str(url), 'token': token}
            return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
        except Exception as e:
            print('get screencap post %s' % e)
            return Response({'message':'screenshot failed'}, status=status.HTTP_400_BAD_REQUEST)
            #take selenium screenshot of url yea.

class changeData(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = request._auth.user
            if user.check_password(str(request.data['password'])) == True:
                print(request.data)
                if request.data['newEmail'] is not None:
                    user.username = request.data['newEmail']
                    user.email = request.data['newEmail']
                    user.save()
                    print(user.email)
                    return Response({'message': 'email changed'}, status=status.HTTP_200_OK)
                elif request.data['firstName'] is not None:
                    user.first_name = request.data['firstName']
                    user.save()
                elif reqeust.data['lastName'] is not None:
                    user.last_name = request.data['lastName']
                    user.save()
                elif requsest.data['phoneNumber'] is not None:
                    profile = Profile.objects.get(user=user)
                    profile.phone_number = request.data['phoneNumber']
                    profile.save()
                else:
                    return Response({'message':'no data provided'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message':'problem with authentication'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('change data post %s' % e)
            return Response({'message':'problem with authentication or data'}, status=status.HTTP_400_BAD_REQUEST)


class logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, format=None):
        try:
            user = request._auth.user
            user.auth_token_set.all().delete()
            return Response({'token': 'user logged out'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('logout get %s' % e)
            return Response({'message':'something went wrong please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class login(APIView):

    def post(self, request, format=None):
        try:
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user is not None:
                user.auth_token_set.all().delete()
                token = AuthToken.objects.create(user)
                return Response({'token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'incorrect login info'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('login post %s' % e)
            return Response({'message':'something went wrong please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class changePassword(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = request._auth.user
            #user = authenticate(username=request.data['email'], password=request.data['password'])
            if user.check_password(str(request.data['password'])) == True:
                print('true')
                user.set_password(request.data['newPassword'])
                user.save()
                return Response({'message': 'success'}, status=status.HTTP_200_OK)
            else:

                return Response({'message':'incorrect login info'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('change password post %s' % e)
            return Response({'message':'something went wrong please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class recoverPassword(APIView):

    def post(self, request, format=None):
        try:
            user = User.objects.get(email=request.data['email'])
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:15]
            user.set_password(salt)
            user.save()
            message = 'this is your new password, please login and change it %s' % str(salt)
            print(message);
            send_mail('btc buyer recover password', message, 'gonnellcough@gmail.com', [str(user)], fail_silently=False)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('recover password post %s' % e)
            return Response({'message':'there was an internal problem please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class deleteUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = authenticate(username=request.data['email'], password=request.data['password'])
            print('authed?')
            if user is not None and request._auth.user == user:
                user.auth_token_set.all().delete()
                user.delete()
                return Response({'user': user.username, 'message': 'user deleted'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('delete user post %s' % e)
            return Response({'message':'user deletion error'}, status=status.HTTP_400_BAD_REQUEST)


class createUser(APIView):

    def post(self, request, format=None):
        try:
            return_data = Misc.create_user(self, request)
            return Response(return_data, status=status.HTTP_200_OK)
        except Exception as e:
            print('create user post %s' % e)
            return Response({'message':"user creation failed"}, status=status.HTTP_400_BAD_REQUEST)

class validateEmail(APIView):

    def post(self, request, format=None):
        try:
            user = User.objects.get(email=request.data['email'])
            profile = Profile.objects.get(user=user)
            return_data = Misc.send_validation_email(self, request.data['email'], profile.uuid)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('validate email post %s' % e)
            return Response({'message':'email failed to send'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, *args, format=None):
        try:
            token = Validation_token.objects.get(token=args[0])
            now = datetime.datetime.utcnow() + datetime.timedelta(seconds=1)
            if datetime.datetime.utcnow() < token.expires.replace(tzinfo=None):
                profile = Profile.objects.get(uuid=token.user_uuid)
                profile.email_validated = True
                token.delete()
                profile.save()
                return Response({'message': 'email validation success'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'that token is too old'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('validate email get %s' % e)
            return Response({'message':'problem retrieving user or token'}, status=status.HTTP_400_BAD_REQUEST)


class Misc(APIView):

    def create_user(self, request):
        try:
           #uu = uuid.uuid4()
           #if request.data['guest'] == 'True':
            #   print(uu)
            #   uu = str(uu)
            #   email = '%s@email.com' % uu
            #   user = User.objects.create_user(uu, email=uu, password=uu)
            #   profile = Profile.objects.create(user=user, is_guest=True, phone_number='')
            #   token = AuthToken.objects.create(user)
            #   return_data = {'user': user.email, 'token': token}
            #   return return_data
           if User.objects.filter(email=request.data['email']).exists() == False:
               try:
                   first_name = request.data['firstName']
               except:
                   first_name = ''
               try:
                   last_name = request.data['lastName']
               except:
                   last_name = ''
               user = User.objects.create_user(request.data['email'], email=request.data['email'],  password=request.data['password'], last_name=last_name, first_name=first_name)
           else:
               return Response(status=status.HTTP_400_BAD_REQUEST)
           try:
               phone_number = request.data['phone_number']
           except:
               phone_number = ''
           profile = Profile.objects.create(user=user, phone_number=phone_number, is_guest=False)
           Misc.send_validation_email(self, request.data['email'], profile.uuid)
           token = AuthToken.objects.create(user)
           return_data = {'user': user.email, 'message': 'email sent', 'token': token}
           return return_data
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


    def send_validation_email(self, email, uuid):
        try:
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:30]
            user = User.objects.get(email=email)
            if Validation_token.objects.filter(user_uuid=uuid).exists() == True:
                Validation_token.objects.filter(user_uuid=uuid).delete()
            expires = datetime.datetime.utcnow() + datetime.timedelta(days=1)
            token = Validation_token.objects.create(user_uuid=uuid, token=salt, expires=expires)
            url = 'theurl.com/api/v1/validate/%s' % salt
            token.save()
            #send_mail('btc buyer email validation', url, 'defaultemail@email.com', [str(email)], fail_silently=False)
            return True
        except Exception as e:
            print('misc send_validation_email %s' % e)
            return False

    def new_address(self, request, user_uuid):
        try:
            name = request.data['name']
            address = request.data['address']
            apartment = request.data['apartment']
            country = request.data['country']
            zipCode = request.data['zip']
            additional = request.data['additional']
            phone_number = request.data['phone']
            try:
                creating_order = request.data['creatingOrder']
                print(creating_order)
            except:
                creating_order = False
                print(creating_order)
            address = Address.objects.create(phone_number=phone_number, user_uuid=user_uuid, name=name, address=address, apartment=apartment, country=country, zip_code=zipCode, additional_info=additional)
            if creating_order == False:
                print('creating order false')
                return Misc.get_addresses(self, user_uuid)
            print('creating order true')
            return address
        except Exception as e:
            print('new address %s' % e)
            return False

    def get_addresses(self, user_uuid):
        try:
            addresses = Address.objects.filter(user_uuid=user_uuid)
            adds = []
            for add in addresses:
                data = {'name': add.name, 'address': add.address, 'apartment': add.apartment, 'country': add.country, 'zipCode': add.zip_code, 'additional': add.additional_info, 'isDefault': add.is_default, 'phoneNumber': add.phone_number, 'uuid': add.uuid}
                adds.append(data)
            return_data = {}
            return_data['objects'] = adds
            return return_data
        except Exception as e:
            print('get addresses %s' % e)
            return False


    def get_orders(self, option, uuid):
        print('#################')
        print(option)
        if option == 'unpaid':
            orders = Order.objects.filter(user_uuid=uuid, order_status='UNPAID').order_by('created').reverse()
        elif option == 'paid':
            orders = Order.objects.filter(user_uuid=uuid, order_status='PAID').order_by('created').reverse()
        elif option == 'completed':
            orders = Order.objects.filter(user_uuid=uuid, order_status='COMPLETED').order_by('created').reverse()
        else:
            orders = Order.objects.filter(user_uuid=uuid).order_by('created').reverse()
        ords = []
        for order in orders:
            try:
                paymentAdd = PaymentAddress.objects.get(order_uuid=order.uuid)
                print(paymentAdd.expires.replace(tzinfo=None))
                print(datetime.datetime.utcnow())
                if datetime.datetime.utcnow() > paymentAdd.expires.replace(tzinfo=None):
                    if Misc.check_payment(self, paymentAdd.charge_id):
                        order.order_status = 'PAID'
                        order.paid_for = True
                        order.save()
                    else:
                        paymentAdd.delete()
                else:
                    if Misc.check_payment(self, paymentAdd.charge_id):
                        order.order_status = 'PAID'
                        order.paid_for = True
                        order.save()
            except:
                print('try as i might')
                paymentAdd = ''
                pass
            if paymentAdd != '':
                message = Message.objects.filter(order_uuid=order.uuid).order_by('created')
                add = Address.objects.get(uuid=order.address_uuid)
                data = {'btc': paymentAdd.btc, 'eth': paymentAdd.eth, 'cash': paymentAdd.cash, 'ltc': paymentAdd.ltc,\
                'expires': paymentAdd.expires, 'name': add.name, 'address': add.address, 'apartment': add.apartment, \
                'country': add.country, 'zipCode': add.zip_code, 'additional': add.additional_info,\
                'isDefault': add.is_default, 'phoneNumber': add.phone_number, 'addressUUID': add.uuid, 'orderUUID': order.uuid, \
                'shipped': order.shipped, 'url': order.url, 'price': order.price, 'paidFor': order.paid_for,\
                'created': order.created, 'screenshotUUID': order.screenshot_uuid, 'priority': order.priority, 'orderStatus': order.order_status, 'orderCreated': order.created, \
                'messages':[{'content':mess.content,'created':mess.created, 'byUser': mess.by_user} for mess in message]}
                ords.append(data)
            else:
                message = Message.objects.filter(order_uuid=order.uuid).order_by('created')
                add = Address.objects.get(uuid=order.address_uuid)
                data = {'name': add.name, 'address': add.address, 'apartment': add.apartment, \
                'country': add.country, 'zipCode': add.zip_code, 'additional': add.additional_info,\
                'isDefault': add.is_default, 'phoneNumber': add.phone_number, 'addressUUID': add.uuid, 'orderUUID': order.uuid, \
                'shipped': order.shipped, 'url': order.url, 'price': order.price, 'paidFor': order.paid_for,\
                'created': order.created, 'screenshotUUID': order.screenshot_uuid, 'priority': order.priority, 'orderStatus': order.order_status, 'orderCreated': order.created, \
                'messages':[{'content':mess.content,'created':mess.created, 'byUser': mess.by_user} for mess in message]}
                ords.append(data)
        return_data = {}
        return_data['objects'] = ords
        return return_data


    def check_payment(self, order_id):
        try:
            url = "https://api.commerce.coinbase.com/charges/%s" % order_id
            print(url)
            headers = {'X-CC-Api-Key': '5e429073-2a6d-4d2b-91e7-f6fc45108eed', 'X-CC-Version': '2018-03-22'}
            response = requests.get(url, headers=headers)
            data = response.json()
            try:
                data['data']['confirmed_at']
                return True
            except:
                return False
        except Exception as e:
            print('check payment %s' % e)


    def create_order(self, request, user_uuid):
        try:
            if request.data['addressUUID'] != '':
                try:
                    print('uuid is true')
                    order = Order.objects.create(user_uuid=user_uuid, quantity=request.data['quantity'], price=request.data['price'], address_uuid=request.data['addressUUID'], shipped=False, url=request.data['url'], screenshot_uuid=request.data['screenshotUUID'], paid_for=False, priority='low', order_status='UNPAID')
                    return_data = Misc.get_orders(self, 'unpaid', user_uuid)
                    return return_data
                except Exception as e:
                    print('save order %s' % e)
            else:
                try:
                    print('uuid is false')
                    one_address = Misc.new_address(self, request, user_uuid) #remember to pass creating_order = True
                    address_uuid = one_address.uuid
                    print(address_uuid)
                    print(request.data['price'])
                    print(request.data['screenshotUUID'])
                    order = Order.objects.create(user_uuid=user_uuid, address_uuid=address_uuid, quantity=request.data['quantity'], price=request.data['price'], shipped=False, url=request.data['url'], screenshot_uuid=request.data['screenshotUUID'], paid_for=False, priority='low', order_status='UNPAID')
                    return_data = Misc.get_orders(self, 'unpaid', user_uuid)
                    return return_data
                except Exception as e:
                    print('get one address %' % e)
        except Exception as e:
            print('except %s' %e)
            return False


    def get_payment_address(self, order_uuid):
        try:
            url = "https://api.commerce.coinbase.com/charges"
            headers = {'X-CC-Api-Key': '5e429073-2a6d-4d2b-91e7-f6fc45108eed', 'X-CC-Version': '2018-03-22'}
            order = Order.objects.get(uuid=order_uuid)
            print(type(order.price))
            print(order.price)
            percent = float(order.price) * 0.015
            if percent < 3:
                amount = 1.5 + float(order.price)
            else:
                amount = percent + float(order.price)
            payload = {'name': order_uuid,'description': order.url, 'local_price': {'amount':amount,'currency':'USD'},'pricing_type': 'fixed_price','metadata': {'customer_id': str(order.user_uuid) }}
            response = requests.post(url, headers=headers, json=payload)
            data = response.json()
            btc_add = data['data']['addresses']['bitcoin']
            eth_add = data['data']['addresses']['ethereum']
            cash_add = data['data']['addresses']['bitcoincash']
            ltc_add = data['data']['addresses']['litecoin']
            charge_id = data['data']['code']
            #order_uuid
            created = data['data']['created_at']
            expires = data['data']['expires_at']
            btc = '%s btc to %s' % (str(data['data']['pricing']['bitcoin']['amount']), str(btc_add))
            eth = '%s eth to %s' % (str(data['data']['pricing']['ethereum']['amount']), str(eth_add))
            cash = '%s bitcoin cash to %s' % (str(data['data']['pricing']['bitcoincash']['amount']), str(cash_add))
            ltc = '%s ltc to %s' % (str(data['data']['pricing']['litecoin']['amount']), str(ltc_add))
            PaymentAddress.objects.create(btc=btc, eth=eth, cash=cash, ltc=ltc, order_uuid=order_uuid, created=created, expires=expires, charge_id=charge_id)
            print('here')
        except Exception as e:
            print('get payment address %s' % e)
            return False
