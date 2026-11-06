from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ProductReview
from .serializers import ProductReviewSerializer
from apps.products.models import Product
from apps.orders.models import OrderItem

class ProductReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductReviewSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        return ProductReview.objects.filter(
            product__slug=slug,
            is_approved=True
        ).select_related('user')

    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        product = get_object_or_404(Product, slug=slug)
        # Check verified purchase
        is_verified = OrderItem.objects.filter(
            order__user=self.request.user,
            order__payment_status='PAID',
            product=product
        ).exists()

        serializer.save(
            user=self.request.user,
            product=product,
            is_verified_purchase=is_verified
        )

