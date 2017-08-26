class Notification < ApplicationRecord
  belongs_to :user

  validates :notification_type, :content, :url, presence: true

  def self.new_notification(user_id, lecture_id, from)
  	target = Lecture.find(lecture_id).user_id
  	notification_type = 1
  	url = '{"lecture_id":' + lecture_id.to_s + '}'

  	if from == 'comment'
  		content = User.find(user_id).username + '님이 강의에 댓글을 달았습니다.'
  	else
  		content = ''
  	end

  	Notification.create(user_id: target, notification_type: notification_type, content: content, url: url)
  end
end
