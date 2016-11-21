from __future__ import unicode_literals

from django.db import models

# Create your models here.

# This is a table
class Document(models.Model):
    # each of these are the columns in a table
    # name, datatype, constraint
    docfile = models.FileField(upload_to='documents/%Y/%m/%d')

    # In order to list all the post titles making it a string
    # def __unicode__(self):
    #     return self.name
