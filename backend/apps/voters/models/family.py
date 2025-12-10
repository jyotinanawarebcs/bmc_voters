import uuid
from django.db import models
from .voters import Voter

class Family(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    family_id = models.CharField(max_length=20, unique=True, db_index=True)
    surname = models.CharField(max_length=100, db_index=True)
    head_of_family = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name='family_head')
    total_members = models.IntegerField(default=1)
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    
    family_type = models.CharField(max_length=50, blank=True, null=True)
    annual_income = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'families'
        verbose_name_plural = 'Families'
        indexes = [
            models.Index(fields=['surname']),
            models.Index(fields=['family_id']),
        ]
    
    def __str__(self):
        return f"{self.surname} Family ({self.family_id})"

class FamilyMember(models.Model):
    RELATIONSHIP_CHOICES = [
        ('SELF', 'Self'),
        ('SPOUSE', 'Spouse'),
        ('SON', 'Son'),
        ('DAUGHTER', 'Daughter'),
        ('FATHER', 'Father'),
        ('MOTHER', 'Mother'),
        ('BROTHER', 'Brother'),
        ('SISTER', 'Sister'),
        ('GRANDFATHER', 'Grandfather'),
        ('GRANDMOTHER', 'Grandmother'),
        ('OTHER', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='members')
    voter = models.OneToOneField(Voter, on_delete=models.CASCADE, related_name='family_member')
    relationship = models.CharField(max_length=20, choices=RELATIONSHIP_CHOICES)
    is_primary = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'family_members'
        unique_together = ['family', 'voter']
    
    def __str__(self):
        return f"{self.voter.full_name} - {self.relationship}"