from rest_framework import serializers
from .models import ProductReview

class ProductReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = ProductReview
        fields = [
            'id', 'user_name', 'rating', 'title', 'comment',
            'is_verified_purchase', 'created_at'
        ]
        read_only_fields = ['id', 'user_name', 'is_verified_purchase', 'created_at']

    def get_user_name(self, obj):
        name = obj.user.get_full_name()
        return name if name else obj.user.email.split('@')[0]

