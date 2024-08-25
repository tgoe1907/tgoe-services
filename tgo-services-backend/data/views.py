from django.shortcuts import render
from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from datetime import datetime, timezone, timedelta
import jwt
# Create your views here.

TEMP_SECRET = "Tempoary Secret Change for Production!"

def authenticate_user(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated!")        
    try:
        payload = jwt.decode(token, TEMP_SECRET, algorithms="HS256")
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated!")
    user = User.objects.filter(id=payload['id']).first()
    return user


class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginUserView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')

        payload = {
            "id": user.id,
            "email": user.email,
            "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=60),
            "iat": datetime.now(tz=timezone.utc),
        }

        token = jwt.encode(payload, TEMP_SECRET, algorithm='HS256')
        response = Response() 
        response.set_cookie(key='jwt', value=token, httponly=True)  #httonly - frontend can't access cookie, only for backend
        response.data = {'jwt token': token}

        return response
    
class GetUserView(APIView):
    def get(self, request):
        user = authenticate_user(request=request)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UpdateUserView(APIView):
    def post(self, request):
        user = authenticate_user(request=request)
        serializer = UserSerializer()
        serializer.update(user, request.data)
        return Response(serializer.data)


class LogoutUserView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {'message': 'successful'}

        return response
