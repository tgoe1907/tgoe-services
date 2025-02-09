from rest_framework.permissions import BasePermission
import jwt
from .models import User

TEMP_SECRET = "Tempoary Secret Change for Production!"



#class IsTrainer(BasePermission):
#    def has_object_permission(self, request, view, obj):
#        if request.user

class Authenticated(BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False       
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            return True
        except jwt.ExpiredSignatureError:
            return False

    def has_object_permission(self, request, view, obj):
        token = request.COOKIES.get('jwt')
        if not token:
            return False       
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            return True
        except jwt.ExpiredSignatureError:
            return False

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False       
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            user = User.objects.get(id=payload['id'])
            return user.admin
        except jwt.ExpiredSignatureError:
            return False

    def has_object_permission(self, request, view, obj):
        token = request.COOKIES.get('jwt')
        if not token:
            return False       
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            user = User.objects.get(id=payload['id'])
            return user.admin
        except jwt.ExpiredSignatureError:
            return False

class OwnedByUser(BasePermission):
     def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False       
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            user = User.objects.get(id=payload['id'])
            return user.admin
        except jwt.ExpiredSignatureError:
            return False
            