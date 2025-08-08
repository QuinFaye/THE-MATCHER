from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from django.contrib.auth import logout


User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        print("RegisterView hit!")  # Debug: confirm endpoint is reached
        print("Incoming data:", request.data)  # Debug: see posted data

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate JWT tokens for the new user
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "name": f"{user.first_name} {user.last_name}",
                        "role": user.role
                    },
                    "token": str(refresh.access_token),  # <-- Add this line
                },
                status=status.HTTP_201_CREATED
            )
        print("Registration errors:", serializer.errors)  # Debug: print validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(f"Login attempt for email: {email}")  # Debug

        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful',
                'user': {
                    'name': f"{user.first_name} {user.last_name}",
                    'role': user.role,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        print("Invalid login credentials")  # Debug
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


def logout_view(request):
    logout(request)
    return Response({"message": "Logout successfully"}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        print(f"Profile view accessed by: {user.email}")  # Debug
        return Response({
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "title": user.title,
            "matric_number": user.matric_number
        }, status=status.HTTP_200_OK)
