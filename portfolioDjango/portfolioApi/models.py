from django.db import models

# this is the model for blog posts
class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    published = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    body = models.TextField(blank=True, default='')
    featuredImage = models.CharField(max_length=100, blank=True, default='')
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    isPublished = models.BooleanField(default=False);

    class Meta:
        ordering = ['created']

class ImageUploads(models.Model):
    image = models.FileField(upload_to="images/", null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=120, blank=False, default='')
    owner = models.ForeignKey('auth.User', related_name='categories', on_delete=models.CASCADE)
    posts = models.ManyToManyField('Post', related_name='categories', blank=True)

    class Meta:
        verbose_name_plural = 'categories'