import uuid
from django.db import models
from .voters import Voter
from django.utils import timezone

class Address(models.Model):
    ADDRESS_TYPE_CHOICES = [
        ('PERMANENT', 'Permanent'),
        ('CURRENT', 'Current'),
        ('OFFICE', 'Office'),
        ('OTHER', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=20, choices=ADDRESS_TYPE_CHOICES, default='PERMANENT')
    
    house_no = models.CharField(max_length=50)
    building_name = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=200)
    locality = models.CharField(max_length=200, blank=True, null=True)  # Add blank=True, null=True temporarily
    
    landmark = models.CharField(max_length=200, blank=True, null=True)
    
    village_town = models.CharField(max_length=100)
    taluka = models.CharField(max_length=100)
    district = models.CharField(max_length=100, default="Unknown")
    state = models.CharField(max_length=100, default='Maharashtra')
    pincode = models.CharField(max_length=6)
    
    assembly_constituency = models.CharField(max_length=100, blank=True, null=True)
    parliamentary_constituency = models.CharField(max_length=100, blank=True, null=True)
    ward_no = models.CharField(max_length=10, blank=True, null=True)
    booth_no = models.CharField(max_length=10, blank=True, null=True)
    
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    
    is_primary = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'addresses'
        verbose_name_plural = 'Addresses'
        indexes = [
            models.Index(fields=['voter', 'is_primary']),
            models.Index(fields=['pincode']),
            models.Index(fields=['district', 'taluka']),
        ]
    
    def __str__(self):
        return f"{self.voter.full_name} - {self.address_type}"
    
    def get_full_address(self):
        parts = []
        if self.house_no:
            parts.append(self.house_no)
        if self.building_name:
            parts.append(self.building_name)
        if self.street:
            parts.append(self.street)
        if self.locality:
            parts.append(self.locality)
        if self.landmark:
            parts.append(f"Near {self.landmark}")
        parts.append(self.village_town)
        parts.append(f"Taluka: {self.taluka}")
        parts.append(f"District: {self.district}")
        parts.append(f"Pincode: {self.pincode}")
        parts.append(self.state)
        return ", ".join(filter(None, parts))