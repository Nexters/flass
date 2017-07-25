json.extract! lecture, :id, :user_id, :title, :content, :url, :thumbnail_url, :duration, :created_at, :updated_at
json.url lecture_url(lecture, format: :json)
