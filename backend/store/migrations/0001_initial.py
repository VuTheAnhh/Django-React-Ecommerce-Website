# Generated by Django 5.0 on 2024-04-04 07:28

import django.db.models.deletion
import django.utils.timezone
import shortuuid.django_fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('vendor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, default='category.jpg', null=True, upload_to='category')),
                ('active', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Categories',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.FileField(blank=True, default='product.jpg', null=True, upload_to='products')),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('old_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('shipping_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('stock_qty', models.PositiveIntegerField(default=0)),
                ('in_stock', models.BooleanField(default=True)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('disabled', 'Disabled'), ('in_review', 'In Review'), ('published', 'Published')], default='published', max_length=100)),
                ('featured', models.BooleanField(default=False)),
                ('views', models.PositiveIntegerField(blank=True, default=0, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('pid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefg12345', length=10, max_length=10, prefix='', unique=True)),
                ('slug', models.SlugField(unique=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.category')),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendor.vendor')),
            ],
        ),
    ]
