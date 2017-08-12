class Notification < ApplicationRecord
  belongs_to :user

  validates :notification_type, :content, :url, presence: true
end
