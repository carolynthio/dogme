from django.shortcuts import render
import json
import csv
import codecs
import random
import randomTeams

# Create your views here.
# def index(request):
#     return render(request, 'suggestedteams/test.html',
#                     json.load(open('suggestedteams/data.json')))

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from suggestedteams.models import Document
from suggestedteams.models import Student
from suggestedteams.forms import DocumentForm

def index(request):

    studentList = [];
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()

            dialect = csv.Sniffer().sniff(codecs.EncodedFile(newdoc.docfile, "utf-8").read(1024))
            newdoc.docfile.open()
            reader = csv.reader(codecs.EncodedFile(newdoc.docfile, "utf-8"), delimiter=',', dialect=dialect)

            for row in reader:
                if (row[0] != 'Name' and row[0] != ''):
                    student = Student(name=row[0], role=row[8], leadership_pref=row[9], sex=row[1], schedule=row[3])
                    student.save()
            # Redirect to the document list after POST
            # return HttpResponseRedirect(reverse('list'))
    else:
        form = DocumentForm() # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    students = Student.objects.all()
    studentList = list(students)

    if (request.GET.get('mybtn')):
        teams = randomTeams.create_random_teams( int(request.GET.get('mytextbox')), studentList)
        return render(request, 'suggestedteams/test.html', locals())
    # Render list page with the documents and the form
    # {'documents': documents, 'form': form}
    return render(request, 'suggestedteams/test.html', locals())

# def index(request):
#     if request.POST and request.FILES:
#         csvfile = request.FILES['csv_file']
#         dialect = csv.Sniffer().sniff(codecs.EncodedFile(csvfile, "utf-8").read(1024))
#         csvfile.open()
#         reader = csv.reader(codecs.EncodedFile(csvfile, "utf-8"), delimiter=',', dialect=dialect)
#     return render(request, "suggestedteams/test.html", locals())
