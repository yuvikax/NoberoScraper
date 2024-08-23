from django.db import models

class SKU(models.Model):
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=10)

class Product(models.Model):
    category = models.CharField(max_length=100)
    url = models.URLField(max_length=500)
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    mrp = models.IntegerField()
    last_7_day_sale = models.IntegerField()
    available_skus = models.ManyToManyField(SKU)
    fit = models.CharField(max_length=100)
    fabric = models.CharField(max_length=100)
    neck = models.CharField(max_length=100)
    sleeve = models.CharField(max_length=100)
    pattern = models.CharField(max_length=100)
    length = models.CharField(max_length=100)
    description = models.TextField()
