print("Accounts URLS loaded 🔥")

from django.urls import path
from .views import RegisterView, LoginView
from django.http import HttpResponse

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]