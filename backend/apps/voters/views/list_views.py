from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from apps.voters.models import Voter
from apps.voters.serializers import VoterListSerializer
from apps.voters.services import SearchService

class VoterListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VoterListSerializer
    filter_backends = [DjangoFilterBackend]
    
    def get_queryset(self):
        queryset = Voter.objects.filter(is_active=True, is_deleted=False)
        
        filters = {}
        
        for param in ['surname', 'mobile', 'voter_id', 'gender', 'division']:
            if param in self.request.GET:
                filters[param] = self.request.GET[param]
        
        if 'min_age' in self.request.GET:
            filters['min_age'] = int(self.request.GET['min_age'])
        if 'max_age' in self.request.GET:
            filters['max_age'] = int(self.request.GET['max_age'])
        
        for param in ['district', 'taluka', 'village', 'pincode']:
            if param in self.request.GET:
                filters[param] = self.request.GET[param]
        
        if 'caste_id' in self.request.GET:
            filters['caste_id'] = self.request.GET['caste_id']
        
        if filters:
            queryset = SearchService.filter_voters(filters)
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        response.data = {
            'count': self.get_queryset().count(),
            'next': response.data.get('next'),
            'previous': response.data.get('previous'),
            'results': response.data.get('results', []),
            'filters_applied': dict(request.GET)
        }
        
        return response

class CategoryWiseListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VoterListSerializer
    
    def get_queryset(self):
        category = self.kwargs['category']
        
        category_map = {
            'general': 'GEN',
            'obc': 'OBC',
            'sc': 'SC',
            'st': 'ST',
            'vjnt': 'VJNT',
            'other': 'OTHER'
        }
        
        category_code = category_map.get(category.lower(), category.upper())
        
        return Voter.objects.filter(
            is_active=True,
            is_deleted=False,
            caste_info__caste__category=category_code
        )