from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'membership_number', 'date_joined', 'birthdate']

        extra_kwargs = {'password': {'write_only': True, 'required': False}}
    

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data) #doesnt include password

        if password is not None:
            instance.set_password(password) #hashes password
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = None
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return {'message': 'succesfull updated'}

class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = ['id', 'user', 'group']

class SportsGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportsGroup
        fields = ['id', 'name', 'active', 'department']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['id', 'user', 'group']

class RegularTrainUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegularTrainUnit
        fields = ['id', 'group', 'weekday', 'start_time', 'end_time', 'place']

class TrainHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainHour
        fields = ['id', 'date', 'start_time', 'end_time', 'place', 'note', 'group', 'trainer']

class DepartmentLeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentLeaderShip
        fields = ['id', 'user', 'department']

class TrainHourParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainHourParticipation
        fields = ['id', 'user', 'hour']
