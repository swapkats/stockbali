# frozen_string_literal: true

require "httparty"

namespace :fetch do
 desc "Fethes symbol data from api"
 task symbols: :environment do
   class StockJson
     include HTTParty
     base_uri "stockbali.herokuapp.com/"

     def symbols
       self.class.get("/api/v1.0/symbols")
     end
   end

   StockJson_resty = StockJson.new
   stocks_pre = []
   stocks_today = []

   puts StockJson_resty.symbols

  #  StockJson_resty.symbols.each do |symbol|
  #    stocks_today << symbol["title"]
  #  end
  #  stocks_diff = stocks_today - stocks_pre | stocks_pre - stocks_today
   #
  #  stocks_diff.each do |stock|
  #    Stock.create(symbol: stock)
  #  end
  #  stocks_pre = stocks_today
   puts "hello"
 end
end
