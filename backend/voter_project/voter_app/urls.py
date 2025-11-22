from django.urls import path
from .views import get_voters

urlpatterns = [
    path('api/voters/', get_voters),
]
