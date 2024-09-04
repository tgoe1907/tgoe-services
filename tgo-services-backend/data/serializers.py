from rest_framework import serializers
from .models import User

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
    