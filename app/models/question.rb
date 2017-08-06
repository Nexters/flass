class Question < ApplicationRecord
  belongs_to :lecture
  has_many :choices
  has_many :answers

  validates :content, presense: {message: '문제를 입력해주세요!'}
  validates :correct_answer, presense: {message: '정답을 입력해주세요!'}
end
