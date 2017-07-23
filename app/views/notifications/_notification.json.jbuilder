json.extract! notification, :id, :user_id, :type, :content, :url, :created_at, :updated_at
json.url notification_url(notification, format: :json)
