
from .models import Patient
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.serializers import ValidationError
from requirements import success, error
from django.db import IntegrityError
from rest_framework.response import Response
from .serializers import PatientSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from datetime import date
import json
import os



class PatientView(APIView):
    def get(self, request, pk=None):
        try:
            if pk is None:
                queryset    = Patient.objects.all()
                serializer  = PatientSerializer(queryset, many = True)
                if queryset.count() == 0:
                    raise TableEmptyError("No Patients to display")
            else:
                queryset    = Patient.objects.get(pk = pk)
                serializer  = PatientSerializer(queryset)
            print(request.data)

            response = success.APIResponse(200, serializer.data).respond()

        except TableEmptyError as empty_error:
            response = error.APIErrorResponse(404, str(empty_error)).respond()

        except Patient.DoesNotExist as not_found_error:
            error_message   =   f"Patient with given id {pk} does not exist"
            response        =   error.APIErrorResponse(404, str(not_found_error), error_message).respond()

        except Exception as e:
            response    =   error.APIErrorResponse(400, str(e)).respond()

        finally:
            return Response(response)

    def post(self, request):
        try:
            serializer  =   PatientSerializer(data = request.data)

            if serializer.is_valid(raise_exception = True):
                saved_object    =   serializer.save()

            success_message =   f"Patient {saved_object} added successfully"
            response        =   success.APIResponse(201, success_message).respond()
        
        except ValidationError as validation_error:
            err = validation_error.__dict__
            response        = error.APIErrorResponse(409, err['detail']).respond()

        except IntegrityError:
            error_message   =   "Database integrity error occured"
            response        =   error.APIErrorResponse(409, str(IntegrityError), error_message).respond()

        except Exception as e:
            error_message   =   "unexpected error occured"
            response        =   error.APIErrorResponse(400, str(e), error_message).respond()

        finally:
            return Response(response)

    def put(self, request, pk):
        try:
            class_instance  =   Patient.objects.get(pk=pk)
            serializer      =   PatientSerializer(instance=class_instance, data=request.data, partial=True)

            if serializer.is_valid(raise_exception=True):
                saved_object = serializer.save()

            success_message =   f"Patient {saved_object} updated successfully"
            response        =   success.APIResponse(201, success_message).respond()

        except ValidationError as validation_error:
            err         =   validation_error.__dict__
            response    =   error.APIErrorResponse(409, err['detail']).respond()

        except IntegrityError:
            error_message   =   "Database integrity error occured"
            response        =   error.APIErrorResponse(409, str(IntegrityError), error_message).respond()

        except Patient.DoesNotExist as not_found_error:
            error_message   =   f"Patient with given id {pk} does not exist"
            response        =   error.APIErrorResponse(404, str(not_found_error), error_message).respond()
            # return Response(response, status=404)

        except Exception as e:
            error_message   =   "unexpected error occured"
            response        =   error.APIErrorResponse(400, str(e), error_message).respond()
            # return Response(response, status=400)

        finally:
            return Response(response)

    def delete(self, request, pk):
        try:
            class_instance  =   Patient.objects.get(pk=pk)
            class_instance.delete()
            success_message =   f"Patient with id {pk} deleted successfully"
            response        =   success.APIResponse(202, success_message).respond()
            # return Response(response, status=202)

        except IntegrityError:
            error_message   =   "Database integrity error occured"
            response        =   error.APIErrorResponse(409, str(IntegrityError), error_message).respond()
            # return Response(response, status=409)

        except Patient.DoesNotExist as not_found_error:
            error_message   =   f"Patient with given {pk} does not exist"
            response        =   error.APIErrorResponse(404, str(not_found_error), error_message).respond()
            # return Response(response, status=404)

        except Exception as e:
            error_message   =   "unexpected error occured"
            response        =   error.APIErrorResponse(400, str(e), error_message).respond()
            # return Response(response, status=400)

        finally:
            return Response(response)

class TableEmptyError(Exception):
    pass

@api_view(['POST',])
def save_report(request):
    today = date.today()
    d1 = today.strftime("%d-%m-%Y")

    name=request.data['patientId'].replace(" ", "_")+".json"
    if not os.path.exists("media/"+name):
        os.mknod("media/"+name)
        with open("media/"+name,'w') as file:
            json.dump({"report":[] },file)
        full_name="media/"+name
        instance=get_object_or_404(Patient.objects.all(),fname=request.data['patientId'].split(" ")[0],lname=request.data['patientId'].split(" ")[1])
        # print("instance is "+instance)
        # serialized=PatientSerializer(instance=instance,data={"reports":name},partial=True)
        # if serialized.is_valid(raise_exception=True):
        #     saved=serialized.save()
    report=dict()
    report['tests']=request.data['noted_tests']
    report['medicines']=request.data['noted_medicines']
    report['next visit']=request.data['next_visit']
    report_full=dict()
    report_full[str(d1)]=report
    with open('media/'+name) as json_file:
        data = json.load(json_file) 
        temp = data['report']
        temp.append(report_full)
        with open('media/'+name,'w') as f: 
            json.dump(data, f, indent=4)


    opt={"name":"dilip"}
    return Response(opt)

