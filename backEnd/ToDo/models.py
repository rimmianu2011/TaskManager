from django.db import models
from django.utils import timezone

# Create your models here.

class ToDo(models.Model):
    title_model = models.CharField(max_length=120)
    description_model = models.TextField()
    completed_task = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)
    Priority_task = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    priority = models.CharField(max_length=10, choices=Priority_task, default='Low')

    def __str__(self):
        return self.title_model
