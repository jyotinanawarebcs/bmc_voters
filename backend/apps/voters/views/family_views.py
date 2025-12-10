from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.voters.models import Family
from apps.voters.serializers import FamilySerializer

class FamilyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Family.objects.all()
    serializer_class = FamilySerializer