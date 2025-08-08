from django.contrib import admin
from .models import SurveyQuestion, SurveyAnswer

# Register your models here for admin access
admin.site.register(SurveyQuestion)
admin.site.register(SurveyAnswer)