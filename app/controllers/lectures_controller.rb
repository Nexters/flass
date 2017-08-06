class LecturesController < ApplicationController
  before_action :login_check, only: [:show, :edit, :create, :update, :destroy]
  before_action :set_lecture, only: [:show, :edit, :update, :destroy]

  api :GET, '/lectures', '(특정 유저가 업로드한) 강의들 불러오기'
  param :page, :number, :desc => "강의 페이지", :required => true
  def index
    @lectures = Lecture.where(user_id: session[:user_id]).order(created_at: :desc).paginate(page: params[:page], per_page: 12)
    render json: @lectures
  end

  # GET /lectures
  # GET /lectures.json
  api :GET, '/lectures/:id', '특정 강의 불러오기'
  param :id, :number, :desc=> "lecture ID", :required => true
  def show
    render json: @lecture
  end

  api :GET, '/lectures/:id/edit', '강의 수정 페이지'
  param :id, :number, :desc => "lecture ID", :required => true
  def edit
    if @lecture.user_id == session[:user_id]
      render json: @lecture, status: :ok
    else
      render json: {message: "게시물을 수정할 권한이 없습니다."}, status: :forbidden
    end
  end

  api :POST, '/lectures', '강의 생성'
  param :title, String, :desc => "강의 제목", :required => true
  param :content, String, :desc => "강의 내용", :required => true
  param :url, String, :desc => "강의 url 정보", :required => true
  param :thumbnail_url, String, :desc => "강의 thumbnail_url 정보", :required => true
  param :duration, Time, :desc => "강의 시간", :required => true
  def create
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture, status: :created
    else
      render json: {message: @lecture.errors.values.flatten.join(' ')}, status: :bad_request
    end
  end

  api :PUT, '/lectures/:id', '강의 업데이트'
  param :id, :number, :desc => "lecture ID", :required => true
  param :title, String, :desc => "강의 제목", :required => true
  param :content, String, :desc => "강의 설명", :required => true
  param :url, String, :desc => "강의 url", :required => true
  param :thumbnail_url, String, :desc => "강의 thumbnail_url", :required => true
  param :duration, Time, :desc => "강의 시간", :required => true
  def update
    if @lecture.update(lecture_params)
      render json: @lecture, status: :ok
    else
      render json: {message: @lecture.errors.values.flatten.join(' ')}, status: :bad_request
    end
  end

  # DELETE /lectures
  # DELETE /lectures.json
    api :DELETE, '/lectures/:id', '강의 삭제'
    param :id, :number, :desc => "lecture ID", :required => true
    def destroy
      @lecture.destroy
      head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lecture_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :title, :content, :url, :thumbnail_url, :duration)
    end
end
