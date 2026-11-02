from django.contrib import admin
from .models import Payment, Refund

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('razorpay_order_id', 'order', 'amount_in_rupees', 'status', 'created_at')
    list_filter = ('status', 'currency', 'created_at')
    search_fields = ('razorpay_order_id', 'razorpay_payment_id', 'order__order_number')
    readonly_fields = ('razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature', 'amount_paise', 'created_at')

@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('razorpay_refund_id', 'payment', 'amount_in_rupees', 'status', 'created_at')
