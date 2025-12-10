from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VoterViewSet,
    VoterListView,
    CategoryWiseListView,
    FamilyViewSet,
    VoterAnalyticsView,
    GeographicDistributionView,
    SurnameDistributionView
)

router = DefaultRouter()
router.register(r'voters', VoterViewSet, basename='voter')
router.register(r'families', FamilyViewSet, basename='family')

urlpatterns = [
    path('', include(router.urls)),
    
    path('voters/list/', VoterListView.as_view(), name='voter-list'),
    
    path('voters/category/<str:category>/', 
         CategoryWiseListView.as_view(), 
         name='category-wise-list'),
    
    path('analytics/summary/', 
         VoterAnalyticsView.as_view(), 
         name='voter-analytics'),
    
    path('analytics/geographic/', 
         GeographicDistributionView.as_view(), 
         name='geographic-distribution'),
    
    path('analytics/surnames/', 
         SurnameDistributionView.as_view(), 
         name='surname-distribution'),
]

urlpatterns += [
    path('voters/filter/by-surname/<str:surname>/', 
         VoterListView.as_view(), 
         name='filter-by-surname'),
    
    path('voters/filter/by-division/<str:division>/', 
         VoterListView.as_view(), 
         name='filter-by-division'),
    
    path('voters/filter/by-district/<str:district>/', 
         VoterListView.as_view(), 
         name='filter-by-district'),
    
    path('voters/filter/by-taluka/<str:taluka>/', 
         VoterListView.as_view(), 
         name='filter-by-taluka'),
]