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

   response = StockJson.new
   symbols = JSON.parse(response.symbols)

   stocks_pre = Stock.all.pluck(:symbol)
   stocks_today = symbols.keys

   stocks_diff = stocks_today - stocks_pre | stocks_pre - stocks_today

   for symbol in stocks_diff do
     next if symbol === "SYMBOL"
     Stock.create({
       symbol: symbol,
       company: symbols[symbol]
     })
   end
 end
end
