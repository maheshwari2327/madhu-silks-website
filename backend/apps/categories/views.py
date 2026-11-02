from rest_framework import generics, permissions
from django.db.models import Count, Q
from .models import Category
from .serializers import CategorySerializer

class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Category.objects.filter(is_active=True).annotate(
            product_count=Count('products', filter=Q(products__status='PUBLISHED'))
        ).order_by('display_order', 'name')


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
