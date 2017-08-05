class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  def login_check
    if session[:user_id].nil?
      @error = {message: "로그인이 필요합니다", url: "https://www.flass.com/users/login"}
      render json: @error, status: :unauthorized
    end
  end
end
