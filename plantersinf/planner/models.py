from django.db import models

# Create your models here.
class Activity(models.Model):
	name=models.CharField(max_length=20)
	start_date=models.ForeignKey('Date', related_name="start",on_delete=models.CASCADE)
	end_date=models.ForeignKey('Date', related_name="end",on_delete=models.CASCADE)
	start_time=models.CharField(max_length=10)
	end_time=models.CharField(max_length=10)
	duration=models.CharField(max_length=10)
	current_time=models.CharField(max_length=8)
	days=models.CharField(max_length=255)
	active=models.PositiveIntegerField()
	activity_date = models.ForeignKey('Date', related_name="recurring",on_delete=models.CASCADE)
	color = models.CharField(max_length=10)
	category= models.ForeignKey('Category', related_name="activities",on_delete=models.CASCADE)
	#created_at = models.DateTimeField(auto_now_add=True)
	#updated_at = models.DateTimeField(auto_now=True)
	#objects=UserManager()

class Date(models.Model):
	date=models.CharField(max_length=10)
	month=models.CharField(max_length=15)
	day=models.PositiveIntegerField()
	year=models.PositiveIntegerField()
	start_count=models.PositiveIntegerField()
	end_count=models.PositiveIntegerField()
	weekday = models.CharField(max_length=3)

class Category(models.Model):
	category= models.CharField(max_length=40)