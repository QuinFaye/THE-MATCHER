from django.urls import path
from . import views

urlpatterns = [
    path('', views.survey_list, name='survey_list'),             # e.g., /surveys/
    path('<int:survey_id>/', views.survey_detail, name='survey_detail'),  # e.g., /surveys/5/
    # Add other survey-specific URLs here, for example:
    # path('create/', views.create_survey, name='create_survey'),
    # path('<int:survey_id>/results/', views.survey_results, name='survey_results'),
]
