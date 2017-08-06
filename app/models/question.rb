class Question < ApplicationRecord
  belongs_to :lecture
  has_many :choices, dependent: :destroy
  has_many :answers, dependent: :destroy

  validates :content, :correct_answer, presense: true
end
