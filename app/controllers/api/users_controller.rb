class Api::UsersController < ApplicationController
  def index
    @users = User.all.order(:username)
    render 'api/users/index'
  end

  def show
    @user = User.includes(:channels).find(params[:id])
    @channels = @user.channels.where(private: false).order(:name)
    @direct_messages = @user.direct_messages

    render "api/users/show"
  end

  def create
    @user = User.new(user_params)
    @user.avatar = params[:user][:photo_url]
    @user.current_channel = Channel.find_by(name: 'general').id

    if @user.save
      @user.subscriptions.create(channel_id: @user.current_channel)

      @channels = @user.channels.where(private: false).order(:name)
      @direct_messages = @user.direct_messages

      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:user][:id])
    @user.update(user_params)
    @user.avatar = params[:user][:photo_url]
    @user.save

    Pusher.trigger('application', 'updateChat', {});

    login(@user)
    @channels = @user.channels.where(private: false).order(:name)
    @direct_messages = @user.direct_messages
    render 'api/users/show'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :photo_url)
  end
end
