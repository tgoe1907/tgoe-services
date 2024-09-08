from enum import Enum
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from rest_enumfield import EnumField



class User(AbstractUser):
    membership_number = models.CharField(max_length=30, blank=True)
    birthdate = models.DateField(max_length=8, null=True, blank=True)


    def __str__(self):
        return self.first_name + " " + self.last_name

class Department(models.Model):
    name = models.CharField(max_length=255)

class Weekday(Enum):
    MONDAY = "Montag"
    TUESDAY = "Dienstag"
    WEDNESDAY = "Mittwoch"
    THURSDAY = "Donnerstag"
    FRIDAY = "Freitag"
    SATURDAY = "Samstag"
    SUNDAY = "Sonntag"



class SportsGroup(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(SportsGroup, on_delete=models.CASCADE)

class Trainer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(SportsGroup, on_delete=models.CASCADE)

class RegularTrainUnit(models.Model):
    group = models.ForeignKey(SportsGroup, on_delete=models.CASCADE)
    weekday = EnumField(Weekday)
    start_time = models.TimeField()
    end_time = models.TimeField()
    place = models.CharField(max_length=255)


class TrainHour(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    place = models.CharField(max_length=255)
    note = models.TextField(blank=True)
    group = models.ForeignKey(SportsGroup, on_delete=models.PROTECT)
    trainer = models.ForeignKey(Trainer, on_delete=models.PROTECT)


class TrainHourParticipation(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    hour = models.ForeignKey(TrainHour, on_delete=models.CASCADE)

class DepartmentLeaderShip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)


class Admin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
