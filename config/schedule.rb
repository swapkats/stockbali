# frozen_string_literal: true

set :output, "#{path}/log/cron.log"

every 2.minutes do
  rake "fetch:fetch_symbols"
end
