from django.contrib.auth.models import User
from portfolioApi import serializers
from rest_framework import generics, permissions, response, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FileUploadParser
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
    # queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if(user.is_authenticated):
            return Post.objects.filter(owner=user)
        else:
            return Post.objects.filter(isPublished=True)

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

class Login(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer

    def post(self, request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return response.Response({"detail": "No User matches the given query."}, status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        userResponse = {"username": user.username, "email": user.email}
        return response.Response({"user": userResponse, "token": token.key})

class UploadImageView(generics.CreateAPIView):
    serializer_class = serializers.ImageUploadSerializer
    parser_classes = [FileUploadParser,]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        print(self.request.FILES['file'])
        file_obj = self.request.FILES['file']
        serializer.save(image=file_obj)    
