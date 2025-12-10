from rest_framework import serializers
from apps.voters.models import Voter

class VoterListSerializer(serializers.ModelSerializer):
    caste_category = serializers.SerializerMethodField()
    primary_address = serializers.SerializerMethodField()
    family_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Voter
        fields = [
            'id', 'voter_id', 'full_name', 'first_name', 'last_name',
            'mobile_number', 'age', 'gender', 'photo', 'caste_category',
            'primary_address', 'family_count', 'created_at'
        ]
    
    def get_caste_category(self, obj):
        if hasattr(obj, 'caste_info') and obj.caste_info.caste:
            return obj.caste_info.caste.get_category_display()
        return None
    
    def get_primary_address(self, obj):
        primary_address = obj.addresses.filter(is_primary=True).first()
        if primary_address:
            return {
                'village_town': primary_address.village_town,
                'taluka': primary_address.taluka,
                'district': primary_address.district
            }
        return None
    
    def get_family_count(self, obj):
        if hasattr(obj, 'family_member') and obj.family_member.family:
            return obj.family_member.family.members.count()
        return 1

class VoterDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = '__all__'
        read_only_fields = ['id', 'voter_id', 'created_at', 'updated_at']

class MobileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = ['mobile_number', 'alternate_mobile']
    
    def validate_mobile_number(self, value):
        if value and len(value) != 10:
            raise serializers.ValidationError("Mobile number must be 10 digits")
        return value

class VoterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = [
            'voter_id', 'first_name', 'middle_name', 'last_name',
            'mobile_number', 'email', 'date_of_birth', 'gender',
            'marital_status', 'aadhaar_number', 'epic_number'
        ]
    
    def create(self, validated_data):
        from datetime import date
        today = date.today()
        birth_date = validated_data['date_of_birth']
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        validated_data['age'] = age
        return super().create(validated_data)