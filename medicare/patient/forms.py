from django import forms
class RawSearchForm(forms.Form):
	title 		= forms.CharField(label='',widget=forms.TextInput(attrs={"placeholder":"your title"}))