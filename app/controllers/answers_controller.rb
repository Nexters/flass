class AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :edit, :update, :destroy]

  # GET /answers
  # GET /answers.json
  # def index
  #   @answers = Answer.all
  # end

  # GET /answers/1
  # GET /answers/1.json
  def show
    @answers = Answer.where(user_id: session[:user_id], question_id: params[:question_id])
  end

  # GET /answers/new
  def new
    @answer = Answer.new
  end

  # GET /answers/1/edit
  def edit
  end

  # POST /answers
  # POST /answers.json
  def create
    @answer = Answer.new(answer_params)

      if @answer.save
        render :show, status: :created, location: @answer
      else
        render json: @answer.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /answers/1
  # PATCH/PUT /answers/1.json
  def update
      if @answer.update(answer_params)
        render :show, status: :ok, location: @answer
      else
       render json: @answer.errors, status: :unprocessable_entity
      end
  end


  # DELETE /answers/1
  # DELETE /answers/1.json
  def destroy
    @answer.destroy
    head :no_content
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def answer_params
      params.require(:answer).permit(:user_id, :question_id, :answer)
    end
end
