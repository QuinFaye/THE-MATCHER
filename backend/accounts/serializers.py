from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'role', 'title', 'matric_number', 'password']

    def validate(self, data):
        role = data.get('role')

        if role == 'student' and not data.get('matric_number'):
            raise serializers.ValidationError("Matric number is required for students.")
        if role == 'supervisor' and not data.get('title'):
            raise serializers.ValidationError("Title is required for supervisors.")

        return data

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
