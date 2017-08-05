class CommentsController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]

  api :GET, '/comments', '특정 lecture에 대한 댓글'
  param :lecture_id, :number, :desc => "강의 ID", :required => true
  def show
    @comments = Comment.where(lecture_id: params[:lecture_id]).paginate(page: params[:page], per_page:20)
  end


  api :POST, '/comments', '특정 lecture에 대한 댓글 생성'
  param :lecture_id, :number, :desc => "강의 ID", :required => true
  param :content, String, :desc => "댓글 내용", :required => true
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :show, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity 
    end
  end

  api :GET, '/comments/edit', '댓글 수정 페이지'
  param :id, :number, :desc => "Comment ID", :required => true
    def edit
      if @comment.user_id == session[:user_id]
        render json: @comment, status: :ok
      else
        render json: @comment.errors, status: :forbidden
      end
    end

  # PATCH/PUT /comments.json
  api :PUT, '/comments', '특정 lecture에 대한 댓글 수정'
  param :id, :number, :desc => "Comment ID", :required => true
  param :content, String, :desc => "댓글 내용", :required => true
  def update
    if @comment.update(comment_params)
      render :show, status: :ok, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end


  api :DELETE, '/comments', '특정 lecture에 대한 댓글 삭제'
  param :id, :number, :desc => "Comment ID", :required => true
  def destroy
    @comment.destroy
    head :no_content
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:user_id, :lecture_id, :content)
    end
end

