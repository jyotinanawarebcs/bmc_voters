from rest_framework import serializers
from apps.voters.models import Family, FamilyMember, Voter

class FamilyMemberSerializer(serializers.ModelSerializer):
    voter_details = serializers.SerializerMethodField()
    
    class Meta:
        model = FamilyMember
        fields = ['id', 'voter', 'relationship', 'is_primary', 'voter_details', 'created_at']
    
    def get_voter_details(self, obj):
        return {
            'id': obj.voter.id,
            'full_name': obj.voter.full_name,
            'age': obj.voter.age,
            'gender': obj.voter.gender,
            'mobile_number': obj.voter.mobile_number
        }

class FamilySerializer(serializers.ModelSerializer):
    members = FamilyMemberSerializer(many=True, read_only=True)
    head_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Family
        fields = '__all__'
    
    def get_head_details(self, obj):
        return {
            'id': obj.head_of_family.id,
            'full_name': obj.head_of_family.full_name,
            'mobile_number': obj.head_of_family.mobile_number
        }

class AddFamilyMemberSerializer(serializers.Serializer):
    voter_id = serializers.CharField(required=True)
    relationship = serializers.ChoiceField(choices=FamilyMember.RELATIONSHIP_CHOICES)
    
    def validate(self, data):
        try:
            voter = Voter.objects.get(voter_id=data['voter_id'])
            data['voter'] = voter
        except Voter.DoesNotExist:
            raise serializers.ValidationError({"voter_id": "Voter not found"})
        return data