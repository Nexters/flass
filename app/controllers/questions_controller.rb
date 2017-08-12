class QuestionsController < ApplicationController
  before_action :login_check, only: [:show, :edit, :create, :update, :destroy]
  before_action :set_question, only: [:edit, :update, :destroy]

  api :GET, '/questions', '(특정) 강의 문제들 불러오기'
  param :lecture_id, :number, :desc => "lecture ID", :required => true
  def show
    @questions = Question.where(lecture_id: params[:lecture_id])
    render json: @questions
  end

  api :GET, '/questions/edit', '강의 문제 수정 페이지'
  param :id, :number, :desc => "question ID", :required => true
  def edit
    if @question.user_id == session[:user_id]
      render json: @question, status: :ok
    else
      render json: {message: "문제를 수정할 권한이 없습니다."}, status: :unauthorized
    end
  end

  # POST /questions.json
  api :POST, '/questions', '강의 질문 생성'
  param :lecture_id, :number, :desc => "lecture ID", :required => true
  param :content, String, :desc => "질문 내용", :required => true
  param :correct_answer, String, :desc => "질문 정답", :required => true
  param :question_at, Time, :desc => "질문 등장 시간", :required => true
  def create
    @question = Question.new(question_params)

    if @question.save
      render json: @question, status: :created
    else
      render json: {message: "문제와 정답은 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  # PATCH/PUT /questions
  # PATCH/PUT /questions.json
  api :PUT, '/questions', '강의 질문 업데이트'
  param :id, :number, :desc => "question ID", :required => true
  param :content, String, :desc => "질문 내용", :required => true
  param :correct_answer, String, :desc => "질문 정답", :required => true
  param :question_at, Time, :desc => "질문 등장 시간", :required => true
  def update
    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: {message: "문제와 정답은 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  api :DELETE, '/questions', '강의 질문 삭제'
  param :id, :number, :desc => "question ID", :required => true
  def destroy
    if @question.user_id == session[:user_id]
      @question.destroy
      head :ok
    else
      render json: {message: "문제를 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :lecture_id, :content, :correct_answer, :question_at)
    end
end
