from rest_framework import serializers
from ..models import Voter
from ..constants import GENDER_CHOICES


class VoterListSerializer(serializers.ModelSerializer):
    """Serializer for voter list (minimal data)"""
    gender_display = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Voter
        fields = [
            'id', 'voter_id', 'full_name', 'part_number',
            'house_no', 'age', 'gender_display', 'relative_name',
            'photo_url'
        ]

    def get_gender_display(self, obj):
        return GENDER_CHOICES.get(obj.gender, 'Not Specified')

    def get_photo_url(self, obj):
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None


class VoterDetailSerializer(serializers.ModelSerializer):
    """Serializer for full voter details"""
    gender_display = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Voter
        fields = [
            'id', 'voter_id', 'part_number', 'full_name',
            'relative_name', 'house_no', 'age', 'gender',
            'gender_display', 'photo', 'photo_url',
            'created_at', 'updated_at'
        ]
        read_only_fields = fields

    def get_gender_display(self, obj):
        return GENDER_CHOICES.get(obj.gender, 'Not Specified')

    def get_photo_url(self, obj):
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None


class VoterSearchSerializer(serializers.Serializer):
    """Serializer for search input validation"""
    query = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=200,
        help_text="Search by name, voter ID, part number, relative name or house number"
    )
    page = serializers.IntegerField(
        required=False,
        default=1,
        min_value=1,
        help_text="Page number"
    )
    page_size = serializers.IntegerField(
        required=False,
        default=20,
        min_value=1,
        max_value=100,
        help_text="Number of items per page (max 100)"
    )
