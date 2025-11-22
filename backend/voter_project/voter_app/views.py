from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Voter
from .serializers import VoterSerializer

@api_view(['GET'])
def get_voters(request):
    voters = Voter.objects.all()
    serializer = VoterSerializer(voters, many=True)
    return Response(serializer.data)