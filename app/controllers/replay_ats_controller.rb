class ReplayAtsController < ApplicationController
  before_action :set_replay_at, only: [:show, :edit, :update, :destroy]

  # GET /replay_ats
  # GET /replay_ats.json
  def index
    @replay_ats = ReplayAt.all
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

    respond_to do |format|
      if @replay_at.save
        format.html { redirect_to @replay_at, notice: 'Replay at was successfully created.' }
        format.json { render :show, status: :created, location: @replay_at }
      else
        format.html { render :new }
        format.json { render json: @replay_at.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /replay_ats/1
  # PATCH/PUT /replay_ats/1.json
  def update
    respond_to do |format|
      if @replay_at.update(replay_at_params)
        format.html { redirect_to @replay_at, notice: 'Replay at was successfully updated.' }
        format.json { render :show, status: :ok, location: @replay_at }
      else
        format.html { render :edit }
        format.json { render json: @replay_at.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /replay_ats/1
  # DELETE /replay_ats/1.json
  def destroy
    @replay_at.destroy
    respond_to do |format|
      format.html { redirect_to replay_ats_url, notice: 'Replay at was successfully destroyed.' }
      format.json { head :no_content }
    end
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
