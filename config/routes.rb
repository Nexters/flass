Rails.application.routes.draw do
  
  resource :users
  resource :comments
  resource :lectures
  resource :replay_ats
  resource :notifications
  resource :choices
  resource :answers
  resource :questions

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
