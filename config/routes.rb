Rails.application.routes.draw do

  get 'lectures/statistics'

  post 'comment_children' => "comment_children#create"

  get 'comment_children/edit' => "comment_children#edit"

  put 'comment_children' => "comment_children#update"

  delete 'comment_children' => "comment_children#destroy"

  put 'comments/:id/like' => "comments#like"

  get 'users/:id' => "users#index"

  get 'v/:id' => "lectures#v"

  apipie
  resource :users
  resource :comments
  resources :lectures
  resource :replay_ats
  resource :notifications
  resource :choices
  resource :answers
  resource :questions

 #  resources :comments do
 #   member do
 #     put 'like' => "comments#like"
 #   end
 # end

  get '/logout' => "users#logout"
  get 'answers/question'
  post 'notifications/check'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
