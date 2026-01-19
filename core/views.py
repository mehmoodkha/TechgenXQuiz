import os
import json
from django.shortcuts import render, get_object_path
from django.http import JsonResponse
from .models import Topic, Question
import google.generativeai as genai

# Setup Gemini
genai.configure(api_key=os.environ.get("API_KEY"))

def dashboard(request):
    topics = Topic.objects.all()
    # Mock overall progress (in a real app, this would be per user)
    return render(request, 'dashboard.html', {'topics': topics})

def topic_detail(request, topic_id):
    topic = get_object_path(Topic, id_str=topic_id)
    levels = ['Basic', 'Intermediate', 'Advanced']
    level_data = []
    for level in levels:
        count = Question.objects.filter(topic=topic, difficulty=level).count()
        level_data.append({'name': level, 'count': count})
    
    return render(request, 'topic_detail.html', {
        'topic': topic,
        'level_data': level_data
    })

def quiz_view(request, topic_id, level):
    topic = get_object_path(Topic, id_str=topic_id)
    questions = list(Question.objects.filter(topic=topic, difficulty=level).values())
    return render(request, 'quiz.html', {
        'topic': topic,
        'level': level,
        'questions_json': json.dumps(questions)
    })

def ai_explanation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        topic = data.get('topic')
        question = data.get('question')
        answer = data.get('answer')
        
        prompt = f"""You are a senior DevOps SRE. Explain this interview concept in detail but simply for a candidate. 
        Topic: {topic}
        Question: {question}
        Short Answer: {answer}
        
        Please provide:
        1. A deeper explanation of the underlying concepts.
        2. A real-world scenario where this knowledge is applied.
        3. A follow-up tip for the interview.
        Keep it structured with markdown."""

        try:
            model = genai.GenerativeModel('gemini-3-flash-preview')
            response = model.generate_content(prompt)
            return JsonResponse({'explanation': response.text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
