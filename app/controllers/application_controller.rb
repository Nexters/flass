class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  def login_check
    begin
      session[:user_id].nil?
    rescue ActiveRecord::RecordNotFound => e
      @error = {message: "Exception Message: #{e.message}", code: "401"}
      render json: @error, status: :unauthorized
    end
  end
end
