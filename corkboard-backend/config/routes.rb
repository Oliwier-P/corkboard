Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  get "/debug-route", to: proc { |env| [200, {}, ["Debug route works"]] }

  get "up" => "rails/health#show", as: :rails_health_check

  devise_for :users, path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             },
             defaults: { format: :json }

  get "users/me", to: "users#me"

  resources :releases do
    member do
      get "board"
      get "all_tasks"
    end
  end

  resources :backlog

  resources :tasks do
    member do
      put :move_to_next_release
    end
  end

  resources :workspaces do
    member do
      get :collaborators
      get :current_release
      get :releases
      post :invite_user
      post :accept_invitation
      delete :decline_invitation
      post :complete_release
    end

    collection do
      get :invitation
    end

    post :switch, on: :collection
  end

  resources :documents
end
