from django.contrib import admin
from .models import ToDo

# Register your models here.

class ToDoAdmin(admin.ModelAdmin):
    list_display = ('title_model', 'description_model', 'completed_task', 'date', 'priority')


admin.site.register(ToDo, ToDoAdmin)
