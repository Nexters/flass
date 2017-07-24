json.extract! question, :id, :lecture_id, :content, :correct_answer, :question_at, :hint, :created_at, :updated_at
json.url question_url(question, format: :json)
