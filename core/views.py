import os
import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Topic, Question
import google.generativeai as genai

# Setup Gemini with the environment key
api_key = os.environ.get("API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def dashboard(request):
    topics = Topic.objects.all()
    return render(request, 'dashboard.html', {'topics': topics})

def topic_detail(request, topic_id):
    topic = get_object_or_404(Topic, id_str=topic_id)
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
    topic = get_object_or_404(Topic, id_str=topic_id)
    # Convert queryset to list of dicts for JSON serialization in the template
    qs = Question.objects.filter(topic=topic, difficulty=level)
    questions = []
    for q in qs:
        questions.append({
            'id': q.id,
            'text': q.text,
            'answer': q.answer,
            'code_snippet': q.code_snippet or '',
            'language': q.language
        })
    
    return render(request, 'quiz.html', {
        'topic': topic,
        'level': level,
        'questions_json': json.dumps(questions)
    })

def ai_explanation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            topic_name = data.get('topic')
            question_text = data.get('question')
            answer_text = data.get('answer')
            
            # Select appropriate model for text tasks
            model = genai.GenerativeModel('gemini-3-flash-preview')
            
            prompt = f"""You are a senior DevOps SRE interviewer. 
            Provide a detailed but clear explanation for this concept.
            
            Topic: {topic_name}
            Question: {question_text}
            Candidate Answer: {answer_text}
            
            Format your response in Markdown with:
            ### 🔍 Deep Dive
            (A thorough explanation of the technical concept)
            
            ### 🏗️ Real-World Scenario
            (An example of how this is applied in a production infrastructure)
            
            ### 💡 Interview Pro-Tip
            (A specific tip to impress the interviewer when answering this question)
            """

            response = model.generate_content(prompt)
            return JsonResponse({'explanation': response.text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405)
