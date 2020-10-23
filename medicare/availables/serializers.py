from rest_framework import serializers
from .models import TestModel,MedicineModel

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model=TestModel
        fields='__all__'

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicineModel
        fields='__all__'

