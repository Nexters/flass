Rails.application.routes.draw do
  resources :replay_ats
  resources :notifications
  resources :choices
  resources :answers
  resources :questions
  get 'home/index'
  get 'home/timestamp'

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
