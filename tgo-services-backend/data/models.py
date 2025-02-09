from enum import Enum
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from rest_enumfield import EnumField


class Department(models.Model):
    name = models.CharField(max_length=255)


class SportsGroup(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    department = models.ForeignKey(Department, default=1, on_delete=models.PROTECT)

class User(AbstractUser):
    membership_number = models.CharField(max_length=30, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    department_manager = models.ManyToManyField(Department, related_name="managers", blank=True)
    trainer_of = models.ManyToManyField(SportsGroup, related_name="trainers", blank=True)
    participate_at = models.ManyToManyField(SportsGroup, related_name="participants", blank=True)
    admin = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + " " + self.last_name

class TrainHour(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    place = models.CharField(max_length=255)
    note = models.TextField(blank=True)
    group = models.ForeignKey(SportsGroup, on_delete=models.PROTECT)
    trained_by = models.ManyToManyField(User, related_name="trainer")
    participants = models.ManyToManyField(User, related_name="participant", blank=True)
