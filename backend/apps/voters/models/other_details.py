import uuid
from django.db import models
from .voters import Voter
from django.contrib.auth import get_user_model

User = get_user_model()

class OtherDetails(models.Model):
    EDUCATION_CHOICES = [
        ('ILLITERATE', 'Illiterate'),
        ('PRIMARY', 'Primary (1-4)'),
        ('MIDDLE', 'Middle (5-7)'),
        ('SECONDARY', 'Secondary (8-10)'),
        ('HSC', 'Higher Secondary (11-12)'),
        ('GRADUATE', 'Graduate'),
        ('POST_GRADUATE', 'Post Graduate'),
        ('DOCTORATE', 'Doctorate'),
        ('OTHER', 'Other'),
    ]
    
    OCCUPATION_CHOICES = [
        ('FARMER', 'Farmer'),
        ('LABOUR', 'Labour'),
        ('BUSINESS', 'Business'),
        ('SERVICE', 'Service'),
        ('STUDENT', 'Student'),
        ('HOUSEWIFE', 'Housewife'),
        ('RETIRED', 'Retired'),
        ('UNEMPLOYED', 'Unemployed'),
        ('OTHER', 'Other'),
    ]
    
    INCOME_GROUP_CHOICES = [
        ('BELOW_1', 'Below 1 Lakh'),
        ('1_2', '1-2 Lakhs'),
        ('2_5', '2-5 Lakhs'),
        ('5_10', '5-10 Lakhs'),
        ('ABOVE_10', 'Above 10 Lakhs'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter = models.OneToOneField(Voter, on_delete=models.CASCADE, related_name='other_details')
    
    education = models.CharField(max_length=20, choices=EDUCATION_CHOICES, blank=True, null=True)
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, blank=True, null=True)
    occupation_details = models.CharField(max_length=200, blank=True, null=True)
    annual_income = models.CharField(max_length=20, choices=INCOME_GROUP_CHOICES, blank=True, null=True)
    
    party_affiliation = models.CharField(max_length=100, blank=True, null=True)
    is_party_member = models.BooleanField(default=False)
    party_member_id = models.CharField(max_length=50, blank=True, null=True)
    political_inclination = models.CharField(max_length=50, blank=True, null=True)
    
    facebook_profile = models.URLField(blank=True, null=True)
    twitter_profile = models.URLField(blank=True, null=True)
    instagram_profile = models.URLField(blank=True, null=True)
    whatsapp_number = models.CharField(max_length=15, blank=True, null=True)
    
    is_senior_citizen = models.BooleanField(default=False)
    is_divyang = models.BooleanField(default=False)
    divyang_category = models.CharField(max_length=100, blank=True, null=True)
    is_government_employee = models.BooleanField(default=False)
    
    no_of_children = models.IntegerField(default=0)
    vehicle_ownership = models.CharField(max_length=100, blank=True, null=True)
    house_type = models.CharField(max_length=50, blank=True, null=True)
    
    previous_voting_pattern = models.CharField(max_length=100, blank=True, null=True)
    voting_sincerity = models.CharField(max_length=50, blank=True, null=True)
    polling_station_distance = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    
    hobbies = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    languages_known = models.CharField(max_length=200, blank=True, null=True)
    
    data_verified = models.BooleanField(default=False)
    last_verified_on = models.DateField(blank=True, null=True)
    verification_notes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        db_table = 'other_details'
        verbose_name_plural = 'Other Details'
    
    def __str__(self):
        return f"Additional details for {self.voter.full_name}"