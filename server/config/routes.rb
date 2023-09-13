Rails.application.routes.draw do
  resources :admins
  resources :requests
  resources :locations
  resources :player_meet_ups
  resources :meet_ups
  resources :fields
  resources :sports, only: [:index, :show, :create]
  resources :players
  
  ## POST route for signup
  post '/signup', to: 'players#create'
  ## POST route for login 
  post 'login', to: 'sessions#create'
  ## DELETE route for logout
  delete 'logout', to: 'sessions#destroy'
  ## GET route for auto-login
  get '/me', to: 'players#me'
  ## POST route to join a meet up
  post '/join_meet_up', to: 'meet_ups#join_meet_up'
  ## POST route for admin signup
  post '/admin_signup', to: 'admins#create'
  ## POST route for admin login
  post 'admin_login', to: 'sessions#create_admin'
  ## DELETE route for admin logout
  delete '/admin_logout', to: 'sessions#destroy_admin'
  ## GET route for admin auto-login
  get '/is_logged_in', to: 'admins#is_logged_in'
  ## GET route for requests manages by admins
  get '/managed_requests', to: 'requests#managed_requests'
end
