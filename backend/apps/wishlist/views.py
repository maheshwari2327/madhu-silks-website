from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer
from apps.products.models import Product

class WishlistDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        return Response(WishlistSerializer(wishlist, context={'request': request}).data)


class WishlistItemToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        item = WishlistItem.objects.filter(wishlist=wishlist, product=product).first()
        if item:
            item.delete()
            is_in_wishlist = False
            msg = "Removed from wishlist"
        else:
            WishlistItem.objects.create(wishlist=wishlist, product=product)
            is_in_wishlist = True
            msg = "Added to wishlist"

        return Response({
            "is_in_wishlist": is_in_wishlist,
            "message": msg,
            "wishlist": WishlistSerializer(wishlist, context={'request': request}).data
        })


class WishlistItemDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        item = get_object_or_404(WishlistItem, id=pk, wishlist=wishlist)
        item.delete()
        return Response(WishlistSerializer(wishlist, context={'request': request}).data)

