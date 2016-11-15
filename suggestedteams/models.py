from __future__ import unicode_literals

from django.db import models

# Create your models here.

# This is a table
class Student(models.Model):
    # each of these are the columns in a table
    # name, datatype, constraint
    name = models.CharField(max_length=140) # These can be found on the Djanga website
    leadership = models.CharField(max_length=140)
    schedule = models.TextField()

    # In order to list all the post titles making it a string
    def __unicode__(self):
        return self.name
