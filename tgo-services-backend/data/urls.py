from django.urls import path, include
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(f'users', UserViewSet)
router.register(f'trainer', TrainerViewSet, basename='Trainer')
router.register(f'department', DepartmentViewSet, basename='Department')
router.register(f'sportsgroup', SportsGroupViewSet, basename='SportGroup')
router.register(f'membership', MembershipViewSet, basename='Membership')
router.register(f'regulartrainunit', RegularTrainUnitViewSet, basename='RegularTrainUnit')
router.register(f'trainhour', TrainHourViewSet, basename='TrainHourViewSet')
router.register(f'departmentleadership', DepartmentLeaderShipViewSet, basename='DepartmentLeaderShip')
router.register(f'trainhourparticipation', TrainHourParticipationViewSet, basename='TrainHourParticipation')
urlpatterns = router.urls
'''
urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('login/', LoginUserView.as_view()),
    path('user/', GetUserView.as_view()),
    path('update/', UpdateUserView.as_view()),
    path('logout/', LogoutUserView.as_view()),
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
'''
