class Api::CommentsController < ApplicationController
  before_action :login_check
  before_action :set_comment, only: [:like, :edit, :update, :destroy]

  api :GET, '/comments', '특정 lecture에 대한 댓글과 대댓글'
  param :lecture_id, :number, :desc => "강의 ID"
  def show
    @ret = Hash.new
    @comments = Comment.where(lecture_id: params[:lecture_id]).paginate(page: params[:page], per_page:20)
    @ret['comments'] = Array.new
    @comments.each do |comment|
      el = comment.as_json
      el['userName'] = comment.user.username
      @ret['comments'].push(el)
    end

    @ret['commentchild'] = Hash.new
    @comments.each do |comment|
      @ret['commentchild'][comment.id] = CommentChild.where(comment_id: comment.id)
    end

    puts @ret

    render json: @ret
  end


  api :POST, '/comments', '특정 lecture에 대한 댓글 생성'
  param :lecture_id, :number, :desc => "강의 ID"
  param :content, String, :desc => "댓글 내용"
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      Notification.new_notification(session[:user_id], params[:lecture_id], 'comment')
      render json: @comment, status: :created
    else
      render json: {message: "내용을 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end

  api :GET, '/comments/edit', '댓글 수정 페이지'
  param :id, :number, :desc => "Comment ID"
  def edit
    if @comment.user_id == session[:user_id]
      render json: @comment, status: :ok
    else
      render json: {message: "댓글을 수정할 권한이 없습니다."}, status: :unauthorized
    end
  end

  # PATCH/PUT /comments.json
  api :PUT, '/comments', '특정 lecture에 대한 댓글 수정'
  param :id, :number, :desc => "Comment ID"
  param :content, String, :desc => "댓글 내용"
  def update
    if @comment.update(comment_params)
      render json: @comment, status: :ok
    else
      render json: {message: "내용을 반드시 입력하셔야 합니다."}, status: :bad_request
    end
  end


  api :DELETE, '/comments', '특정 lecture에 대한 댓글 삭제'
  param :id, :number, :desc => "Comment ID"
  def destroy
    if @comment.user_id == session[:user_id]
      @comment.destroy
      head :ok
    else
      render json: {message: "댓글을 삭제할 권한이 없습니다."}, status: :unauthorized
    end
  end

  api :PUT, '/comments/:id/like', '좋아요 누르고 좋아요 갯수까지 보여주기'
  param :id, :number, :desc => "Comment ID"
  def like
    user = User.find(session[:user_id])
    if user
      if user.liked? @comment
        @comment.unliked_by(user)
      else
        @comment.liked_by(user)
      end
    end
      like = @comment.get_likes.size
      @comment1 = @comment.as_json
      @comment1[:like] = like

      render json: @comment1
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params[:user_id] = session[:user_id]
      params.permit(:user_id, :lecture_id, :content)
    end
end

