# Generated by Django 5.1.6 on 2025-03-17 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogpost', '0002_blog_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
