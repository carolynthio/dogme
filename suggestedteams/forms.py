from django import forms

class DocumentForm(forms.Form):
    docfile = forms.FileField(
        label='Select a CSV file',
        help_text='Student Roster'
    )
