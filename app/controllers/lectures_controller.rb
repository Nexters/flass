class LecturesController < ApplicationController
  before_action :login_check, only: [:show, :edit, :create, :update, :destroy]
  before_action :set_lecture, only: [:show, :edit, :update, :destroy, :statistics]

  api :GET, '/lectures', '(특정 유저가 업로드한) 강의들 불러오기'
  param :page, :number, :desc => "강의 페이지"
  def index
    @lectures = Lecture.where(user_id: session[:user_id]).order(created_at: :desc).paginate(page: params[:page], per_page: 12)
    render json: @lectures
  end

  # GET /lectures
  # GET /lectures.json
  api :GET, '/lectures/:id', '특정 강의 불러오기'
  param :id, :number, :desc => "lecture ID"
  def show
    render json: @lecture
  end

  api :GET, '/lectures/:id/edit', '강의 수정 페이지'
  param :id, :number, :desc => "lecture ID"
  def edit
    if @lecture.user_id == session[:user_id]
      render json: @lecture, status: :ok
    else
      render json: {message: "게시물을 수정할 권한이 없습니다."}, status: :unauthorized
    end
  end

  api :POST, '/lectures', '강의 생성'
  param :title, String, :desc => "강의 제목"
  param :content, String, :desc => "강의 내용"
  param :subject, String, :desc => "강의 과목"
  param :textbook_range, String, :desc => "교재 범위"
  param :url, String, :desc => "강의 url 정보"
  param :thumbnail_url, String, :desc => "강의 thumbnail_url 정보"
  param :duration, :number, :desc => "강의 시간"
  def create
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture, status: :ok
    else
      render json: {message: "강의 제목과 영상은 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  api :PUT, '/lectures/:id', '강의 업데이트'
  param :id, :number, :desc => "lecture ID"
  param :title, String, :desc => "강의 제목"
  param :content, String, :desc => "강의 설명"
  param :subject, String, :desc => "강의 과목"
  param :textbook_range, String, :desc => "교재 범위"
  param :url, String, :desc => "강의 url"
  param :thumbnail_url, String, :desc => "강의 thumbnail_url"
  param :duration, :number, :desc => "강의 시간"
  def update
    if @lecture.update(lecture_params)
      render json: @lecture, status: :ok
    else
      render json: {message: "강의 제목과 영상을 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  # DELETE /lectures
  # DELETE /lectures.json
  api :DELETE, '/lectures/:id', '강의 삭제'
  param :id, :number, :desc => "lecture ID"
  def destroy
    if @lecture.user_id == session[:user_id]
      @lecture.destroy
      head :ok
    else
      render json: {message: "게시물을 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  api :GET, '/lectures/statistics', '강의의 질문 및 학생 답'
  param :id, :number, :desc => "lecture ID"
  def statistics
    @ret = Hash.new

    @ret['questions'] = lectures = @lecture.questions.order(id: :asc)
    @ret['answers'] = Hash.new

    lectures.each do |question|
=begin
      if !@ret['answers'].key?(question.id)
        @ret['answers'][question.id] = Array.new
      end
=end
      @ret['answers'][question.id] = Answer.where(question_id: question.id)
    end

    render json: @ret
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lecture_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :title, :content, :url, :thumbnail_url, :duration, :subject, :textbook_range)
    end
end