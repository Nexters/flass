class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection
  #protect_from_forgery unless: -> { request.format.json? }
  #rescue_from Exception, with: :render_500
  rescue_from ActionController::RoutingError, with: :render_404
  rescue_from ActionController::UnknownController, with: :render_404
  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  private

  def render_500
    render json: {message: "서버 내부에 오류가 발생했습니다."}, status: :internal_server_error
  end

  def render_404
    render json: {message: "레코드를 찾을 수 없습니다."}, status: :not_found
  end

  def login_check
    cookies.each do |cookie|
      puts cookie
    end
    if session[:user_id].nil?
      @error = {message: "로그인이 필요합니다."}
      render json: @error, status: :unauthorized
    end
  end
end
