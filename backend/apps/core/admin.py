from django.contrib import admin
from .models import SiteSetting, ContactMessage, Notification, AdminAuditLog

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'description', 'updated_at')
    search_fields = ('key', 'description')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'is_read', 'resolved', 'created_at')
    list_filter = ('is_read', 'resolved', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')

@admin.register(AdminAuditLog)
class AdminAuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'resource', 'ip_address', 'timestamp')
    readonly_fields = ('user', 'action', 'resource', 'details', 'ip_address', 'timestamp')

