from django.contrib import admin
from .models import (
    Voter, Family, FamilyMember, Address, 
    Caste, SubCaste, VoterCaste, OtherDetails
)

@admin.register(Voter)
class VoterAdmin(admin.ModelAdmin):
    list_display = ('voter_id', 'full_name', 'mobile_number', 'age', 'gender', 'is_active')
    list_filter = ('gender', 'is_active', 'marital_status', 'created_at')
    search_fields = ('voter_id', 'first_name', 'last_name', 'mobile_number', 'aadhaar_number')
    readonly_fields = ('created_at', 'updated_at', 'full_name')
    fieldsets = (
        ('Personal Information', {
            'fields': ('voter_id', 'first_name', 'middle_name', 'last_name', 'full_name')
        }),
        ('Contact Details', {
            'fields': ('mobile_number', 'alternate_mobile', 'email')
        }),
        ('Personal Details', {
            'fields': ('date_of_birth', 'age', 'gender', 'marital_status', 'photo')
        }),
        ('Identity Details', {
            'fields': ('aadhaar_number', 'epic_number')
        }),
        ('Status', {
            'fields': ('is_active', 'is_deleted', 'verified')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('voter', 'village_town', 'taluka', 'district', 'is_primary')
    list_filter = ('district', 'taluka', 'is_primary')
    search_fields = ('voter__full_name', 'village_town', 'pincode')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Caste)
class CasteAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'code')
    list_filter = ('category',)
    search_fields = ('name', 'code')

@admin.register(VoterCaste)
class VoterCasteAdmin(admin.ModelAdmin):
    list_display = ('voter', 'caste', 'sub_caste', 'has_caste_certificate')
    list_filter = ('caste__category', 'has_caste_certificate')
    search_fields = ('voter__full_name', 'caste__name')

@admin.register(OtherDetails)
class OtherDetailsAdmin(admin.ModelAdmin):
    list_display = ('voter', 'education', 'occupation', 'annual_income')
    list_filter = ('education', 'occupation', 'annual_income')
    search_fields = ('voter__full_name',)

@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('family_id', 'surname', 'head_of_family', 'total_members')
    search_fields = ('family_id', 'surname', 'head_of_family__full_name')

@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):
    list_display = ('family', 'voter', 'relationship', 'is_primary')
    list_filter = ('relationship', 'is_primary')
    search_fields = ('voter__full_name', 'family__surname')

admin.site.register(SubCaste)