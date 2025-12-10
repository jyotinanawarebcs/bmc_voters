from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.voters.services import AnalyticsService
import logging

logger = logging.getLogger(__name__)

class VoterAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            analytics = AnalyticsService.get_voter_analytics()
            return Response(analytics)
        except Exception as e:
            logger.error(f"Error getting analytics: {e}")
            return Response(
                {'error': 'Failed to fetch analytics'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GeographicDistributionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            distribution = AnalyticsService.get_geographic_distribution()
            return Response(distribution)
        except Exception as e:
            logger.error(f"Error getting geographic distribution: {e}")
            return Response(
                {'error': 'Failed to fetch geographic distribution'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SurnameDistributionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            surnames = AnalyticsService.get_surname_distribution()
            return Response({'surnames': surnames})
        except Exception as e:
            logger.error(f"Error getting surname distribution: {e}")
            return Response(
                {'error': 'Failed to fetch surname distribution'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )