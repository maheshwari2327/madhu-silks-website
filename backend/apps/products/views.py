from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from django.db.models import F
from .models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer

class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug')
    min_price = django_filters.NumberFilter(method='filter_min_price')
    max_price = django_filters.NumberFilter(method='filter_max_price')
    colour = django_filters.CharFilter(field_name='colour', lookup_expr='iexact')
    fabric = django_filters.CharFilter(field_name='fabric', lookup_expr='icontains')
    occasion = django_filters.CharFilter(field_name='occasion', lookup_expr='icontains')
    saree_type = django_filters.CharFilter(field_name='saree_type', lookup_expr='icontains')
    in_stock = django_filters.BooleanFilter(method='filter_in_stock')

    class Meta:
        model = Product
        fields = ['category', 'colour', 'fabric', 'occasion', 'saree_type', 'is_featured', 'is_new_arrival', 'is_best_seller']

    def filter_min_price(self, queryset, name, value):
        # Value is passed in rupees, convert to paise
        return queryset.filter(price_paise__gte=int(value * 100))

    def filter_max_price(self, queryset, name, value):
        return queryset.filter(price_paise__lte=int(value * 100))

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock_quantity__gt=0)
        return queryset


class ProductListView(generics.ListAPIView):
    """
    Search, filter and sort published sarees.
    Sort options:
      ordering=price (low to high)
      ordering=-price (high to low)
      ordering=-created_at (newest)
      ordering=-is_best_seller
    """
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'fabric', 'colour', 'occasion', 'saree_type', 'weaving_details', 'sku']
    ordering_fields = ['created_at', 'price_paise', 'is_best_seller']
    ordering = ['-created_at']

    def get_queryset(self):
        return Product.objects.filter(status=Product.Status.PUBLISHED).select_related('category').prefetch_related('images')


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(status=Product.Status.PUBLISHED).select_related('category').prefetch_related('images', 'variants')


class FeaturedProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.PUBLISHED,
            is_featured=True
        ).select_related('category').prefetch_related('images')[:8]


class NewArrivalsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.PUBLISHED,
            is_new_arrival=True
        ).select_related('category').prefetch_related('images')[:8]


class BestSellersView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.PUBLISHED,
            is_best_seller=True
        ).select_related('category').prefetch_related('images')[:8]


class BridalProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.PUBLISHED,
            occasion__icontains='Bridal'
        ).select_related('category').prefetch_related('images')[:12]


class FestiveProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        return Product.objects.filter(
            status=Product.Status.PUBLISHED,
            occasion__icontains='Festive'
        ).select_related('category').prefetch_related('images')[:12]
