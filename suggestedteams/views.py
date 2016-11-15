from django.shortcuts import render
import json
# Create your views here.
def index(request):
    return render(request, 'suggestedteams/test.html',
                    json.load(open('suggestedteams/data.json')))
