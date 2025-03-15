from django.urls import path
from . import views


urlpatterns=[
    path('blogs/', views.get_blogs, name='simpleview'),
    path('blogs/<int:pk>', views.Blog_detail, name='detailview'),
    path('blogs/create/', views.create_blog, name='create-blog'),
    path('blogs/delete/<int:pk>', views.delete_blog, name='delete-blog')
]