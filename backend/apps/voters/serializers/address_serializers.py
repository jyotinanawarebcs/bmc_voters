from rest_framework import serializers
from apps.voters.models import Address

class AddressSerializer(serializers.ModelSerializer):
    full_address = serializers.SerializerMethodField()
    
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_full_address(self, obj):
        return obj.get_full_address()

class AddressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'address_type', 'house_no', 'building_name', 'street',
            'locality', 'landmark', 'village_town', 'taluka',
            'district', 'state', 'pincode', 'assembly_constituency',
            'parliamentary_constituency', 'ward_no', 'booth_no',
            'latitude', 'longitude', 'is_primary'
        ]
    
    def validate_pincode(self, value):
        if value and (len(value) != 6 or not value.isdigit()):
            raise serializers.ValidationError("Pincode must be 6 digits")
        return value