class ChoicesController < ApplicationController
  before_action :set_choice, only: [:show, :edit, :update, :destroy]

  # GET /choices
  # GET /choices.json
  def index
    @choices = Choice.where(user_id: session[:user_id],lecture_id: params[:lecture_id])
  end

  # # GET /choices/1
  # # GET /choices/1.json
  # def show
  # end

  # GET /choices/new
  def new
    @choice = Choice.new
  end

  # # GET /choices/1/edit
  # def edit
  # end

  # POST /choices
  # POST /choices.json
  def create
    @choice = Choice.new(choice_params)
 
      if @choice.save
        render json: @choice, status: :created
      else
        render json: @choice.errors, status: :unprocessable_entity
      end
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
