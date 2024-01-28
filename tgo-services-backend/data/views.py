from django.shortcuts import render
from django.http import JsonResponse
from .models import Person
from .serializers import PersonSerializer
# Create your views here.

def person_list(request):
    persons = Person.objects.all()
    serializer = PersonSerializer(persons, many=True)
    return JsonResponse({'persons': serializer.data}, safe=True)

def person(request):
    print(f"Request: {request}")
    person = Person.objects.get(request)
    serializer = PersonSerializer(person, many=False)
    return JsonResponse({'person': serializer.data}, safe=True)
