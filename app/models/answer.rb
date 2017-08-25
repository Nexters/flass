class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates_presence_of :answer, presence: true
end
