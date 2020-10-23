from django.urls import path,include
from django.conf import settings
from .views import CustomObtainAuthToken
from django.conf.urls.static import static

app_name="users"

urlpatterns = [
	path("login_user/",CustomObtainAuthToken.as_view(),name="CustomObtainAuthToken"),
]