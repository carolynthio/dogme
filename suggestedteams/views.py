from django.shortcuts import render
import json
import csv
import codecs

# Create your views here.
# def index(request):
#     return render(request, 'suggestedteams/test.html',
#                     json.load(open('suggestedteams/data.json')))

def index(request):
    if request.POST and request.FILES:
        csvfile = request.FILES['csv_file']
        dialect = csv.Sniffer().sniff(codecs.EncodedFile(csvfile, "utf-8").read(1024))
        csvfile.open()
        reader = csv.reader(codecs.EncodedFile(csvfile, "utf-8"), delimiter=',', dialect=dialect)
    return render(request, "suggestedteams/test.html", locals())
