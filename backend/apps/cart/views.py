from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from apps.products.models import Product

def get_or_create_cart(request):
    """Retrieves or creates a cart for either authenticated user or guest."""
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key)
    return cart


class CartDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cart = get_or_create_cart(request)
        return Response(CartSerializer(cart, context={'request': request}).data)


class CartItemAddView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity < 1:
            return Response({"error": "Quantity must be at least 1."}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id, status=Product.Status.PUBLISHED)

        if product.stock_quantity < quantity:
            return Response({
                "error": f"Only {product.stock_quantity} units available in stock."
            }, status=status.HTTP_400_BAD_REQUEST)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        if not created:
            new_qty = item.quantity + quantity
            if new_qty > product.stock_quantity:
                return Response({
                    "error": f"Cannot add more. Maximum available stock is {product.stock_quantity}."
                }, status=status.HTTP_400_BAD_REQUEST)
            item.quantity = new_qty
            item.save()

        return Response(CartSerializer(cart, context={'request': request}).data, status=status.HTTP_200_OK)


class CartItemUpdateDeleteView(APIView):
    permission_classes = [permissions.AllowAny]

    def patch(self, request, pk):
        cart = get_or_create_cart(request)
        item = get_object_or_404(CartItem, id=pk, cart=cart)
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
            item.delete()
            return Response(CartSerializer(cart, context={'request': request}).data)

        if quantity > item.product.stock_quantity:
            return Response({
                "error": f"Only {item.product.stock_quantity} units available in stock."
            }, status=status.HTTP_400_BAD_REQUEST)

        item.quantity = quantity
        item.save()
        return Response(CartSerializer(cart, context={'request': request}).data)

    def delete(self, request, pk):
        cart = get_or_create_cart(request)
        item = get_object_or_404(CartItem, id=pk, cart=cart)
        item.delete()
        return Response(CartSerializer(cart, context={'request': request}).data)

