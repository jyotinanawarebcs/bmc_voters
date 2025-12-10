from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from apps.voters.models import Voter, Address
from apps.voters.serializers import (
    VoterListSerializer, VoterDetailSerializer, MobileUpdateSerializer,
    AddressSerializer, AddressUpdateSerializer, VoterCasteSerializer,
    CasteUpdateSerializer, OtherDetailsSerializer, OtherDetailsUpdateSerializer
)
from apps.voters.services import VoterService, FamilyService
import logging

logger = logging.getLogger(__name__)

class VoterViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Voter.objects.filter(is_active=True, is_deleted=False)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return VoterListSerializer
        return VoterDetailSerializer
    
    @action(detail=True, methods=['get'])
    def full_profile(self, request, pk=None):
        try:
            voter = VoterService.get_voter_with_all_details(pk)
            
            voter_data = VoterDetailSerializer(voter).data
            
            primary_address = voter.addresses.filter(is_primary=True).first()
            address_data = AddressSerializer(primary_address).data if primary_address else None
            
            caste_data = VoterCasteSerializer(voter.caste_info).data if hasattr(voter, 'caste_info') else None
            
            other_details = OtherDetailsSerializer(voter.other_details).data if hasattr(voter, 'other_details') else None
            
            family_details = FamilyService.get_family_details(pk)
            
            response_data = {
                'voter': voter_data,
                'address': address_data,
                'caste_info': caste_data,
                'other_details': other_details,
                'family_details': family_details
            }
            
            return Response(response_data)
            
        except Voter.DoesNotExist:
            return Response(
                {'error': 'Voter not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['put'])
    def update_mobile(self, request, pk=None):
        serializer = MobileUpdateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                voter = VoterService.update_voter_mobile(
                    pk, 
                    serializer.validated_data,
                    request.user
                )
                return Response(
                    {'message': 'Mobile number updated successfully', 'data': MobileUpdateSerializer(voter).data}
                )
            except Exception as e:
                logger.error(f"Error updating mobile: {e}")
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def update_address(self, request, pk=None):
        serializer = AddressUpdateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                voter = VoterService.get_voter_by_id(pk)
                
                address_id = request.data.get('address_id')
                if address_id:
                    address = get_object_or_404(Address, id=address_id, voter=voter)
                    address = serializer.update(address, serializer.validated_data)
                else:
                    address = VoterService.create_address_for_voter(
                        pk,
                        serializer.validated_data,
                        request.user
                    )
                
                return Response(
                    {'message': 'Address updated successfully', 'data': AddressSerializer(address).data}
                )
            except Exception as e:
                logger.error(f"Error updating address: {e}")
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def update_caste(self, request, pk=None):
        serializer = CasteUpdateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                voter_caste = VoterService.update_voter_caste(
                    pk,
                    serializer.validated_data,
                    request.user
                )
                return Response(
                    {'message': 'Caste information updated successfully', 'data': VoterCasteSerializer(voter_caste).data}
                )
            except Exception as e:
                logger.error(f"Error updating caste: {e}")
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def family(self, request, pk=None):
        try:
            family_data = FamilyService.get_family_details(pk)
            if family_data:
                from apps.voters.serializers.family_serializers import FamilySerializer
                return Response(FamilySerializer(family_data['family']).data)
            return Response({'message': 'No family record found'})
        except Exception as e:
            logger.error(f"Error getting family details: {e}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['get'])
    def all_details(self, request, pk=None):
        try:
            voter = VoterService.get_voter_with_all_details(pk)
            
            addresses = Address.objects.filter(voter=voter)
            
            response_data = {
                'voter': VoterDetailSerializer(voter).data,
                'addresses': AddressSerializer(addresses, many=True).data,
                'caste_info': VoterCasteSerializer(voter.caste_info).data if hasattr(voter, 'caste_info') else None,
                'other_details': OtherDetailsSerializer(voter.other_details).data if hasattr(voter, 'other_details') else None,
                'family': FamilyService.get_family_details(pk)
            }
            
            return Response(response_data)
            
        except Voter.DoesNotExist:
            return Response(
                {'error': 'Voter not found'},
                status=status.HTTP_404_NOT_FOUND
            )