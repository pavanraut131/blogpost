from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import blog_serializer
from .models import Blog
from rest_framework import status
from rest_framework.pagination import PageNumberPagination


class BlogPagination(PageNumberPagination):
    page_size=3
    page_size_query_param='page_size'
    max_page_size=3



# Create your views here.
@api_view(['GET'])
def get_blogs(request):
    blogs = Blog.objects.all().order_by('id')
    paginator = BlogPagination()
    paginated_blogs = paginator.paginate_queryset(blogs, request)
    serializer = blog_serializer(paginated_blogs, many = True)
    
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def Blog_detail(request, pk):
    blog = Blog.objects.filter(id=pk).first()
    serializer = blog_serializer(blog, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_blog(request):
    serializer = blog_serializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['Delete'])
def delete_blog(request, pk):
    blog = Blog.objects.filter(id=pk).first()
    blog.delete()
    return Response("Blog deleted successsfully ")