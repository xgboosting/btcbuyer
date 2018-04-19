from django.conf.urls import url, include
from cryptoapp import views
from rest_framework import routers




urlpatterns = [
    url(r'^$', views.main, name='main'), ## serve react app
    url(r'^api/get-address/$', views.returnPaymentAddress.as_view(), name='returnPaymenAddress'), #
    url(r'^api/orders/$', views.orders.as_view(), name='orders'), #
    url(r'^api/get-orders/$', views.getOrders.as_view(), name='getOrders'), #
    url(r'^api/message/$', views.createMessage.as_view(), name='message'), #
    url(r'^api/get-screencap/$', views.getScreenCap.as_view(), name='getScreenCap'), #
    url(r'^api/change-data/$', views.changeData.as_view(), name='changeData'), #
    url(r'^api/addresses/$', views.addresses.as_view(), name='addresses'), #
    url(r'^api/change-password/$', views.changePassword.as_view(), name='changePassword'), ######### username, password, newPassword
    url(r'^api/create-user/$', views.createUser.as_view(), name='createUser'), # username, password, email,
    url(r'^api/recover-password/$', views.recoverPassword.as_view(), name='recoverPassword'), #
    url(r'^api/delete-user/$', views.deleteUser.as_view(), name='deleteUser'), #
    url(r'^api/validate-email/$', views.validateEmail.as_view(), name='validateEmail'), #
    url(r'^api/validate-email/([0-9a-f]{30})$', views.validateEmail.as_view(), name='validateEmail'),
    url(r'^api/login/$', views.login.as_view(), name='login'), #
    url(r'^api/logout/$', views.logout.as_view(), name='logout'), #

    url(r'api/auth/', include('knox.urls'))# login, logout
]
