# frozen_string_literal: true

require "httparty"

namespace :refresh do
 desc "Updates channels from stocks data"
 task channels: :environment do
   symbols = Stock.all.pluck(:symbol)
   symbols.map! { |symbol| symbol.downcase }
   channels = Channel.all.pluck(:name)
   unsaved_channels = symbols - channels
   unsaved_channels.each do |channel|
     Channel.create({
       :name => channel,
       :display_name => Stock.find_by_symbol(channel.upcase).company,
     })
   end
 end
end
