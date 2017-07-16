# frozen_string_literal: true

require "httparty"

namespace :fetch do
 desc "Fethes symbol data from api"
 task fetch_symbols: :environment do
   class StockJson
     include HTTParty
     base_uri "jsonplaceholder.typicode.com/"

     def symbols
       self.class.get("/posts")
     end
   end

   StockJson_resty = StockJson.new
   stocks_pre = []
   stocks_today = []

   StockJson_resty.symbols.each do |symbol|
     stocks_today << symbol["title"]
   end
   stocks_diff = stocks_today - stocks_pre | stocks_pre - stocks_today

   stocks_diff.each do |stock|
     Stock.create(symbol: stock)
   end
   stocks_pre = stocks_today
   puts "hello"
 end
end
