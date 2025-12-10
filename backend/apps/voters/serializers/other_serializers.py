from rest_framework import serializers
from apps.voters.models import OtherDetails

class OtherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherDetails
        fields = '__all__'
        read_only_fields = ['id', 'voter', 'created_at', 'updated_at']

class OtherDetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherDetails
        fields = [
            'education', 'occupation', 'occupation_details', 'annual_income',
            'party_affiliation', 'is_party_member', 'party_member_id', 'political_inclination',
            'facebook_profile', 'twitter_profile', 'instagram_profile', 'whatsapp_number',
            'is_senior_citizen', 'is_divyang', 'divyang_category', 'is_government_employee',
            'no_of_children', 'vehicle_ownership', 'house_type',
            'previous_voting_pattern', 'voting_sincerity', 'polling_station_distance',
            'hobbies', 'skills', 'languages_known', 'data_verified', 'verification_notes'
        ]