class Question < ApplicationRecord
  belongs_to :lecture
  has_many :choices, dependent: :destroy
  has_many :answers, dependent: :destroy

  validates_presence_of :content, :correct_answer, message: '질문과 정답을 입력해주세요!'
end
