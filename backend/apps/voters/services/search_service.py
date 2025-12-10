from django.db.models import Q, Count
from apps.voters.models import Voter

class SearchService:
    
    @staticmethod
    def filter_voters(filters):
        queryset = Voter.objects.filter(is_active=True, is_deleted=False)
        
        if 'name' in filters:
            name = filters['name']
            queryset = queryset.filter(
                Q(full_name__icontains=name) |
                Q(first_name__icontains=name) |
                Q(last_name__icontains=name)
            )
        
        if 'surname' in filters:
            queryset = queryset.filter(last_name__iexact=filters['surname'])
        
        if 'mobile' in filters:
            queryset = queryset.filter(
                Q(mobile_number__icontains=filters['mobile']) |
                Q(alternate_mobile__icontains=filters['mobile'])
            )
        
        if 'voter_id' in filters:
            queryset = queryset.filter(voter_id__icontains=filters['voter_id'])
        
        if 'min_age' in filters:
            queryset = queryset.filter(age__gte=filters['min_age'])
        if 'max_age' in filters:
            queryset = queryset.filter(age__lte=filters['max_age'])
        
        if 'gender' in filters:
            queryset = queryset.filter(gender=filters['gender'])
        
        if 'caste_id' in filters:
            queryset = queryset.filter(caste_info__caste_id=filters['caste_id'])
        
        if 'district' in filters:
            queryset = queryset.filter(addresses__district__iexact=filters['district'])
        if 'taluka' in filters:
            queryset = queryset.filter(addresses__taluka__iexact=filters['taluka'])
        if 'village' in filters:
            queryset = queryset.filter(addresses__village_town__icontains=filters['village'])
        if 'pincode' in filters:
            queryset = queryset.filter(addresses__pincode=filters['pincode'])
        
        if 'division' in filters:
            queryset = queryset.filter(addresses__ward_no=filters['division'])
        
        return queryset.distinct()
    
    @staticmethod
    def get_category_wise_counts():
        counts = Voter.objects.filter(
            is_active=True,
            caste_info__caste__isnull=False
        ).values(
            'caste_info__caste__category'
        ).annotate(
            count=Count('id')
        ).order_by('caste_info__caste__category')
        return counts
    
    @staticmethod
    def get_surname_distribution():
        surnames = Voter.objects.filter(
            is_active=True
        ).values(
            'last_name'
        ).annotate(
            count=Count('id')
        ).order_by('-count')[:50]
        return surnames