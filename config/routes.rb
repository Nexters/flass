Rails.application.routes.draw do

  get 'lectures/statistics'

  get 'comment_children/create' => "comment_children#create"

  get 'comment_children/edit/:comment_children_id' => "comment_children#edit"

  get 'comment_children/update/:comment_children_id' => "comment_children#update"

  get 'comment_children/destroy/:comment_children_id' => "comment_children#destroy"

  put 'comments/:id/like' => "comments#like"

  get 'users/:id' => "users#index"

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
  get 'users/login'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
