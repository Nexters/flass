require 'net/http'
require 'json'
require 'openssl'

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
class Api::UsersController < ApplicationController
  before_action :login_check, only: [:index, :show, :edit, :logout, :destroy]
  before_action :set_user, only: [:show, :edit, :destroy]

  api :GET, '/users/:id', '(특정) 회원 정보 불러오기'
  def index
    @user = User.find(params[:id])
    render json: @user
  end

  # GET /users
  # GET /users.json
  api :GET, '/users', '(본인) 회원 정보 불러오기'
  def show
    render json: @user
  end

=begin
  # POST /users
  # POST /users.json
  api :POST, '/users', '회원 정보 생성 및 업데이트하기'
  param :test_token, String, '테스트용 token 값(nil만 아니면 인증됨, nil일 경우 에러메시지)'
  def create
    test = params[:test_token]
    puts test
    if test.nil?
      render json: {message: "유효하지 않은 토큰값입니다."}, status: :unauthorized
    else
      @user = User.find(22)
      session[:user_id] = @user.id
      render json: @user, status: :ok
    end
  end
=end

  # POST /users
  # POST /users.json
  api :POST, '/users', '회원 정보 생성 및 업데이트하기'
  param :access_token, String, '클래스팅 발급용 access_token 값'
  def create
    uri = URI("https://oauth.classting.com/v1/oauth2/me")
    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      request = Net::HTTP::Get.new uri
      request['Authorization'] = "Bearer #{params[:access_token]}"
      response = http.request request # Net::HTTPResponse object
      about_user_list = JSON.parse(response.body)
      if about_user_list["user_id"].nil?
        render json: {message: "유효하지 않은 토큰값입니다."}, status: :unauthorized
      end
      @user = User.find_by(email: about_user_list["user_id"])
      if @user.nil?
        @user = User.new
        @user.email = about_user_list["user_id"]
        @user.username = about_user_list["name"]
        @user.role = about_user_list["role"]
        @user.myprofileurl = about_user_list["profile_image"]
        #user생성되었을 경우와 그렇지 않은 경우 추가해야함
        if @user.save
          session[:user_id] = @user.id
          render json: @user, status: :ok
        end
      else
        @user.username = about_user_list["name"]
        @user.myprofileurl = about_user_list["profile_image"]
        @user.role = about_user_list["role"]
          if @user.save
            session[:user_id] = @user.id
            render json: @user, status: :ok
          end
      end
    end
  end

  api :GET, '/logout', '회원 로그아웃(앞에 api 붙이지 X)'
  def logout
    reset_session
    head :ok
  end

  # DELETE /users/1
  # DELETE /users/1.json
  api :DELETE, '/users', '회원 탈퇴'
  def destroy
    @user.destroy
    reset_session
    head :ok
  end

  api :GET, '/user/login', '로그인 화면(앞에 api 붙이지 x)'
  def v
    render file: 'public/index.html', layout: false
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(session[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :email, :myprofileurl)
    end
end
