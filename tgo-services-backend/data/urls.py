from django.urls import path, include
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(f'users', UserViewSet)
router.register(f'department', DepartmentViewSet, basename='Department')
router.register(f'sportsgroup', SportsGroupViewSet, basename='SportGroup')
router.register(f'trainhour', TrainHourViewSet, basename='TrainHourViewSet')

apiViewPatterns = [
    path('register/', RegisterUserView.as_view(), name='api-view'),
    path('login/', LoginUserView.as_view(), name='api-view'),
    path('user/', GetUserView.as_view(), name='api-view'),
    path('authenticated/', IsAuthenticated.as_view(), name='api-view'),
    path('update/', UpdateUserView.as_view(), name='api-view'),
    path('logout/', LogoutUserView.as_view(), name='api-view'),
    path('', include(router.urls), name='api-view'),
]
urlpatterns = [
    path('', include(router.urls)),
    *apiViewPatterns
]

# urlpatterns = format_suffix_patterns(urlpatterns)