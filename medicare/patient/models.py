from django.db import models

# Create your models here.
class Patient(models.Model):
    patientId   =   models.AutoField(primary_key = True)
    fname       =   models.CharField(max_length = 30)
    lname       =   models.CharField(max_length = 30)
    email       =   models.EmailField(max_length = 50)
    mobile      =   models.CharField(max_length = 10)
    address     =   models.CharField(max_length = 200)
    age         =   models.IntegerField()
    reports     =   models.FileField()

    def __str__(self):
        return self.fname +" "+ self.lname