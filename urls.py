from django.urls import path
from core import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('topic/<str:topic_id>/', views.topic_detail, name='topic_detail'),
    path('quiz/<str:topic_id>/<str:level>/', views.quiz_view, name='quiz'),
    path('api/explain/', views.ai_explanation, name='ai_explain'),
]
