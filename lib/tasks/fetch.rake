require 'httparty'

namespace :fetch do
  desc "Fethes symbol data from api"
  task fetch_symbols: :environment do
    puts "hello";
    class StockJson
      include HTTParty
      base_uri "jsonplaceholder.typicode.com/"

      def symbols
        self.class.get('/posts')
      end
    end

    StockJson_resty = StockJson.new
    stocks_pre = Array.new
    stocks_today = Array.new
    stocks_diff = Array.new

    StockJson_resty.symbols.each do |symbol|
       stocks_today << symbol['title']
    end
     stocks_diff = stocks_today - stocks_pre | stocks_pre - stocks_today


    stocks_diff.each do |stock|
      Stock.create(symbol: stock)
    end
    stocks_pre = stocks_today
    puts stocks_pre
  end
end
