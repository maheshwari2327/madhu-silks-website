from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Coupon, PromotionalBanner, NewsletterSubscriber
from .serializers import PromotionalBannerSerializer, ApplyCouponRequestSerializer, NewsletterSubscriberSerializer

class PromotionalBannerListView(generics.ListAPIView):
    serializer_class = PromotionalBannerSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        position = self.request.query_params.get('position')
        qs = PromotionalBanner.objects.filter(is_active=True)
        if position:
            qs = qs.filter(position=position.upper())
        return qs


class ApplyCouponView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ApplyCouponRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['code'].strip().upper()
        order_amount_paise = serializer.validated_data['order_amount_paise']

        coupon = Coupon.objects.filter(code__iexact=code).first()
        if not coupon:
            return Response({"error": "Invalid coupon code."}, status=status.HTTP_404_NOT_FOUND)

        is_valid, reason = coupon.is_valid_now()
        if not is_valid:
            return Response({"error": reason}, status=status.HTTP_400_BAD_REQUEST)

        discount_paise = coupon.calculate_discount_paise(order_amount_paise)
        if discount_paise == 0 and coupon.min_order_amount_paise > order_amount_paise:
            min_rupees = coupon.min_order_amount_paise / 100
            return Response({
                "error": f"This coupon requires a minimum cart total of ₹{min_rupees:,.0f}."
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "code": coupon.code,
            "discount_paise": discount_paise,
            "discount_in_rupees": discount_paise / 100,
            "message": f"Coupon {coupon.code} applied successfully!"
        })


class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [permissions.AllowAny]

