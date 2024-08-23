import scrapy
from urllib.parse import urljoin
from scraper.items import NoberoProductItem
import re

class NoberoSpider(scrapy.Spider):
    name = "nobero"
    start_urls = ['https://nobero.com/pages/men']

    def parse(self, response):
        categories = ["oversized-tshirts", "tshirts", "co-ords", "joggers", "shorts", "plus-size-t-shirts"]
        for category in categories:
            category_url = f"https://nobero.com/collections/men-{category}"
            yield scrapy.Request(url=category_url, callback=self.parse_category, meta={'category': category})

    def parse_category(self, response):
        product_links = response.css('.product-card a::attr(href)').getall()
        for link in product_links:
            product_url = urljoin(response.url, link)
            yield scrapy.Request(url=product_url, callback=self.parse_product, meta={'category': response.meta['category']})

        next_page = response.css('a[rel="next"]::attr(href)').get()
        if next_page:
            yield scrapy.Request(url=urljoin(response.url, next_page), callback=self.parse_category, meta=response.meta)

    def parse_product(self, response):
        item = NoberoProductItem()
        item['category'] = response.meta['category'].replace("-", " ").title()
        item['url'] = response.url
        item['title'] = response.css('.product-name::text').get(default='').strip()
        item['price'] = int(response.css('.final-price span::text').re_first(r'\d+', default=0).replace(',', ''))
        item['MRP'] = int(response.css('.original-price span::text').re_first(r'\d+', default=0).replace(',', ''))
        item['last_7_day_sale'] = int(response.css('.sale-count span::text').re_first(r'\d+', default=0).replace(',', ''))

        colors = response.css('.color-options img::attr(alt)').getall()
        sizes = response.css('.size-options span::text').getall()
        available_skus = [{"color": color, "size": sizes} for color in colors]
        item['available_skus'] = available_skus

        item['fit'] = response.css('div:contains("Fit") + div::text').get(default='')
        item['fabric'] = response.css('div:contains("Fabric") + div::text').get(default='')
        item['neck'] = response.css('div:contains("Neck") + div::text').get(default='')
        item['sleeve'] = response.css('div:contains("Sleeve") + div::text').get(default='')
        item['pattern'] = response.css('div:contains("Pattern") + div::text').get(default='')
        item['length'] = response.css('div:contains("Length") + div::text').get(default='')

        description_elements = response.css('.product-description div').getall()
        description = "\n".join([re.sub('<[^<]+?>', '', desc) for desc in description_elements])
        item['description'] = description.strip()

        yield item
