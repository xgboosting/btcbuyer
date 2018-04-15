from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from cryptoapp.models import Profile, Address, Message, Order, Validation_token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from knox.models import AuthToken
from knox.auth import TokenAuthentication
import hashlib, random, string, uuid, json, datetime
from selenium import webdriver

#place order
#dashboard
#send message
#
#
#
def main(request):
    with open('/home/conlloc/btcbuy/btcbuyer/local_lens/build/index.html') as f:
        return HttpResponse(f.read())

class orders(APIView):
     authentication_classes = (TokenAuthentication,)
     permission_classes = (IsAuthenticated,)

     def post(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             return_data = Misc.create_order(self, request, profile.uuid)
             print(return_data)
             return Response(return_data, status=status.HTTP_200_OK, headers={'Content-Type': 'application/json'})
         except:
             return Response({'message':'make order error'}, status=status.HTTP_400_BAD_REQUEST)


     def get(self, request, format=None):
         try:
             user = request._auth.user
             profile = Profile.objects.get(user=user)
             return_data = Misc.get_orders(self, profile.uuid)
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
            print('here')
            url = request.data['url']
            DRIVER = 'chromedriver'
            driver = webdriver.Chrome('/home/conlloc/btcbuy/venv/selenium/webdriver/chrome/chromedriver')
            driver.get(url)
            uu = uuid.uuid4()
            location = '/home/conlloc/btcbuy/btcbuyer/photos/%s.png' % uu
            screenshot = driver.save_screenshot(location)
            driver.quit()
            return_data = {'screenshot_uuid': str(uu), 'screenshot_url': str(url)}
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
            #send_mail('btc buyer recover password', message, 'defaultemail@email.com', [str(email)], fail_silently=False)
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

    def get_orders(self, uuid):
        orders = Order.objects.filter(user_uuid=uuid).order_by('created').reverse()
        ords = []
        for order in orders:
            add = Address.objects.get(uuid=order.address_uuid)
            data = {'name': add.name, 'address': add.address, 'apartment': add.apartment, 'country': add.country, 'zipCode': add.zip_code, 'additional': add.additional_info, 'isDefault': add.is_default, 'phoneNumber': add.phone_number, 'uuid': add.uuid \
            }
            return


    def create_order(self, request, user_uuid):
        try:
            if request.data['addressUUID'] != '':
                try:
                    print('uuid is true')
                    order = Order.objects.create(user_uuid=user_uuid, price=request.data['price'], address_uuid=request.data['addressUUID'], shipped=False, url=request.data['url'], screenshot_uuid=request.data['screenshotUUID'], paid_for=False, priority='unpaid', order_status='low')
                    return_data = {}
                    return_data['objects'] = {'success with saved address'}
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
                    order = Order.objects.create(user_uuid=user_uuid, address_uuid=address_uuid, price=request.data['price'], shipped=False, url=request.data['url'], screenshot_uuid=request.data['screenshotUUID'], paid_for=False, priority='unpaid', order_status='low')
                    print(one_address)
                    return_data = {}
                    return_data['objects'] = {'success with new address'}
                    return return_data
                except Exception as e:
                    print('get one address %' % e)
        except Exception as e:
            print('except %s' %e)
            return False
