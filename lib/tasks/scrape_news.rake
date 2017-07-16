# frozen_string_literal: true

require "mechanize"

namespace :fetch do
 desc "Scrapes company news from google finance"
 task news: :environment do
   def init
     mechanize = Mechanize.new
     symbols = symbols = Stock.all.pluck(:symbol)
     news = {}
     for symbol in symbols do
       page_url = get_symbol_url(symbol.upcase)
       page = mechanize.get(page_url)
       news[symbol] = scrape_news(page)
       puts symbol
       puts news[symbol].length
     end
     news
    end

    def scrape_news(page, news_items = nil)
     news_items = news_items || []
     articles = page.css(".g-section.news")

     articles.each do |article|
       next if article.css(".name a").text === ""
       news_item = {}
       news_item["title"] = article.css(".name a").text.strip
       news_item["source"] = article.css(".src").first.text.strip
       news_item["date"] = article.css(".date").text.strip
       news_item["url"] = page.link_with(text: news_item["title"]).href
       news_items.push(news_item)
     end

     if page.link_with(text: 'Next')
       mechanize = Mechanize.new
       page_url = page.link_with(text: 'Next').href
       page = mechanize.get("https://www.google.com#{page_url}")
       scrape_news(page, news_items)
     end

     news_items
    end

    def get_symbol_url symbol
     "https://www.google.com/finance/company_news?q=NSE%3A#{symbol}"
    end
    init
  end
end
