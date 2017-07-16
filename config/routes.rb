Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create, :update] do
      resources :channels, only: [:show]
    end

    resources :subscriptions, only: [:create]
    resource :subscriptions, only: [:destroy]

    resources :channels, only: [:index, :create, :update, :destroy]
    get 'channels/public' => 'channels#public'

    resources :messages, only: [:create, :update, :destroy]
    resources :emoticons, only: [:create, :destroy]

    resource :session, only: [:create, :destroy, :show]
  end
end
