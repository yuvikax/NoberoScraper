from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

# Initialize the default router
router = DefaultRouter()

# Register the ProductViewSet with the router
router.register(r'products', ProductViewSet, basename='products')

# Include the router's URLs in the urlpatterns
urlpatterns = [
    path('api/', include(router.urls)),
]
