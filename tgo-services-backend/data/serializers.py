from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 
        'membership_number', 'date_joined', 'birthdate', "admin", "department_manager", "trainer_of", "participate_at"]

        extra_kwargs = {'password': {'write_only': True, 'required': False}}
    

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('password', None)
        departments = validated_data.pop('department_manager', [])
        trainer_of = validated_data.pop('trainer_of', [])
        participate_at = validated_data.pop('participate_at', [])
        user = User.objects.create(**validated_data) #doesnt include password

        if password is not None:
            user.set_password(password) #hashes password
        if trainer_of is not []:
            user.trainer_of.set(trainer_of)
        if participate_at is not []:
            user.participate_at.set(participate_at)
        if departments is not []:
            user.department_manager.set(departments)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = None
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return {'message': 'succesfull updated'}

class SportsGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportsGroup
        fields = ['id', 'name', 'active', 'department']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

class TrainHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainHour
        fields = ['id', 'date', 'start_time', 'end_time', 'place', 'note', 'group', 'trained_by', 'participants']