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

  resources :tasks do
    member do
      put :move_to_next_release
    end
  end

  resources :workspaces do
    member do
      get :collaborators
    end
    post :switch, on: :collection

    resources :releases
  end
end
