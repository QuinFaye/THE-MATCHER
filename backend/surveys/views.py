from django.shortcuts import render

def survey_list(request):
    return render(request, 'surveys/survey_list.html')  # Or return JsonResponse for API

def survey_detail(request, survey_id):
    return render(request, 'surveys/survey_detail.html', {'survey_id': survey_id})
