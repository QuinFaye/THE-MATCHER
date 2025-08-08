from django.db import models
from accounts.models import CustomUser  # Import user model from accounts app

class SurveyQuestion(models.Model):
    """
    Stores a single survey question.
    Each question is linked to a role (student or supervisor)
    and has a list of choices (4 options).
    """
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('supervisor', 'Supervisor'),
    )
    text = models.CharField(max_length=255)  # The question text
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)  # Who sees this question
    choices = models.JSONField()

    def __str__(self):
        return f"{self.role}: {self.text}"

class SurveyAnswer(models.Model):
    """
    Stores all answers for a user for a survey session.
    Answers are stored as a JSON object: {question_id: selected_option}
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    role = models.CharField(max_length=20)  # Redundant but useful for filtering
    answers = models.JSONField()  # e.g. {"1": "A", "2": "C", ...}
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} ({self.role}) - {self.submitted_at}"