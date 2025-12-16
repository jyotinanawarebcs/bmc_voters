from django.contrib import admin
from .models import Voter

@admin.register(Voter)
class VoterAdmin(admin.ModelAdmin):
    list_display = ('voter_id', 'full_name', 'part_number', 'age', 'gender', 'created_at')
    list_filter = ('gender', 'created_at')
    search_fields = ('voter_id', 'full_name', 'part_number', 'relative_name')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('voter_id', 'part_number', 'full_name', 'relative_name')
        }),
        ('Address & Demographics', {
            'fields': ('house_no', 'age', 'gender')
        }),
        ('Media', {
            'fields': ('photo',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )