from django.db import models

class Voter(models.Model):
    voter_id = models.CharField(max_length=30, unique=True, blank=True, null=True)
    part_number = models.CharField(max_length=20, blank=True, null=True)
    full_name = models.CharField(max_length=200, blank=True, null=True)
    relative_name = models.CharField(max_length=200, blank=True, null=True)  # Father or relative
    house_no = models.CharField(max_length=50, blank=True, null=True)
    age = models.CharField(max_length=10, null=True, blank=True)
    gender = models.CharField(
        max_length=1,
        choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')],
        blank=True,
        null=True
    )
    photo = models.ImageField(upload_to="voter_photos/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['voter_id']
        indexes = [
            models.Index(fields=['voter_id']),
            models.Index(fields=['full_name']),
            models.Index(fields=['part_number']),
        ]

    def __str__(self):
        return f"{self.voter_id or 'NA'} - {self.full_name or 'Unnamed'}"