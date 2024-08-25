from django.urls import path 
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('login/', LoginUserView.as_view()),
    path('user/', GetUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('logout/', LogoutUserView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
