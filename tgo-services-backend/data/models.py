from django.db import models
from django.conf import settings
from django.utils import timezone

class Person(models.Model):
    id = models.IntegerField(primary_key=True)
    surename = models.CharField(max_length=50)
    forname = models.CharField(max_length=50)
    membership_number = models.CharField(max_length=30)
    create_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.forname + " " + self.surename
