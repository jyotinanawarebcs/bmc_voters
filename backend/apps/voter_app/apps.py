from django.apps import AppConfig


class VoterAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.voter_app'  # This should be exactly 'voter_app'