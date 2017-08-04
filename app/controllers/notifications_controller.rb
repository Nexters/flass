class NotificationsController < ApplicationController
  before_action :set_notification, only: [:update, :destroy]

  api :GET, '/notifications', '유저 알림'
  def show
    @notifications = Notification.where(user_id: session[:user_id]).order(created_at: :desc)
    render json: @notifications
  end

  api :POST, '/notifications', '유저 알림 생성'
  param :notification_type, String, :desc => "알림 타입", :required => true
  param :content, String, :desc => "알림 내용", :required => true
  param :url, String, :desc => "알림 url 정보", :required => true
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: @notification, status: :ok
    else
      render json: @notification.errors, status: :unprocessable_entity
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
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  api :DELETE, '/notifications', '유저 알림 삭제'
  param :id, :number, :desc => "notification ID", :required => true
  def destroy
    @notification.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification
      @notification = Notification.find(params['id'])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def notification_params
      params['user_id'] = session[:user_id]
      params.permit(:user_id, :notification_type, :content, :url)
    end
end
