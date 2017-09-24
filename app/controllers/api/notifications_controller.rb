class NotificationsController < ApplicationController
  before_action :login_check
  before_action :set_notification, only: [:update, :destroy]

  api :GET, 'api/notifications', '유저 알림'
  def show
    @notifications = Notification.where(user_id: session[:user_id]).order(created_at: :desc).limit(20)
    render json: @notifications
  end

  api :POST, 'api/notifications', '유저 알림 생성'
  param :user_id, :number, :desc => "알림을 보낼 유저 ID"
  param :notification_type, :number, :desc => "알림 타입"
  param :content, String, :desc => "알림 내용"
  param :url, String, :desc => "알림 url 정보"
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: @notification, status: :ok
    else
      render json: {message: "유저 ID, 알림 내용 등을 입력해주세요."}, status: :bad_request
    end
  end

  api :PUT, 'api/notifications', '유저 알림 업데이트'
  param :id, :number, :desc => "notification ID"
  param :notification_type, :number, :desc => "알림 타입"
  param :content, String, :desc => "알림 내용"
  param :url, String, :desc => "알림 url 정보"
  def update
    if @notification.update(notification_params)
      render json: @notification, status: :ok
    else
      render json: {message: "유저 ID, 알림 내용 등을 입력해주세요."}, status: :bad_request
    end
  end

  api :DELETE, 'api/notifications', '유저 알림 삭제'
  param :id, :number, :desc => "notification ID"
  def destroy
    if @notification.user_id == session[:user_id]
      @notification.destroy
      head :ok
    else
      render json: {message: "알람을 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  api :POST, 'api/notifications/check'
  def check
    if Notification.where(user_id: session[:user_id]).update_all(notification_type: 0)
      head :ok
    else
      render json: {message: "알람 상태를 업데이트 하지 못 했습니다."}, status: :bad_request
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
