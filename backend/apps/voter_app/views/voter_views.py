from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging

from ..services.voter_service import VoterService
from ..serializers.voter_serializer import (
    VoterListSerializer, 
    VoterDetailSerializer,
    VoterSearchSerializer
)
from ..constants import SUCCESS, ERROR, VOTER_NOT_FOUND, INVALID_VOTER_ID

logger = logging.getLogger(__name__)

def create_response(success=True, data=None, message=None, error=None, status_code=status.HTTP_200_OK):
    """Standardized API response format"""
    response_data = {
        'success': success,
        'data': data or {},
        'message': message,
    }
    if error:
        response_data['error'] = error
    return Response(response_data, status=status_code)

@api_view(['GET'])
@permission_classes([AllowAny])  # Change to [IsAuthenticated] if needed
def voter_list_view(request):
    """
    Get paginated list of voters with minimal data
    GET /api/voters/?page=1&page_size=20
    """
    try:
        # Get pagination parameters
        page = request.GET.get('page', 1)
        page_size = request.GET.get('page_size', 20)
        
        # Get voters from service
        result = VoterService.get_voters_list(page=page, page_size=page_size)
        
        # Serialize data
        voters_data = []
        for voter in result['data']:
            voter_minimal = VoterService.get_voter_minimal_data(voter)
            voters_data.append(voter_minimal)
        
        return create_response(
            success=True,
            data={
                'voters': voters_data,
                'pagination': result['pagination']
            },
            message="Voters list retrieved successfully"
        )
        
    except Exception as e:
        logger.error(f"Error in voter_list_view: {str(e)}", exc_info=True)
        return create_response(
            success=False,
            error="Internal server error",
            message="Failed to retrieve voters list",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def voter_search_view(request):
    """
    Search voters by various fields
    GET /api/voters/search/?query=john&page=1&page_size=20
    """
    try:
        # Validate input
        serializer = VoterSearchSerializer(data=request.GET)
        if not serializer.is_valid():
            return create_response(
                success=False,
                error="Validation error",
                data=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST
            )
        
        # Get validated data
        query = serializer.validated_data.get('query', '')
        page = serializer.validated_data.get('page', 1)
        page_size = serializer.validated_data.get('page_size', 20)
        
        # Search voters
        result = VoterService.search_voters(
            query=query, 
            page=page, 
            page_size=page_size
        )
        
        # Prepare response data
        voters_data = []
        for voter in result['data']:
            voter_minimal = VoterService.get_voter_minimal_data(voter)
            voters_data.append(voter_minimal)
        
        return create_response(
            success=True,
            data={
                'voters': voters_data,
                'pagination': result['pagination'],
                'search_query': query if query else None
            },
            message=f"Found {result['pagination']['total_items']} voters" if query else "Voters retrieved successfully"
        )
        
    except Exception as e:
        logger.error(f"Error in voter_search_view: {str(e)}", exc_info=True)
        return create_response(
            success=False,
            error="Internal server error",
            message="Search failed",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def voter_detail_view(request, pk):
    """
    Get detailed voter information by primary key
    GET /api/voters/{id}/
    """
    try:
        # Get voter from service
        voter = VoterService.get_voter_by_pk(pk)
        
        if not voter:
            return create_response(
                success=False,
                error=VOTER_NOT_FOUND,
                message="Voter not found with the given ID",
                status_code=status.HTTP_404_NOT_FOUND
            )
        
        # Serialize voter details
        serializer = VoterDetailSerializer(voter, context={'request': request})
        
        return create_response(
            success=True,
            data=serializer.data,
            message="Voter details retrieved successfully"
        )
        
    except Exception as e:
        logger.error(f"Error in voter_detail_view for pk {pk}: {str(e)}", exc_info=True)
        return create_response(
            success=False,
            error="Internal server error",
            message="Failed to retrieve voter details",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def voter_by_voter_id_view(request, voter_id):
    """
    Get voter details by voter_id field
    GET /api/voters/voter-id/{voter_id}/
    """
    try:
        # Validate voter_id is provided
        if not voter_id or not voter_id.strip():
            return create_response(
                success=False,
                error=INVALID_VOTER_ID,
                message="Voter ID is required",
                status_code=status.HTTP_400_BAD_REQUEST
            )
        
        # Get voter from service
        voter = VoterService.get_voter_by_voter_id(voter_id.strip())
        
        if not voter:
            return create_response(
                success=False,
                error=VOTER_NOT_FOUND,
                message=f"Voter not found with ID: {voter_id}",
                status_code=status.HTTP_404_NOT_FOUND
            )
        
        # Serialize voter details
        serializer = VoterDetailSerializer(voter, context={'request': request})
        
        return create_response(
            success=True,
            data=serializer.data,
            message="Voter details retrieved successfully"
        )
        
    except Exception as e:
        logger.error(f"Error in voter_by_voter_id_view for voter_id {voter_id}: {str(e)}", exc_info=True)
        return create_response(
            success=False,
            error="Internal server error",
            message="Failed to retrieve voter details",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )