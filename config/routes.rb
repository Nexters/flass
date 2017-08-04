Rails.application.routes.draw do

  apipie
  resource :users
  resource :comments
  resource :lectures
  resource :replay_ats
  resource :notifications
  resource :choices
  resource :answers
  resource :questions

  get 'users/logout'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
