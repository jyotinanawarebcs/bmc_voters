from django.urls import path
from .views.voter_views import (
    voter_list_view,
    voter_search_view,
    voter_detail_view,
    voter_by_voter_id_view
)

app_name = 'apps.voter_app'

urlpatterns = [
    # Get all voters with pagination
    path('', voter_list_view, name='voter-list'),
    
    # Search voters
    path('search/', voter_search_view, name='voter-search'),
    
    # Get voter details by primary key
    path('<int:pk>/', voter_detail_view, name='voter-detail'),
    
    # Get voter details by voter_id field
    path('voter-id/<str:voter_id>/', voter_by_voter_id_view, name='voter-by-id'),
]