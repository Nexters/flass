class ReplayAtsController < ApplicationController
  before_action :login_check
  before_action :set_replay_at, only: [:update, :destroy]

  api :GET, '/replay_ats', '유저의 해당 강의 재생시간 정보'
  param :lecture_id, :number, :desc => "강의 ID"
  def show
    @replay_at = ReplayAt.where(user_id: session[:user_id], lecture_id: params['lecture_id'])
    render json: @replay_at
  end

  api :POST, '/replay_ats', '유저의 해당 강의 재생시간 정보 생성'
  param :lecture_id, :number, :desc => "강의 ID"
  param :playtime, String, :desc => "영상 본 시간"
  def create
    @replay_at = ReplayAt.new(replay_at_params)
    if @replay_at.save
      render json: @replay_at, status: :ok
    else
      render json: {message: "재생시간을 입력해 주세요"}, status: :bad_request
    end
  end

  api :PUT, '/replay_ats', '유저의 해당 강의 재생시간 정보 업데이트'
  param :id, :number, :desc => "replay_at ID"
  param :playtime, String, :desc => "영상 본 시간", :required => true
  def update
    if @replay_at.update(replay_at_params)
      render json: @replay_at, status: :ok
    else
      render json: {message: "재생시간을 입력해 주세요"}, status: :bad_request
    end
  end

  api :DELETE, '/replay_ats', '유저의 해당 강의 재생시간 정보 삭제'
  param :id, :number, :desc => "replay_at ID"
  def destroy
    if @lecture.user_id == session[:user_id]
      @replay_at.destroy
      head :ok
    else
      render json: {message: "강의 재생시간 정보를 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_replay_at
      @replay_at = ReplayAt.find(params['id'])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def replay_at_params
      params['user_id'] = session[:user_id]
      params.permit(:user_id, :lecture_id, :playtime)
    end
end