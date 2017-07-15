# frozen_string_literal: true

require "mechanize"

def init
  mechanize = Mechanize.new
  symbols = %w[infy maruti]
  news = {}
  for symbol in symbols do
    page_url = get_symbol_url(symbol.upcase)
    page = mechanize.get(page_url)
    news[symbol] = scrape_news(page)
  end
  puts news
  news
end

def scrape_news page
  news_items = []
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

  # puts page.link_with('Next').length
  news_items
end

def get_symbol_url symbol
  "https://www.google.com/finance/company_news?q=NSE%3A#{symbol}"
end

init
