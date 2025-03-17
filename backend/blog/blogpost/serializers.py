from rest_framework import serializers
from .models import Blog
import imghdr

class blog_serializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields = "__all__"

    def validate_image(self, value):
        allowed_types=['jpeg','png', 'gif', 'bmp', 'webp']

        if value.name.endswith('.svg'):
            return value
        
        img_typ = imghdr.what(value)

        if img_typ not in allowed_types:
            raise serializers.ValidationError('image not of desired type')

        return value