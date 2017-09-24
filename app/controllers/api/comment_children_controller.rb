class CommentChildrenController < ApplicationController
  before_action :login_check
  before_action :set_commentchild, only: [:edit, :update, :destroy]


  api :POST, 'api/comment_children', '특정 comment에 대한 대댓글 생성'
  param :comment_id, :number, :desc => "Comment ID"
  param :content, String, :desc => "대댓글 내용"
  def create
    @commentchild = CommentChild.new(commentchild_params)

    if @commentchild.save
      render json: @commentchild, status: :created
    else
      render json: {message: "내용을 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  api :GET, 'api/comment_children/edit', '대댓글 수정 페이지'
  param :id, :number, :desc => "CommentChild ID"
  def edit
    if @commentchild.user_id == session[:user_id]
      render json: @commentchild, status: :ok
    else
      render json: {message: "댓글을 수정할 권한이 없습니다."}, status: :unauthorized
    end
  end


  api :PUT, 'api/comment_children', '대댓글 수정'
  param :id, :number, :desc => "CommentChild ID"
  param :content, String, :desc => "대댓글 내용"
  def update
    if @commentchild.update(commentchild_params)
      render json: @commentchild, status: :ok
    else
      render json: {message: "내용을 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end


  api :DELETE, 'api/comment_children', '특정 대댓글 삭제'
  param :id, :number, :desc => "CommentChild ID"
  def destroy
    if @commentchild.user_id == session[:user_id]
      @commentchild.destroy
      head :ok
    else
      render json: {message: "댓글을 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_commentchild
      @commentchild = CommentChild.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def commentchild_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :comment_id, :content)
    end
end
