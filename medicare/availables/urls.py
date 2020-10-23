from django.urls import path
from availables import views
# from professor.views import ProfessorView
urlpatterns = [
    path('tests/',views.TestView.as_view()),
    path('medicines/',views.MedicineView.as_view()),
]