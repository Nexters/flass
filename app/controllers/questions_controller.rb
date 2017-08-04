class QuestionsController < ApplicationController
  before_action :set_question, only: [:edit, :update, :destroy]

  api :GET, '/questions', '(특정) 강의 질문들 불러오기'
  param :lecture_id, :number, :desc => "lecture ID", :required => true
  def show
    @questions = Question.where(lecture_id: params[:lecture_id])
    render json: @questions
  end

  api :GET, '/questions/edit', '강의 질문 수정 페이지'
  param :id, :number, :desc => "question ID", :required => true
    def edit
      if @question.user_id == session[:user_id]
        render json: @question, status: :ok
      else
        render json: @question.errors, status: :forbidden
      end
    end

  # POST /questions.json
  api :POST, '/questions', '강의 질문 생성'
  param :lecture_id, :number, :desc => "lecture ID", :required => true
  param :content, String, :desc => "질문 내용", :required => true
  param :correct_answer, String, :desc => "질문 정답", :required => true
  param :question_at, Time, :desc => "질문 등장 시간", :required => true
  param :hint, String, :desc => "힌트", :required => false
  def create
    @question = Question.new(question_params)

    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions
  # PATCH/PUT /questions.json
  api :PUT, '/questions', '강의 질문 업데이트'
  param :id, :number, :desc => "question ID", :required => true
  param :content, String, :desc => "질문 내용", :required => true
  param :correct_answer, String, :desc => "질문 정답", :required => true
  param :question_at, Time, :desc => "질문 등장 시간", :required => true
  param :hint, String, :desc => "힌트", :required => false
  def update
    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  api :DELETE, '/questions', '강의 질문 삭제'
  param :id, :number, :desc => "question ID", :required => true
  def destroy
    @question.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :lecture_id, :content, :correct_answer, :question_at, :hint)
    end
end
