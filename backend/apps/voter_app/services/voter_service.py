from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from ..models import Voter
from ..constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE
import logging

logger = logging.getLogger(__name__)

class VoterService:
    
    @staticmethod
    def search_voters(query=None, page=1, page_size=DEFAULT_PAGE_SIZE):
        """
        Search voters with pagination
        Returns: Paginated queryset with metadata
        """
        try:
            # Validate page size
            page_size = min(int(page_size), MAX_PAGE_SIZE)
            page = int(page)
            
            # Base queryset
            voters = Voter.objects.all().order_by('voter_id')
            
            # Apply search filter
            if query and query.strip():
                search_term = query.strip()
                voters = voters.filter(
                    Q(full_name__icontains=search_term) |
                    Q(voter_id__icontains=search_term) |
                    Q(part_number__icontains=search_term) |
                    # Q(relative_name__icontains=search_term) |
                    Q(house_no__icontains=search_term)
                )
            
            # Pagination
            paginator = Paginator(voters, page_size)
            
            try:
                page_obj = paginator.page(page)
            except PageNotAnInteger:
                page_obj = paginator.page(1)
                page = 1
            except EmptyPage:
                page_obj = paginator.page(paginator.num_pages)
                page = paginator.num_pages
            
            return {
                'data': page_obj,
                'pagination': {
                    'current_page': page,
                    'total_pages': paginator.num_pages,
                    'total_items': paginator.count,
                    'page_size': page_size,
                    'has_next': page_obj.has_next(),
                    'has_previous': page_obj.has_previous(),
                    'next_page': page_obj.next_page_number() if page_obj.has_next() else None,
                    'previous_page': page_obj.previous_page_number() if page_obj.has_previous() else None,
                }
            }
            
        except Exception as e:
            logger.error(f"Error in search_voters service: {str(e)}", exc_info=True)
            raise
    
    @staticmethod
    def get_voter_by_pk(pk):
        """
        Get voter by primary key
        """
        try:
            return Voter.objects.filter(pk=pk).first()
        except Exception as e:
            logger.error(f"Error getting voter by pk {pk}: {str(e)}", exc_info=True)
            raise
    
    @staticmethod
    def get_voter_by_voter_id(voter_id):
        """
        Get voter by voter_id field
        """
        try:
            return Voter.objects.filter(voter_id=voter_id).first()
        except Exception as e:
            logger.error(f"Error getting voter by voter_id {voter_id}: {str(e)}", exc_info=True)
            raise
    
    @staticmethod
    def get_voters_list(page=1, page_size=DEFAULT_PAGE_SIZE):
        """
        Get all voters with pagination (for list view)
        """
        try:
            page_size = min(int(page_size), MAX_PAGE_SIZE)
            page = int(page)
            
            voters = Voter.objects.all().order_by('voter_id')
            
            # Pagination
            paginator = Paginator(voters, page_size)
            
            try:
                page_obj = paginator.page(page)
            except PageNotAnInteger:
                page_obj = paginator.page(1)
                page = 1
            except EmptyPage:
                page_obj = paginator.page(paginator.num_pages)
                page = paginator.num_pages
            
            return {
                'data': page_obj,
                'pagination': {
                    'current_page': page,
                    'total_pages': paginator.num_pages,
                    'total_items': paginator.count,
                    'page_size': page_size,
                    'has_next': page_obj.has_next(),
                    'has_previous': page_obj.has_previous(),
                }
            }
            
        except Exception as e:
            logger.error(f"Error in get_voters_list service: {str(e)}", exc_info=True)
            raise
    
    @staticmethod
    def get_voter_minimal_data(voter):
        """
        Extract minimal data for list view
        """
        if not voter:
            return None
            
        return {
            'id': voter.id,
            'voter_id': voter.voter_id,
            'full_name': voter.full_name,
            'part_number': voter.part_number,
            'house_no': voter.house_no,
            'age': voter.age,
            'gender': voter.get_gender_display() if voter.gender else None,
            # 'relative_name': voter.relative_name,
            'photo_url': voter.photo.url if voter.photo else None,  
        }