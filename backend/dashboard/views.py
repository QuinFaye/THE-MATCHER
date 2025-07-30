from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def dashboard_home(request):
    return HttpResponse("Hello from the dashboard!")
