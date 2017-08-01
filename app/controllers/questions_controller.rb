class QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :edit, :update, :destroy]

  # GET /questions
  # GET /questions.json
  def show
    @questions = Question.where(lecture_id: params[:lecture_id])
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/edit
  def edit
  end

  # POST /questions
  # POST /questions.json
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
  def update
    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions
  # DELETE /questions.json
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
      params.require(:question).permit(:lecture_id, :content, :correct_answer, :question_at, :hint)
    end
end
