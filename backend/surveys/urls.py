from django.urls import path
from .views import SurveyQuestionListView, SurveyAnswerCreateView

urlpatterns = [
    path('questions/', SurveyQuestionListView.as_view(), name='survey-question-list'),
    path('submit/', SurveyAnswerCreateView.as_view(), name='survey-answer-submit'),
]
