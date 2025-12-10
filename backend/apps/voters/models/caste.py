import uuid
from django.db import models
from .voters import Voter

class Caste(models.Model):
    CATEGORY_CHOICES = [
        ('GEN', 'General'),
        ('OBC', 'Other Backward Class'),
        ('SC', 'Scheduled Caste'),
        ('ST', 'Scheduled Tribe'),
        ('VJNT', 'Vimukta Jati Nomadic Tribes'),
        ('OTHER', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'castes'
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class SubCaste(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    caste = models.ForeignKey(Caste, on_delete=models.CASCADE, related_name='subcastes')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        db_table = 'subcastes'
        unique_together = ['caste', 'name']
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.caste.name})"

class VoterCaste(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter = models.OneToOneField(Voter, on_delete=models.CASCADE, related_name='caste_info')
    caste = models.ForeignKey(Caste, on_delete=models.SET_NULL, null=True, blank=True)
    sub_caste = models.ForeignKey(SubCaste, on_delete=models.SET_NULL, null=True, blank=True)
    
    has_caste_certificate = models.BooleanField(default=False)
    certificate_number = models.CharField(max_length=50, blank=True, null=True)
    certificate_issue_date = models.DateField(blank=True, null=True)
    certificate_authority = models.CharField(max_length=200, blank=True, null=True)
    
    verified = models.BooleanField(default=False)
    remarks = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'voter_castes'
    
    def __str__(self):
        return f"{self.voter.full_name} - {self.caste.name if self.caste else 'No Caste'}"