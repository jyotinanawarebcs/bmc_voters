# from django.db import models
# from django.contrib.auth import get_user_model

# User = get_user_model()

# COLOR_CODE_CHOICES = [
#     ('green', 'Green'),
#     ('red', 'Red'),
#     ('amber', 'Amber'),
#     ('other', 'Other'),
# ]

# GENDER_CHOICES = [
#     ('M', 'Male'),
#     ('F', 'Female'),
#     ('O', 'Other'),
# ]

# ACTION_CHOICES = [
#     ('print', 'Print'),
#     ('call', 'Call'),
#     ('send', 'Send'),
#     ('sms', 'SMS'),
#     ('email', 'Email'),
#     ('other', 'Other'),
# ]


# class Constituency(models.Model):
#     # विधानसभा क्र (assembly / constituency identifier)
#     code = models.CharField(max_length=50, unique=True)  # e.g. "17/165/72"
#     name = models.CharField(max_length=200, blank=True, null=True)

#     def __str__(self):
#         return f"{self.code} - {self.name or 'Unnamed'}"


# class Ward(models.Model):
#     # Optional ward entity (प्रभाग / वार्ड)
#     number = models.CharField(max_length=50, unique=False)
#     name = models.CharField(max_length=200, blank=True, null=True)
#     constituency = models.ForeignKey(Constituency, on_delete=models.SET_NULL, null=True, related_name="wards")

#     def __str__(self):
#         return f"Ward {self.number} - {self.name or ''}"


# class ListPart(models.Model):
#     # यादी भाग (electoral list part)
#     part_no = models.CharField(max_length=50, unique=False)  # e.g., "165"
#     description = models.TextField(blank=True, null=True)  # raw description e.g. "1-महाराणा..."
#     ward = models.ForeignKey(Ward, on_delete=models.SET_NULL, null=True, blank=True, related_name="list_parts")

#     def __str__(self):
#         return f"Part {self.part_no}"


# class PollingStation(models.Model):
#     # मतदान केंद्र
#     code = models.CharField(max_length=50, blank=True, null=True)  # e.g. "0 -"
#     name = models.CharField(max_length=200, blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     constituency = models.ForeignKey(Constituency, on_delete=models.SET_NULL, null=True, related_name="polling_stations")

#     def __str__(self):
#         return self.name or self.code or "PollingStation"


# class Address(models.Model):
#     # पत्ता (free text and structured fields)
#     raw = models.TextField(help_text="Full raw address", blank=True, null=True)
#     village = models.CharField(max_length=200, blank=True, null=True)  # गाव
#     street = models.CharField(max_length=200, blank=True, null=True)
#     house_no = models.CharField(max_length=100, blank=True, null=True)  # घर क्र

#     def __str__(self):
#         if self.village:
#             return self.village
#         return (self.raw[:50] + '...') if self.raw else "Address"



# GENDER_CHOICES = [
#     ('M', 'Male'),
#     ('F', 'Female'),
#     ('O', 'Other'),
# ]

# class Voter(models.Model):
#     voter_id = models.CharField(max_length=30, unique=True)
#     part_number = models.CharField(max_length=20)
#     full_name = models.CharField(max_length=200)
#     relative_name = models.CharField(max_length=200, blank=True, null=True)
#     house_no = models.CharField(max_length=50, blank=True, null=True)
#     age = models.PositiveIntegerField(blank=True, null=True)
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.voter_id} - {self.full_name}"

# class PhoneNumber(models.Model):
#     # मोबाइल - phone numbers associated with voter
#     voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name="phone_numbers")
#     number = models.CharField(max_length=30)
#     label = models.CharField(max_length=50, blank=True, null=True)  # e.g., "Mobile-1"
#     is_primary = models.BooleanField(default=False)
#     added_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ('voter', 'number')

#     def __str__(self):
#         return f"{self.number} ({'primary' if self.is_primary else 'secondary'})"


# class FamilyMember(models.Model):
#     # कुटुंब tab -> family members
#     voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name="family_members")
#     name = models.CharField(max_length=200)
#     relation = models.CharField(max_length=100, blank=True, null=True)  # e.g., Wife, Son
#     age = models.PositiveIntegerField(blank=True, null=True)
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)

#     def __str__(self):
#         return f"{self.name} ({self.relation})"


# class VoterSurvey(models.Model):
#     # सर्वे tab -> survey or notes collected about this voter
#     voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name="surveys")
#     collector = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="collected_surveys")
#     notes = models.TextField(blank=True, null=True)
#     interested = models.BooleanField(null=True, blank=True)  # e.g., support or not
#     rating = models.IntegerField(blank=True, null=True)  # custom numeric rating if required
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Survey for {self.voter} @ {self.created_at:%Y-%m-%d}"


# class AuditLog(models.Model):
#     # generic audit for actions (print/call/send etc.)
#     voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name="audit_logs")
#     action = models.CharField(max_length=50, choices=ACTION_CHOICES)
#     performed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="performed_actions")
#     performed_at = models.DateTimeField(auto_now_add=True)
#     metadata = models.JSONField(blank=True, null=True)  # flexible field for call duration, print copies, device id, etc.

#     def __str__(self):
#         return f"{self.action} on {self.voter} by {self.performed_by} at {self.performed_at}"


# class ContactAction(models.Model):
#     # richer record for call / SMS / send actions
#     voter = models.ForeignKey(Voter, on_delete=models.CASCADE, related_name="contact_actions")
#     action = models.CharField(max_length=50, choices=ACTION_CHOICES)
#     performed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
#     to_number = models.CharField(max_length=30, blank=True, null=True)  # which number was called/sent
#     result = models.CharField(max_length=200, blank=True, null=True)  # e.g., "No answer", "Connected", "Voicemail"
#     duration_seconds = models.PositiveIntegerField(blank=True, null=True)  # call duration if applicable
#     created_at = models.DateTimeField(auto_now_add=True)
#     metadata = models.JSONField(blank=True, null=True)

#     def __str__(self):
#         return f"{self.action} -> {self.to_number} ({self.result})"


# # Optional: quick counts for print/send/call aggregated per voter
# class VoterActionSummary(models.Model):
#     voter = models.OneToOneField(Voter, on_delete=models.CASCADE, related_name="action_summary")
#     print_count = models.PositiveIntegerField(default=0)
#     call_count = models.PositiveIntegerField(default=0)
#     send_count = models.PositiveIntegerField(default=0)
#     last_action_at = models.DateTimeField(blank=True, null=True)

#     def __str__(self):
#         return f"Summary for {self.voter}"
