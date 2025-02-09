from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import action
from .permissions import *
from datetime import datetime, timezone, timedelta
import jwt
import json
# Create your views here.

TEMP_SECRET = "Tempoary Secret Change for Production!"

invalid_cookie_dict = {}

def authenticate_user(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated!")    
    if token in invalid_cookie_dict.keys():
        raise AuthenticationFailed("Unauthenticated!")    
    try:
        payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
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
        response.set_cookie(key='jwt', 
                            value=token, 
                            httponly=True, 
                            samesite='None', 
                            secure=True)  #production True
        response.data = {'jwt token': token}

        return response
    
class GetUserView(APIView):
    def get(self, request):
        user = authenticate_user(request=request)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class IsAuthenticated(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            return Response({'authenticated': False})        
        try:
            payload = jwt.decode(token[2:-1].encode(), TEMP_SECRET, algorithms="HS256")
            return Response({'authenticated': True})
        except jwt.ExpiredSignatureError:
            return Response({'authenticated': False})


class UpdateUserView(APIView):
    def post(self, request):
        user = authenticate_user(request=request)
        serializer = UserSerializer()
        serializer.update(user, request.data)
        return Response(serializer.data)


class LogoutUserView(APIView):
    def get(self, request):
        response = Response()
        token = request.COOKIES.get('jwt')
        if not token:
            response.data = {'message': 'not successful'}
            return response
        invalid_cookie_dict[token] = "invalid"
        response.delete_cookie('jwt')
        response.data = {'message': 'successful'}

        return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [Authenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'membership_number', 'email', 'id']

    @action(detail=False, methods=['get'])
    def get_emails(self, request, pk=None):
        email = User.objects.values_list('email', flat=True)

        return Response(email)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [Authenticated, IsAdmin]


class SportsGroupViewSet(viewsets.ModelViewSet):
    queryset = SportsGroup.objects.all()
    serializer_class = SportsGroupSerializer
    permission_classes = [Authenticated]


class TrainHourViewSet(viewsets.ModelViewSet):
    queryset = TrainHour.objects.all()
    serializer_class = TrainHourSerializer
    #permission_classes = [Authenticated]
    
    @action(detail=False, methods=['post'])
    def get_trainhour_by_user(self, request, pk=None):
        id = request.data['user_id']
        user = User.objects.get(id=id)
        train_hours = TrainHour.objects.filter(trained_by=user)
        serializer = TrainHourSerializer(train_hours, many=True)

        return Response(json.dumps(serializer.data))