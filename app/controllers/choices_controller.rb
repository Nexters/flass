class ChoicesController < ApplicationController
  before_action :set_choice, only: [:edit, :update, :destroy]


  api :GET, '/choices', '특정 Question에 대한 보기(선지)'
  param :question_id, :number, :desc => "질문 ID", :required => true
  def show
    @choices = Choice.where(question_id: params[:question_id])  
  end


  api :POST, '/choices', '특정 Question에 대한 선지 생성'
  param :question_id, :number, :desc => "Question ID", :required => true
  param :answer, String, :desc => "선지 내용", :required => true
  def create
    @choice = Choice.new(choice_params)
 
    if @choice.save
      render json: @choice, status: :created
    else
      render json: {message: "보기를 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end


  api :GET, '/choices/edit', '특정 Question에 대한 선지 수정 페이지'
  param :id, :number, :desc => "Choice ID", :required => true
    def edit
      if @question.user_id == session[:user_id]
        render json: @choice, status: :ok
      else
        render json: {message: "문제를 수정할 권한이 없습니다."}, status: :unauthorized
      end
    end

  api :PUT, '/choices', '특정 Question에 대한 선지 엡데이트'
  param :id, :number, :desc => "Choice ID", :required => true
  param :answer, String, :desc => "선지 내용", :required => true
  def update
    if @choice.update(choice_params)
      render json: @choice, status: :ok
    else
      render json: {message: "문제의 보기를 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  api :DELETE, '/choices', '특정 Question에 대한 선지 삭제'
  param :id, :number, :desc => "Choice ID", :required => true
  def destroy
    if @question.user_id == session[:user_id]
      @choice.destroy
      head :ok
    else
      render json: {message: "문제를 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_choice
      @choice = Choice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def choice_params
      params.require(:choice).permit(:question_id, :answer)
    end
end
