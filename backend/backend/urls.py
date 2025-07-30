from django.contrib import admin
from django.urls import path, include
from . import views  # if you have views.index etc.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('surveys/', include('surveys.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('', views.index, name='index'),  # optional landing page
]
