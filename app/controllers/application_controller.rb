class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  def login_check
    if session[:user_id]=nil?
      puts "로그인하세요"
    end
  end
end
