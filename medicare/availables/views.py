from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TestModel,MedicineModel
from requirements import success, error
from .serializers import TestSerializer,MedicineSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


class TestView(APIView):
    def get(self, request):
        try:
            queryset    =   TestModel.objects.all()
            serialized  =   TestSerializer(queryset, many=True)
            response    =   success.APIResponse(200, serialized.data).respond()
            return Response(response)   
        except Exception as unkown_exception:
            response    =   error.APIErrorResponse(400,str(unkown_exception)).respond()
            return Response(response)


class MedicineView(APIView):    
    def get(self, request):
        try:
            queryset    =   MedicineModel.objects.all()
            serialized  =   MedicineSerializer(queryset, many=True)
            response    =   success.APIResponse(200, serialized.data).respond()
            return Response(response)   
        except Exception as unkown_exception:
            response    =   error.APIErrorResponse(400,str(unkown_exception)).respond()
            return Response(response)

        

