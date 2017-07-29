class Question < ApplicationRecord
  belongs_to :lecture
  has_many :choices
  has_many :answers

  validates_presence_of :content
  validates_presence_of :correct_answer
end
