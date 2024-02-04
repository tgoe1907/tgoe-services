from django.urls import path 
from . import views 
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('persons', views.person_list, name='person_list'),
    path('persons/<int:id>', views.person),
]

urlpatterns = format_suffix_patterns(urlpatterns)
