# Generated by Django 5.1 on 2024-08-16 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioApi', '0003_category_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='posts',
            field=models.ManyToManyField(blank=True, related_name='categories', to='portfolioApi.post'),
        ),
    ]
