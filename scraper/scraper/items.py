# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class NoberoProductItem(scrapy.Item):
    # Define the fields for your item here like:
    name = scrapy.Field()
    price = scrapy.Field()