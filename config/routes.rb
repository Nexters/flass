Rails.application.routes.draw do

  get 'api/lectures/statistics'

  post 'api/comment_children' => "api/comment_children#create"

  get 'api/comment_children/edit' => "api/comment_children#edit"

  put 'api/comment_children' => "api/comment_children#update"

  delete 'api/comment_children' => "api/comment_children#destroy"

  put 'api/comments/:id/like' => "api/comments#like"

  get 'api/users/:id' => "api/users#index"

  get 'v/:id' => "api/lectures#v"
  get 'lecture/:id' => "api/lectures#v"
  get 'upload' => "api/lectures#v"
  get 'home' => "api/lectures#v"
  get 'user/login' => "api/users#v"

  apipie
  namespace :api do
    resource :users
    resource :comments
    resources :lectures
    resource :replay_ats
    resource :notifications
    resource :choices
    resource :answers
    resource :questions
  end
 #  resources :comments do
 #   member do
 #     put 'like' => "comments#like"
 #   end
 # end

  get '/logout' => "api/users#logout"
  get 'api/answers/question' => "api/answers#index"
  post 'api/notifications/check'
  put 'api/lectures/shortenurl/:id' => "api/lectures#shortenurl"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
