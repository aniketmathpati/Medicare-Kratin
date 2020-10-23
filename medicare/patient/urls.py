from django.urls import path
from patient import views

urlpatterns = [
    path('',views.PatientView.as_view()),
    path('<int:pk>/',views.PatientView.as_view()),
    path('save/',views.save_report)
]
