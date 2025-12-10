from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from apps.voters.models import Voter, Address, VoterCaste
import logging

logger = logging.getLogger(__name__)

class VoterService:
    
    @staticmethod
    def get_voter_by_id(voter_id):
        try:
            try:
                return Voter.objects.get(id=voter_id)
            except (ValueError, Voter.DoesNotExist):
                return Voter.objects.get(voter_id=voter_id)
        except Voter.DoesNotExist:
            raise ObjectDoesNotExist(f"Voter with ID {voter_id} not found")
    
    @staticmethod
    def get_voter_with_all_details(voter_id):
        voter = Voter.objects.select_related(
            'caste_info__caste',
            'caste_info__sub_caste',
            'other_details',
            'family_member__family'
        ).prefetch_related(
            'addresses'
        ).get(id=voter_id)
        return voter
    
    @staticmethod
    def update_voter_mobile(voter_id, mobile_data, user):
        voter = VoterService.get_voter_by_id(voter_id)
        
        if 'mobile_number' in mobile_data:
            voter.mobile_number = mobile_data['mobile_number']
        if 'alternate_mobile' in mobile_data:
            voter.alternate_mobile = mobile_data['alternate_mobile']
        
        voter.updated_by = user
        voter.save()
        
        logger.info(f"Mobile updated for voter {voter_id} by user {user}")
        return voter
    
    @staticmethod
    def create_address_for_voter(voter_id, address_data, user):
        voter = VoterService.get_voter_by_id(voter_id)
        
        if address_data.get('is_primary', False):
            Address.objects.filter(voter=voter, is_primary=True).update(is_primary=False)
        
        address = Address.objects.create(voter=voter, **address_data)
        return address
    
    @staticmethod
    def update_voter_caste(voter_id, caste_data, user):
        voter = VoterService.get_voter_by_id(voter_id)
        
        voter_caste, created = VoterCaste.objects.get_or_create(
            voter=voter,
            defaults={'created_by': user}
        )
        
        if 'caste' in caste_data:
            voter_caste.caste = caste_data['caste']
        if 'sub_caste' in caste_data:
            voter_caste.sub_caste = caste_data['sub_caste']
        
        for field in ['has_caste_certificate', 'certificate_number', 
                     'certificate_issue_date', 'certificate_authority', 'remarks']:
            if field in caste_data:
                setattr(voter_caste, field, caste_data[field])
        
        voter_caste.save()
        return voter_caste