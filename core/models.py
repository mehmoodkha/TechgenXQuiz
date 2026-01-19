from django.db import models

class Topic(models.Model):
    id_str = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50) # Lucide icon name
    description = models.TextField()
    color = models.CharField(max_length=50) # e.g. emerald-500

    def __str__(self):
        return self.name

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('Basic', 'Basic'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='questions')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    text = models.TextField()
    answer = models.TextField()
    code_snippet = models.TextField(blank=True, null=True)
    language = models.CharField(max_length=20, default='bash')

    def __str__(self):
        return f"{self.topic.name} - {self.difficulty}: {self.text[:50]}..."
