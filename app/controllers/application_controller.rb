class ApplicationController < ActionController::Base

  def login_check
    if session[:user_id].nil?
      @error = {message: "로그인이 필요합니다"}
      render json: @error, status: :unauthorized
    end
  end
end
