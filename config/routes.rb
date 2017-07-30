Rails.application.routes.draw do
  resources :users
  resources :comments
  resources :lectures
  resources :replay_ats
  resources :notifications
  resources :choices
<<<<<<< HEAD
  resources :lectures
=======
>>>>>>> 9ee686b6d5b3e4c90a4e3b6814be9b3ce43fb0d4
  resources :answers
  resources :questions
  get 'home/index'
  get 'home/timestamp'

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
