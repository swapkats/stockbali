# frozen_string_literal: true

require "mechanize"

namespace :refresh do
 desc "Scrapes company news from google finance"
 task messages: :environment do
   def init
     stocks = Stock.all
     message =
     stocks.each do |stock|
       channel = Channel.find_by_name(stock.symbol.downcase)
       stock.articles.each do |article|
         message = {}
         message[:channel_id] = channel.id
         message[:user_id] = 1
         message[:content] = article.title
         message[:content_type] = 'news'
         Message.create(message)
       end
     end
   end
   init
  end
end
