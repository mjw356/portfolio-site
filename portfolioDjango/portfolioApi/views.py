from django.contrib.auth.models import User
from portfolioApi import serializers
from rest_framework import generics, permissions, response, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from portfolioApi.permissions import IsOwnerOrReadOnly
from portfolioApi.models import Post, Category
from django.shortcuts import get_object_or_404

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all();
    serializer_class = serializers.CategorySerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAdminUser]

class SignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        userResponse = {"username": serializer.data["username"], "email": serializer.data["email"]}
        userInstance = User.objects.get(username=userResponse["username"])
        token = Token.objects.create(user=userInstance)
        return response.Response({"user": userResponse, "token": token.key}, status=status.HTTP_201_CREATED, headers=headers)

class Login(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer

    def post(self, request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return response.Response({"detail": "No User matches the given query."}, status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        userResponse = {"username": user.username, "email": user.email}
        return response.Response({"user": userResponse, "token": token.key})

class TokenTest(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return response.Response({"user": request.user.username})