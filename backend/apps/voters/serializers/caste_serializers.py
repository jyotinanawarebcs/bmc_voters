from rest_framework import serializers
from apps.voters.models import Caste, SubCaste, VoterCaste

class SubCasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCaste
        fields = ['id', 'name', 'description']

class CasteSerializer(serializers.ModelSerializer):
    subcastes = SubCasteSerializer(many=True, read_only=True)
    
    class Meta:
        model = Caste
        fields = ['id', 'name', 'category', 'code', 'description', 'subcastes']

class VoterCasteSerializer(serializers.ModelSerializer):
    caste_name = serializers.CharField(source='caste.name', read_only=True)
    caste_category = serializers.CharField(source='caste.get_category_display', read_only=True)
    sub_caste_name = serializers.CharField(source='sub_caste.name', read_only=True)
    
    class Meta:
        model = VoterCaste
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class CasteUpdateSerializer(serializers.ModelSerializer):
    caste_id = serializers.UUIDField(required=True)
    sub_caste_id = serializers.UUIDField(required=False, allow_null=True)
    
    class Meta:
        model = VoterCaste
        fields = [
            'caste_id', 'sub_caste_id', 'has_caste_certificate',
            'certificate_number', 'certificate_issue_date',
            'certificate_authority', 'remarks'
        ]