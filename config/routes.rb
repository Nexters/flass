Rails.application.routes.draw do
  get 'replay_ats/lecture/:lecture_id', to: 'replay_ats#lecture'

  resources :users
  resources :comments
  resources :lectures
  resources :replay_ats
  resources :notifications
  resources :choices
  resources :answers
  resources :questions

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
