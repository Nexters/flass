json.extract! comment, :id, :user_id, :lecture_id, :myProfileURL, :content, :created_at, :updated_at
json.url comment_url(comment, format: :json)
