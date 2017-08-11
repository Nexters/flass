class NotificationsController < ApplicationController
  before_action :login_check
  before_action :set_notification, only: [:update, :destroy]

  api :GET, '/notifications', '유저 알림'
  def show
    @notifications = Notification.where(user_id: session[:user_id]).order(created_at: :desc)
    render json: @notifications
  end

  api :POST, '/notifications', '유저 알림 생성'
  param :user_id, :number, :desc => "알림을 보낼 유저 ID", :required => true
  param :notification_type, String, :desc => "알림 타입", :required => true
  param :content, String, :desc => "알림 내용", :required => true
  param :url, String, :desc => "알림 url 정보", :required => true
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: @notification, status: :ok
    else
      render json: {message: "유저 ID, 알림 내용 등을 입력해주세요."}, status: :bad_request
    end
  end

  api :PUT, '/notifications', '유저 알림 업데이트'
  param :id, :number, :desc => "notification ID", :required => true
  param :notification_type, String, :desc => "알림 타입", :required => false
  param :content, String, :desc => "알림 내용", :required => false
  param :url, String, :desc => "알림 url 정보", :required => false
  def update
    if @notification.update(notification_params)
      render json: @notification, status: :ok
    else
      render json: {message: "유저 ID, 알림 내용 등을 입력해주세요."}, status: :bad_request
    end
  end

  api :DELETE, '/notifications', '유저 알림 삭제'
  param :id, :number, :desc => "notification ID", :required => true
  def destroy
    if @notification.user_id == session[:user_id]
      @notification.destroy
      head :ok
    else
      render json: {message: "알람을 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification
      @notification = Notification.find(params['id'])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def notification_params
      params.permit(:user_id, :notification_type, :content, :url)
    end
end
