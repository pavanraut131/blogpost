from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import blog_serializer
from .models import Blog

# Create your views here.
@api_view(['GET'])
def get_blogs(request):
    blogs = Blog.objects.all()
    serializer = blog_serializer(blogs, many = True)
    return Response(serializer.data)
