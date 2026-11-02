from django.urls import path
from .views import SiteSettingsPublicView, ContactMessageCreateView, NotificationListView

urlpatterns = [
    path('settings/', SiteSettingsPublicView.as_view(), name='core-settings'),
    path('contact/', ContactMessageCreateView.as_view(), name='core-contact'),
    path('notifications/', NotificationListView.as_view(), name='core-notifications'),
]
