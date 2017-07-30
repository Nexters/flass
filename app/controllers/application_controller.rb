class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  def login_check
    @current_user = nil
    if !session[:user_id]=nil?
      @current_user = User.find(session[:user_id])
    else
      redirect_to "/users/login" #url은 바뀔 수 있음
    end
  end
end
