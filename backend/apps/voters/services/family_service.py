from apps.voters.models import Family, FamilyMember, Voter
from apps.voters.services import VoterService
import logging

logger = logging.getLogger(__name__)

class FamilyService:
    
    @staticmethod
    def get_family_details(voter_id):
        voter = VoterService.get_voter_by_id(voter_id)
        
        try:
            family_member = voter.family_member
            family = family_member.family
            members = FamilyMember.objects.select_related('voter').filter(family=family)
            
            return {
                'family': family,
                'members': members,
                'head': family.head_of_family
            }
        except AttributeError:
            return None
    
    @staticmethod
    def add_family_member(family_id, voter_id, relationship, user):
        try:
            family = Family.objects.get(id=family_id)
            voter = Voter.objects.get(id=voter_id)
            
            if hasattr(voter, 'family_member'):
                raise ValueError("Voter already belongs to a family")
            
            family_member = FamilyMember.objects.create(
                family=family,
                voter=voter,
                relationship=relationship,
                created_by=user
            )
            
            family.total_members = family.members.count()
            family.save()
            
            return family_member
            
        except (Family.DoesNotExist, Voter.DoesNotExist) as e:
            raise