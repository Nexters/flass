class ReplayAtsController < ApplicationController
  before_action :set_replay_at, only: [:update, :destroy]

  api :GET, '/replay_ats', '유저의 해당 강의 재생시간 정보'
  param :lecture_id, :number, :desc => "강의 ID", :required => true
  def show
    @replay_at = ReplayAt.where(user_id: session[:user_id], lecture_id: params['lecture_id'])
    render json: @replay_at
  end

  api :POST, '/replay_ats', '유저의 해당 강의 재생시간 정보 생성'
  param :lecture_id, :number, :desc => "강의 ID", :required => true
  param :playtime, String, :desc => "영상 본 시간", :required => true
  def create
    @replay_at = ReplayAt.new(replay_at_params)

    if @replay_at.save
      render json: @replay_at, status: :ok
    else
      render json: @replay_at.errors, status: :unprocessable_entity
    end
  end

  api :PUT, '/replay_ats', '유저의 해당 강의 재생시간 정보 업데이트'
  param :id, :number, :desc => "replay_at ID", :required => true
  param :playtime, String, :desc => "영상 본 시간", :required => true
  def update
    if @replay_at.update(replay_at_params)
      render json: @replay_at, status: :ok
    else
      render json: @replay_at.errors, status: :unprocessable_entity
    end
  end

  api :DELETE, '/replay_ats', '유저의 해당 강의 재생시간 정보 삭제'
  param :id, :number, :desc => "replay_at ID", :required => true
  def destroy
    @replay_at.destroy
    head :no_content
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