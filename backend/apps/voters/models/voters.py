import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Voter(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    MARITAL_STATUS_CHOICES = [
        ('S', 'Single'),
        ('M', 'Married'),
        ('D', 'Divorced'),
        ('W', 'Widowed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter_id = models.CharField(max_length=20, unique=True, db_index=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=300, blank=True)
    
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    alternate_mobile = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    
    date_of_birth = models.DateField()
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=1, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    
    photo = models.ImageField(upload_to='voter_photos/', blank=True, null=True)
    aadhaar_number = models.CharField(max_length=12, blank=True, null=True)
    epic_number = models.CharField(max_length=20, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_voters')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='updated_voters')
    
    class Meta:
        db_table = 'voters'
        indexes = [
            models.Index(fields=['voter_id']),
            models.Index(fields=['last_name']),
            models.Index(fields=['mobile_number']),
        ]
        ordering = ['last_name', 'first_name']
    
    def save(self, *args, **kwargs):
        names = [self.first_name]
        if self.middle_name:
            names.append(self.middle_name)
        names.append(self.last_name)
        self.full_name = ' '.join(filter(None, names))
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.full_name} ({self.voter_id})"