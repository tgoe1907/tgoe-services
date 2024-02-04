from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    surename = serializers.CharField(max_length=50)
    forname = serializers.CharField(max_length=50)
    membership_number = serializers.CharField(required=False, max_length=30)

    def create(self, validated_data):
        return Person.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.surename = validated_data.get('surename', instance.surename)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.membership_number = validated_data.get('membership_number', instance.membership_number)
        instance.save()
        return instance
