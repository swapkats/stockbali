class StaticPagesController < ApplicationController
  def root
    if logged_in?
      @channels = current_user.channels.where(private: false).order(:name)
      @direct_messages = current_user.channels.includes(:users).where(private: true).order(:name)
    end

    og_image_url = root_url + ActionController::Base.helpers.asset_url("slackoff-og.jpg")

    set_meta_tags og: {
      title:    'StockBaat | Discuss stocks',
      url:      'http://stockbaat.com',
      image:    og_image_url,
      description: 'StockBaat is a chat application designed to keep investors discuss and stay updated with indian stocks'
    }
  end
end
