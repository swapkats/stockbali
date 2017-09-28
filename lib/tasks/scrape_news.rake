# frozen_string_literal: true

require "mechanize"

namespace :fetch do
 desc "Scrapes company news from google finance"
 task news: :environment do
   def init
     mechanize = Mechanize.new
     stocks = Stock.all
     for stock in stocks do
       page_url = get_symbol_url(stock.symbol.upcase)
       page = mechanize.get(page_url)
       articles = scrape_news(page, [])
       articles.each do |article|
         article[:stock_id] = stock.id
         Article.create(article)
       end
     end
    end

    def scrape_news(page, news_items = nil)
     news_items = news_items || []
     articles = page.css(".g-section.news")

     articles.each do |article|
       next if article.css(".name a").text === ""
       news_item = {}
       news_item[:title] = article.css(".name a").text.strip
       news_item[:source] = article.css(".src").first.text.strip
       news_item[:date] = article.css(".date").text.strip
       news_item[:url] = page.link_with(text: news_item[:title]).href
       news_items.push(news_item)
     end

    #  if page.link_with(text: 'Next')
    #    mechanize = Mechanize.new
    #    page_url = page.link_with(text: 'Next').href
    #    page = mechanize.get("https://www.google.com#{page_url}")
    #    scrape_news(page, news_items)
    #  end

     return news_items
    end

    def get_symbol_url symbol
     "https://www.google.com/finance/company_news?q=NSE%3A#{symbol}"
    end

    init
  end
end
