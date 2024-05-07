from django.contrib import admin
from store.models import Product, Category, Gallery, Tax, Specification, Size, Color, Cart, CartOrder, CartOrderItem, Coupon, Notification, ProducFaq, Review, Wishlist
# from import_export.admin import ImportExportModelAdmin

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0

class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0

class SizeInline(admin.TabularInline):
    model = Size
    extra = 0

class ColorInline(admin.TabularInline):
    model = Color
    extra = 0

class CartInline(admin.TabularInline):
    model = Cart
    extra = 0

class CartOrderInline(admin.TabularInline):
    model = CartOrder
    extra = 0

class CartOrderItemInline(admin.TabularInline):
    model = CartOrderItem
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'category', 'shipping_amount', 'stock_qty', 'in_stock', 'vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline, CartInline, CartOrderItemInline]

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'rating']

#
class CartAdmin(admin.ModelAdmin):
    list_display = ['product', 'cart_id', 'qty', 'price', 'sub_total' , 'shipping_amount', 'service_fee', 'tax_fee', 'total', 'country', 'size', 'color', 'date']

class CartOrderAdmin(admin.ModelAdmin):
    inlines = [CartOrderItemInline]
    list_display = ['oid', 'buyer', 'payment_status', 'order_status','total']
    list_editable = ['payment_status', 'order_status', 'total']
#
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Cart)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItem)

admin.site.register(Coupon)
admin.site.register(Notification)
admin.site.register(ProducFaq)
admin.site.register(Wishlist)
admin.site.register(Tax)

