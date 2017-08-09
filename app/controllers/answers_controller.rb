class AnswersController < ApplicationController
  before_action :login_check, only: [:show, :create, :destroy]
  before_action :set_answer, only: :destroy

  api :GET, '/answers', '특정 question에 대한 학생들의 답'
  param :question_id, :number, :desc => "질문 ID", :required => true
  def show
    @answers = Answer.where(question_id: params[:question_id])
  end

  api :POST, '/answers', '특정 question에 대한 학생의 답 생성'
  param :question_id, :number, :desc => "질문 ID", :required => true
  param :answer, String, :desc => "학생 답", :required => true
  def create
    @answer = Answer.new(answer_params)

      if @answer.save
        render json: @answer, status: :ok
      else
        render json: {message: "답은 반드시 입력해야 합니다."}, status: :bad_request
      end
  end

  # DELETE /answers/1
  # DELETE /answers/1.json
  api :DELETE, '/answers', '특정 question에 대한 학생 답 삭제'
  param :id, :number, :desc => "학생 답 ID", :required => true
  def destroy
    @answer.destroy
    head :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def answer_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :question_id, :answer)
    end
end
