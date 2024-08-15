from django.urls import include, path
from rest_framework import routers

from portfolioApi import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserList)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]