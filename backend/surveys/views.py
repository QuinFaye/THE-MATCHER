from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SurveyQuestion, SurveyAnswer
from .serializers import SurveyQuestionSerializer, SurveyAnswerSerializer

class SurveyQuestionListView(generics.ListAPIView):
    """
    List all survey questions for the current user's role.
    Only authenticated users can access.
    """
    serializer_class = SurveyQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SurveyQuestion.objects.filter(role=user.role)

class SurveyAnswerCreateView(generics.CreateAPIView):
    """
    Submit all answers for a user at once.
    Only authenticated users can submit.
    """
    serializer_class = SurveyAnswerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the answer with the current user and their role
        serializer.save(user=self.request.user, role=self.request.user.role)