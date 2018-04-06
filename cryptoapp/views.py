from django.shortcuts import render
import hashlib, random, string, uuid
from django.core.mail import send_mail
from cryptoapp.models import Profile, Address, Message, Order, Validation_token
from django.contrib.auth.models import User
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class changeData(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        try:
            request_user = request._auth.user
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user is not None and request_user == user:
                if request.data['newEmail'] is not None:
                    user.username = request.data['newEmail']
                    user.email = request.data['newEmail']
                    user.save()
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
                    pass
            else:
                return Response({'message':'problem with authentication'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('change data post %s' % e)



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
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user is not None and request._auth.user == user:
                user.set_password(request.data['newPassword'])
                return Response({'message': 'success'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'incorrect login info'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('change password post %s' % e)
            return Response({'message':'something went wrong please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class recoverPassword(APIView):

    def post(self, request, format=None):
        try:
            profile = User.objects.get(email=request.data['email'])
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:15]
            user = User.objects.get(email=email)
            user.set_password(str(salt))
            message = 'this is your new password, please login and change it %s' % str(salt)
            send_mail('btc buyer recover password', message, 'defaultemail@email.com', [str(email)], fail_silently=False)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('recover password post %s' % e)
            return Response({'message':'there was an internal problem please contact admins'}, status=status.HTTP_400_BAD_REQUEST)


class deleteUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = request._auth.user
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
            return_data = Misc.send_validation_email(self, request.data['email'])
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e:
            print('validate email post %s' % e)
            return Response({'message':'email failed to send'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, *args, format=None):
        try:
            token = Validation_token.objects.get(token=args[0])
            now = timezone.now()
            token_expiry = token.dateCreated + datetime.timedelta(days=1)
            if now < token_expiry:
                profile = Profile.objects.get(uuid=token.user_uuid)
                profile.email_validated = True
                profile.save()
                return Response({'message': 'email validation success'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'that token is too old'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('validate email get %s' % e)
            return Response({'message':'problem retrieving user or token'}, status=status.HTTP_400_BAD_REQUEST)


class Misc(APIView):

    def send_validation_email(self, email):
        try:
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:30]
            user = User.objects.get(email=email)
            token = Validation_token.objects.create(user_uuid=user.uuid, token=salt)
            url = 'theurl.com/api/v1/validate/%s' % salt
            token.save()
            send_mail('btc buyer email validation', url, 'defaultemail@email.com', [str(email)], fail_silently=False)
            return True
        except Exception as e:
            print('misc send_validation_email %s' % e)
            return False

    def create_user(self, request):
        try:
           uu = uuid.uuid4()
           if User.objects.filter(email=request.data['email']).exists():
               user = User.objects.create_user(request.data['email'], email=request.data['email'],  password=request.data['password'])
           else:
               return Response({'message':"that email is taken"}, status=status.HTTP_400_BAD_REQUEST)
           user.save()
           self.send_validation_email(request.data['email'])
           if request.data['phone_number'] is not None:
               phone_number = request.data['phone_number']
           else:
               phone_number = ''
           profile = Profile.objects.create(user=user, phone_number=phone_number)
           token = AuthToken.objects.create(user)
           return_data = {'user': str(request.data['name']), 'message': 'email sent'}
           return return_data
        except Exception as e:
            print('misc create_user %s' % e)
            return Response({'message':"something went terribly wrong"}, status=status.HTTP_400_BAD_REQUEST)
