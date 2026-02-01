from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetEntryViewSet, process_audio_transcript

router = DefaultRouter()
router.register(r'entries', BudgetEntryViewSet, basename='budgetentry')

urlpatterns = [
    path('', include(router.urls)),
    path('process-audio/', process_audio_transcript, name='process-audio'),
]
