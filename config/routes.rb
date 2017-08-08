Rails.application.routes.draw do

  apipie
  resource :users
  resource :comments
  resources :lectures
  resource :replay_ats
  resource :notifications
  resource :choices
  resource :answers
  resource :questions

  resources :comments do
   member do
     put 'like' => "comments#like"
   end
 end

  get 'users/logout'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
