class LecturesController < ApplicationController
  before_action :set_lecture, only: [:show, :edit, :update, :destroy]

  # GET /lectures
  # GET /lectures.json
  def show
    @lectures = Lecture.where(user_id: session[:user_id]).order(created_at: :desc).paginate(page: params[:page], per_page: 10)
  end

  # GET /lectures/edit
  def edit
    if @lecture.user_id == session[:user_id]
      render json: @lecture, status: :ok
    else
      render json: {message: "이 글의 작성자만 수정할 권한이 있습니다.", data:@lecture.errors}, status: :forbidden
    end
  end

  # POST /lectures
  # POST /lectures.json
  def create
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture, status: :created
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lectures
  # PATCH/PUT /lectures.json
  def update
    if @lecture.update(lecture_params)
      render json: @lecture, status: :ok
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lectures
  # DELETE /lectures.json
  def destroy
    @lecture.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lecture_params
      params.require(:lecture).permit(:user_id, :title, :content, :url, :thumbnail_url, :duration)
    end
end
