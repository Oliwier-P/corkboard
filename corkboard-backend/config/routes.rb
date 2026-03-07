Rails.application.routes.draw do
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
    end
    collection do
      get "current"
    end
  end

  resources :tasks

  resources :workspaces do
    post :switch, on: :collection
  end
end
