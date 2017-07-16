class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)

    if @message.save
      @channel = Channel.includes(:messages, :users).find(params[:message][:channel_id])
      @messages = @channel.messages.order(:created_at).reverse
      author = User.find(@message.user_id)

      new_message = {
        "id" => @message.id,
        "content" => @message.content,
        "content_type" => @message.content_type,
        "updated_at" => @message.updated_at,
        "author"  => {
          "id" => author.id,
          "username" => author.username,
          "photo_url" => ActionController::Base.helpers.asset_path(author.avatar.url)
        },
        "emoticons" => []
      }

      Pusher.trigger(@channel.id, 'message', {
        messages: new_message
      })

      receivers = @channel.users.map { |user| user.id }

      Pusher.trigger('application', 'notify', {
        authorId: author.id,
        author: author.username,
        channelId: @channel.id,
        private: @channel.private,
        receivers: receivers
      })
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.includes(:channel, :emoticons).find(params[:id])

    @message.update(message_params)
    @channel = @message.channel
    @emoticons = @message.emoticons.order(created_at: :asc)

    Pusher.trigger(@channel.id, 'editMessage',
                   { message: @message,
                     emoticons: @emoticons });

    render json: @message
  end

  def destroy
    @message = Message.includes(:channel).find(params[:id])
    @channel = @message.channel
    @message.destroy

    Pusher.trigger(@channel.id, 'deleteMessage', { id: @message.id });
    render json: @message.id
  end

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end
