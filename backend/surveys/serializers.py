from rest_framework import serializers
from .models import SurveyQuestion, SurveyAnswer

class SurveyQuestionSerializer(serializers.ModelSerializer):
    """
    Serializer for SurveyQuestion model.
    Serializes all fields, including choices (list of options).
    """
    class Meta:
        model = SurveyQuestion
        fields = ['id', 'role', 'text', 'choices']

class SurveyAnswerSerializer(serializers.ModelSerializer):
    """
    Serializer for SurveyAnswer model.
    Serializes user, role, answers (JSON), and submission time.
    """
    class Meta:
        model = SurveyAnswer
        fields = ['id', 'user', 'role', 'answers', 'submitted_at']
        read_only_fields = ['user', 'role', 'submitted_at']  # user set from request, submitted_at is auto

    def validate(self, data):
        user = self.context['request'].user

         # Check if user already submitted
        if SurveyAnswer.objects.filter(user=user).exists():
            raise serializers.ValidationError(
                "You have already submitted the survey."
        )

        role = user.role

        # Get all question IDs for this role
        required_questions = list(
            SurveyQuestion.objects.filter(role=role).values_list('id', flat=True)
        )

        submitted_question_ids = list(map(int, data['answers'].keys()))

        # Check if all required questions are answered
        if set(submitted_question_ids) != set(required_questions):
            raise serializers.ValidationError(
                f"You must answer all {len(required_questions)} questions."
            )

        return data

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        validated_data['role'] = request.user.role  # auto-fill from user
        return super().create(validated_data)
