from django.db import models

class TestModel(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    result=models.CharField(max_length=50)
    comment=models.CharField(max_length=150)

    def __str__(self):
        return self.name
    
class MedicineModel(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name
