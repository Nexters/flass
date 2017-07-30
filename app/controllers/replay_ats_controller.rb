class ReplayAtsController < ApplicationController
  before_action :set_replay_at, only: [:show, :edit, :update, :destroy]

  # GET /replay_ats
  # GET /replay_ats.json
  def index
    @replay_ats = ReplayAt.where(user_id: session[:user_id])
  end

  # GET /replay_ats/1
  # GET /replay_ats/1.json
  def show
  end

  # GET /replay_ats/new
  def new
    @replay_at = ReplayAt.new
  end

  # GET /replay_ats/1/edit
  def edit
  end

  # POST /replay_ats
  # POST /replay_ats.json
  def create
    @replay_at = ReplayAt.new(replay_at_params)

    if @replay_at.save
      render :show, status: :created
    else
      render json: @replay_at.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /replay_ats/1
  # PATCH/PUT /replay_ats/1.json
  def update
    if @replay_at.update(replay_at_params)
      render json: @replay_at, status: :ok
    else
      render json: @replay_at.errors, status: :unprocessable_entity
    end
  end

  # DELETE /replay_ats/1
  # DELETE /replay_ats/1.json
  def destroy
    @replay_at.destroy
    head :no_content
  end

  def lecture
    @replay_at = ReplayAt.where(user_id: session[:user_id],
                                lecture_id: params[:lecture_id])
    render json: @replay_at
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_replay_at
      @replay_at = ReplayAt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def replay_at_params
      params.require(:replay_at).permit(:user_id, :lecture_id, :playtime)
    end
end
