class Lecture < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, presence: {message: '제목을 입력해주세요!'}
  validates :content, presence: {message: '내용을 입력해주세요!'}
end
