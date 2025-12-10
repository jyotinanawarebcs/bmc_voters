from django.db.models import Count, Avg, Max, Min
from datetime import datetime, timedelta
from apps.voters.models import Voter, Family, Address
from apps.voters.services import SearchService

class AnalyticsService:
    
    @staticmethod
    def get_voter_analytics():
        total_voters = Voter.objects.filter(is_active=True).count()
        male_count = Voter.objects.filter(gender='M', is_active=True).count()
        female_count = Voter.objects.filter(gender='F', is_active=True).count()
        
        age_stats = Voter.objects.filter(is_active=True).aggregate(
            avg_age=Avg('age'),
            max_age=Max('age'),
            min_age=Min('age')
        )
        
        caste_distribution = SearchService.get_category_wise_counts()
        
        last_month = datetime.now() - timedelta(days=30)
        new_voters = Voter.objects.filter(
            created_at__gte=last_month,
            is_active=True
        ).count()
        
        voters_with_mobile = Voter.objects.filter(
            mobile_number__isnull=False,
            is_active=True
        ).count()
        
        total_families = Family.objects.count()
        avg_family_size = Family.objects.aggregate(
            avg_size=Avg('total_members')
        )['avg_size'] or 0
        
        return {
            'total_voters': total_voters,
            'gender_distribution': {
                'male': male_count,
                'female': female_count,
                'other': total_voters - male_count - female_count
            },
            'age_statistics': age_stats,
            'caste_distribution': list(caste_distribution),
            'new_voters_last_month': new_voters,
            'voters_with_mobile': voters_with_mobile,
            'mobile_coverage_percentage': (voters_with_mobile / total_voters * 100) if total_voters > 0 else 0,
            'family_statistics': {
                'total_families': total_families,
                'average_family_size': round(avg_family_size, 2)
            }
        }
    
    @staticmethod
    def get_geographic_distribution():
        district_dist = Address.objects.filter(
            voter__is_active=True,
            is_primary=True
        ).values('district').annotate(
            count=Count('voter')
        ).order_by('-count')
        
        taluka_dist = Address.objects.filter(
            voter__is_active=True,
            is_primary=True
        ).values('taluka', 'district').annotate(
            count=Count('voter')
        ).order_by('district', '-count')
        
        village_dist = Address.objects.filter(
            voter__is_active=True,
            is_primary=True
        ).values('village_town', 'taluka', 'district').annotate(
            count=Count('voter')
        ).order_by('district', 'taluka', '-count')[:100]
        
        return {
            'by_district': list(district_dist),
            'by_taluka': list(taluka_dist),
            'by_village': list(village_dist)
        }